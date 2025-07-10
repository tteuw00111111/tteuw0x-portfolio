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

type TerminalProps = {
  dictionary: {
    bio: string;
    command1: string;
    command2: string;
  };
};

export const Terminal: React.FC<TerminalProps> = ({ dictionary }) => {
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
    useTypewriter(dictionary.command1, 100);
  const { displayText: typedAscii, isFinished: asciiFinished } = useTypewriter(
    asciiArt,
    2,
    commandFinished
  );
  const { displayText: typedBio, isFinished: bioFinished } = useTypewriter(
    dictionary.bio,
    15,
    commandFinished
  );
  const { displayText: typedContact, isFinished: contactFinished } =
    useTypewriter(dictionary.command2, 100, bioFinished && asciiFinished);

  return (
    <div className="group relative w-full mx-auto">
      <Image
        src="/images/vector.svg"
        alt="Background vector"
        fill
        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 50vw, 640px"
        className="absolute inset-0 m-auto -z-10 opacity-30 transition-all duration-300 group-hover:opacity-50 group-hover:scale-110 object-contain"
      />
      <div className="w-full transition-all duration-300 group-hover:scale-105">
        <div className="h-9 bg-zinc-900 rounded-t-2xl shadow-[0px_1px_2px_0px_rgba(13,13,13,0.50)] flex items-center justify-center relative">
          <p className="text-white text-sm sm:text-base font-thin">bash</p>
        </div>
        <div className="min-h-80 bg-stone-950 rounded-b-2xl shadow-[0px_3px_5px_0px_rgba(13,13,13,0.50)] p-4 sm:p-5 flex flex-col gap-4 font-mono">
          <p className="text-sm sm:text-base">
            <span className="text-red-700">root@tteuw0x</span>
            <span className="text-white">:</span>
            <span className="text-gray-200">~$ {typedCommand}</span>
            {!commandFinished && (
              <span className="ml-2 h-4 w-2 animate-blink bg-gray-200 inline-block" />
            )}
          </p>

          {commandFinished && (
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <pre className="text-red-700 text-[8px] font-bold leading-tight pt-1">
                {typedAscii}
              </pre>
              <div className="text-white text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-wrap w-full">
                {typedBio}
              </div>
            </div>
          )}

          {bioFinished && asciiFinished && (
            <p className="text-xs sm:text-sm">
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

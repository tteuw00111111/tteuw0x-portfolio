"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal } from "@/components/Terminal";

type TerminalDictionary = {
  bio: string;
  command1: string;
  command2: string;
};

type HomeProps = {
  dictionary: {
    title_line1: string;
    title_line2: string;
    subtitle_line1: string;
    subtitle_line2: string;
    bio_p1: string;
    bio_p2: string;
  };
  terminalDictionary: TerminalDictionary;
};

export const Home: React.FC<HomeProps> = ({
  dictionary,
  terminalDictionary,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  return (
    <motion.section
      ref={targetRef}
      id="inicio"
      className="min-h-screen flex items-center justify-center pt-24 lg:pt-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Changed flex-col-reverse to flex-col */}
      <motion.div
        className="flex flex-col lg:flex-row
            w-full max-w-6xl mx-auto px-4 md:px-6
            gap-12 lg:gap-20 items-center"
        style={{ y }}
      >
        <div className="w-full lg:max-w-[44%]">
          <motion.h1
            className="font-poppins font-extrabold
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl hd:text-[80px]"
            variants={containerVariants}
            aria-label={`${dictionary.title_line1} ${dictionary.title_line2}`}
          >
            {dictionary.title_line1.split("").map((letter, index) => (
              <motion.span key={index} variants={letterVariants}>
                {letter}
              </motion.span>
            ))}
            <br />
            {dictionary.title_line2.split("").map((letter, index) => (
              <motion.span key={index} variants={letterVariants}>
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div variants={fadeInVariants}>
            <h2
              className="
  mt-6 font-medium text-lg
  sm:text-xl md:text-2xl lg:text-[28px] hd:text-[32px]
  leading-snug lg:leading-[42px] hd:leading-[48px]
  text-header-gradient
"
            >
              {dictionary.subtitle_line1}
              <br />
              {dictionary.subtitle_line2}
            </h2>

            <p className="mt-8 font-poppins font-medium text-lg md:text-[24px] leading-relaxed md:leading-[26px] text-global-1">
              {dictionary.bio_p1}
            </p>
            <p className="mt-4 font-poppins font-medium text-lg md:text-[24px] leading-relaxed md:leading-[26px] text-global-1">
              {dictionary.bio_p2}
            </p>
          </motion.div>
        </div>

        <motion.div className="flex-1" variants={fadeInVariants}>
          <Terminal dictionary={terminalDictionary} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

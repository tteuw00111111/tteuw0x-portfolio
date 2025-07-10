"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ContactButton } from "@/components/ContactButton";
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
    contact_button: string;
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

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "-50%"]);

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
      /* ------------- Responsive paddings ------------- */

      className="
        min-h-[calc(100svh-6rem)]
        flex items-center justify-center
        px-4
        pt-20 sm:pt-24 md:pt-28 lg:pt-36 xl:pt-48 hd:pt-56 4k:pt-64
        pb-12 sm:pb-20
      "
      style={{
        scale: useTransform(scrollYProgress, [0, 1], [1, 0.95]),
        opacity: useTransform(scrollYProgress, [0, 1], [1, 0.75]),
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="
          flex flex-col lg:flex-row items-center
          w-full max-w-6xl mx-auto
          gap-12 lg:gap-20
          px-4 md:px-6
        "
        style={{ y }}
      >
        {/* ---------- Left column ---------- */}

        <div className="flex-[0_0_100%] lg:flex-[0_0_45%]">
          <motion.h1
            className="font-poppins font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
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
  mt-4 lg:mt-3 xl:mt-6 font-medium
  text-md sm:text-xl lg:text-2xl xl:text-3xl
  leading-snug
  text-header-gradient
"
            >
              {dictionary.subtitle_line1}
              <br />
              {dictionary.subtitle_line2}
            </h2>

            <p className="mt-6 lg:mt-4 xl:mt-8 font-poppins font-medium text-base md:text-lg xl:text-xl leading-relaxed text-global-1">
              {dictionary.bio_p1}
            </p>
            <p className="mt-4 lg:mt-3 xl:mt-4 font-poppins font-medium text-base md:text-lg xl:text-xl leading-relaxed text-global-1">
              {" "}
              {dictionary.bio_p2}
            </p>

            <div className="mt-6 lg:mt-5 xl:mt-8">
              <ContactButton text={dictionary.contact_button} />
            </div>
          </motion.div>
        </div>

        {/* ---------- Terminal ---------- */}

        <motion.div
          className="flex-1 w-full max-w-[640px]"
          variants={fadeInVariants}
        >
          {" "}
          <Terminal dictionary={terminalDictionary} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

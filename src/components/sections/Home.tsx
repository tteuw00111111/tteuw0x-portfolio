// src/components/sections/Home.tsx
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ContactButton } from "@/components/ContactButton";
import { Terminal } from "@/components/Terminal";
import { useIsMobile } from "@/useIsMobile";

// (Keep your type definitions)
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
  const isMobile = useIsMobile();

  // --- HOOKS ARE CALLED UNCONDITIONALLY ---
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  // -----------------------------------------

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
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
      className="
        min-h-screen
        flex items-center justify-center
        pt-28 pb-16 md:pt-36 lg:pt-0
      "
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // Conditionally pass the MotionValue from the hook OR a static value
      style={{
        scale: isMobile ? 1 : scale,
        opacity: isMobile ? 1 : opacity,
      }}
    >
      <motion.div
        className="
          flex flex-col lg:flex-row items-center
          w-full max-w-6xl mx-auto
          gap-16 lg:gap-20
          px-4 md:px-6
        "
        // Conditionally pass the MotionValue from the hook OR a static value
        style={{ y: isMobile ? "0%" : y }}
      >
        {/* The rest of your component remains the same... */}

        {/* ---------- Left column ---------- */}
        <div className="flex-[0_0_100%] lg:flex-[0_0_45%] text-center lg:text-left">
          <motion.h1
            className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-7xl xl:text-8xl"
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
                mt-4 font-medium
                text-lg sm:text-xl lg:text-2xl
                leading-snug text-header-gradient
              "
            >
              {dictionary.subtitle_line1}
              <br className="hidden sm:block" />
              {dictionary.subtitle_line2}
            </h2>

            <p className="mt-6 font-poppins font-medium text-base md:text-lg leading-relaxed text-global-1">
              {dictionary.bio_p1}
            </p>
            <p className="mt-4 font-poppins font-medium text-base md:text-lg leading-relaxed text-global-1">
              {dictionary.bio_p2}
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <ContactButton text={dictionary.contact_button} />
            </div>
          </motion.div>
        </div>

        {/* ---------- Terminal ---------- */}
        <motion.div
          className="flex-1 w-full max-w-lg"
          variants={fadeInVariants}
        >
          <Terminal dictionary={terminalDictionary} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

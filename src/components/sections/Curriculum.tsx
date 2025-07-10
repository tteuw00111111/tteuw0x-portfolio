"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useResponsive from "@/hooks/useResponsive";

const MainTimelineDot = () => (
  <div className="absolute left-1/2 top-1 -translate-x-1/2 z-10">
    <div className="w-7 h-7 rounded-full bg-gradient-to-b from-red-700 to-rose-950 shadow-lg" />
  </div>
);

type CurriculumProps = {
  dictionary: {
    title: string;
    education_title: string;
    education_degree: string;
    education_university: string;
    education_focus: string;
    education_period: string;
    courses_title: string;
    courses: string[];
    languages_title: string;
    languages: { name: string; level: string }[];
  };
};

export const Curriculum: React.FC<CurriculumProps> = ({ dictionary }) => {
  const { isMobile } = useResponsive();

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <section id="curriculo" className="py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-16">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-global-2 leading-tight">
            {dictionary.title}
          </h2>
        </motion.div>

        <div className="relative w-full flex flex-col items-center gap-24 md:gap-36 pt-8">
          {!isMobile && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-full bg-rose-800/30" />
          )}

          <motion.div
            className="relative w-full flex justify-center items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            {!isMobile && <MainTimelineDot />}
            <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16">
              <div className="lg:w-2/5 text-center lg:text-right">
                <p className="text-2xl sm:text-3xl font-semibold text-stone-300">
                  {dictionary.education_university}
                </p>
                <p className="text-3xl sm:text-4xl font-semibold text-header-gradient mt-8 lg:mt-24">
                  {dictionary.education_degree}
                </p>
                <p className="text-lg sm:text-xl font-light text-stone-400 mt-2">
                  {dictionary.education_period}
                </p>
              </div>
              <div className="lg:w-2/5 text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-semibold text-stone-300">
                  {dictionary.education_focus}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full max-w-2xl z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <div className="bg-[#1E1E1E] rounded-[38px] shadow-[0px_4px_4px_rgba(0,0,0,0.25),inset_0px_0px_7px_rgba(255,255,255,0.05)] p-6 sm:p-8 text-center">
              <h3 className="text-3xl font-semibold text-stone-300 mb-6">
                {dictionary.courses_title}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {dictionary.courses.map((course) => (
                  <motion.span
                    key={course}
                    className="px-5 py-3 text-base font-semibold text-stone-300 bg-gradient-to-r from-red-700/20 to-rose-950/20 rounded-full border-2 border-red-800/50"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="w-full max-w-2xl flex flex-col items-center text-center mt-12 md:mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <h3 className="text-4xl sm:text-5xl font-medium text-stone-300">
            {dictionary.languages_title}
          </h3>
          <p className="text-zinc-400 text-2xl sm:text-3xl mt-4 font-light">
            Línguas
          </p>
          <div className="flex flex-col gap-8 w-full mt-8">
            {dictionary.languages.map((lang) => {
              const isPortuguese = lang.name.toLowerCase().includes("portugu");
              const flagImage = isPortuguese
                ? "/images/brazil.png"
                : "/images/usa_flag.png";
              const flagAlt = isPortuguese ? "Bandeira do Brasil" : "USA Flag";

              return (
                <motion.div
                  key={lang.name}
                  className="w-full flex justify-center items-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center justify-center gap-4 w-full max-w-md">
                    <div className="relative w-12 h-8 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={flagImage}
                        alt={flagAlt}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <p className="w-28 text-left text-xl font-semibold text-stone-300">
                      {lang.name}
                    </p>
                    <div className="flex-1 h-2 bg-stone-700 rounded-full">
                      {/* MODIFICATION: Set width to 100% for all languages */}
                      <div
                        className="h-full bg-gradient-to-r from-red-700 to-rose-900 rounded-full"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <span className="w-24 text-left text-lg font-light text-stone-400">
                      {lang.level}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

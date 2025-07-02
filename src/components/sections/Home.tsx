"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal } from "@/components/Terminal";

export const Home = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const name = "Matheus";
  const surname = "Luna";

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
      {}
      <motion.div
        className="flex flex-col lg:flex-row w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-0 gap-10 lg:gap-20 items-center"
        style={{ y }}
      >
        {}
        <div className="w-full lg:max-w-[44%]">
          <motion.h1
            className="font-poppins font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[96px] leading-tight lg:leading-[86px] text-global-2"
            variants={containerVariants}
            aria-label={`${name} ${surname}`}
          >
            {name.split("").map((letter, index) => (
              <motion.span key={index} variants={letterVariants}>
                {letter}
              </motion.span>
            ))}
            <br />
            {surname.split("").map((letter, index) => (
              <motion.span key={index} variants={letterVariants}>
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          {}

          {}
          <motion.div variants={fadeInVariants}>
            <h2 className="mt-[22px] font-poppins font-medium text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-[48px] text-header-gradient">
              Desenvolvedor
              <br />
              Estudante&nbsp;de&nbsp;Cibersegurança
            </h2>

            {}
            <p className="mt-8 font-poppins font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-[26px] text-global-1">
              Estudante de Ciência da Computação com foco em Cibersegurança, em
              segurança ofensiva, redes e Linux. Possuo conhecimento sólido em
              linguagens como C, C++ e JavaScript, além de experiência em
              exploração de vulnerabilidades, engenharia reversa e
              desenvolvimento de malware.
            </p>
            <p className="font-poppins font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-[26px] text-global-1">
              Atualmente tenho aprofundado meus estudos em engenharia reversa,
              desenvolvimento e análise de malwares. Tenho trabalhado com
              ferramentas como IDA Pro, além de estudar Command and Control (C2)
              e frameworks como Cobalt Strike.
            </p>
          </motion.div>
        </div>

        {}
        <motion.div className="flex-1" variants={fadeInVariants}>
          <Terminal />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

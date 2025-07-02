"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <div
      className="
      h-28 w-full
      bg-global-1
      rounded-2xl 
      p-4 
      flex flex-col justify-center items-center
      shadow-[0px_2px_4px_rgba(0,0,0,0.25),inset_0px_0px_7px_rgba(255,255,255,0.05)]
      transition-transform hover:scale-105
    "
    >
      <h3 className="text-global-2 text-base font-normal font-poppins leading-snug">
        {title}
      </h3>
      <div className="flex flex-col items-center leading-tight mt-1">
        <span className="text-header-gradient text-3xl font-extrabold">
          {value}
        </span>
        <span className="text-global-2 text-sm font-extrabold">
          {description}
        </span>
      </div>
    </div>
  );
};

export const About = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["400px", "-400px"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      ref={targetRef}
      id="sobre"
      className="min-h-screen flex items-center justify-center bg-global-1 py-20 px-4"
    >
      {}
      <motion.div
        style={{ x }}
        className="max-w-7xl mx-auto w-full flex flex-col items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="font-poppins font-semibold text-6xl lg:text-8xl text-global-2 leading-tight">
            Sobre Mim
          </h2>
          <p className="font-poppins font-light text-2xl text-global-1 whitespace-nowrap mt-2">
            Introdução
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="group relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
        >
          <Image
            src="/images/vector_about.svg"
            alt="Decorative background vector"
            fill
            className="transition-all duration-500 ease-in-out group-hover:opacity-40 group-hover:rotate-6"
          />
          <Image
            src="/images/about_image.svg"
            alt="flat illustration image"
            fill
            className="object-cover rounded-lg p-4 transition-all duration-500 ease-in-out group-hover:scale-105"
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="font-poppins text-lg text-global-1 leading-relaxed text-center max-w-3xl"
        >
          Estudante de Ciência da Computação na Universidade Veiga de Almeida,
          com foco em cibersegurança, segurança ofensiva, engenharia reversa, e
          desenvolvimento de malwares. Sólidos conhecimentos em C, C++ e
          JavaScript.
        </motion.p>

        {}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8"
        >
          <StatCard
            title="Experiência"
            value="+3"
            description="Anos na área."
          />
          <StatCard title="Projetos" value="+5" description="no Github." />
          <StatCard
            title="Certificados"
            value="+5"
            description="Finalizados."
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

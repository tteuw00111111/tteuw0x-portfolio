"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { DownloadCVButton } from "@/components/DownloadCVButton";
import useResponsive from "@/hooks/useResponsive";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

type AboutProps = {
  dictionary: {
    title: string;
    subtitle: string;
    bio: string;
    cards: {
      title: string;
      value: string;
      description: string;
    }[];
    download_cv: string;
  };
};

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <div className="h-28 w-full bg-global-1 rounded-2xl p-4 flex flex-col justify-center items-center shadow-[0px_2px_4px_rgba(0,0,0,0.25),inset_0px_0px_7px_rgba(255,255,255,0.05)] transition-transform hover:scale-105">
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

export const About: React.FC<AboutProps> = ({ dictionary }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsive();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0px", "0px"] : ["150px", "-150px"]
  );
  const titleX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0px", "0px"] : ["50px", "-50px"]
  );
  const imageX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0px", "0px"] : ["-50px", "50px"]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={targetRef}
      id="sobre"
      className="bg-global-1 pt-12 sm:pt-16 pb-24 sm:pb-32 px-4"
    >
      <motion.div
        style={{ x }}
        className="max-w-6xl mx-auto w-full flex flex-col items-center gap-12 md:gap-14 lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={itemVariants}
          className="text-center"
          style={{ x: titleX }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-global-2 leading-tight">
            {dictionary.title}
          </h2>
          <p className="font-poppins font-light text-xl sm:text-2xl text-global-1 mt-2">
            {dictionary.subtitle}
          </p>
        </motion.div>

        <motion.div
          style={{ x: imageX }}
          variants={itemVariants}
          className="group relative w-60 h-60 sm:w-72 sm:h-72 lg:w-96 lg:h-96"
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
          className="font-poppins text-base sm:text-lg text-global-1 leading-relaxed text-center max-w-3xl"
        >
          {dictionary.bio}
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full mt-8"
        >
          {dictionary.cards.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              description={card.description}
            />
          ))}
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="w-full flex justify-center mt-8 md:mt-16"
        >
          <DownloadCVButton text={dictionary.download_cv} />
        </motion.div>
      </motion.div>
    </section>
  );
};

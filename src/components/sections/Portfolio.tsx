"use client";

import React, { useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import useResponsive from "@/hooks/useResponsive"; // MODIFICATION: Import hook

// ... project data ...
const projectsData = [
  {
    image: "/images/nocturnal.png",
    link: "https://github.com/NocturnalApp/Nocturnal",
  },
  {
    image: "/images/web_scanner.png",
    link: "https://github.com/tteuw00111111/Web-Vulnerability-CLI-Scanner",
  },
  {
    image: "/images/pwnchat.png",
    link: "https://github.com/tteuw00111111/PwnChat",
  },
];

interface ProjectCardProps {
  project: {
    image: string;
    link: string;
  };
  dictionary: {
    title: string;
    tags: string[];
    see_more: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, dictionary }) => (
  // MODIFICATION: Adjusted flex-basis for better responsiveness
  <motion.div
    className="flex-[0_0_90%] sm:flex-[0_0_80%] md:flex-[0_0_45%] lg:flex-[0_0_31%] mx-2 sm:mx-4"
    whileHover={{ scale: 1.03, y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className="flex flex-col h-full p-6 sm:p-8 rounded-[35px] bg-gradient-to-b from-[#1B1B1B] to-[#1E1E1E] shadow-[0px_5px_5px_rgba(0,0,0,0.25),inset_0px_0px_7px_rgba(255,255,255,0.05)]">
      <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6">
        <Image
          src={project.image}
          alt={dictionary.title}
          fill
          className="object-cover"
          quality={95}
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 45vw, 31vw"
        />
      </div>
      <h3 className="text-stone-300 text-xl sm:text-2xl font-semibold mb-4">
        {dictionary.title}
      </h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {dictionary.tags.map((tag: string) => (
          <span
            key={tag}
            className="px-3 py-1 text-sm font-medium text-stone-300 bg-gradient-to-r from-red-700/20 to-rose-950/20 rounded-full border-2 border-red-800/50"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-stone-300 text-lg font-medium hover:text-header-gradient transition-colors"
        >
          {dictionary.see_more}
          <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  </motion.div>
);

const PrevButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => (
  // MODIFICATION: Hide button on mobile, show on sm and up
  <button
    className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-0 sm:-left-12 z-10 w-12 h-12 rounded-full bg-global-1/80 border border-stone-700 items-center justify-center text-white disabled:opacity-30 hover:bg-stone-800 transition-colors"
    {...props}
  >
    <FaArrowLeft size={20} />
  </button>
);

const NextButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => (
  // MODIFICATION: Hide button on mobile, show on sm and up
  <button
    className="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-0 sm:-right-12 z-10 w-12 h-12 rounded-full bg-global-1/80 border border-stone-700 items-center justify-center text-white disabled:opacity-30 hover:bg-stone-800 transition-colors"
    {...props}
  >
    <FaArrowRight size={20} />
  </button>
);

type PortfolioProps = {
  dictionary: {
    title: string;
    subtitle: string;
    see_more: string;
    projects: { title: string; tags: string[] }[];
  };
};

export const Portfolio: React.FC<PortfolioProps> = ({ dictionary }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const targetRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsive(); // MODIFICATION: Use hook

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // MODIFICATION: Lighten parallax on mobile
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0px", "0px"] : ["150px", "-150px"]
  );

  return (
    <section id="projetos" className="py-24 sm:py-32" ref={targetRef}>
      {/* MODIFICATION: Added px-0 to allow carousel to bleed to edges on mobile */}
      <motion.div
        className="max-w-6xl mx-auto flex flex-col items-center gap-12 md:gap-16"
        style={{ x }}
      >
        <motion.div
          className="text-center px-4" // Add padding back here
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-global-2 leading-tight">
            {dictionary.title}
          </h2>
          <p className="font-poppins font-light text-xl sm:text-2xl text-global-1 mt-2 max-w-3xl">
            {dictionary.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="relative w-full"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* The sm:px-16 provides space for the desktop buttons */}
          <div className="overflow-hidden sm:px-16" ref={emblaRef}>
            <div className="flex py-4 -ml-4">
              {projectsData.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  dictionary={{
                    ...dictionary.projects[index],
                    see_more: dictionary.see_more,
                  }}
                />
              ))}
            </div>
          </div>
          <PrevButton onClick={scrollPrev} />
          <NextButton onClick={scrollNext} />
        </motion.div>
      </motion.div>
    </section>
  );
};

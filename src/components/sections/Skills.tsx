"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useResponsive from "@/hooks/useResponsive";
import {
  SiCplusplus,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPython,
  SiGnubash,
  SiTypescript,
  SiAssemblyscript,
  SiReact,
  SiTailwindcss,
  SiDotnet,
  SiNodedotjs,
  SiDjango,
  SiFlask,
  SiElectron,
  SiExpress,
  SiNextdotjs,
  SiSqlite,
  SiMysql,
  SiOracle,
  SiPostgresql,
  SiAmazonwebservices,
  SiKubernetes,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { FaC } from "react-icons/fa6";

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const languages: Skill[] = [
  { name: "C++", icon: SiCplusplus },
  { name: "C", icon: FaC },
  { name: "JavaScript", icon: SiJavascript },
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss3 },
  { name: "Python", icon: SiPython },
  { name: "Shell", icon: SiGnubash },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Assembly", icon: SiAssemblyscript },
];

const technologies: Skill[] = [
  { name: "React", icon: SiReact },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: ".NET", icon: SiDotnet },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Django", icon: SiDjango },
  { name: "Flask", icon: SiFlask },
  { name: "Electron", icon: SiElectron },
  { name: "Express.js", icon: SiExpress },
  { name: "Next.js", icon: SiNextdotjs },
];

const databases: Skill[] = [
  { name: "SQLite", icon: SiSqlite },
  { name: "MySQL", icon: SiMysql },
  { name: "Oracle", icon: SiOracle },
  { name: "PostgreSQL", icon: SiPostgresql },
];

const devops: Skill[] = [
  { name: "AWS", icon: SiAmazonwebservices },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Docker", icon: SiDocker },
  { name: "Git", icon: SiGit },
];

const SkillPill: React.FC<{ skill: Skill }> = ({ skill }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      // MODIFICATION: Reduced height and padding for a smaller card
      className="flex items-center gap-2 h-12 px-4 rounded-full border-2 border-rose-700 bg-gradient-to-r from-red-700/20 to-rose-950/20 shadow-md"
      // MODIFICATION: Softer hover animation with less movement
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* MODIFICATION: Slightly smaller icon */}
      <Icon className="text-lg sm:text-xl text-stone-300" />
      {/* MODIFICATION: Smaller font size */}
      <span className="font-medium text-white text-base leading-relaxed whitespace-nowrap">
        {skill.name}
      </span>
    </motion.div>
  );
};

const SkillCategory: React.FC<{ title: string; skills: Skill[] }> = ({
  title,
  skills,
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-zinc-900/60 to-stone-900/60 p-6 sm:p-8 rounded-[40px] shadow-[0px_4px_4px_rgba(0,0,0,0.25),inset_0px_0px_7px_rgba(255,255,255,0.05)]">
      <h3 className="text-stone-300 text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center sm:text-left">
        {title}
      </h3>
      {/* MODIFICATION: Adjusted gap for smaller cards */}
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        {skills.map((skill) => (
          <SkillPill key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
};

type SkillsProps = {
  dictionary: {
    title: string;
    subtitle: string;
    languages_title: string;
    tech_title: string;
    databases_title: string;
    devops_title: string;
  };
};

export const Skills: React.FC<SkillsProps> = ({ dictionary }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsive();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0px", "0px"] : ["-150px", "150px"]
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
    <section id="habilidades" className="py-24 sm:py-32 px-4" ref={targetRef}>
      <motion.div
        className="max-w-6xl mx-auto flex flex-col items-center gap-8 md:gap-12"
        style={{ x }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-global-2 leading-tight">
            {dictionary.title}
          </h2>
          <p className="font-poppins font-light text-xl sm:text-2xl text-global-1 mt-2 max-w-3xl">
            {dictionary.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="w-full space-y-8 md:space-y-12"
          variants={itemVariants}
        >
          <SkillCategory
            title={dictionary.languages_title}
            skills={languages}
          />
          <SkillCategory title={dictionary.tech_title} skills={technologies} />
          <SkillCategory
            title={dictionary.databases_title}
            skills={databases}
          />
          <SkillCategory title={dictionary.devops_title} skills={devops} />
        </motion.div>
      </motion.div>
    </section>
  );
};

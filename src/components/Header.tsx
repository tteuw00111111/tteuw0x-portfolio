"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

type HeaderDictionary = {
  home: string;
  about: string;
  skills: string;
  projects: string;
  curriculum: string;
  contact: string;
};

export const Header: React.FC<{
  lang: Locale;
  dictionary: HeaderDictionary;
}> = ({ lang, dictionary }) => {
  const pathName = usePathname();
  const [activeSection, setActiveSection] = useState("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const menuItems = useMemo(
    () => [
      { id: "inicio", label: dictionary.home, href: "#inicio" },
      { id: "sobre", label: dictionary.about, href: "#sobre" },
      { id: "habilidades", label: dictionary.skills, href: "#habilidades" },
      { id: "projetos", label: dictionary.projects, href: "#projetos" },
      { id: "curriculo", label: dictionary.curriculum, href: "#curriculo" },
      { id: "contato", label: dictionary.contact, href: "#contato" },
    ],
    [dictionary]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [menuItems]);

  // Effect to disable body scrolling when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#1e1e1e]/80 backdrop-blur-lg">
      <div className="relative flex justify-between items-center w-full px-4 sm:px-8 lg:px-[70px] py-4">
        <h1
          className="text-header-gradient font-poppins font-bold
               text-xl sm:text-2xl lg:text-3xl"
        >
          <Link href="#inicio">&lt;tteuw0x&gt;</Link>
        </h1>

        <button
          className="md:hidden p-2 text-global-2 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        <nav
          className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          role="menubar"
        >
          <div className="flex gap-8 lg:gap-[54px] items-center">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`font-poppins font-semibold text-lg md:text-xl transition-colors duration-300 whitespace-nowrap ${
                  activeSection === item.id
                    ? "text-header-gradient"
                    : "text-global-2 hover:text-header-gradient"
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="text-global-2 font-poppins font-bold text-lg lg:text-xl transition-colors duration-300 hover:text-header-gradient">
              {lang === "pt-BR" ? (
                <Link href={redirectedPathName("en")}>EN</Link>
              ) : (
                <Link href={redirectedPathName("pt-BR")}>PT</Link>
              )}
            </div>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden fixed inset-0 z-40 bg-global-1 flex flex-col items-center justify-center"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
            role="menubar"
          >
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`w-full text-center py-4 font-poppins font-bold text-base ${
                  // Changed text-lg to text-base
                  activeSection === item.id
                    ? "text-header-gradient"
                    : "text-global-2"
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="text-global-2 font-poppins font-bold text-base py-4">
              {lang === "pt-BR" ? (
                <Link href={redirectedPathName("en")}>EN</Link>
              ) : (
                <Link href={redirectedPathName("pt-BR")}>PT</Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

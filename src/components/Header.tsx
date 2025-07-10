"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n.config";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

    return () => {
      menuItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [menuItems]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }

    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMenuOpen]);

  const navVariants: Variants = {
    hidden: {
      x: "100%",
      transition: { type: "tween", ease: "easeOut", duration: 0.3 },
    },
    visible: {
      x: 0,
      transition: { type: "tween", ease: "easeIn", duration: 0.3 },
    },
  };

  const linkContainerVariants: Variants = {
    hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const linkItemVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#1e1e1e]/80 backdrop-blur-lg">
      <div className="relative flex justify-between items-center w-full px-6 md:px-8 lg:px-12 xl:px-[70px] py-4">
        <h1 className="text-header-gradient font-poppins font-bold text-xl sm:text-2xl lg:text-2xl xl:text-3xl">
          <Link href="#inicio">&lt;tteuw0x&gt;</Link>
        </h1>

        <button
          className="md:hidden p-2 text-global-2 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <FiMenu size={28} />
        </button>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          role="menubar"
        >
          <div className="flex gap-8 lg:gap-5 xl:gap-[54px] items-center">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`font-poppins font-semibold text-lg transition-colors duration-300 whitespace-nowrap ${
                  activeSection === item.id
                    ? "text-header-gradient"
                    : "text-global-2 hover:text-header-gradient"
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="text-global-2 font-poppins font-bold text-lg transition-colors duration-300 hover:text-header-gradient">
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
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Side Panel */}
            <motion.nav
              className="md:hidden fixed top-0 bottom-0 right-0 w-4/5 max-w-sm z-50 bg-[#111111]/95 shadow-2xl flex flex-col"
              variants={navVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              role="menubar"
            >
              <div className="flex justify-end p-5">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-stone-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <FiX size={32} />
                </button>
              </div>

              <motion.div
                className="flex flex-col space-y-8 px-10 pt-16 text-right"
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {menuItems.map((item) => (
                  <motion.div key={item.id} variants={linkItemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`font-poppins font-bold text-2xl tracking-wider ${
                        activeSection === item.id
                          ? "text-header-gradient"
                          : "text-global-2"
                      }`}
                      aria-current={
                        activeSection === item.id ? "page" : undefined
                      }
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={linkItemVariants} className="pt-8">
                  <div className="text-global-2 font-poppins font-bold text-xl">
                    {lang === "pt-BR" ? (
                      <Link href={redirectedPathName("en")}>Switch to EN</Link>
                    ) : (
                      <Link href={redirectedPathName("pt-BR")}>
                        Mudar para PT
                      </Link>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

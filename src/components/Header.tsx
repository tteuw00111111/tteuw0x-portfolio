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

  // This hook correctly locks the body scroll when the menu is open.
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

  const menuContainerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

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
          <motion.nav
            // MODIFICATION: Reverted to a strong blur effect with a darker background
            className="md:hidden fixed inset-0 z-40 bg-black/75 backdrop-blur-2xl flex flex-col items-center justify-start space-y-10 pt-[40vh]"
            variants={menuContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="menubar"
          >
            {menuItems.map((item) => (
              <motion.div key={item.id} variants={menuItemVariants}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-poppins font-bold text-3xl tracking-wider ${
                    activeSection === item.id
                      ? "text-header-gradient"
                      : "text-global-2"
                  }`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div variants={menuItemVariants} className="pt-8">
              <div className="text-global-2 font-poppins font-bold text-2xl">
                {lang === "pt-BR" ? (
                  <Link href={redirectedPathName("en")}>Switch to EN</Link>
                ) : (
                  <Link href={redirectedPathName("pt-BR")}>Mudar para PT</Link>
                )}
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

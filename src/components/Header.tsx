"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const menuItems = [
  { id: "inicio", label: "Inicio", href: "#inicio" },
  { id: "sobre", label: "Sobre", href: "#sobre" },
  { id: "habilidades", label: "Habilidades", href: "#habilidades" },
  { id: "projetos", label: "Projetos", href: "#projetos" },
  { id: "curriculo", label: "Curriculo", href: "#curriculo" },
  { id: "contato", label: "Contato", href: "#contato" },
  { id: "language", label: "Language", href: "#language" },
];

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#1e1e1e]/80 backdrop-blur-lg">
      <div className="relative flex justify-between items-center w-full px-4 sm:px-8 lg:px-[70px] py-6">
        {/* Logo */}
        <h1 className="text-header-gradient font-poppins font-bold text-3xl md:text-[40px] leading-[60px]">
          <Link href="#inicio" scroll={false}>
            &lt;tteuw0x&gt;
          </Link>
        </h1>

        {}
        <button
          className="lg:hidden p-2 text-global-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {}
        <nav
          className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          role="menubar"
        >
          {" "}
          <div className="flex gap-[54px] items-center">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  font-poppins font-bold text-[24px] leading-[36px]
                  transition-colors duration-300
                  ${
                    activeSection === item.id
                      ? "text-header-gradient"
                      : "text-global-2 hover:text-header-gradient"
                  }
                `}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {}
      {isMenuOpen && (
        <nav className="lg:hidden bg-[#1e1e1e] px-4 pb-4" role="menubar">
          <div className="flex flex-col gap-4 items-start">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`w-full py-2 font-poppins font-bold text-xl ${
                  activeSection === item.id
                    ? "text-header-gradient"
                    : "text-global-2"
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;

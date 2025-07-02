// src/components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const menuItems = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre", label: "Sobre" },
  { id: "habilidades", label: "Habilidades" },
  { id: "projetos", label: "Projetos" },
  { id: "curriculo", label: "Curriculo" },
  { id: "contato", label: "Contato" },
];

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Intersection Observer to highlight the nav link on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" } // Highlights when the section is in the middle of the screen
    );

    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#1e1e1e]/80 backdrop-blur-sm py-4 px-[70px]">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <h1 className="text-header-gradient font-poppins font-bold text-[40px] leading-[60px]">
          <Link href="#inicio" scroll={false}>
            &lt;tteuw0x&gt;
          </Link>
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-global-text2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* SVG for hamburger/close icon */}
        </button>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex" role="menubar">
          <div className="flex gap-[54px] items-center">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                scroll={false} // Important for smooth scrolling
                className={`
                  font-poppins font-bold text-[24px] leading-[36px]
                  transition-colors duration-300
                  ${
                    activeSection === item.id
                      ? "text-header-gradient"
                      : "text-[#d0ccc6] hover:text-header-gradient"
                  }
                `}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            {/* Language toggle can go here */}
          </div>
        </nav>
      </div>
      {/* Mobile Menu (conditionally rendered) */}
      {isMenuOpen && (
        <nav className="lg:hidden mt-4">{/* Mobile menu items go here */}</nav>
      )}
    </header>
  );
};

export default Header;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaInstagram, FaArrowUp } from "react-icons/fa";

type FooterProps = {
  headerDictionary: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
  footerDictionary: {
    subtitle: string;
    text: string;
  };
};

export const Footer: React.FC<FooterProps> = ({
  headerDictionary,
  footerDictionary,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const navLinks = [
    { href: "#inicio", label: headerDictionary.home },
    { href: "#sobre", label: headerDictionary.about },
    { href: "#projetos", label: headerDictionary.projects },
    { href: "#contato", label: headerDictionary.contact },
  ];

  const socialLinks = [
    { href: "https://www.linkedin.com/", icon: FaLinkedin },
    { href: "https://github.com/tteuw00111111", icon: FaGithub },
    { href: "https://www.instagram.com/2tteuw", icon: FaInstagram },
  ];

  return (
    <footer className="w-full bg-[#131214] text-stone-300 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-4xl font-bold text-white">&lt;/tteuw0x&gt;</h1>
            <p className="text-stone-400">{footerDictionary.subtitle}</p>
          </div>
          <div className="flex items-center gap-8">
            <nav className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-medium hover:text-header-gradient transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-header-gradient transition-colors"
                  aria-label={social.href}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-stone-500 text-sm mt-10 pt-6 border-t border-stone-800/50">
          &copy; {currentYear} tteuw0x. {footerDictionary.text}
        </div>

        {isVisible && (
          <button
            onClick={scrollToTop}
            className="absolute -top-12 right-0 w-12 h-12 bg-red-600 rounded-md flex items-center justify-center text-white hover:bg-red-700 transition-all"
            aria-label="Go to top"
          >
            <FaArrowUp size={20} />
          </button>
        )}
      </div>
    </footer>
  );
};

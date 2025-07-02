"use client";
import React, { useState } from "react";

const Header: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Inicio");

  const menuItems = [
    { id: "inicio", label: "Inicio", href: "#inicio" },
    { id: "sobre", label: "Sobre", href: "#sobre" },
    { id: "habilidades", label: "Habilidades", href: "#habilidades" },
    { id: "projetos", label: "Projetos", href: "#projetos" },
    { id: "curriculo", label: "Curriculo", href: "#curriculo" },
    { id: "contato", label: "Contato", href: "#contato" },
    { id: "language", label: "Language", href: "#language" },
  ];

  const handleMenuClick = (itemLabel: string) => {
    setActiveMenuItem(itemLabel);
  };

  return (
    <header className="w-full pt-12 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[70px]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-6 lg:gap-0">
        {/* Logo/Brand */}
        <div className="w-full lg:w-auto">
          <h1 className="text-header-gradient font-poppins font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight lg:leading-[60px] text-left">
            &lt;tteuw0x&gt;
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-global-text2 hover:text-header-gradientStart transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav className="w-full lg:w-auto" role="menubar">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-[54px] justify-start lg:justify-center items-start lg:items-center lg:self-end">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                role="menuitem"
                onClick={() => handleMenuClick(item.label)}
                className={`
                  font-poppins font-bold text-base sm:text-lg md:text-xl lg:text-[24px] 
                  leading-tight lg:leading-[36px] text-left
                  transition-all duration-300 ease-in-out
                  hover:scale-105 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-header-gradientStart focus:ring-opacity-50
                  ${
                    activeMenuItem === item.label
                      ? "text-header-gradient"
                      : "text-global-2 hover:text-header-gradient"
                  }
                `}
                aria-current={
                  activeMenuItem === item.label ? "page" : undefined
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

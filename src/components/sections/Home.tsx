// src/components/sections/Home.tsx
import React from "react";

export const Home = () => {
  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col justify-center items-center w-full"
    >
      <div className="w-full max-w-[44%] px-4 sm:px-6 lg:px-0">
        {/* Hero Title */}
        <div className="mb-[22px]">
          <h1 className="font-poppins font-extrabold text-7xl leading-[86px] text-[#d0ccc6]">
            Matheus
            <br />
            Luna
          </h1>
        </div>
        {/* Subtitle */}
        <div className="mb-[40px]">
          <h2 className="font-poppins font-medium text-[32px] leading-[48px] text-header-gradient">
            Desenvolvedor
            <br />
            Estudante de Cibersegurança
          </h2>
        </div>
        {/* Description */}
        <div className="w-full">
          <p className="font-poppins font-medium text-[24px] leading-[26px] text-[#bab9b6]">
            Estudante de Ciência da Computação com foco em Cibersegurança...
          </p>
          <br />
          <p className="font-poppins font-medium text-[24px] leading-[26px] text-[#bab9b6]">
            Atualmente tenho aprofundado meus estudos em engenharia reversa...
          </p>
        </div>
      </div>
    </section>
  );
};

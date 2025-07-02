"use client";
import React from "react";
import Header from "@/components/Header";
const MatheusLunaPersonalPortfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col justify-start items-center gap-[162px]">
      {/* Header Component */}
      <Header />
      {/* Main Content Section */}
      <main className="flex flex-col justify-start items-start w-full max-w-[44%] px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Hero Title */}
        <div className="w-full mb-6 sm:mb-8 md:mb-12 lg:mb-[22px]">
          <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[96px] leading-tight sm:leading-tight md:leading-tight lg:leading-[86px] text-left text-[#d0ccc6]">
            Matheus
            <br />
            Luna
          </h1>
        </div>
        {/* Subtitle with Gradient */}
        <div className="w-full mb-8 sm:mb-10 md:mb-12 lg:mb-[40px]">
          <h2 className="font-poppins font-medium text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-[48px] text-left text-header-gradient">
            Desenvolvedor
            <br />
            Estudante de Cibersegurança
          </h2>
        </div>
        {/* Description Text */}
        <div className="w-full">
          <p className="font-poppins font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-[26px] text-left text-[#bab9b6]">
            Estudante de Ciência da Computação com foco em Cibersegurança, em
            segurança ofensiva, redes e Linux. Possuo conhecimento sólido em
            linguagens como C, C++ e JavaScript, além de experiência em
            exploração de vulnerabilidades, engenharia reversa e desenvolvimento
            de malware.
          </p>
          <br />
          <p className="font-poppins font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-[26px] text-left text-[#bab9b6]">
            Atualmente tenho aprofundado meus estudos em engenharia reversa,
            desenvolvimento e análise de malwares. Tenho trabalhado com
            ferramentas como IDA Pro para análise de binários e engenharia
            reversa, além de estudar Command and Control (C2), incluindo
            frameworks como Cobalt Strike, para entender melhor a comunicação e
            o controle de ameaças dentro de redes comprometidas.
          </p>
        </div>
      </main>
    </div>
  );
};
export default MatheusLunaPersonalPortfolio;

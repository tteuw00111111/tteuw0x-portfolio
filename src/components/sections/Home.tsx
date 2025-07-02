"use client";

import React from "react";
import { Terminal } from "@/components/Terminal";

export const Home = () => (
  <section
    id="inicio"
    className="min-h-screen flex items-center justify-center pt-24 lg:pt-0"
  >
    <div className="flex flex-col lg:flex-row w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-0 gap-10 lg:gap-20 items-center">
      {/* ── Left column (Content from Rocket.new) ────────────────────────── */}
      <div className="w-full lg:max-w-[44%]">
        {/* Hero title */}
        <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[96px] leading-tight lg:leading-[86px] text-global-2">
          Matheus
          <br />
          Luna
        </h1>

        {/* Subtitle (gradient) */}
        <h2 className="mt-[22px] font-poppins font-medium text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-[48px] text-header-gradient">
          Desenvolvedor
          <br />
          Estudante de Cibersegurança
        </h2>

        {/* Bio */}
        <div className="mt-[40px] space-y-4">
          <p className="font-poppins font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-[26px] text-global-1">
            Estudante de Ciência da Computação com foco em Cibersegurança, em
            segurança ofensiva, redes e Linux. Possuo conhecimento sólido em
            linguagens como C, C++ e JavaScript, além de experiência em
            exploração de vulnerabilidades, engenharia reversa e desenvolvimento
            de malware.
          </p>
          <p className="font-poppins font-medium text-base sm:text-lg md:text-xl lg:text-[24px] leading-[26px] text-global-1">
            Atualmente tenho aprofundado meus estudos em engenharia reversa,
            desenvolvimento e análise de malwares. Tenho trabalhado com
            ferramentas como IDA Pro, além de estudar Command and Control (C2) e
            frameworks como Cobalt Strike.
          </p>
        </div>
      </div>

      {/* ── Right column: animated terminal (Preserved) ────────────────── */}
      <div className="flex-1 w-full">
        <Terminal />
      </div>
    </div>
  </section>
);

export default Home;

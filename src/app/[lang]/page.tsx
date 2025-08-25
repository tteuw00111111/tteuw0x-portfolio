// src/app/[lang]/page.tsx

import { Locale } from "@/i18n.config";
import { getDictionary } from "@/get-dictionary";
import { Header } from "@/components/Header";
import { Home } from "@/components/sections/Home";
import { About } from "@/components/sections/About";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Skills } from "@/components/sections/Skills";
import { Portfolio } from "@/components/sections/Portfolio";
import { Curriculum } from "@/components/sections/Curriculum";
import { LatestArticles } from "@/components/sections/LatestArticles";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="relative">
        <AnimatedBackground>
          <Home
            dictionary={dictionary.home}
            terminalDictionary={dictionary.terminal}
          />
          <About dictionary={dictionary.about} />
          <Skills dictionary={dictionary.skills} />
          <Portfolio dictionary={dictionary.portfolio} />
          <Curriculum dictionary={dictionary.curriculum} />
          <Contact dictionary={dictionary.contact} />
          <LatestArticles lang={lang} dictionary={dictionary.latest_articles} />
        </AnimatedBackground>
        <Footer
          headerDictionary={dictionary.header}
          footerDictionary={dictionary.footer}
        />
      </main>
    </>
  );
}

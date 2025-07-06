import { Locale } from "@/i18n.config";
import { getDictionary } from "@/get-dictionary";
import { Header } from "@/components/Header";
import { Home } from "@/components/sections/Home";
import { About } from "@/components/sections/About";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Skills } from "@/components/sections/Skills";
import { Portfolio } from "@/components/sections/Portfolio";
import { Curriculum } from "@/components/sections/Curriculum";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
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
        </AnimatedBackground>
        <Footer
          headerDictionary={dictionary.header}
          footerDictionary={dictionary.footer}
        />
      </main>
    </>
  );
}

import { Locale } from "@/i18n.config";
import { getDictionary } from "@/get-dictionary";
import { Header } from "@/components/Header";
import { Home } from "@/components/sections/Home";
import { About } from "@/components/sections/About";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Skills } from "@/components/sections/Skills";

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
        </AnimatedBackground>
      </main>
    </>
  );
}

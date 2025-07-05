import { Locale } from "@/i18n.config";
import { getDictionary } from "@/get-dictionary";
import { Header } from "@/components/Header";
import { Home } from "@/components/sections/Home";
import { About } from "@/components/sections/About";

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
        <Home
          dictionary={dictionary.home}
          terminalDictionary={dictionary.terminal}
        />
        <About dictionary={dictionary.about} />
      </main>
    </>
  );
}

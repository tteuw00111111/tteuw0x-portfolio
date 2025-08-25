import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { getPublicationsByCategory, PublicationData } from "@/lib/publications";
import Link from "next/link";
import { FC } from "react";

interface CtfsPageProps {
  params: {
    lang: Locale;
  };
}

const CtfsPage: FC<CtfsPageProps> = async ({ params }) => {
  const { lang } = await params; // <-- Fix is here
  const dictionary = await getDictionary(lang);
  const ctfs = getPublicationsByCategory("ctfs");

  const ctfsByTag: { [tag: string]: PublicationData[] } = {};

  ctfs.forEach((ctf) => {
    ctf.tags.forEach((tag) => {
      if (!ctfsByTag[tag]) {
        ctfsByTag[tag] = [];
      }
      ctfsByTag[tag].push(ctf);
    });
  });

  const allTags = Object.keys(ctfsByTag);

  return (
    <>
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="relative">
        <AnimatedBackground>
          <section
            id="ctfs"
            className="flex min-h-screen w-full flex-col items-center px-4 py-24 md:px-8"
          >
            <div className="w-full max-w-5xl">
              <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-white md:text-5xl">
                  {dictionary.articles.ctfsTitle}
                </h1>
              </div>

              <div className="mb-8">
                <Link
                  href={`/${lang}/articles`}
                  className="text-header-gradient font-semibold transition-all hover:brightness-125"
                >
                  &larr; {dictionary.footer.back_to} Articles
                </Link>
              </div>

              <div className="space-y-16">
                {allTags.map((tag) => (
                  <div key={tag}>
                    <h2 className="mb-6 border-b-2 border-terminal-red pb-2 text-2xl font-semibold text-white">
                      {tag}
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {ctfsByTag[tag].map((ctf) => (
                        <Link
                          key={ctf.slug}
                          href={`/${lang}/articles/ctfs/${ctf.slug}`}
                          className="group block transform rounded-lg bg-black/20 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-black/40"
                        >
                          <p className="mb-2 text-sm text-gray-400">
                            {new Date(ctf.date).toLocaleDateString(lang, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <h2 className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-header-gradient">
                            {ctf.title}
                          </h2>
                          <p className="mb-4 text-gray-400">{ctf.excerpt}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedBackground>
        <Footer
          headerDictionary={dictionary.header}
          footerDictionary={dictionary.footer}
        />
      </main>
    </>
  );
};

export default CtfsPage;

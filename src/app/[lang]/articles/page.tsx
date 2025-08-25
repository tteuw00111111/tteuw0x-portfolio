import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import Link from "next/link";
import { FC } from "react";

interface ArticlesPageProps {
  params: {
    lang: Locale;
  };
}

const ArticlesPage: FC<ArticlesPageProps> = async ({ params }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const t = dictionary.articles;

  return (
    <>
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="relative">
        <AnimatedBackground>
          <section
            id="articles"
            className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 md:px-8"
          >
            <div className="w-full max-w-5xl text-center">
              <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                {t.title}
              </h1>
              <p className="mb-12 text-lg text-gray-300 md:text-xl">
                {t.description}
              </p>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Link
                  href={`/${lang}/articles/papers`}
                  className="group block transform rounded-lg bg-black/20 p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:bg-black/40"
                >
                  <h2 className="mb-3 text-2xl font-semibold text-header-gradient">
                    {t.papersTitle}
                  </h2>
                  <p className="text-gray-400 group-hover:text-gray-300">
                    {t.papersDescription}
                  </p>
                </Link>

                <Link
                  href={`/${lang}/articles/ctfs`}
                  className="group block transform rounded-lg bg-black/20 p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:bg-black/40"
                >
                  <h2 className="mb-3 text-2xl font-semibold text-header-gradient">
                    {t.ctfsTitle}
                  </h2>
                  <p className="text-gray-400 group-hover:text-gray-300">
                    {t.ctfsDescription}
                  </p>
                </Link>
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

export default ArticlesPage;

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { getAllPublicationSlugs, getPublicationData } from "@/lib/publications";
import Link from "next/link";
import { FC } from "react";
import { Metadata } from "next";

interface CtfPageProps {
  params: {
    slug: string;
    lang: Locale;
  };
}

// Generates page metadata (title, description) for SEO
export async function generateMetadata({
  params,
}: CtfPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ctf = await getPublicationData(slug);
  return {
    title: ctf.title,
    description: ctf.excerpt,
  };
}

// Generates all static pages at build time
export async function generateStaticParams() {
  const paths = getAllPublicationSlugs();
  return paths
    .filter((path) => path.params.category === "ctfs")
    .map((path) => ({ slug: path.params.slug }));
}

const CtfPage: FC<CtfPageProps> = async ({ params }) => {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang);
  const ctf = await getPublicationData(slug);

  return (
    <>
      <Header lang={lang} dictionary={dictionary.header} />
      <main className="relative">
        <AnimatedBackground>
          <section className="flex w-full flex-col items-center px-4 py-24 md:px-8">
            <article className="w-full max-w-4xl">
              <div className="mb-8 border-b border-gray-700 pb-8">
                <div className="mb-6">
                  <Link
                    href={`/${lang}/articles/ctfs`}
                    className="text-header-gradient font-semibold transition-all hover:brightness-125"
                  >
                    &larr; {dictionary.footer.back_to} CTF Writeups
                  </Link>
                </div>
                <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                  {ctf.title}
                </h1>
                <p className="text-gray-400">
                  {new Date(ctf.date).toLocaleDateString(lang, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div
                className="prose prose-invert max-w-none prose-h2:text-header-gradient prose-a:text-header-gradient prose-strong:text-header-gradient prose-code:text-amber-300"
                dangerouslySetInnerHTML={{ __html: ctf.contentHtml }}
              />

              <div className="mt-12 border-t border-gray-700 pt-8">
                <div className="flex flex-wrap gap-2">
                  {ctf.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-terminal-red/20 px-2 py-1 text-xs font-medium text-red-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-16 text-center">
                <Link
                  href={`/${lang}/articles/ctfs`}
                  className="inline-block rounded-md bg-terminal-red px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
                >
                  &larr; {dictionary.articles.back_to_ctfs}
                </Link>
              </div>
            </article>
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

export default CtfPage;

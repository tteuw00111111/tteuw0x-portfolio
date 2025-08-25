// src/components/sections/LatestArticles.tsx

import { getSortedPublicationsData } from "@/lib/publications";
import { Locale } from "@/i18n.config";
import Link from "next/link";
import { FC } from "react";

interface LatestArticlesProps {
  lang: Locale;
  dictionary: {
    title: string;
    view_all: string;
  };
}

export const LatestArticles: FC<LatestArticlesProps> = ({
  lang,
  dictionary,
}) => {
  const latestPosts = getSortedPublicationsData().slice(0, 3); // Get the 3 latest posts

  return (
    <section id="articles" className="w-full max-w-5xl py-20 text-center">
      <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">
        {dictionary.title}
      </h2>

      <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
        {latestPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${lang}/articles/${post.mainCategory}/${post.slug}`}
            className="group block transform rounded-lg bg-black/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-black/40"
          >
            <p className="mb-2 text-sm uppercase tracking-wider text-gray-400">
              {post.mainCategory === "papers" ? "Paper" : "CTF Writeup"}
            </p>
            <h3 className="mb-3 text-lg font-semibold text-white transition-colors group-hover:text-header-gradient">
              {post.title}
            </h3>
            <p className="text-sm text-gray-400">{post.excerpt}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href={`/${lang}/articles`}
          className="inline-block rounded-md bg-terminal-red px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
        >
          {dictionary.view_all} &rarr;
        </Link>
      </div>
    </section>
  );
};

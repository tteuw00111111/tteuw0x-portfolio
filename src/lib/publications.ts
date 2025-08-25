import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "posts");

export type PublicationData = {
  slug: string;
  mainCategory: "papers" | "ctfs";
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export type FullPublicationData = PublicationData & {
  contentHtml: string;
};

/**
 * Gets and sorts all publication data from the /posts directory.
 */
export function getSortedPublicationsData(): PublicationData[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName: string) => {
    const slug = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as Omit<PublicationData, "slug">),
    };
  });

  return allPostsData.sort((a: PublicationData, b: PublicationData) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Gets publication data filtered by a specific main category.
 * @param category - The main category to filter by ('papers' or 'ctfs').
 */
export function getPublicationsByCategory(
  category: "papers" | "ctfs"
): PublicationData[] {
  const allPosts = getSortedPublicationsData();
  return allPosts.filter((post) => post.mainCategory === category);
}

/**
 * Gets all possible slugs for dynamic routing.
 */
export function getAllPublicationSlugs() {
  const allPostsData = getSortedPublicationsData();

  return allPostsData.map((post) => {
    return {
      params: {
        category: post.mainCategory,
        slug: post.slug,
      },
    };
  });
}

/**
 * Gets the full data and content for a single publication.
 * @param slug - The slug of the publication file (without .md).
 */
export async function getPublicationData(
  slug: string
): Promise<FullPublicationData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    })
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = String(processedContent);

  return {
    slug,
    contentHtml,
    ...(matterResult.data as Omit<PublicationData, "slug">),
  };
}

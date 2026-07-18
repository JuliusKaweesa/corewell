import { createClient } from "@sanity/client";
import type { Article } from "./article-types";

const projectId = process.env.SANITY_PROJECT_ID || "aafuhqom";
const dataset = process.env.SANITY_DATASET || "production";

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-03-01",
      useCdn: true,
    })
  : null;

const articleProjection = `{
  "slug": slug.current,
  category,
  author,
  title,
  excerpt,
  publishedAt,
  "time": coalesce(readTime, "4 min read"),
  "image": mainImage.asset->url,
  "imageAlt": coalesce(mainImage.alt, title),
  "content": body
}`;

type SanityArticle = Omit<Article, "date"> & { publishedAt?: string };

function formatArticle(article: SanityArticle): Article {
  const date = article.publishedAt
    ? new Intl.DateTimeFormat("en-UG", { month: "long", year: "numeric" }).format(new Date(article.publishedAt))
    : "";

  return { ...article, date };
}

export async function getSanityArticles(): Promise<Article[]> {
  if (!client) return [];

  try {
    const result = await client.fetch<SanityArticle[]>(
      `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) ${articleProjection}`,
    );
    return result.filter(article => article.slug && article.title && article.image).map(formatArticle);
  } catch (error) {
    console.error("Sanity articles could not be loaded", error);
    return [];
  }
}

export async function getSanityArticle(slug: string): Promise<Article | null> {
  if (!client) return null;

  try {
    const result = await client.fetch<SanityArticle | null>(
      `*[_type == "article" && slug.current == $slug][0] ${articleProjection}`,
      { slug },
    );
    return result ? formatArticle(result) : null;
  } catch (error) {
    console.error(`Sanity article "${slug}" could not be loaded`, error);
    return null;
  }
}

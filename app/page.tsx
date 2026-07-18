import { SitePage } from "./site-shell";
import { getSanityArticles } from "../lib/sanity";

export default async function Home() {
  const cmsArticles = await getSanityArticles();
  return <SitePage page="home" cmsArticles={cmsArticles} />;
}

import { SitePage } from "../site-shell";
import { getSanityArticles } from "../../lib/sanity";

export default async function Page(){
  const cmsArticles = await getSanityArticles();
  return <SitePage page="articles" cmsArticles={cmsArticles}/>;
}

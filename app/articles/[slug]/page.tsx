import { ArticlePage } from "../../site-shell";
import { getSanityArticle, getSanityArticles } from "../../../lib/sanity";

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const [article,cmsArticles]=await Promise.all([getSanityArticle(slug),getSanityArticles()]);
  return <ArticlePage slug={slug} article={article} cmsArticles={cmsArticles}/>;
}

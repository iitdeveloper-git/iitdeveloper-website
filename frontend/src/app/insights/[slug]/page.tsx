import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import JsonLd from '@/components/seo/JsonLd';
import { insights } from '@/content/insights';
import { generateSEO } from '@/lib/seo';
import { siteConfig } from '@/content/site';
export function generateStaticParams(){return insights.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=insights.find((x)=>x.slug===slug);return item?generateSEO({title:item.title,description:item.summary,canonical:`/insights/${item.slug}`,ogType:'article'}):{};}
export default async function InsightPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const article=insights.find((x)=>x.slug===slug);if(!article)notFound();const schema={'@context':'https://schema.org','@type':'BlogPosting',headline:article.title,description:article.summary,datePublished:article.published,dateModified:article.updated,author:{'@type':'Organization',name:siteConfig.name},publisher:{'@type':'Organization',name:siteConfig.name},mainEntityOfPage:`${siteConfig.url}/insights/${article.slug}`};return <PageShell><JsonLd data={schema}/><article className="pb-24 pt-36"><div className="container mx-auto max-w-3xl px-4"><p className="text-sm text-secondary">IITDEVELOPER Editorial · Published {article.published} · Updated {article.updated}</p><h1 className="mt-5 text-5xl font-bold tracking-tighter sm:text-6xl">{article.title}</h1><p className="mt-6 text-xl leading-8 text-muted-foreground">{article.summary}</p><div className="prose prose-invert prose-lg mt-12 max-w-none">{article.sections.map((section)=><section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((p)=><p key={p}>{p}</p>)}</section>)}</div><div className="mt-12 rounded-2xl border border-secondary/20 bg-secondary/5 p-6"><p className="font-bold">Related service</p><Link href={article.relatedService} className="mt-2 inline-block text-secondary hover:underline">See how IITDEVELOPER approaches this work</Link></div></div></article></PageShell>}

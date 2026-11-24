import type { MetadataRoute } from 'next';
import { projects } from '@/content/portfolio';
import { siteUrl } from '@/lib/site';
export const dynamic='force-static';
export default function sitemap(): MetadataRoute.Sitemap {return ['','/world','/resume',...projects.map(p=>`/projects/${p.slug}`)].map(path=>({url:`${siteUrl}${path}/`}))}

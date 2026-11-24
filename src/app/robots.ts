import type { MetadataRoute } from 'next';
import { origin, siteUrl } from '@/lib/site';
export const dynamic='force-static';
export default function robots(): MetadataRoute.Robots{return {rules:{userAgent:'*',...(origin?{allow:'/'}:{disallow:'/'})},sitemap:`${siteUrl}/sitemap.xml`};}

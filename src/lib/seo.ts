import type { Metadata } from 'next';
import { siteUrl } from './site';
export const homeTitle = 'Pedro Silva | Business Analytics & Digital Solutions';
export const homeDescription = 'Pedro Silva’s portfolio: business analytics, process engineering, AI and automation. Explore professional experience, digital products and research projects.';
export function pageMetadata(title: string, description: string, path: string): Metadata {
 const fullTitle = path === '/' ? title : `${title} | Pedro Silva`;
 return {
  title: { absolute: fullTitle }, description, alternates: { canonical: path },
  openGraph: { type: 'website', locale: 'en_GB', siteName: 'Pedro Silva', url: `${siteUrl}${path}`, title: fullTitle, description, images: [{url: `${siteUrl}/images/og.png`, width:1200, height:630, alt:'Pedro Silva — Business, Data, Technology'}] },
  twitter: { card:'summary_large_image', title:fullTitle, description, images:[`${siteUrl}/images/og.png`] },
 };
}

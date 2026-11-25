import { Suspense } from 'react';
import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/press-start-2p/latin-400.css';
import './globals.css';
import { WorldReturn } from '@/components/WorldReturn';
import { siteUrl, origin } from '@/lib/site';
export const metadata:Metadata = {
 verification:{google:'ZZvBc5vpb1jT3uQE0qLgfhJgzQcFJobqsonwyh7DbXU'},
 metadataBase:new URL(siteUrl), title:{default:'Pedro Silva — From Operations to Intelligence',template:'%s | Pedro Silva'},
 description:'Business analytics, data, technology and process engineering. Explore the work and professional journey of Pedro Silva.',
 robots:{index:!!origin,follow:!!origin},
 openGraph:{type:'website',locale:'en_GB',siteName:'Pedro Silva',title:'Pedro Silva — From Operations to Intelligence',description:'Turning complexity into clarity.',images:[{url:`${siteUrl}/images/og.png`,width:1200,height:630,alt:'Pedro Silva — Business, Data, Technology'}]},
 twitter:{card:'summary_large_image',title:'Pedro Silva — From Operations to Intelligence',images:[`${siteUrl}/images/og.png`]},
 icons:{icon:`${process.env.NEXT_PUBLIC_BASE_PATH||''}/favicon.svg`},
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}<Suspense fallback={null}><WorldReturn/></Suspense></body></html>;}

import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { siteUrl } from '@/lib/site';
import { StructuredData } from '@/components/StructuredData';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, profile } from '@/content/portfolio';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProjectArt } from '@/components/ProjectArt';
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=projects.find(p=>p.slug===slug);if(!p)notFound();return pageMetadata(p.title,p.description,`/projects/${slug}/`);}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=projects.find(p=>p.slug===slug);if(!p)notFound();
 return <><StructuredData data={{'@context':'https://schema.org','@type':'WebPage',url:`${siteUrl}/projects/${p.slug}/`,name:p.title,description:p.description,inLanguage:'en',isPartOf:{'@id':`${siteUrl}/#website`},about:{'@type':'CreativeWork',name:p.title,description:p.description,genre:p.kind,keywords:p.tags.join(', ')}}}/><Navigation/><main id="main" className="container case-study"><Link className="text-link" href="/#work">Back to selected work</Link><p className="eyebrow">{p.category}</p><h1>{p.title}</h1><p className="lead">{p.description}</p><div className="tags"><span>{p.kind}</span>{p.tags.map(t=><span key={t}>{t}</span>)}</div><div className="actions">{p.demo&&<a className="button primary" href={p.demo} target="_blank" rel="noopener noreferrer">Visit FITZ website</a>}{p.thesis&&<a className="button primary" href={p.thesis} target="_blank" rel="noopener noreferrer">Read thesis · P.PORTO repository</a>}<a className="button secondary" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub profile</a><a className="button primary" href={`mailto:${profile.email}?subject=${encodeURIComponent('Project access request: '+p.title)}&body=${encodeURIComponent('Hello Pedro,\n\nI would like to request access to '+p.title+'.\n\nGitHub username: \nReason for requesting access: \n\nThank you.')}`}>Request project access</a></div><p className="section-footnote">Project materials are shared on request, subject to ownership and confidentiality. Include your GitHub username and the material you would like to review. Access is reviewed individually.</p><div className="case-art"><ProjectArt kind={p.image}/><p>Conceptual illustration · No confidential data shown</p></div><div className="case-sections">{p.sections.map(s=><section key={s.title}><h2>{s.title}</h2><p>{s.text}</p></section>)}</div><div className="case-next"><h2>Keep exploring.</h2>{projects.filter(q=>q.slug!==p.slug).map(q=><Link className="button secondary" key={q.slug} href={`/projects/${q.slug}/`}>{q.title}</Link>)}</div></main><Footer/></>;
}

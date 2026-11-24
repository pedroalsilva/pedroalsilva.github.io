import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/content/portfolio';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProjectArt } from '@/components/ProjectArt';
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=projects.find(p=>p.slug===slug);return {title:p?.title,description:p?.description,alternates:{canonical:`/projects/${slug}/`}};}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=projects.find(p=>p.slug===slug);if(!p)notFound();
 return <><Navigation/><main id="main" className="container case-study"><Link className="text-link" href="/#work">Back to selected work</Link><p className="eyebrow">{p.category}</p><h1>{p.title}</h1><p className="lead">{p.description}</p><div className="tags"><span>{p.kind}</span>{p.tags.map(t=><span key={t}>{t}</span>)}</div>{(p.github||p.demo)&&<div className="actions">{p.github&&<a className="button secondary" href={p.github} target="_blank" rel="noopener noreferrer">View source on GitHub</a>}{p.demo&&<a className="button primary" href={p.demo} target="_blank" rel="noopener noreferrer">Open live demo</a>}</div>}<div className="case-art"><ProjectArt kind={p.image}/><p>Conceptual illustration · No confidential data shown</p></div><div className="case-sections">{p.sections.map(s=><section key={s.title}><h2>{s.title}</h2><p>{s.text}</p></section>)}</div><div className="case-next"><h2>Keep exploring.</h2>{projects.filter(q=>q.slug!==p.slug).map(q=><Link className="button secondary" key={q.slug} href={`/projects/${q.slug}/`}>{q.title}</Link>)}</div></main><Footer/></>;
}

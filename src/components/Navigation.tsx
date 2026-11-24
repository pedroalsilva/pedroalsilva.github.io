'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { profile } from '@/content/portfolio';
import { asset } from '@/lib/site';
export function Navigation(){
 const [open,setOpen]=useState(false);
 return <header className="site-header"><div className="container nav-inner"><Link className="brand" href="/" aria-label="Pedro Silva home">PS<span>.</span></Link><nav aria-label="Main navigation" className={open?'main-nav open':'main-nav'} id="main-navigation">{['About','Experience','Work','Skills','Contact'].map(n=><Link key={n} href={`/#${n.toLowerCase()}`} onClick={()=>setOpen(false)}>{n}</Link>)}</nav><a className="resume-link" download={profile.resume ? true : undefined} href={profile.resume ? asset(profile.resume) : '/resume/'}><FileText size={15}/> {profile.resume ? 'Download resume' : 'Profile'}</a><button className="menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="main-navigation" onClick={()=>setOpen(!open)} onKeyDown={e=>{if(e.key==='Escape')setOpen(false);}}>{open?<X/>:<Menu/>}</button></div></header>;
}

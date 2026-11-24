'use client';
import Link from 'next/link';
export default function Error({reset}:{reset:()=>void}){return <main id="main" className="container case-study"><h1>Something interrupted the journey.</h1><p>Please try again, or return to the portfolio.</p><div className="actions"><button className="button primary" onClick={reset}>Try again</button><Link className="button secondary" href="/">Return home</Link></div></main>;}

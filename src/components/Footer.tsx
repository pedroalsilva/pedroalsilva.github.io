import Link from 'next/link';
export function Footer(){return <footer className="container footer"><Link className="brand" href="/">PS<span>.</span></Link><p>Thoughtfully connected. Purposefully built.</p><span>© {new Date().getFullYear()} Pedro Silva</span></footer>;}

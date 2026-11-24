'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
export function WorldReturn(){
 const pathname=usePathname();
 const visible=useSearchParams().get('from')==='world';
 if(!visible||pathname.endsWith('/world')||pathname.endsWith('/world/'))return null;
 return <aside className="world-return" aria-label="Return to exploration"><Link href="/world/" className="button primary">← Back to interactive world</Link></aside>;
}

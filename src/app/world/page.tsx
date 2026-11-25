import { pageMetadata } from '@/lib/seo';
import WorldLoader from '@/components/WorldLoader';
import { buildings } from '@/content/portfolio';
export const metadata=pageMetadata('Interactive Portfolio World','Explore Pedro Silva’s interactive campus: analytics, operations, digital products and career. Keyboard, touch and direct navigation available.','/world/');
export default function WorldPage(){return <><WorldLoader/><noscript><main className="container case-study"><h1>The connected campus</h1><p>JavaScript is needed to play. Explore the same topics below.</p>{buildings.map(b=><section key={b.id}><h2>{b.title}</h2><p>{b.description}</p><a href={`../#${b.section}`}>Explore {b.title}</a></section>)}</main></noscript></>;}

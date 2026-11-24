import WorldLoader from '@/components/WorldLoader';
import { buildings } from '@/content/portfolio';
export const metadata={alternates:{canonical:'/world/'},title:'Interactive World',description:'Explore an original pixel-art campus connecting operations, analytics, innovation and career.'};
export default function WorldPage(){return <><WorldLoader/><noscript><main className="container case-study"><h1>The connected campus</h1><p>JavaScript is needed to play. Explore the same topics below.</p>{buildings.map(b=><section key={b.id}><h2>{b.title}</h2><p>{b.description}</p><a href={`../#${b.section}`}>Explore {b.title}</a></section>)}</main></noscript></>;}

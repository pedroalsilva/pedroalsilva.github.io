import Link from 'next/link';
import { buildings, projects, appliedSolutions, experience, profile, type BuildingId } from '@/content/portfolio';
import { CareerJourney } from './CareerJourney';
export function BuildingContents({id,onNavigate}:{id:BuildingId;onNavigate:()=>void}){
 if(id==='career')return <><CareerJourney/><div className="actions"><Link className="button secondary" href="/?from=world#experience" onClick={onNavigate}>View experience</Link>{profile.resume&&<Link className="button secondary" href="/resume/?from=world" onClick={onNavigate}>View resume & download</Link>}</div></>;
 const building=buildings.find(b=>b.id===id)!;
 const project=projects.find(p=>p.slug===building.project)!;
 const solutionIndices=id==='innovation'?[0,1,2]:id==='operations'?[2]:[0];
 const career=id==='analytics'?experience[0]:id==='operations'?experience[1]:null;
 return <><div className="building-cards"><Link className="building-card" href={`/projects/${project.slug}/?from=world`} onClick={onNavigate}><span className="eyebrow">{project.kind}</span><h3>{project.title}</h3><p>{project.description}</p><span className="text-link">Read case study →</span></Link>{solutionIndices.map(i=>{const s=appliedSolutions[i];return <Link className="building-card" key={s.title} href={`/?from=world#solution-${i}`} onClick={onNavigate}><span className="eyebrow">Professional contribution · {s.context}</span><h3>{s.title}</h3><p>{s.contribution}</p><span className="text-link">View public description →</span></Link>;})}{career&&<Link className="building-card" href={`/?from=world#experience-${career.company==='adidas'?'adidas':'ewals'}`} onClick={onNavigate}><span className="eyebrow">Professional experience · {career.company}</span><h3>{career.role}</h3><p>{career.summary}</p><span className="text-link">View experience →</span></Link>}</div><div className="actions"><Link className="button secondary" href="/?from=world#work" onClick={onNavigate}>View all projects</Link></div></>;
}

'use client';
import { useRef, useState } from 'react';
import { professionalJourney, academicJourney, type JourneyEntry } from '@/content/journey';
export function CareerJourney(){
 const [selected,setSelected]=useState<JourneyEntry>(professionalJourney[professionalJourney.length-1]);
 const detail=useRef<HTMLElement>(null);
 const shortTitles:Record<string,string>={leaders:"Retail programme",adidas:"Digital & Analytics"};
 const years=Array.from({length:11},(_,i)=>2016+i);
 const lane=(entries:JourneyEntry[],label:string,kind:string)=><section className={`journey-lane ${kind}`} aria-label={label}><h3>{label}</h3><div className="journey-events">{entries.map(e=><button key={e.id} className="journey-event" style={{gridColumn:`${e.start-2016+1} / ${e.end-2016+1}`,gridRow:e.row}} aria-pressed={selected.id===e.id} aria-label={`${e.period} ${e.title} ${e.organization}`} onClick={()=>{setSelected(e);detail.current?.scrollIntoView({block:"nearest",behavior:"instant"});}}><span className="journey-period">{e.period}</span><strong>{shortTitles[e.id]||e.title}</strong><span>{e.organization}</span></button>)}</div></section>;
 return <div className="career-journey"><p className="journey-help">Select an entry to read more. The shared axis shows the years of work and study.</p>{lane(professionalJourney,'Professional experience','professional')}<div className="journey-axis" aria-hidden="true">{years.map(y=><span key={y}>{y===2026?'2026 · Now':y}</span>)}</div>{lane(academicJourney,'Academic journey','academic')}<section ref={detail} className="journey-detail" aria-live="polite"><p className="eyebrow">{selected.period} / {selected.organization}</p><h3>{selected.title}</h3><p>{selected.summary}</p></section></div>;
}

import { experience } from './portfolio';
export type JourneyEntry={id:string;title:string;organization:string;period:string;start:number;end:number;row:number;summary:string};
export const professionalJourney:JourneyEntry[]=[
 {id:'early',title:'Retail & sales',organization:'Multiple companies',period:'2016–2020',start:2016,end:2020,row:1,summary:'Earlier experience in retail and sales across multiple companies.'},
 {id:'leaders',title:'Future Leaders @ Retail',organization:'Sonae MC',period:'2020–2021',start:2020,end:2021,row:2,summary:'Retail development programme at Sonae MC.'},
 ...[...experience].reverse().map((e,i)=>({id:['analyst','ewals','adidas'][i],title:e.role,organization:e.company,period:e.period,start:[2021,2023,2025][i],end:[2023,2025,2027][i],row:i===1?2:1,summary:[e.specialty,e.summary].join('. ')})),
];
export const academicJourney:JourneyEntry[]=[
 {id:'sociology',title:'Degree in Sociology',organization:'Universidade do Minho',period:'2016–2019',start:2016,end:2019,row:1,summary:'Degree in Sociology.'},
 {id:'mba',title:'Executive MBA',organization:'Universidade Lusíada, Porto',period:'2019–2020',start:2019,end:2020,row:2,summary:'Executive MBA.'},
 {id:'management',title:'Master’s in Management and Business',organization:'Universidade do Minho',period:'2020–2022',start:2020,end:2022,row:1,summary:'Master’s in Management and Business.'},
 {id:'logistics',title:'Postgraduate Diploma in Logistics and Supply Chain Management',organization:'ISEP',period:'2022–2023',start:2022,end:2023,row:2,summary:'Postgraduate Diploma in Logistics and Supply Chain Management.'},
 {id:'engineering',title:'Master’s in Industrial Engineering and Management',organization:'ISEP',period:'2023–2025',start:2023,end:2025,row:1,summary:'Master’s in Industrial Engineering and Management.'},
];

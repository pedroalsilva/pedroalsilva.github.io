import { buildings } from '../content/portfolio';
export type Pixel = { x: number; y: number; w: number; h: number; color: string };
export const MAP_WIDTH = 800, MAP_HEIGHT = 600;
export const obstacles = buildings.map(b => ({ x: b.x - 6, y: b.y - 52, w: 172, h: 118 }));
export const entrances = buildings.map(b => ({ id: b.id, x: b.x + 80, y: b.y + 90 }));
export function mapPixels(): Pixel[] {
  const p: Pixel[] = [];
  const r = (x: number, y: number, w: number, h: number, color: string) => p.push({x,y,w,h,color});
  r(0,0,800,600,'#101f2b');
  for(let y=16;y<600;y+=24) for(let x=16;x<800;x+=24) { if((x*7+y*13)%5<2) r(x,y,3,3,'#203440'); }
  r(70,280,660,48,'#354653'); r(376,48,48,500,'#354653');
  [220,580].forEach(x=> { r(x-22,200,44,286,'#354653'); r(x-22,280,202,48,'#354653'); });
  for(let x=80;x<730;x+=24) r(x,302,12,2,'#536570');
  for(let y=60;y<550;y+=24) r(399,y,2,12,'#536570');
  r(350,256,100,96,'#60717b'); r(356,262,88,84,'#233c49'); r(366,272,68,64,'#172f3d');
  r(386,283,28,28,'#73e3c0'); r(392,289,16,16,'#193f43'); r(398,295,4,4,'#b9f5e1');
  buildings.forEach((b,i)=> {
    const x=b.x,y=b.y;
    r(x+8,y+12,170,64,'#0a1620'); r(x,y-30,160,96,'#213b4b');
    r(x,y-38,160,70,'#4a6470'); r(x+6,y-32,148,58,'#233e4e');
    r(x+12,y-26,136,46,'#2c4a59'); r(x+12,y+20,136,5,b.color);
    r(x-6,y-46,172,8,'#6c8189'); r(x-6,y-52,172,6,'#2f4d5b');
    for(let z=0;z<5;z++) {r(x+16+z*27,y-22,20,30,'#172c3a'); r(x+18+z*27,y-20,16,2,'#456577');}
    for(let z=0;z<3;z++) {r(x+16+z*48,y+38,30,16,'#0d2632');r(x+19+z*48,y+41,24,3,b.color);r(x+32+z*48,y+40,2,13,'#486675');}
    r(x+65,y+34,30,32,'#0a1b27'); r(x+70,y+38,20,28,b.color); r(x+73,y+40,14,26,'#173a42');
    r(x+60,y+66,40,6,'#829194'); r(x+56,y+72,48,6,'#4a6470');
    r(x+115,y-68,25,16,'#52707c'); r(x+120,y-74,15,6,'#839598');
    if(i===1) {r(x+66,y-84,28,26,'#51757c');r(x+73,y-92,14,8,b.color);r(x+79,y-106,2,14,'#b3d9cc');}
    if(i===2) { r(x+18,y-73,64,14,'#142c45'); for(let s=0;s<4;s++) r(x+20+s*15,y-71,12,10,'#7b98c4'); }
    if(i===0) {r(x-26,y+28,18,26,'#886e50');r(x-24,y+30,14,2,'#c7aa7b');r(x-22,y+34,2,18,'#b09368');}
    r(x+65,y+94,30,3,b.color);
  });
  const tree=(x:number,y:number)=> {r(x+10,y+18,5,16,'#6c6551');r(x+2,y+4,22,22,'#244f46');r(x+6,y-2,14,28,'#316555');r(x+8,y,8,16,'#4b8067');r(x,y+8,26,12,'#295a4d');};
  [[60,70],[90,94],[680,75],[708,100],[65,435],[90,465],[686,460],[712,430],[300,510],[470,85],[70,215],[700,230],[312,75],[480,518]].forEach(([x,y])=>tree(x,y));
  [[110,265],[323,268],[465,268],[680,265],[330,455],[460,450]].forEach(([x,y])=>{r(x,y,4,25,'#819198');r(x-4,y-4,12,6,'#b5e5cc');r(x-2,y-2,8,2,'#e5fff4');});
  [[318,365],[457,365],[310,220]].forEach(([x,y])=>{r(x,y,26,6,'#8f856e');r(x,y+8,26,4,'#6b685a');r(x+2,y+12,3,5,'#263f4a');r(x+21,y+12,3,5,'#263f4a');});
  return p;
}
export function canMove(x:number,y:number) {
  return x>=24 && x<=776 && y>=32 && y<=574 && !obstacles.some(o=>x+9>o.x && x-9<o.x+o.w && y+8>o.y && y-5<o.y+o.h);
}
export function nearestBuilding(x:number,y:number) {return entrances.find(e=>Math.hypot(e.x-x,e.y-y)<48)?.id ?? null;}

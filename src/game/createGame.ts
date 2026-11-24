import * as Phaser from 'phaser';
import { mapPixels, canMove, nearestBuilding } from './map';
import { buildings, type BuildingId } from '../content/portfolio';
export type Controls = { up:boolean; down:boolean; left:boolean; right:boolean; paused:boolean };
export type GameHandle = { destroy:()=>void; pause:(paused:boolean)=>void };
export function createGame(parent:HTMLElement, controls:Controls, onNear:(id:BuildingId|null)=>void, onReady:()=>void, initialPosition?:{x:number;y:number}):GameHandle {

 const labels=buildings.map(b=>{const el=document.createElement('div');el.className='campus-label';el.textContent=b.title;el.style.setProperty('--building-color',b.color);el.setAttribute('aria-hidden','true');parent.appendChild(el);return {b,el};});
 class Campus extends Phaser.Scene {
  player!:Phaser.GameObjects.Sprite; facing='down'; near:BuildingId|null=null; lastNear:BuildingId|null=null;
  constructor(){super('Campus');}
  create(){
   const g=this.add.graphics();for(const p of mapPixels()){g.fillStyle(parseInt(p.color.slice(1),16));g.fillRect(p.x,p.y,p.w,p.h);}g.generateTexture('campus-map',800,600);g.destroy();this.add.image(0,0,'campus-map').setOrigin(0);
   const dirs=['down','left','right','up'];
   dirs.forEach(dir=>{
    for(let frame=0;frame<4;frame++){
     const key=`player-${dir}-${frame}`; const t=this.make.graphics({x:0,y:0});
     const rect=(x:number,y:number,w:number,h:number,c:number)=>{t.fillStyle(c);t.fillRect(x,y,w,h);};
     const step=frame===1?-1:frame===3?1:0;
     rect(8,28,16,3,0x09151e);rect(10,23,5,6+step,0x9cabb5);rect(18,23,5,6-step,0x9cabb5);rect(9,29+step,7,2,0x142332);rect(17,29-step,7,2,0x142332);
     rect(9,13,15,12,0x73e3c0);rect(7,15+step,3,9,0xb6967e);rect(24,15-step,3,9,0xb6967e);rect(10,3,14,11,0xc4a087);rect(9,1,16,5,0x28303a);
     if(dir==='up'){rect(10,4,14,8,0x28303a);rect(11,15,11,8,0x315459);}else{rect(dir==='left'?10:dir==='right'?21:12,7,2,2,0x172634);if(dir==='down')rect(20,7,2,frame===2?1:2,0x172634);}
     t.generateTexture(key,32,32);t.destroy();
    }
    this.anims.create({key:`walk-${dir}`,frames:[0,1,2,3].map(i=>({key:`player-${dir}-${i}`})),frameRate:8,repeat:-1});
    this.anims.create({key:`idle-${dir}`,frames:[{key:`player-${dir}-0`},{key:`player-${dir}-2`}],frameRate:1,repeat:-1});
   });
   if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const beacon=this.add.rectangle(400,297,6,6,0xb9f5e1);this.tweens.add({targets:beacon,alpha:.35,duration:1800,yoyo:true,repeat:-1});}
   const spawn=initialPosition&&canMove(initialPosition.x,initialPosition.y)?initialPosition:{x:400,y:385};
   this.player=this.add.sprite(spawn.x,spawn.y,'player-down-0').setOrigin(.5,.8).setDepth(10);
   parent.dataset.playerX=String(spawn.x);parent.dataset.playerY=String(spawn.y);
   const resize=()=>{const width=parent.clientWidth;const height=parent.clientHeight;this.scale.resize(width,height);const zoom=Math.min(width/800,height/600);this.cameras.main.setZoom(zoom).setBounds(0,0,800,600).startFollow(this.player,true,1,1);};
   resize(); const observer=new ResizeObserver(resize);observer.observe(parent);
   this.events.once('shutdown',()=>observer.disconnect());
   this.events.on('postupdate',()=>{const c=this.cameras.main;for(const {b,el} of labels){const x=(b.x+80-c.scrollX-c.width/2)*c.zoom+c.width/2;const y=(b.y+116-c.scrollY-c.height/2)*c.zoom+c.height/2;// Captions stay anchored to the building; the camera fits the whole campus.
    el.hidden=false;
    el.style.transform=`translate(${Math.round(x)}px, ${Math.round(y)}px) translate(-50%, -50%)`;el.dataset.near=String(this.near===b.id);}});
   this.game.canvas.setAttribute('aria-hidden','true');onReady();
  }
  update(_time:number,delta:number){
   if(!this.player)return;
   if(controls.paused || document.hidden){this.player.anims.stop();return;}
   let dx=Number(controls.right)-Number(controls.left);
   let dy=Number(controls.down)-Number(controls.up);
   if(dx||dy){if(Math.abs(dx)>0)this.facing=dx>0?'right':'left';else this.facing=dy>0?'down':'up';const norm=Math.hypot(dx,dy);dx/=norm;dy/=norm;const distance=125*Math.min(delta,40)/1000;
    const x=this.player.x+dx*distance,y=this.player.y+dy*distance;if(canMove(x,this.player.y))this.player.x=x;if(canMove(this.player.x,y))this.player.y=y;
    this.player.play(`walk-${this.facing}`,true);
   }else this.player.play(`idle-${this.facing}`,true);
   this.near=nearestBuilding(this.player.x,this.player.y);if(this.near!==this.lastNear){this.lastNear=this.near;onNear(this.near);}
   // Inspectable state supports deterministic browser QA without a global game handle.
   parent.dataset.playerX=String(Math.round(this.player.x));parent.dataset.playerY=String(Math.round(this.player.y));
  }
 }
 const game=new Phaser.Game({type:Phaser.CANVAS,parent,width:parent.clientWidth,height:parent.clientHeight,backgroundColor:'#101f2b',pixelArt:true,roundPixels:true,antialias:false,banner:false,input:{keyboard:false},audio:{noAudio:true},scene:Campus,fps:{target:60,forceSetTimeOut:false}});
 return {destroy:()=>{labels.forEach(({el})=>el.remove());game.destroy(true);},pause:(paused)=>{controls.paused=paused;if(paused){game.scene.pause('Campus');game.loop.sleep();}else{game.loop.wake();game.scene.resume('Campus');}}};
}

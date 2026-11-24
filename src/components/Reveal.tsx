'use client';
import { motion, useReducedMotion } from 'motion/react';
export function Reveal({children,className=''}:{children:React.ReactNode;className?:string}){
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={false} whileInView={reduce?{}:{y:[10,0]}} viewport={{once:true,amount:0.1}} transition={{duration:0.25}}>{children}</motion.div>;
}

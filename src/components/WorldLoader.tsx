'use client';
import dynamic from 'next/dynamic';
const World=dynamic(()=>import('./World'),{ssr:false,loading:()=> <main id="main" className="game-loading"><h1>Preparing your campus.</h1><p>A different route through operations, data and technology.</p><a className="button secondary" href="../">Back to portfolio</a></main>});
export default World;

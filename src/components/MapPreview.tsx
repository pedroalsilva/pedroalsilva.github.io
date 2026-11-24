import { mapPixels } from '@/game/map';
import { buildings } from '@/content/portfolio';
export function MapPreview({ labels = false }: { labels?: boolean }) {
 return <svg viewBox="0 0 800 600" role="img" aria-label="Original pixel-art campus: four buildings connected by paths around a central plaza" shapeRendering="crispEdges">
  {mapPixels().map((p,i)=><rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} fill={p.color}/>)}
  {labels && buildings.map(b=><g key={b.id}><rect x={b.x-12} y={b.y+104} width="184" height="26" fill="#0b111b"/><text x={b.x+80} y={b.y+122} fill={b.color} textAnchor="middle" fontFamily="monospace" fontSize="12" letterSpacing="2">{b.short}</text></g>)}
  <g><rect x="396" y="365" width="12" height="6" fill="#07141d"/><rect x="396" y="345" width="12" height="10" fill="#b7977f"/><rect x="394" y="342" width="16" height="5" fill="#18242f"/><rect x="394" y="354" width="16" height="13" fill="#73e3c0"/><rect x="396" y="367" width="4" height="6" fill="#9caebb"/><rect x="404" y="367" width="4" height="6" fill="#9caebb"/></g>
 </svg>;
}

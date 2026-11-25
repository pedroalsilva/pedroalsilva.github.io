import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canMove, entrances, nearestBuilding, obstacles } from '../src/game/map';
import { projects, buildings, experience } from '../src/content/portfolio';
test('collision prevents entry into all buildings but permits door approaches',()=>{for(const o of obstacles){assert.equal(canMove(o.x+80,o.y+40),false);}for(const e of entrances){assert.equal(canMove(e.x,e.y),true);assert.equal(nearestBuilding(e.x,e.y),e.id);}assert.equal(canMove(-1,300),false);assert.equal(canMove(400,385),true);});
test('every building and featured card resolves to actual content',()=>{assert.equal(new Set(projects.map(p=>p.slug)).size,projects.length);for(const b of buildings)if(b.project)assert.ok(projects.some(p=>p.slug===b.project));for(const p of projects)assert.deepEqual(p.sections.map(s=>s.title).filter(t=>t!=='My contribution'),['Challenge','Approach','Solution','Technology','Impact','Learnings']);assert.ok(experience.length>=2);});

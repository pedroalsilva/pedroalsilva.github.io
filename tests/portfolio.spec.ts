import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const errors:string[]=[];
test.beforeEach(async({page})=>{errors.length=0;page.on('pageerror',e=>errors.push(e.message));});
test.afterEach(()=>expect(errors).toEqual([]));
test('home, every case study, resume and internal links work',async({page})=>{
 await page.goto('/');await expect(page.getByRole('heading',{name:'Pedro Silva.'})).toBeVisible();
 const links=await page.locator('a[href^="/"]').evaluateAll(nodes=>Array.from(new Set(nodes.map(n=>n.getAttribute('href')!))));
 for(const href of links){const response=await page.request.get(href.split('#')[0]||'/');expect(response.status(),href).toBe(200);}
 for(const slug of ['retail-forecasting','offshore-logistics','fitz']){await page.goto(`/projects/${slug}/`);for(const h of ['Challenge','Approach','Solution','Technology','Impact','Learnings'])await expect(page.getByRole('heading',{name:h,exact:true})).toBeVisible();}
 await page.goto('/resume/');await expect(page.getByRole('link',{name:'Download resume PDF',exact:true})).toBeVisible();
});
for(const width of [320,375,768,1024,1440]) test(`no overflow at ${width}px, home and world`,async({page})=>{
 await page.setViewportSize({width,height:900});for(const route of ['/','/projects/fitz/','/world/']){await page.goto(route);if(route==='/world/')await expect(page.getByText('Campus ready',{exact:true})).toBeAttached();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),route).toBe(true);}
 if(width===375){await page.goto('/');await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Work',exact:true}).click();await expect(page).toHaveURL(/#work/);await expect(page.getByRole('button',{name:'Open menu',exact:true})).toBeVisible();}
});
test('accessible home, case study and world dialog',async({page})=>{
 for(const path of ['/','/projects/retail-forecasting/','/world/']){await page.goto(path);if(path==='/world/'){await page.getByRole('button',{name:'Analytics Lab',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();}const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(results.violations).toEqual([]);}
});
test('game initializes, moves, collides, interacts and preserves player position',async({page})=>{
 await page.goto('/world/');await expect(page.getByText('Campus ready',{exact:true})).toBeAttached();await page.getByRole('button',{name:'Start exploring',exact:true}).click();const canvas=page.getByRole('group',{name:/Campus game/});await canvas.focus();
 const y=Number(await canvas.getAttribute('data-player-y'));await page.keyboard.down('ArrowUp');await expect.poll(async()=>Number(await canvas.getAttribute('data-player-y')),{timeout:10000}).toBeLessThanOrEqual(305);await page.keyboard.up('ArrowUp');expect(Number(await canvas.getAttribute('data-player-y'))).toBeLessThan(y-35);
 // Walk to the upper right building's entrance, then up into its wall.
 await page.keyboard.down('ArrowRight');await expect.poll(async()=>Number(await canvas.getAttribute('data-player-x')),{timeout:10000,intervals:[16]}).toBeGreaterThanOrEqual(575);await page.keyboard.up('ArrowRight');await page.keyboard.down('ArrowUp');await expect.poll(async()=>Number(await canvas.getAttribute('data-player-y')),{timeout:10000,intervals:[16]}).toBeLessThanOrEqual(225);await page.waitForTimeout(200);await page.keyboard.up('ArrowUp');
 const x=Number(await canvas.getAttribute('data-player-x')),stoppedY=Number(await canvas.getAttribute('data-player-y'));expect(x).toBeGreaterThan(550);expect(x).toBeLessThan(620);expect(stoppedY).toBeGreaterThanOrEqual(220);expect(stoppedY).toBeLessThan(245);
 await page.keyboard.press('e');await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('heading',{name:'Analytics Lab',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();await expect(canvas).toBeFocused();expect(Number(await canvas.getAttribute('data-player-y'))).toBe(stoppedY);
 for(const name of ['Operations Hub','Analytics Lab','Innovation Studio','Career Archive']){const button=page.getByRole('button',{name,exact:true});await button.click();await expect(page.getByRole('heading',{name,exact:true})).toBeVisible();await page.keyboard.press('Tab');await expect(page.getByRole('dialog').locator(':focus')).toHaveCount(1);await page.keyboard.press('Escape');await expect(button).toBeFocused();}
 await page.getByRole('link',{name:'Back to portfolio',exact:true}).click();await expect(page.locator('canvas')).toHaveCount(0);await page.getByRole('link',{name:'Enter my world',exact:true}).click();await expect(page.locator('canvas')).toHaveCount(1);
});
test('touch controls move the character and direct menu opens content',async({page})=>{
 await page.setViewportSize({width:375,height:812});await page.goto('/world/');await expect(page.getByText('Campus ready',{exact:true})).toBeAttached();await page.getByRole('button',{name:'Start exploring',exact:true}).click();const host=page.getByRole('group',{name:/Campus game/});const before=Number(await host.getAttribute('data-player-x'));const button=page.getByRole('button',{name:'Move right',exact:true});await button.dispatchEvent('pointerdown',{pointerId:1});await page.waitForTimeout(300);await button.dispatchEvent('pointerup',{pointerId:1});expect(Number(await host.getAttribute('data-player-x'))).toBeGreaterThan(before);await page.getByRole('button',{name:'Career Archive',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();
});
test('game load failure leaves accessible alternatives usable',async({page})=>{
 await page.route('**/_next/static/chunks/*.js',async route=>{const response=await route.fetch();const body=await response.text();if(body.includes('Phaser')&&body.length>200000)await route.abort();else await route.fulfill({response,body});});
 await page.goto('/world/');await expect(page.getByText('The campus could not load.',{exact:false})).toBeVisible({timeout:20000});await page.getByRole('button',{name:'Operations Hub',exact:true}).click();await expect(page.getByRole('heading',{name:'Operations Hub',exact:true})).toBeVisible();
});
test('Phaser is absent from homepage requests; reduced motion and no-script content work',async({page,browser})=>{
 const bodies:string[]=[];page.on('response',async r=>{if(r.url().endsWith('.js'))bodies.push(await r.text());});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await page.waitForLoadState('networkidle');expect(bodies.some(b=>b.includes('Phaser')&&b.length>200000)).toBe(false);
 const context=await browser.newContext({javaScriptEnabled:false});const staticPage=await context.newPage();await staticPage.goto('http://localhost:3100/');await expect(staticPage.getByRole('heading',{name:'Pedro Silva.'})).toBeVisible();await context.close();
});

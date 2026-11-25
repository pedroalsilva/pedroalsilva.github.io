import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {projects} from '../src/content/portfolio';
for(const width of [375,1440])test(`browse all projects, skills and room links at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.goto('/');
 await expect(page.locator('#work .project-card')).toHaveCount(6);
 for(const term of ['OutSystems²','Complementary academic experience: Node-RED and MQTT for IoT integration.','Metaheuristics²'])await expect(page.locator('#skills').getByText(term,{exact:true})).toBeAttached();
 await page.locator('#work').screenshot({path:`qa/projects-expanded-${width}.png`,style:".site-header,.skip-link{visibility:hidden!important}"});
 for(const p of projects){
  await page.goto('/');await page.locator('#work').getByRole('link',{name:new RegExp(p.title.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'))}).click();
  await expect(page.getByRole('heading',{level:1})).toHaveText(p.title);await page.reload();await expect(page.getByRole('heading',{level:1})).toHaveText(p.title);
  const href=await page.getByRole('link',{name:'Request project access',exact:true}).getAttribute('href');const mail=new URL(href!);expect(mail.pathname).toBe('pedroalsilva@gmail.com');expect(mail.searchParams.get('subject')).toContain(p.title);expect(mail.searchParams.get('body')).toContain('GitHub username');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(p.slug==='malibu-ecopower'){
   await expect(page.getByText(/top three products presented/)).toBeVisible();
   expect(await page.locator('main').innerText()).not.toMatch(/e-redes|national grid|national network/i);
   const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag22aa']).analyze();expect(axe.violations).toEqual([]);
   await page.evaluate(()=>{(document.activeElement as HTMLElement)?.blur();window.scrollTo(0,0);});
   await page.screenshot({path:`qa/malibu-${width}.png`,fullPage:true,style:".site-header,.skip-link{visibility:hidden!important}"});
  }
 }
 await page.goto('/world/');await page.getByRole('button',{name:'Innovation Studio',exact:true}).click();
 await expect(page.getByRole('dialog').getByRole('heading',{name:'Malibu EcoPower',exact:true})).toBeVisible();
 await expect(page.getByRole('dialog').getByRole('heading',{name:'IoT Automated Feeder',exact:true})).toBeVisible();
});

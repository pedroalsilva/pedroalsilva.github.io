import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for(const width of [375,1440])test(`building collections and career timeline at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.goto('/world/');
 for(const name of ['Operations Hub','Analytics Lab','Innovation Studio']){
  await page.getByRole('button',{name,exact:true}).click();const dialog=page.getByRole('dialog');
  expect(await dialog.locator('.building-card').count()).toBeGreaterThan(1);
  await expect(dialog.getByRole('link',{name:'View all projects'})).toBeVisible();
  for(const link of await dialog.locator('.building-card').all()){
   const href=await link.getAttribute('href');expect(href).toContain('from=world');
   const response=await page.request.get(href!.split('#')[0]);expect(response.status()).toBe(200);
   if(href!.includes('#'))expect(await response.text()).toContain(`id="${href!.split('#')[1]}"`);
  }
  if(name==='Innovation Studio')await page.screenshot({path:`qa/rooms-${width}.png`});
  await dialog.getByRole('button',{name:'Return to campus',exact:true}).click();
 }
 await page.getByRole('button',{name:'Career Journey',exact:true}).click();const dialog=page.getByRole('dialog');
 await expect(dialog.locator('.journey-event')).toHaveCount(10);
 for(const title of ['Master’s in Management and Business','Master’s in Industrial Engineering and Management','Postgraduate Diploma in Logistics and Supply Chain Management','Executive MBA','Degree in Sociology']){const label=dialog.locator('.academic strong').filter({hasText:title});await expect(label).toHaveText(title);expect(await label.evaluate(el=>getComputedStyle(el).webkitLineClamp)).toBe('none');}
 await dialog.getByRole('button',{name:/2016–2019.*Degree in Sociology/}).click();await expect(dialog.locator('.journey-detail')).toContainText('Degree in Sociology');
 expect(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag22aa']).analyze();expect(results.violations).toEqual([]);
 await dialog.evaluate(el=>el.scrollTop=0);await page.screenshot({path:`qa/career-${width}.png`});
 await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Career Journey',exact:true})).toBeFocused();
});

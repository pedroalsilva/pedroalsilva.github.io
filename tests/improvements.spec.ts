import { test, expect } from '@playwright/test';
test('personal identity and documented applied solutions are visible', async ({page})=>{
 await page.goto('/');
 await expect(page.getByRole('heading',{level:1,name:'Pedro Silva.'})).toBeVisible();
 await page.getByRole('link',{name:'AI & automation in practice →'}).click();
 for(const title of ['Operational answers with AI','A clearer route for issues','Tools built around logistics'])await expect(page.getByRole('heading',{name:title,exact:true})).toBeVisible();
 await page.locator('#ai-automation').screenshot({path:'qa/improvements-ai.png'});
});
test('building labels remain sharp HTML and do not duplicate on remount', async ({page})=>{
 await page.goto('/world/');await expect(page.getByText('Campus ready',{exact:true})).toBeAttached();
 await expect(page.locator('.campus-label')).toHaveCount(4);
 for(const label of await page.locator('.campus-label').all()){
  expect(await label.evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(12);
  await expect(label).toBeVisible();
 }
 await page.getByRole('link',{name:'Back to portfolio'}).click();
 await expect(page.locator('.campus-label')).toHaveCount(0);
 await page.goto('/world/');await expect(page.getByText('Campus ready',{exact:true})).toBeAttached();await expect(page.locator('.campus-label')).toHaveCount(4);
});

for(const width of [320,375,768])test(`building captions fit mobile viewport at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:812});await page.goto('/world/');
 await expect(page.getByText('Campus ready',{exact:true})).toBeAttached();
 const canvas=page.locator('.game-canvas');
 for(const label of await page.locator('.campus-label').all()){
  await expect(label).toBeVisible();
  await expect.poll(async()=>{const box=await label.boundingBox();const frame=await canvas.boundingBox();return !!box&&!!frame&&box.x>=frame.x&&box.x+box.width<=frame.x+frame.width&&box.y>=frame.y&&box.y+box.height<=frame.y+frame.height;}).toBe(true);
 }
 if(width===375)await page.screenshot({path:'qa/world-mobile.png'});
});

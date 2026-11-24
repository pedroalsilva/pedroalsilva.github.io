import { test, expect } from '@playwright/test';
test('capture desktop, mobile and world review artifacts',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:'qa/home-desktop.png',fullPage:true});await page.locator('.hero').screenshot({path:'qa/hero-desktop.png'});
 await page.setViewportSize({width:375,height:812});await page.screenshot({path:'qa/home-mobile.png',fullPage:true});await page.locator('.hero').screenshot({path:'qa/hero-mobile.png'});
 await page.setViewportSize({width:1440,height:1000});await page.goto('/world/');await expect(page.getByText('Campus ready',{exact:true})).toBeAttached();await page.screenshot({path:'qa/world-desktop.png'});
 await page.getByRole('button',{name:'Analytics Lab',exact:true}).click();await page.screenshot({path:'qa/world-panel.png'});await page.getByRole('button',{name:'Close building panel'}).click();await page.setViewportSize({width:375,height:812});await page.screenshot({path:'qa/world-mobile.png'});
});

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for(const width of [375,1440])test(`start and resume exploration at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/world/');
 const start=page.getByRole('button',{name:'Start exploring',exact:true});await expect(start).toBeVisible();
 await expect(page.getByRole('button',{name:'Focus game',exact:true})).toHaveCount(0);
 await page.screenshot({path:`qa/world-start-${width}.png`});
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag22aa']).analyze();expect(axe.violations).toEqual([]);
 await start.focus();await page.keyboard.press('Enter');const host=page.getByRole('group',{name:/Campus game/});await expect(host).toBeFocused();
 await page.keyboard.down('ArrowDown');await expect.poll(async()=>Number(await host.getAttribute('data-player-y'))).toBeGreaterThan(410);await page.keyboard.up('ArrowDown');
 const position=await host.getAttribute('data-player-y');
 await page.getByRole('button',{name:'Analytics Lab',exact:true}).click();await page.getByRole('link',{name:'Explore related project'}).click();
 await expect(page).toHaveURL(/from=world/);const back=page.getByRole('link',{name:'Back to interactive world'});await expect(back).toBeVisible();await page.screenshot({path:`qa/world-return-${width}.png`});await back.click();
 await expect(page.getByText('Campus ready',{exact:true})).toBeAttached();await expect(start).toHaveCount(0);await expect(host).toHaveAttribute('data-player-y',position!);await expect(host).toBeFocused();
 await page.getByRole('button',{name:'Career Archive',exact:true}).click();await page.getByRole('link',{name:'View about'}).click();await expect(back).toBeVisible();
 await page.goBack();await expect(page.getByText('Campus ready',{exact:true})).toBeAttached();await expect(start).toHaveCount(0);await expect(host).toHaveAttribute('data-player-y',position!);
 await page.getByRole('button',{name:'Operations Hub',exact:true}).click();await page.getByRole('button',{name:'Return to campus',exact:true}).click();await expect(start).toHaveCount(0);
});
test('direct navigation remains available before starting',async({page})=>{
 await page.goto('/world/');await expect(page.getByRole('button',{name:'Start exploring'})).toBeVisible();
 await page.getByRole('button',{name:'Career Archive',exact:true}).click();await page.getByRole('button',{name:'Return to campus',exact:true}).click();await expect(page.getByRole('button',{name:'Start exploring'})).toBeVisible();
});

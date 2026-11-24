import {test,expect} from '@playwright/test';
test('held directions do not select adjacent text and release stops movement',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/world/');await page.getByRole('button',{name:'Start exploring',exact:true}).click();
 for(const selector of ['.touch-label','.dpad button','.dpad svg','.game-status p','.campus-label']){
  expect(await page.locator(selector).first().evaluate(el=>getComputedStyle(el).getPropertyValue('-webkit-user-select')||getComputedStyle(el).userSelect)).toBe('none');
 }
 const host=page.locator('.game-canvas'),button=page.getByRole('button',{name:'Move down',exact:true});
 const start=Number(await host.getAttribute('data-player-y'));await button.dispatchEvent('pointerdown',{pointerId:1,pointerType:'touch'});await page.waitForTimeout(1000);await button.dispatchEvent('pointerup',{pointerId:1,pointerType:'touch'});
 const stop=await host.getAttribute('data-player-y');expect(Number(stop)).toBeGreaterThan(start);await page.waitForTimeout(200);await expect(host).toHaveAttribute('data-player-y',stop!);expect(await page.evaluate(()=>window.getSelection()?.toString())).toBe('');
 expect(await button.evaluate(el=>el.dispatchEvent(new MouseEvent('contextmenu',{bubbles:true,cancelable:true})))).toBe(false);
 await page.getByRole('button',{name:'Move up',exact:true}).dispatchEvent('pointerdown',{pointerId:2,pointerType:'touch'});await page.waitForTimeout(150);await page.getByRole('button',{name:'Move up',exact:true}).dispatchEvent('pointercancel',{pointerId:2,pointerType:'touch'});const cancelled=await host.getAttribute('data-player-y');await page.waitForTimeout(200);await expect(host).toHaveAttribute('data-player-y',cancelled!);
 await page.getByRole('button',{name:'Career Journey',exact:true}).click();expect(await page.locator('.world-dialog p').first().evaluate(el=>getComputedStyle(el).userSelect)).not.toBe('none');
});

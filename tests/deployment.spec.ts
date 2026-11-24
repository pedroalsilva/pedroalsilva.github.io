import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

for (const route of ['/world', '/projects/retail-forecasting', '/projects/offshore-logistics', '/projects/fitz']) {
  test(`direct access and refresh: ${route}`, async ({ page }) => {
    const failed: string[] = [];
    page.on('response', response => { if (response.status() >= 400) failed.push(response.url()); });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await page.reload();
    if (route === '/world') await expect(page.getByText('Campus ready', { exact: true })).toBeAttached();
    else await expect(page.getByRole('heading', { name: 'Challenge', exact: true })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(failed).toEqual([]);
  });
}
for (const width of [375, 1440]) {
  test(`approved resume downloads intact at ${width}px`, async ({ page, request }) => {
    await page.setViewportSize({ width, height: 900 });
    const filename = 'Pedro_Silva_Resume.pdf';
    const source = await readFile(`public/documents/${filename}`);
    const response = await request.get(`/documents/${filename}`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    expect(await response.body()).toEqual(source);
    await page.goto('/');
    const links = page.getByRole('link', { name: 'Download resume', exact: true });
    await expect(links).toHaveCount(2);
    for (const link of await links.all()) {
      const event = page.waitForEvent('download');
      await link.click();
      const download = await event;
      expect(download.suggestedFilename()).toBe(filename);
      expect(await download.failure()).toBeNull();
      expect(await readFile((await download.path())!)).toEqual(source);
    }
    await page.goto('/resume/');
    const event = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download resume PDF', exact: true }).click();
    const download = await event;
    expect(download.suggestedFilename()).toBe(filename);
    expect(await readFile((await download.path())!)).toEqual(source);
    await expect(page.getByText('A downloadable resume is being prepared', { exact: false })).toHaveCount(0);
  });
}

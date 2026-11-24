import { test, expect } from '@playwright/test';
for (const width of [375, 1440]) {
  test(`portrait and approved email at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    const portrait = page.getByRole('img', { name: 'Pedro Silva smiling in a burgundy sweatshirt' });
    await portrait.scrollIntoViewIfNeeded();
    await expect(portrait).toBeVisible();
    await expect.poll(() => portrait.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    const src = await portrait.evaluate((img: HTMLImageElement) => img.currentSrc);
    expect(src).toContain(width < 640 ? '480.webp' : '800.webp');
    await expect(page.getByRole('link', { name: 'Email', exact: true })).toHaveAttribute('href', 'mailto:pedroalsilva@gmail.com');
    await page.locator('#about').screenshot({ path: `qa/phase54/about-${width}.png` });
  });
}

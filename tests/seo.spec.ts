import {test,expect} from '@playwright/test';
import {projects} from '../src/content/portfolio';
for(const path of ['/','/resume/','/world/',...projects.map(p=>`/projects/${p.slug}/`)]) {
 test(`search and share metadata: ${path}`,async({page})=>{
  await page.goto(path);
  const title=await page.title();
  const description=await page.locator('meta[name="description"]').getAttribute('content');
  expect(title).toContain('Pedro Silva');expect(description!.length).toBeGreaterThan(40);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content',title);
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content',title);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content',description!);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content',`https://pedroalsilva.github.io${path}`);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://pedroalsilva.github.io${path}`);
  if(path==='/'||path.startsWith('/projects/')){
   const data=JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
   expect(data['@context']).toBe('https://schema.org');
   if(path==='/')expect(data['@graph'].find((n:Record<string,unknown>)=>n['@type']==='Person').name).toBe('Pedro Silva');
   else expect(data.name).toBe(await page.locator('h1').innerText());
  }
 });
}

import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { mkdir, writeFile } from 'node:fs/promises';
const chrome=await launch({chromePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',chromeFlags:['--headless','--no-first-run']});
try{
 await mkdir('qa',{recursive:true});
 const results=[];
 for(const [name,path] of [['home','/'],['project','/projects/retail-forecasting/']]){
  const result=await lighthouse(`http://localhost:3100${path}`,{port:chrome.port,output:'html',onlyCategories:['performance','accessibility','best-practices','seo'],logLevel:'error'});
  await writeFile(`qa/lighthouse-${name}.html`,result.report);
  const scores=Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)]));
  results.push({page:path,scores,environment:result.lhr.environment,fetchTime:result.lhr.fetchTime,settings:result.lhr.configSettings});
  console.log(name,JSON.stringify(scores));
 }
 await writeFile('qa/lighthouse-summary.json',JSON.stringify(results,null,2));
}finally{await chrome.kill();}

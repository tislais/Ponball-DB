import { JSDOM } from 'jsdom';

export default async function processPage(html) {

  let type;

  if (html.includes('Electro-mechanical')) { 
    type = 'Electro-mechanical';
  } else if (html.includes('Solid State Electronic (SS)')) {
    type = 'Solid State Electronic';
  } else {
    type = 'Unknown';
  }
  
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const ipdbId = [...document.querySelectorAll('.linkid')].map(e => e.textContent)[0];
  
  const title = [...document.querySelectorAll('a[name]')].map(a => a.textContent).toString();

  const manufacturer = [...document.querySelectorAll(`
    body 
    > table:nth-of-type(3) 
    > tbody 
    > tr:nth-of-type(3)
    > td:nth-of-type(2)
    > span
    > a
  `)].map(t => t.textContent).toString().split(',')[0].split(' (')[0];

  const manufactureDate = [...document.querySelectorAll(`
    body 
    > table:nth-of-type(3) 
    > tbody 
    > tr:nth-of-type(4)
    > td:nth-of-type(2)
  `)].map(d => d.textContent).toString();

  const data = [
    {
      ipdbId,
      title,
      type,
      manufacturer,
      manufactureDate
    }
  ];

  return data;
}


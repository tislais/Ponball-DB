import { JSDOM } from 'jsdom';

export default async function processPage(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const name = [...document.querySelectorAll('a[name]')].map(a => a.textContent).toString();

  const manufacturer = [...document.querySelectorAll(`
    body 
    > table:nth-of-type(3) 
    > tbody 
    > tr:nth-of-type(3)
    > td:nth-of-type(2)
    > span
    > a
  `)].map(t => t.textContent).toString().split(',')[0].split(' (')[0];

  const date = [...document.querySelectorAll(`
  body 
  > table:nth-of-type(3) 
  > tbody 
  > tr:nth-of-type(4)
  > td:nth-of-type(2)
  `)].map(d => d.textContent).toString();

  const data = {
    name,
    manufacturer,
    date
  };

  return data;
}


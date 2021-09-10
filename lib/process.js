import { JSDOM } from 'jsdom';

export default async function processPage(html) {
  
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const ipdbId = [...document.querySelectorAll('.linkid')].map(e => e.textContent)[0];
  const title = [...document.querySelectorAll('a[name]')].map(a => a.textContent).toString();
  
  let type;
  let manufacturer;
  let manufactureDate;
  let production;
  let mpu;
  let theme;
  let specialty;
  let features;

  const table = [...document.querySelectorAll('table')][2];
  const rows = table.querySelectorAll('tr');

  rows.forEach(row => {
    const label = row.querySelectorAll('td:first-child')[0].textContent;
    const value = row.querySelectorAll('td')[1]?.textContent;

    if (label.includes('Type:')) {
      type = value;
    } else if (label.includes('Manufacturer:')){
      manufacturer = value;
    } else if (label.includes('Date Of Manufacture:') || label.includes('Project Date:')) {
      manufactureDate = value;
    } else if (label.includes('Production:')) {
      production = value.split(' ')[0];
    } else if (label.includes('MPU:')) {
      mpu = value;
    } else if (label.includes('Theme:')) {
      theme = value;
    } else if (label.includes('Specialty:')) {
      specialty = value;
    } else if (label.includes('Features:')) {
      features = value;
    }
  });

  console.log('theme', theme);

  const data = [
    {
      ipdbId,
      title,
      type,
      manufacturer,
      manufactureDate,
      production,
      mpu,
      theme,
      specialty,
      features
    }
  ];

  return data;
}


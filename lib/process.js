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
  let design;
  let art;
  let dotsAnimation;
  let mechanics;
  let sound;

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
    } else if (label.includes('Design')) {
      const designers = row.querySelectorAll('a');
      design = [...designers].map(n => n.textContent);
    } else if (label.includes('Art by:')) {
      const artists = row.querySelectorAll('a');
      art = [...artists].map(n => n.textContent);
    } else if (label.includes('Dots/Animation by:')) {
      const dots = row.querySelectorAll('a');
      dotsAnimation = [...dots].map(n => n.textContent);
    } else if (label.includes('Mechanics by:')) {
      const mechanicsBy = row.querySelectorAll('a');
      mechanics = [...mechanicsBy].map(n => n.textContent);
    } else if (label.includes('Sound by:')) {
      const soundBy = row.querySelectorAll('a');
      sound = [...soundBy].map(n => n.textContent);
    }
  });

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
      features,
      design,
      art,
      dotsAnimation,
      mechanics,
      sound
    }
  ];

  return data;
}


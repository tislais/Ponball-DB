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
  let software;
  let notes;
  let ruleSheets;
  const roms = [];

  const table = [...document.querySelectorAll('table')][2];
  const rows = table.querySelectorAll('tr');

  const getContributors = (row) => {
    const contributors = row.querySelectorAll('a');
    return [...contributors].map(n => n.textContent);
  };

  rows.forEach(row => {
    const label = row.querySelectorAll('td:first-child')[0].textContent;
    const value = row.querySelectorAll('td')[1]?.textContent;
    const thirdColumn = row.querySelectorAll('td:nth-of-type(3) a')[0]?.textContent;
    

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
      design = getContributors(row);
    } else if (label.includes('Art by:')) {
      art = getContributors(row);
    } else if (label.includes('Dots/Animation by:')) {
      dotsAnimation = getContributors(row);
    } else if (label.includes('Mechanics by:')) {
      mechanics = getContributors(row);
    } else if (label.includes('Sound by:')) {
      sound = getContributors(row);
    } else if (label.includes('Software by:')) {
      software = getContributors(row);
    } else if (label.includes('Notes:')) {
      notes = value;
    } else if (label.includes('Rule Sheets:')) {
      const rules = row.querySelectorAll('a');
      ruleSheets = [...rules].map(n => {
        return {
          text: n.textContent,
          link: n.href
        };
      });
    } 
    // if the row's third td === ZIP
    // return row's fourth td text and link
    else if (thirdColumn === 'ZIP') {
      const rom = row.querySelectorAll('td:nth-of-type(4) a')[0];
      roms.push({ text: rom.textContent, link: rom.href });
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
      sound,
      software,
      notes,
      ruleSheets,
      roms
    }
  ];

  return data;
}



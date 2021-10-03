import { JSDOM } from 'jsdom';

export default async function processPage(html) {
  
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const ipdbId = [...document.querySelectorAll('.linkid')].map(e => e.textContent)[0];
  const title = [...document.querySelectorAll('a[name]')].map(a => a.textContent).toString();
  
  let type;
  let manufacturer;
  let manufacturerTradeName;
  let manufacturerFirstYear;
  let manufacturerLastYear;
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
  const docs = [];
  let labels = [];

  const table = [...document.querySelectorAll('table')][2];
  const rows = table.querySelectorAll('tr');

  const getContributors = (row) => {
    const contributors = row.querySelectorAll('a');
    return [...contributors].map(n => n.textContent);
  };

  const getFiles = (file) => {
    if (!file.textContent.includes('Availability limited by copyright')) {      
      return {
        text: file.textContent,
        link: file.href
      };
    } else {
      return null;
    }
  };
  

  rows.forEach(row => {
    const label = row.querySelectorAll('td:first-child')[0].textContent.trim();
    const value = row.querySelectorAll('td')[1]?.textContent.trim();
    const thirdColumnText = row.querySelectorAll('td:nth-of-type(3)')[0]?.textContent.trim();
    const links = row.querySelectorAll('a');
    const manufacturerDateRange = value?.split('(')[1]?.split(')')[0];

    if (label.includes(':')) {
      labels = [...labels, label.split(':')[0]];
    }
    switch(label) {
      case 'Type:': 
        type = value.split('(')[0].trim();
        break;
      case 'Manufacturer:':
        manufacturer = value.split('(')[0].split('[')[0].trim();
        manufacturerTradeName = value.split(':')[1]?.slice(0, -1).trim();
        break;
      case 'Date Of Manufacture:':
        manufactureDate = value;
        break;
      case 'Project Date:':
        manufactureDate = value;
        break;
      case 'Production:':
        production = value.split(' ')[0].replace(/,/g, '');
        break;
      case 'MPU:':
        mpu = value;
        break;
      case 'Theme:':
        theme = value;
        break;
      case 'Speciality:':
        specialty = value;
        break;
      case 'Notable Features:':
        features = value;
        break;
      case 'Design by:':
        design = getContributors(row);
        break;
      case 'Art by:':
        art = getContributors(row);
        break;
      case 'Dots/Animation by:':
        dotsAnimation = getContributors(row);
        break;
      case 'Mechanics by:':
        mechanics = getContributors(row);
        break;
      case 'Sound by:':
        sound = getContributors(row);
        break;
      case 'Software by:':
        software = getContributors(row);
        break;      
      case 'Notes:':
        notes = value;
        break;
      case 'Rule Sheets:':
        ruleSheets = [...links].map(n => {
          return {
            text: n.textContent,
            link: n.href
          };
        });
        break;
      default: true;
    }

    const file = row.querySelectorAll('td:nth-of-type(4) a')[0];
    
    switch(thirdColumnText) {
      case 'ZIP': 
        roms.push(getFiles(file));
        break;
      case 'PDF':
        docs.push(getFiles(file));
        break;
      case 'TXT':
        docs.push(getFiles(file));
        break;
      default: true;
    }

    const regex = /^[0-9_-]+$/;

    if (label === 'Manufacturer:' && regex.test(manufacturerDateRange)) {      
      manufacturerFirstYear = manufacturerDateRange?.split('-')[0];
      manufacturerLastYear = manufacturerDateRange?.split('-')[1];
    }

  });  

  const data = [
    {
      ipdbId,
      title,
      type,
      manufacturer,
      manufactureDate,
      manufacturerTradeName,
      manufacturerFirstYear,
      manufacturerLastYear,
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
      roms,
      docs,
      labels
    }
  ]; 

  return data;
}


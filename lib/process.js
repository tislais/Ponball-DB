import { JSDOM } from 'jsdom';
import { getContributors, getFiles } from './processUtils.js';

export default async function processPage(html) {
  // Turn text into DOM
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Grab IPDB id and machine title
  const ipdbId = [...document.querySelectorAll('.linkid')].map(
    (e) => e.textContent
  )[0];
  const title = [...document.querySelectorAll('a[name]')]
    .map((a) => a.textContent)
    .toString();

  // Initialize variables
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
  let filesRow = 0;

  // Grab the third table
  const table = [...document.querySelectorAll('table')][2];
  // Grab its rows
  const rows = table.querySelectorAll('tr');

  // Iterate through rows to grab labels and values
  rows.forEach((row) => {
    // Store the first column as 'label'
    const label = row.querySelectorAll('td:first-child')[0].textContent.trim();
    // Store the second column as 'value'
    const value = row.querySelectorAll('td')[1]?.textContent.trim();

    // Used for rule sheets.
    const links = row.querySelectorAll('a');
    // Used for manufacturer first year and last year
    const manufacturerDateRange = value?.split('(')[1]?.split(')')[0];

    // Removes '(click to zoom)' from 'Images:' label and adds label to the labels array.
    if (label.includes(':')) {
      labels = [...labels, label.split(':')[0]];
    }

    // Store the values for each type of label
    switch (label) {
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
        production = Number(value.split(' ')[0].replace(/,/g, ''));
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
        ruleSheets = [...links].map((n) => {
          return {
            text: n.textContent,
            link: n.href,
          };
        });
        break;
      case 'Documentation:':
        filesRow++;
        break;
      case 'Service Bulletins:':
        filesRow++;
        break;
      case 'Multimedia Files:':
        filesRow++;
        break;
      default:
        true;
    }

    // Grab file data
    const file = row.querySelectorAll('td:nth-of-type(4) a')[0];

    // Store file rows as either roms or docs
    if ((label === '' && filesRow === 0) || label === 'ROMs:') {
      if (file) roms.push(getFiles(file));
    } else if ((label === '' && filesRow === 1) || label === 'Documentation:') {
      if (file) docs.push(getFiles(file));
    }

    // Split manufacturer dates into two values
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
      labels,
    },
  ];

  return data;
}

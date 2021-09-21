import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import ingest from '../lib/ingest.js';
import processPage from '../lib/process.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('gets name, date, and manufacturer via GET', async () => {

    const actual = await ingest('https://www.ipdb.org/machine.cgi?id=2845')
      .then(html => processPage(html));

    const expected = [
      {
        ipdbId: '2845',
        title: 'Theatre of Magic',
        type: 'Solid State Electronic (SS)',
        manufacturer: 'Midway Manufacturing Company, a subsidiary of WMS Industries, Incorporated, of Chicago, Illinois, USA (1988-1999) [Trade Name: Bally]',
        manufactureDate: 'March 28, 1995',
        production: '6,600',
        mpu: 'Williams WPC Security (WPC-S)',
        theme: 'Show Business - Magic',
        specialty: undefined,
        features: 'Flippers (2), Pop bumpers (3), Slingshots (2), Tiger Saw Multiball (2), Trunk Multiball (3), Trunk Multiball w/Vanish Lock (4), Magna-Save (2), Captive ball (1), Newton ball post (1), Rotating trunk with magnet, Levitating ball. Maximum 3 buy-in balls per player (operator option).',
        design: ['John Popadiuk'],
        art: ['Linda Deal (aka Doane)'],
        dotsAnimation: ['Brian Morris', 'Adam Rhine'],
        mechanics: ['Jack Skalon', 'Ernie Pizarro'],
        sound: ['Dave Zabriskie'],
        software: ['Jeff Johnson'],
        notes: 'Reportedly:Holding the left flipper when pressing the START button initiates a game of Digital Pinball.Holding down the right flipper button when pressing START reveals on the display some useful codes for the Mortal Kombat 3 video game.In John Popadiuks\' article in the July 2000 issue of GameRoom Magazine, he stated that all of the prototype games have an Up-post between the flippers (labeled "Magic Post"). Also, he stated this game originally was going to be \'The Magic of David Copperfield\' and the playfield design for this theme commenced while pursuing the license. The game was modified when the license did not happen.Per information from Dave Zabriskie, the male voice was performed by Mike Wadswoth, a good friend of his and an opera singer. The female voice was performed by Cathy Schenkelberg, an accomplished film/stage actor and comedian.',
        ruleSheets: [
          { 
            link: 'http://www.ipdb.org/rulesheets/2845/THEATRE.HTM', 
            text: 'Theatre of Magic Rulesheet Version 1.0, by Bowen Kerins'
          },
          {
            link: 'http://www.ipdb.org/rulesheets/2845/TOMGEEK.HTM', 
            text: 'Theatre of Magic Rulesheet, by GeekBoy'
          }
        ],
        roms: [
          {
            link: 'https://www.ipdb.org/files/2845/Bally_1995_Theatre_of_Magic_Export_Game_ROM_V1_3.zip',
            text: 'Export Game ROM V1.3'
          },
          {
            link: 'https://www.ipdb.org/files/2845/Bally_1995_Theatre_of_Magic_Game_ROM_V1_2.zip',
            text: 'Game ROM V1.2'
          },
          {
            link: 'https://www.ipdb.org/files/2845/Bally_1995_Theatre_of_Magic_Game_ROM_V1_4H.zip',
            text: 'Home Game ROM V1.4H'
          },
          {
            link: 'https://www.ipdb.org/files/2845/tom_06.zip',
            text: 'PinMAME Romset (0.6a)'
          },
          {
            link: 'https://www.ipdb.org/files/2845/tom_12.zip',
            text: 'PinMAME Romset (1.2X)'
          },
          {
            link: 'https://www.ipdb.org/files/2845/tom_13.zip',
            text: 'PinMAME Romset (1.3X)'
          },
          {
            link: 'https://www.ipdb.org/files/2845/Bally_1995_Theatre_of_Magic_Sound_ROM_L_2_S2_S7_.zip',
            text: 'Sound ROM L-2 [S2-S7]'
          }
        ],
        docs: [
          {
            link: 'https://www.ipdb.org/files/2845/Bally_1995_Theatre_of_Magic_Manual.pdf',
            text: 'English Manual'
          },
          {
            link: 'https://www.ipdb.org/files/2845/Bally_1995_Theatre_of_Magic_Manual_Amendments_undated_pages.pdf',
            text: 'Manual Amendments (undated pages)'
          },
          {
            link: 'https://www.ipdb.org/files/2845/Bally_1995_Theatre_of_Magic_Operator_Handbook.pdf',
            text: 'Operator Handbook'
          },
          {
            link: 'https://www.ipdb.org/files/2845/Bally_1995_Theatre_of_Magic_Parts_List.txt',
            text: 'Parts List'
          },
          {
            link: 'https://www.ipdb.org/files/2845/Bally_1995_Theatre_of_Magic_Service_Bulletin_82.pdf',
            text: 'Service Bulletin #82'
          }
        ]
      }
    ];
    
    expect(actual).toEqual(expected);
  });

});

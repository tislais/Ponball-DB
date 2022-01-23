import Machine from './models/Machine.js';
import Label from './models/Label.js';
import Manufacturer from './models/Manufacturer.js';
import Mpu from './models/Mpu.js';
import Contributor from './models/Contributor.js';
import ContributorMachine from './models/ContributorMachine.js';

export default function store(machine) {
  const storeLabels = machine[0].labels.map((label) =>
    Label.insertOrFind(label)
  );

  if (machine[0].ipdbId) {
    const storeMachine = machine.map(async (m) => {
      if (m.manufacturer) {
        const res = await Manufacturer.insertOrFind(
          m.manufacturer,
          m.manufacturerTradeName,
          m.manufacturerFirstYear,
          m.manufacturerLastYear
        );
        m.manufacturerId = res.manufacturerId;
      }

      if (m.mpu) {
        const res = await Mpu.insertOrFind(m.mpu);
        m.mpuId = res.mpuId;
      }

      // Store the machine
      const storedMachine = await Machine.insert(m);

      // Get these values from the stored machine
      const {
        machineId,
        design,
        art,
        dotsAnimation,
        mechanics,
        sound,
        software,
      } = storedMachine;

      // Store contributor and role relationship (array, string)
      const storeContributors = (contributors, role) => {
        contributors.map(async (contributor) => {
          const res = await Contributor.insertOrFind(contributor);
          await ContributorMachine.insert(res.contributorId, machineId, role);
        });
      };

      if (design) {
        storeContributors(design, 'design');
      }

      if (art) {
        storeContributors(art, 'art');
      }

      if (dotsAnimation) {
        storeContributors(dotsAnimation, 'dots_animation');
      }

      if (mechanics) {
        storeContributors(mechanics, 'mechanics');
      }

      if (sound) {
        storeContributors(sound, 'sound');
      }

      if (software) {
        storeContributors(software, 'software');
      }
    });

    return Promise.all(storeMachine, storeLabels);
  }

  return null;
}

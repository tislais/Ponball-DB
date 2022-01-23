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

      const storedMachine = await Machine.insert(m);
      const { design, art, machineId, dotsAnimation, mechanics } =
        storedMachine;

      if (design) {
        design.map(async (contributor) => {
          const res = await Contributor.insertOrFind(contributor);
          await ContributorMachine.insert(
            res.contributorId,
            machineId,
            'design'
          );
        });
      }

      if (art) {
        art.map(async (contributor) => {
          const res = await Contributor.insertOrFind(contributor);
          await ContributorMachine.insert(res.contributorId, machineId, 'art');
        });
      }

      if (dotsAnimation) {
        dotsAnimation.map(async (contributor) => {
          const res = await Contributor.insertOrFind(contributor);
          await ContributorMachine.insert(
            res.contributorId,
            machineId,
            'dots_animation'
          );
        });
      }

      if (mechanics) {
        mechanics.map(async (contributor) => {
          const res = await Contributor.insertOrFind(contributor);
          await ContributorMachine.insert(
            res.contributorId,
            machineId,
            'mechanics'
          );
        });
      }
    });

    return Promise.all(storeMachine, storeLabels);
  }

  return null;
}

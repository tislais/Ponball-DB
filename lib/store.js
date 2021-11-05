import Machine from './models/Machine.js';
import Label from './models/Label.js';
import Manufacturer from './models/Manufacturer.js';
import Mpu from './models/Mpu.js';
import Contributor from './models/Contributor.js';
import ContributorMachine from './models/ContributorMachine.js';

export default function store(machine) {

  const storeLabels = machine[0].labels.map(label => Label.insertOrFind(label));
  
  if (machine[0].ipdbId) {

    const storeMachine = machine.map(async m => {
      if (m.manufacturer) {
        const manufacturer = await Manufacturer.insertOrFind(m.manufacturer, m.manufacturerTradeName, m.manufacturerFirstYear, m.manufacturerLastYear);
        m.manufacturerId = manufacturer.manufacturerId;
      }
      
      if (m.mpu) {
        const mpu = await Mpu.insertOrFind(m.mpu);
        m.mpuId = mpu.mpuId;
      }
      
      const storedMachine = await Machine.insert(m);
      if (storedMachine.design) {
        storedMachine.design.map(async designer => {
          const contributor = await Contributor.insertOrFind(designer);
          await ContributorMachine.insert(contributor.contributorId, storedMachine.machineId, 'designer');
        });
      
      }
    });

    
    return Promise.all(storeMachine, storeLabels);
  }
  
  return null;
}


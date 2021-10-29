import Machine from './models/Machine.js';
import Label from './models/Label.js';
import Manufacturer from './models/Manufacturer.js';
import Mpu from './models/Mpu.js';

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

      Machine.insert(m);
    });
    
    return Promise.all(storeMachine, storeLabels);
  }
  
  return null;
}


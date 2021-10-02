import Machine from './models/Machine.js';
import Label from './models/Label.js';
import Manufacturer from './models/Manufacturer.js';

export default function store(machine) {
  const storeLabels = machine[0].labels.map(label => Label.insert(label));
  if (machine[0].ipdbId) {
    const storeMachine = machine.map(async m => {
      const manufacturer = await Manufacturer.insertOrFind(m.manufacturer, m.manufacturerTradeName);
      m.manufacturerId = manufacturer.manufacturerId;
      Machine.insert(m);
    });
    
    
    return Promise.all(storeMachine, storeLabels);
  }
  
  return null;
}

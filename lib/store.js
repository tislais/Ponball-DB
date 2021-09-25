import Machine from './models/Machine.js';
import Label from './models/Label.js';

export default function store(machine) {
  const storeLabels = machine[0].labels.map(label => Label.insert(label));
  const storeMachine = machine.map(m => Machine.insert(m));
  
  return Promise.all(storeMachine, storeLabels);
}

import Machine from './models/Machine.js';

export default function store(machines) {
  return Promise.all(machines.map(machine => Machine.insert(machine)));
}

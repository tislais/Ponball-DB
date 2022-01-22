import { Router } from 'express';
import Machine from '../models/Machine.js';
// import Contributor from '../models/Contributor.js';

export default Router().get('/api/v1/machines', async (req, res, next) => {
  try {
    const machines = await Machine.findAll();

    // const thing = await Promise.all(
    //   machines.map(async (m) => {
    //     m.design = await Contributor.findByMachine(m.machineId);
    //     console.log(m.design);
    //     return m;
    //   })
    // );

    // console.log('\x1b[35m%s\x1b[0m', 'whatever: ', thing);

    res.send(machines);
  } catch (err) {
    next(err);
  }
});

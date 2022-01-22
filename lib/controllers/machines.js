import { Router } from 'express';
import Machine from '../models/Machine.js';
// import Contributor from '../models/Contributor.js';

export default Router()
  .get('/api/v1/machines', async (req, res, next) => {
    try {
      const machines = await Machine.findAll();
      res.send(machines);
    } catch (err) {
      next(err);
    }
  })
  .get('/api/v1/machines/:id', async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const machine = await Machine.findByIpdbId(id);
      res.send({
        id: Number(machine.machine_id),
        ipdb: Number(machine.ipdb_id),
        title: machine.title,
        manufacturer: 'manufacturer',
        date: machine.manufacture_date,
        unitsProduced: Number(machine.production),
        mpu: 'mpu',
        design: 'design',
        art: 'art',
        dotsAnimation: 'dots_animation',
        mechanics: 'mechanics',
        sound: 'sound',
        software: 'software',
        rules: 'rule sheets',
        roms: 'roms',
        docs: 'docs',
      });
    } catch (err) {
      next(err);
    }
  });

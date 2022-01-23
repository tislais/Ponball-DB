import { Router } from 'express';
import Machine from '../models/Machine.js';
import Contributor from '../models/Contributor.js';
import Manufacturer from '../models/Manufacturer.js';
import Mpu from '../models/Mpu.js';

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
      const manufacturer = await Manufacturer.findManufacturerByMachineId(id);
      const mpu = await Mpu.findByMachine(id);
      const art = await Contributor.findByMachineAndRoleType(id, 'art');
      const design = await Contributor.findByMachineAndRoleType(id, 'design');
      const dotsAnimation = await Contributor.findByMachineAndRoleType(
        id,
        'dots_animation'
      );
      const mechanics = await Contributor.findByMachineAndRoleType(
        id,
        'mechanics'
      );

      const machineObj = {
        id: Number(machine.machine_id),
        ipdb: Number(machine.ipdb_id),
        title: machine.title,
        manufacturer: manufacturer.manufacturer_name,
        date: machine.manufacture_date,
        ...(machine.production && {
          unitsProduced: Number(machine.production),
        }),
        ...(mpu && { mpu: mpu.name }),
        ...(design.length && { design }),
        ...(art.length && { art }),
        ...(dotsAnimation.length && { dotsAnimation }),
        ...(mechanics.length && { mechanics }),
        sound: 'TBA',
        software: 'TBA',
        ...(machine.rule_sheets && { ruleSheets: machine.rule_sheets }),
        roms: machine.roms,
        docs: machine.docs,
      };

      res.send(machineObj);
    } catch (err) {
      next(err);
    }
  });

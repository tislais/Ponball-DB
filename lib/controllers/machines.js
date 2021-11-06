import { Router } from 'express';
import Machine from '../models/Machine.js';
import Contributor from '../models/Contributor.js';

export default Router() 
  .get('/api/v1/machines', async (req, res, next) => {
    try {
      const machines = await Machine.findAll();

      // map through machines and return array of contributors for each machine?
      console.log(`\x1b[35m%s\x1b[0m`, await Contributor.findByMachine(19));

      res.send(machines);
    } catch(err) {
      next(err);
    }
  })
  
;


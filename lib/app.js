import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import machinesController from './controllers/machines.js';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors());

if (app) {
  console.log('app go brr');
}

app.use(machinesController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

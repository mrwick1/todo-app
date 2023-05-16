import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './config/connectDB';
import mongoose from 'mongoose';
import userRouter from './routes/todoRoutes';
import cors from 'cors';
connectDB();
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

mongoose.connection.once('connected', () => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});

mongoose.connection.once('error', (error) => {
  console.log('error', error);
});

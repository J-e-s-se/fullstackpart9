import express from "express";
import {Response, Request, NextFunction} from "express";
import cors from "cors";

import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";
import { PatientValidationError } from "./utils";
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.status(200).end();
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (err instanceof PatientValidationError) {
    res.status(400).json({error: err.message});
  }
  next(err);
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
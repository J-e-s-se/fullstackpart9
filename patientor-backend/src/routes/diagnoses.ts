import {Router} from "express";
import diagnosesService from "../services/diagnoses";

const diagnosesRouter = Router();

diagnosesRouter.get('/', (_req, res) => {
  res.send(diagnosesService.getEntries());
});

diagnosesRouter.post('/', (_req, res) => {
  res.send('Saving a diagnosis');
});

export default diagnosesRouter;
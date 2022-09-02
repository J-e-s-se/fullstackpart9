import { Router } from "express";
import patientsService from "../services/patients";
import { toNewPatientEntry, toNewEntry } from "../utils";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientsService.getSafeEntries());
});

patientsRouter.post("/", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedPatientEntry = patientsService.addPatient(newPatientEntry);
  res.status(200).json(addedPatientEntry);
});

patientsRouter.post("/:id/entries", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newEntry = toNewEntry(req.body);
  const addedEntry = patientsService.addEntry(newEntry, req.params.id);
  res.status(200).json(addedEntry);
});

patientsRouter.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default patientsRouter;

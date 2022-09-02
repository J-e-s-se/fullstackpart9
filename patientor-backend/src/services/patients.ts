import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients";
import {
  Patient,
  SafePatient,
  NewPatient,
  EntryWithoutId as NewEntry,
  Entry,
} from "../types";

const patients: Array<Patient> = patientsData;

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const getEntries = (): Array<Patient> => {
  return patients;
};

const getSafeEntries = (): Array<SafePatient> => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => {
    return {
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
    };
  });
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw Error("patient whose entry is to be updated not found");
  }
  patient.entries.push(newEntry);
  patients.filter((p) => p.id !== patientId).concat(patient);
  return newEntry;
};

export default {
  getEntries,
  getSafeEntries,
  addPatient,
  addEntry,
  findById,
};

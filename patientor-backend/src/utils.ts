import {
  Gender,
  NewPatient,
  Diagnosis,
  EntryWithoutId as NewEntry,
  EntryType,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckRating,
} from "./types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type UnknownPatient = {
  name: unknown;
  occupation: unknown;
  gender: unknown;
  ssn?: unknown;
  dateOfBirth?: unknown;
};

export class PatientValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PatientValidationError";
  }
}

export const toNewPatientEntry = ({
  name,
  occupation,
  gender,
  ssn,
  dateOfBirth,
}: UnknownPatient): NewPatient => {
  const entry: NewPatient = {
    name: parseString(name, "name"),
    occupation: parseString(occupation, "occupation"),
    gender: parseGender(gender),
    ssn: parseString(ssn, "ssn"),
    dateOfBirth: parseDate(dateOfBirth, "dateOfBirth"),
    entries: [],
  };

  return entry;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new PatientValidationError("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseString = (text: unknown, name: string): string => {
  if (!text || !isString(text)) {
    throw new PatientValidationError(`Incorrect or missing ${name}: ${text}`);
  }

  return text;
};

const parseDate = (date: unknown, name: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new PatientValidationError(`Incorrect or missing ${name}: ${date}`);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// define our type guard for string
// type guard is a function that returns a boolean and has
// a type predicate as the return type
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// define our type guard for gender
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

type UnknownEntry = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  // diagnosisCodes?: Array<unknown>;
  diagnosisCodes: unknown;
  type: unknown;
  discharge: {
    date: unknown;
    criteria: unknown;
  };
  employerName: unknown;
  sickLeave: {
    startDate: unknown;
    endDate: unknown;
  };
  healthCheckRating: unknown;
};

export const toNewEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge,
  employerName,
  healthCheckRating,
  sickLeave,
}: UnknownEntry): NewEntry => {
  console.log("diagnosisCodes", diagnosisCodes);
  const entry: NewEntry = {
    type: parseEntryType(type),
    description: parseString(description, "description"),
    specialist: parseString(specialist, "specialist"),
    date: parseDate(date, "date"),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  } as NewEntry;

  switch (entry.type) {
    case EntryType.Hospital:
      entry.discharge = parseDischarge(discharge);
      break;
    case EntryType.HealthCheck:
      entry.healthCheckRating = parseHealthCheckRating(healthCheckRating);
      break;
    case EntryType.OccupationalHealthcare:
      entry.employerName = parseString(employerName, "employerName");
      entry.sickLeave = parseSickLeave(sickLeave);
      break;
    default:
      return assertNever(entry);
  }
  console.log("entry", entry);

  return entry;
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!entryType || !isString(entryType) || !isEntryType(entryType)) {
    throw new PatientValidationError(`Incorrect or missing type: ${entryType}`);
  }
  return entryType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (entryType: any): entryType is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(entryType);
};

const isStringArray = (anyArray: Array<unknown>): anyArray is Array<string> => {
  if (anyArray.length === 0) return false;

  return anyArray.every((value) => isString(value));
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> | undefined => {
  if (
    !diagnosisCodes ||
    !Array.isArray(diagnosisCodes) ||
    diagnosisCodes.length === 0
  ) {
    return [];
  }
  if (!isStringArray(diagnosisCodes)) {
    throw new PatientValidationError(
      `Incorrect diagnosisCodes: ${diagnosisCodes}`
    );
  }
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: {
  date: unknown;
  criteria: unknown;
}): HospitalEntry["discharge"] => {
  if (
    !discharge?.criteria ||
    !discharge?.date ||
    !isString(discharge?.criteria) ||
    !isString(discharge?.date) ||
    !isDate(discharge?.date)
  ) {
    throw new PatientValidationError(
      `Incorrect or missing discharge: ${discharge}`
    );
  }
  return {
    date: discharge.date,
    criteria: discharge.criteria,
  };
};

const parseSickLeave = (sickLeave: {
  startDate: unknown;
  endDate: unknown;
}): OccupationalHealthcareEntry["sickLeave"] => {
  console.log("sickLeave in utils", sickLeave);
  if (!sickLeave) {
    return undefined;
  }

  if (!sickLeave?.startDate || !sickLeave?.endDate) {
    return undefined;
  }
  if (
    !isString(sickLeave?.startDate) ||
    !isDate(sickLeave?.startDate) ||
    !isString(sickLeave?.endDate) ||
    !isDate(sickLeave?.endDate)
  ) {
    throw new PatientValidationError(`Incorrect sickLeave: ${sickLeave}`);
  }
  return {
    endDate: sickLeave.endDate,
    startDate: sickLeave.startDate,
  };
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new PatientValidationError(
      `Incorrect or missing healthCheckRating: ${healthCheckRating}`
    );
  }
  return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

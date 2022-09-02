import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_DETAILS";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        entry: Entry;
        id: string;
      };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case "ADD_PATIENT_DETAILS":
      return {
        ...state,
        patients_details: {
          ...state.patients_details,
          [action.payload.id]: action.payload,
        },
      };

    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };

    case "ADD_ENTRY":
      return {
        ...state,
        patients_details: {
          ...state.patients_details,
          [action.payload.id]: {
            ...state.patients_details[action.payload.id],
            entries: state.patients_details[action.payload.id].entries.concat(
              action.payload.entry
            ),
          },
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Array<Patient>): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const addPatientDetails = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT_DETAILS",
    payload: patient,
  };
};

export const setDiagnosesList = (diagnosesList: Array<Diagnosis>): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosesList,
  };
};

export const addEntry = (entry: Entry, id: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { entry, id },
  };
};

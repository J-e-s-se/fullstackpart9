import React from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import { Typography, Button } from "@mui/material";
import { Transgender, Male, Female } from "@mui/icons-material";

import {
  addEntry,
  addPatientDetails,
  setDiagnosesList,
  useStateValue,
} from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis, Gender, Entry, EntryFormValues } from "../types";
import Details from "./components/Details";
import AddEntryModal from "../AddPatientModal/AddEntryModal";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return null;
  }
  const [{ patients_details, diagnoses }, dispatch] = useStateValue();
  const patient = patients_details[id];

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  React.useEffect(() => {
    const fetchPatientDetail = async () => {
      if (id && !patient) {
        console.log("patientDetail getting fetched");
        try {
          const { data: patientDetailFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(addPatientDetails(patientDetailFromApi));
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatientDetail();
  }, [id]);

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        console.log("Diagnoses getting fetched");
        const { data: diagnosesFromApi } = await axios.get<Array<Diagnosis>>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosesList(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (Object.values(diagnoses).length === 0) {
      void fetchDiagnoses();
    }
  }, []);

  if (!patient) {
    return <div></div>;
  }

  let genderIcon = null;
  switch (patient.gender) {
    case Gender.Male:
      genderIcon = <Male />;
      break;
    case Gender.Female:
      genderIcon = <Female />;
      break;
    case Gender.Other:
      genderIcon = <Transgender />;
      break;
  }
  return (
    <div>
      <Typography variant="h4" my={2}>
        {patient.name} {genderIcon}
      </Typography>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>

      <Typography variant="h5">
        {patient.entries.length !== 0 ? "entries" : null}
      </Typography>
      {patient.entries.map((entry) => {
        return <Details key={entry.id} entry={entry} />;
      })}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};
export default PatientDetailPage;

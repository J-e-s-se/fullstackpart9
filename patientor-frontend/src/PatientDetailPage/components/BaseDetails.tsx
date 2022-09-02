import { Typography } from "@mui/material";
import { Entry } from "../../types";
import { useStateValue } from "../../state";

import { MedicalInformation, Work, MedicalServices } from "@mui/icons-material";
const BaseDetails = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  const getEntryIcon = () => {
    switch (entry.type) {
      case "OccupationalHealthcare":
        return <Work />;
      case "HealthCheck":
        return <MedicalServices />;
      case "Hospital":
        return <MedicalInformation />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Typography variant="body1">{entry.date}</Typography>
      {getEntryIcon()}
      <Typography variant="subtitle2">
        {entry.type === "OccupationalHealthcare" ? entry.employerName : null}
      </Typography>
      <Typography variant="body1">{entry.description}</Typography>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            <Typography>
              {code} {diagnoses[code]?.name}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BaseDetails;

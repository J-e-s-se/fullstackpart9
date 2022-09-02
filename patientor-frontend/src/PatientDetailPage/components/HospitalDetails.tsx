import { HospitalEntry } from "../../types";
import { Typography } from "@mui/material";
import BaseDetails from "./BaseDetails";

const HospitalDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div style={{ padding: "2px 0px", margin: "5px 0px" }}>
      <BaseDetails entry={entry} />
      <Typography variant="subtitle2">Discharge</Typography>

      <Typography>date: {entry.discharge.date}</Typography>
      <Typography>criteria: {entry.discharge.criteria}</Typography>
    </div>
  );
};

export default HospitalDetails;

import { Typography } from "@mui/material";
import React from "react";
import { OccupationalHealthcareEntry } from "../../types";
import BaseDetails from "./BaseDetails";

const OccupationalHealthcareDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <BaseDetails entry={entry} />
      {entry.sickLeave ? (
        <div>
          <Typography variant="subtitle2">Sick Leave</Typography>
          <Typography>
            Start date: {entry.sickLeave.startDate} End date:
            {entry.sickLeave.endDate}
          </Typography>
        </div>
      ) : null}
    </div>
  );
};

export default OccupationalHealthcareDetails;

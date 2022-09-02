import { Typography } from "@material-ui/core";
import { Entry, EntryType } from "../../types";
import HealthCheckDetails from "./HealthCheckDetails";
import HospitalDetails from "./HospitalDetails";
import OccupationalHealthcareDetails from "./OccupationalHealthcareDetails";

const style = {
  border: "2px solid black",
  margin: "15px 0px 0px",
  padding: "10px 5px",
  borderRadius: "10px",
};
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Details = ({ entry }: { entry: Entry }) => {
  let detailComponent = <div></div>;
  switch (entry.type) {
    case EntryType.Hospital:
      detailComponent = <HospitalDetails entry={entry} />;
      break;

    case EntryType.HealthCheck:
      detailComponent = <HealthCheckDetails entry={entry} />;
      break;

    case EntryType.OccupationalHealthcare:
      detailComponent = <OccupationalHealthcareDetails entry={entry} />;
      break;

    default:
      return assertNever(entry);
  }

  return (
    <div style={style}>
      {detailComponent}
      <Typography>diagnosed by {entry.specialist}</Typography>
    </div>
  );
};

export default Details;

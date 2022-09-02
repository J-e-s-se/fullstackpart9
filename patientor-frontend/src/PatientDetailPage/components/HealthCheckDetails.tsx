import { HealthCheckEntry, HealthCheckRating } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { green, yellow, orange, red } from "@material-ui/core/colors";
import BaseDetails from "./BaseDetails";

const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  let color = "";
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      color = green[400];
      break;

    case HealthCheckRating.LowRisk:
      color = yellow[400];
      break;

    case HealthCheckRating.HighRisk:
      color = orange[400];
      break;

    case HealthCheckRating.CriticalRisk:
      color = red[400];
      break;
  }

  return (
    <div>
      <BaseDetails entry={entry} />
      <FavoriteIcon htmlColor={color} />
    </div>
  );
};

export default HealthCheckDetails;

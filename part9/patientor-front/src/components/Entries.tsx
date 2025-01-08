import { Entry } from "../types";
import Box from "@mui/material/Box";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BadgeIcon from "@mui/icons-material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Entries = ({ entries }: { entries: Entry[] }) => {
  const renderEntries = (entries: Entry[]) => {
    return entries.map((entry) => {
      switch (entry.type) {
        case "Hospital":
          return (
            <div key={entry.id}>
              <hr />
              <LocalHospitalIcon />
              <h4>{entry.description}</h4>
              <p>{entry.date}</p>
              <ul>
                {entry.diagnosisCodes &&
                  entry.diagnosisCodes.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <div>
                <p>Discharge Date: {entry.discharge.date}</p>
                <p>Criteria: {entry.discharge.criteria}</p>
              </div>
            </div>
          );
        case "OccupationalHealthcare":
          return (
            <div key={entry.id}>
              <hr />
              <BadgeIcon />
              <h4>{entry.description}</h4>
              <p>{entry.date}</p>
              <ul>
                {entry.diagnosisCodes &&
                  entry.diagnosisCodes.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <div>
                <p>Employer: {entry.employerName}</p>
                {entry.sickLeave && (
                  <div>
                    <p>Sick Leave Start: {entry.sickLeave.startDate}</p>
                    <p>Sick Leave End: {entry.sickLeave.endDate}</p>
                  </div>
                )}
              </div>
            </div>
          );
        case "HealthCheck":
          return (
            <div key={entry.id}>
              <hr />
              <FavoriteIcon />
              <h4>{entry.description}</h4>
              <p>{entry.date}</p>
              <ul>
                {entry.diagnosisCodes &&
                  entry.diagnosisCodes.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <div>
                <p>Health Check Rating: {entry.healthCheckRating}</p>
              </div>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div>
      <Box
        component='section'
        sx={{ p: 2, border: "1px solid grey", borderRadius: 2 }}
      >
        {renderEntries(entries)}
      </Box>
    </div>
  );
};
export default Entries;

import { useEffect, useState } from "react";
import diagnosesService from "../services/diagnosesService";
import {
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import patients from "../services/patients";
import { Patient } from "../types";
import { useParams } from "react-router-dom";

const EntryForm = ({
  setPatient,
  patient,
}: {
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  patient: Patient;
}) => {
  const id = useParams<{ id: string }>().id;

  const [codes, setCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [selectedCode, setSelectedCode] = useState<string>("");
  const [hospitalCriteria, setHospitalCriteria] = useState<string>("");

  const [employerName, setEmployerName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  useEffect(() => {
    diagnosesService.getAll().then((data) => {
      const codes = data.map((diagnosis) => diagnosis.code);
      setCodes(codes);
    });
  }, []);

  const cleanInputs = () => {
    setEntryType("");
    setDate("");
    setDescription("");
    setSpecialist("");
    setSelectedCode("");
    setHospitalCriteria("");

    setEmployerName("");
    setStartDate("");
    setEndDate("");
    setHealthCheckRating(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!id) {
        console.error("Patient ID is undefined.");
        return;
      }
      patients.createEntry(id, {
        description,
        date,
        specialist,
        type: entryType,
        diagnosisCodes: [selectedCode],
        ...(entryType === "Hospital" && {
          discharge: { criteria: hospitalCriteria },
        }),
        ...(entryType === "OccupationalHealthcare" && {
          employerName,
          sickLeave: { startDate, endDate },
        }),
        ...(entryType === "HealthCheck" && { healthCheckRating }),
      });
      const updatedEntries = patient.entries?.concat({
        description,
        date,
        specialist,
        type: entryType,
        diagnosisCodes: [selectedCode],
        ...(entryType === "Hospital" && {
          discharge: { criteria: hospitalCriteria },
        }),
        ...(entryType === "OccupationalHealthcare" && {
          employerName,
          sickLeave: { startDate, endDate },
        }),
        ...(entryType === "HealthCheck" && { healthCheckRating }),
      });
      setPatient({ ...patient, entries: updatedEntries });
      cleanInputs();
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };

  return (
    <div>
      <h2>Add an Entry</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <TextField
              label='Description'
              variant='standard'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='codes-label'>Codes</InputLabel>
            <Select
              labelId='codes-label'
              id='codes-select'
              label='Codes'
              required
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
            >
              {codes.map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              id='input-with-sx'
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              variant='standard'
              sx={{ mr: 2 }}
            />
            <TextField
              type='text'
              label='Specialist'
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
              variant='standard'
              sx={{ mx: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Type</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Type'
                onChange={(e) => setEntryType(e.target.value)}
                value={entryType}
              >
                <MenuItem value={"Hospital"}>Hospital</MenuItem>
                <MenuItem value={"HealthCheck"}>HealthCheck</MenuItem>
                <MenuItem value={"OccupationalHealthcare"}>
                  Occupational Healthcare
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            {entryType === "Hospital" && (
              <TextField
                type='text'
                label='Discharge Criteria'
                variant='standard'
                value={hospitalCriteria}
                onChange={(e) => setHospitalCriteria(e.target.value)}
                sx={{ mr: 2 }}
              />
            )}
            {entryType === "OccupationalHealthcare" && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  type='text'
                  label='Employer Name'
                  variant='standard'
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  sx={{ mr: 2 }}
                />
                <div>
                  <p>Start Date</p>
                  <TextField
                    id='input-with-sx'
                    type='date'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    variant='standard'
                    sx={{ mr: 2 }}
                  />
                </div>

                <div>
                  <p>End Date</p>
                  <TextField
                    id='input-with-sx'
                    type='date'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    variant='standard'
                    sx={{ mr: 2 }}
                  />
                </div>
              </Box>
            )}
            {entryType === "HealthCheck" && (
              <TextField
                type='number'
                label='Health Check Rating'
                variant='standard'
                value={healthCheckRating}
                onChange={(e) => setHealthCheckRating(Number(e.target.value))}
                sx={{ mr: 2 }}
              />
            )}
          </Box>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default EntryForm;

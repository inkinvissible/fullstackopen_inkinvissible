import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientsService from "../services/patients";
import diagnosesService from "../services/diagnosesService";
import { Patient, Diagnosis } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Box } from "@mui/material";
import Entries from "./Entries";
import EntryForm from "./EntryForm";

const SinglePatient = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (!id) {
      setError("Patient ID is undefined.");
      return;
    }

    patientsService
      .getPatient(id)
      .then((data) => setPatient(data))
      .catch(() => setError("Error fetching patient data."));
  }, [id]);

  useEffect(() => {
    if (patient && patient.entries) {
      const uniqueDiagnosisCodes = [...new Set(
        patient.entries
          .flatMap(entry => entry.diagnosisCodes || [])
      )];

      if (uniqueDiagnosisCodes.length > 0) {
        diagnosesService.getAll()
          .then(allDiagnoses => {
            const filteredDiagnoses = allDiagnoses.filter(
              diagnosis => uniqueDiagnosisCodes.includes(diagnosis.code)
            );
            setDiagnoses(filteredDiagnoses);
          })
          .catch(() => setError("Error fetching diagnoses."));
      }
    }
  }, [patient]);


  if (error) return <div>{error}</div>;
  if (!patient) return <div>Loading...</div>;

  

  return (
    <div>
      <h2>{patient.name}</h2>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <p>Gender: {patient.gender}</p>
        {patient.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
        {patient.gender === "other" && <TransgenderIcon />}
      </Box>

      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <p>SSN: {patient.ssn && patient.ssn}</p>

      <h3>Entries</h3>
      <div>
        {patient.entries && <Entries entries={patient.entries} />}
      </div>

      <h3>Diagnoses</h3>
      <div>

        {diagnoses.map((d) => (
          <div key={d.code}>
            <p>
              {d.code} - {d.name}
            </p>
          </div>
        ))}
      </div>

      <EntryForm patient={patient} setPatient={setPatient} />
    </div>
  );
};

export default SinglePatient;

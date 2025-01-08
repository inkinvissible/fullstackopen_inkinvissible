import patientsData from "../../data/patients";
import { NewPatient, Patient, PatientsCommonData, Entry, EntryWithoutId } from "../types/patientTypes";
import { parseGender, parseDiagnosisCodes } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";

const getAllPatients = (): PatientsCommonData[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender: parseGender(gender),
    occupation,
    entries
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patientsData.push(newPatient);
  return newPatient;
};


const getPatient = (id: string): Patient | undefined => {
  const patient = patientsData.find((p) => p.id === id);
  if (patient) {
    return {
      ...patient,
      gender: parseGender(patient.gender),
      entries: patient.entries || []
    };
  }
  return undefined;
};

const addEntry = (id: string, entry: EntryWithoutId): Patient | undefined => {
  console.log("Entry from addEntry", entry);
  const patient = patientsData.find((p) => p.id === id);
  if (patient) {
    const newEntry: Entry = {
      ...entry,
      id: uuidv4(),
      diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    };
    patient.entries = patient.entries ? [...patient.entries, newEntry] : [newEntry];
    return {
      ...patient,
    };
  }
  return undefined;
};

export default { getAllPatients, addPatient, getPatient, addEntry };
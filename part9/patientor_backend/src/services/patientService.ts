import patientsData from "../../data/patients";
import { NewPatient, Patient, PatientsCommonData } from "../types/patientTypes";
import { parseGender } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";

const getAllPatients = (): PatientsCommonData[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: parseGender(gender),
    occupation,
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

export default { getAllPatients, addPatient };

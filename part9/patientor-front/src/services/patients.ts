import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const createEntry = async (id: string, entry: unknown) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, entry);
  console.log("Entry data:", data);
  
  return data;
};

export default {
  getAll,
  create,
  getPatient,
  createEntry
};

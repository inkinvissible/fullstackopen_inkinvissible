import axios from "axios";
import { Entry, NewEntry } from "../types";
const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const response = await axios.get<Entry[]>(`${baseUrl}`);
  return response.data;
};

const createEntry = async (object: NewEntry) => {
  try {
    const response = await axios.post<Entry>(baseUrl, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('Unknown error occurred');
  }
};

export default { getAll, createEntry };

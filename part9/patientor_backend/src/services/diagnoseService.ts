import diagnosesData from "../../data/diagnoses";
import { Diagnose } from "../types/diagnoseTypes";

const getAllDiagnoses = (): Diagnose[] => {
  return diagnosesData;
};

export default { getAllDiagnoses };

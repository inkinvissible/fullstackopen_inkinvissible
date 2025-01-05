import { Gender, NewPatient } from "../types/patientTypes";

export const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};
export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const parseString = (str: unknown): string => {
    if (!isString(str)) {
      throw new Error("Incorrect or missing parameters");
    }
    return str;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
  };

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
    };
    return newPatient;
  }

  throw new Error("Incorrect data");
};

export default toNewPatient;
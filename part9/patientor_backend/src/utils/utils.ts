import { Gender, NewPatient, Entry } from "../types/patientTypes";
import { Diagnose } from "../types/diagnoseTypes";
import { EntryWithoutId} from "../types/patientTypes";


const isEntry = (entry: unknown): entry is Entry[] => {
  if (!Array.isArray(entry)) return false;
  return entry.every((e): e is Entry => {
    return typeof e === "object" && e !== null;
  });
};

export const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const toId = (object: unknown): string => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("id" in object && isString(object.id)) {
    return object.id;
  } else {
    throw new Error("ID is not a String");
  }
};
export const parseDischarge = (discharge: unknown) => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge) ||
    !isString(discharge.date) ||
    !("criteria" in discharge) ||
    !isString(discharge.criteria)
  ) {
    throw new Error("Incorrect or missing discharge");
  }

  return {
    date: discharge.date,
    criteria: discharge.criteria,
  };
};
export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

export const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};
export const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error("Incorrect or missing parameters");
  }
  return str;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const parseEntries = (entries: unknown): Entry[] => {
    if (!isEntry(entries)) {
      throw new Error("Incorrect or missing entries");
    }
    return entries;
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
      entries: "entries" in object ? parseEntries(object.entries) : [],
    };
    return newPatient;
  }

  throw new Error("Incorrect data");
};

const isEntryType = (type: unknown): type is EntryWithoutId['type'] => {
  return typeof type === "string" && ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(type);
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (!("type" in object) || !isEntryType(object.type)) {
    throw new Error("Missing or invalid entry type");
  }

  // Add additional parsing based on entry type
  switch (object.type) {
    case "HealthCheck":
      if (
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "healthCheckRating" in object &&
        "diagnosisCodes" in object
      ) {
        return {
          type: "HealthCheck",
          description: String(object.description),
          date: String(object.date),
          specialist: String(object.specialist),
          healthCheckRating: Number(object.healthCheckRating),
          diagnosisCodes: object.diagnosisCodes as Array<Diagnose["code"]> || [],
        };
      }
      break;
    case "Hospital":
      if (
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "discharge" in object &&
        "diagnosisCodes" in object
      ) {
        return {
          type: "Hospital",
          description: String(object.description),
          date: String(object.date),
          specialist: String(object.specialist),
          discharge: parseDischarge(object.discharge),
          diagnosisCodes: object.diagnosisCodes as Array<Diagnose["code"]> || [],
        };
      }
      break;
    case "OccupationalHealthcare":
      if (
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "employerName" in object &&
        "diagnosisCodes" in object
      ) {
        return {
          type: "OccupationalHealthcare",
          description: String(object.description),
          date: String(object.date),
          specialist: String(object.specialist),
          employerName: String(object.employerName),
          diagnosisCodes: object.diagnosisCodes as Array<Diagnose["code"]> || [],
        };
      }
      break;
  }

  throw new Error("Incorrect data for entry");
};

export default toNewPatient;

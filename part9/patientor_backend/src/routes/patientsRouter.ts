import express from "express";
import patientService from "../services/patientService";
import { toId, toNewPatient, toNewEntry } from "../utils/utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAllPatients());
});

router.get("/:id", (req, res) => {
  try {
    const id = toId(req.params);
    const patient = patientService.getPatient(id);
    
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).send({ error: "Patient not found" });
    }
  } catch (e) {
    let errorMessage = "Error processing request: ";
    if (e instanceof Error) {
      errorMessage += e.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (e) {
    let errorMessage = "Something went wrong: ";
    if (e instanceof Error) {
      errorMessage += `Error: ${e.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  console.log("Request body:", req.body);
  try {
    const id = toId(req.params);
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(id, newEntry);
    res.status(201).json(updatedPatient);
  } catch (e) {
    let errorMessage = "Something went wrong: ";
    if (e instanceof Error) {
      errorMessage += `Error: ${e.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

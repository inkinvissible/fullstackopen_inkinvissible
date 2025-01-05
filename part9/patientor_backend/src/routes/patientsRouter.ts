import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils/utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAllPatients());
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

export default router;

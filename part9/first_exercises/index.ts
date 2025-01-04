import express from "express";
import { parseQuery, calculateBmi } from "./bmiCalculator";
import { parseQueryExercise, calculateExcercise } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/bmi", (req, res) => {
  const queryHeight = req.query.height as string;
  const queryWeight = req.query.weight as string;

  try {
    const { height, weight } = parseQuery(queryHeight, queryWeight);
    const result = calculateBmi(height, weight);
    res.json({ weight, height, bmi: result });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ error: `Error, malformatted parameters. ${error.message}` });
    }
    res.status(400).json({ error: `Error, malformatted parameters. ${error}` });
  }
});

interface bodyParams {
  daily_exercises: number[];
  target: number;
}

app.post("/exercise", (req, res) => {
  const { daily_exercises, target } = req.body as bodyParams;
  try {
    const { hours, objective } = parseQueryExercise(daily_exercises, target);
    const result = calculateExcercise(hours, objective);
    res.json({ result });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({ error: `Error: ${e.message}` });
    }
    res.status(400).json({ error: `Error: ${e}` });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

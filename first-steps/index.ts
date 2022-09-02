import express from "express";
import {Request} from "express";
import bmi from "./bmi";
import exercise from "./exercise";
import {StringExercises} from './exercise';


interface ExerciseRequest extends Request {
  body: StringExercises
}
const app = express();
  app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
  });

app.use(express.json());
app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;
  try {
    if (weight && height) {
      const result = bmi(height.toString(), weight.toString());
      console.log("result", result.bmi);
      res.status(200).json(result);
    } else {
      res
        .status(400)
        .json({ error: "Mandatory field: weight or height is missing" });
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    res.status(400).json({ error: error.message });
  }
});

app.post("/exercises", (req: ExerciseRequest, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  console.log('request.body', req.body);
  const {daily_exercises, target} = req.body;
  console.log('daily_exercises', daily_exercises);
  try {
    if (daily_exercises && target) {
      const result = exercise({daily_exercises, target});
      res.status(200).json(result);
    } else {
      res
        .status(400)
        .json({ error: "parameters daily_exercises or target is missing or invalid" });
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    res.status(400).json({ error: error.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

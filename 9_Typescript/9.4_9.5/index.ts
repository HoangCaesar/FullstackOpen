import express from "express";

import calculateBmi from "./bmiCalculator";

const app = express();

// *** 9.4 ***

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

// *** 9.4 ***

app.get("/bmi", (req, res) => {
  console.log(req.query);
  if (
    req.query.weight === undefined ||
    req.query.height === undefined ||
    Object.keys(req.query).length < 2 ||
    Object.keys(req.query).length > 2
  ) {
    return res.json({
      error: "malformatted parameters",
    });
  } else {
    return res.json(
      calculateBmi(req.query.weight as string, req.query.height as string)
    );
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

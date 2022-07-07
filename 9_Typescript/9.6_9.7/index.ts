import express from 'express';

import exerciseCalculator from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong pong pong');
});

app.post('/exercise', (req, res) => {
  console.log(Object.keys(req.body).length);

  let arrayDaily: Array<number>;
  let target: any;
  const checkType = () => {
    return res.json({
      error: 'malformatted parameters',
    });
  };

  if (Object.keys(req.body).length != 2) {
    if (Object.keys(req.body).length < 2) {
      return res.json({
        error: 'parameters missing',
      });
    } else {
      checkType();
    }
  } else {
    arrayDaily = req.body[`${Object.keys(req.body)[0]}`];

    target = isNaN(Number(req.body[`${Object.keys(req.body)[1]}`]))
      ? checkType()
      : Number(req.body[`${Object.keys(req.body)[1]}`]);

    return res.json(exerciseCalculator(arrayDaily, target));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

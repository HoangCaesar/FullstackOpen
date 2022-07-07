import { info } from "console";

interface MultiplyValues {
  target: number;
  hours: Array<number>;
}

interface info {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  let check = true;
  let tmp: Array<number> = [];

  for (let i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      tmp = [...tmp, Number(args[i])];
    } else {
      check = false;
      break;
    }
  }

  if (check) {
    console.log(tmp);
    return {
      target: tmp[0],
      hours: [...tmp.slice(1)],
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const exerciseCalculator = (hoursOfExercise: Array<number>, target: number) => {
  let average = hoursOfExercise.reduce((acc, hour) => {
    return acc + hour;
  });
  average = average / hoursOfExercise.length;

  let trainingDays = 0;
  hoursOfExercise.map((hour, index) => {
    if (hour > 0) trainingDays++;
  });

  let result: info = {
    periodLength: hoursOfExercise.length,
    trainingDays: trainingDays,
    target: target,
    average: average,
    success: average >= target ? true : false,
    rating: 2,
    ratingDescription: "not too bad but could be better",
  };

  return console.log(result);
};

try {
  const { target, hours } = parseArguments(process.argv);
  exerciseCalculator(hours, target);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])) && Number(args[2]) != 0) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number) => {
  height = height / 100;
  let bmi: number = weight / height ** 2;

  if (bmi >= 18.5 && bmi <= 24.9) console.log("Normal (healthy weight)");
  else if (bmi <= 18.5)
    console.log("Malnutrition (Hello! You need more Mc.Donald && Cocacola)");
  else {
    console.log("Overweight (Hit the gym, now!)");
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

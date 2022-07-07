const calculateBmi = (w: string, h: string): Object => {
  let weight: number = Number(w);
  let height: number = Number(h);
  let bmi: number;

  if (!isNaN(weight) && !isNaN(height) && height != 0) {
    height = height / 100;
    bmi = weight / height ** 2;
  } else {
    return {
      error: "malformatted parameters",
    };
  }

  if (bmi >= 18.5 && bmi <= 24.9) {
    return {
      height: height * 100,
      weight: weight,
      bmi: "Normal (healthy weight)",
    };
  } else if (bmi <= 18.5) {
    return {
      height: height * 100,
      weight: weight,
      bmi: "Malnutrition (Hello! You need more Mc.Donald && Cocacola)",
    };
  } else {
    return {
      height: height * 100,
      weight: weight,
      bmi: "Overweight (Hit the gym, now!)",
    };
  }
};

export default calculateBmi;

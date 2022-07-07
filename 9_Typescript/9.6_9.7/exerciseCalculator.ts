
const exerciseCalculator = (hoursOfExercise: Array<number>, target: number) => {

  for (let i = 0; i < hoursOfExercise.length; i++) {
    if (isNaN(Number(hoursOfExercise[i]))) {
      return {
        error: 'malformatted parameters',
      };
    } 
  }

  let average = hoursOfExercise.reduce((acc, hour) => {
    return acc + hour;
  });
  average = average / hoursOfExercise.length;

  let trainingDays = 0;
  hoursOfExercise.map((hour) => {
    if (hour > 0) trainingDays++;
  });

  return {
    periodLength: hoursOfExercise.length,
    trainingDays: trainingDays,
    target: target,
    average: average,
    success: average >= target ? true : false,
    rating: 1,
    ratingDescription: 'bad',
  };
};

export default exerciseCalculator;

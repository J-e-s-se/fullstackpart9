interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface NumberExercises {
  daily_exercises: Array<number>;
  target: number;
}

export interface StringExercises {
  daily_exercises: Array<string>;
  target: string;
}

const calculateExercises = (
  dailyHours: Array<number>,
  target: number
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hour) => hour > 0).length;
  const average =
    dailyHours.reduce((prev, curr) => prev + curr, 0) / periodLength;

  const success = average < target ? false : true;
  const ratio = average / target;
  console.log("ratio", ratio);
  let rating = 0;
  let ratingDescription = "";
  
  switch(true) {
    case (ratio >= 1): 
      console.log('ratio >= 1', ratio);
      rating = 3;
      ratingDescription = "very good";
      break;
    
    case (ratio >= 0.5): 
      console.log('ratio >= 0.5', ratio);
      rating = 2;
      ratingDescription = "not too bad";
      break;
    

    case (ratio >= 0): 
      console.log('ratio >= 0', ratio);

      rating = 1;
      ratingDescription = "very bad";
      break;
    

    default:
      console.log('default value');
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArgs = (ex: StringExercises): NumberExercises => {
  const {daily_exercises, target} = ex;

  if (daily_exercises.length < 1) throw new Error("Not enough arguments");

  const parseNumber = (arr: Array<string>): Array<number> => {
    return arr.map((val) => {
      const num = Number(val);
      if (isNaN(num)) {
        throw new Error(`${val} is not a number`);
      }
      return num;
    });
  };
  const number_exercises = parseNumber(daily_exercises);
  const number_target = Number(target);

  if (isNaN(number_target)) {
    throw new Error(`${target} is not a number`);
  }

  return {
    daily_exercises: number_exercises,
    target: number_target
  };
};

const exercise = (ex: StringExercises): ExerciseResult => {
  const {daily_exercises, target} = parseArgs(ex);
  return calculateExercises(daily_exercises, target);
};

export default exercise;
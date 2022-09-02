interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  exerciseArray: Array<number>;
  target: number;
}

const calculateExercises = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hour) => hour > 0).length;
  const average =
    dailyHours.reduce((prev, curr) => prev + curr, 0) / periodLength;

  const success = average < target ? false : true;
  const ratio = average / target;
  console.log("ratio", ratio);
  let rating = 1;
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

const parseArgs = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const argslen = args.length;
  const arr = args.slice(3, argslen);
  const tgt = args[2];

  const parseNumber = (arr: Array<string>): Array<number> => {
    return arr.map((val) => {
      const num = Number(val);
      if (isNaN(num)) {
        throw new Error(`${val} is not a number`);
      }
      return num;
    });
  };
  const exerciseArray = parseNumber(arr);
  const target = Number(tgt);

  if (isNaN(target)) {
    throw new Error(`${tgt} is not a number`);
  }

  return {
    exerciseArray,
    target,
  };
};

try {
  const { exerciseArray, target } = parseArgs(process.argv);
  console.log(calculateExercises(exerciseArray, target));
} catch (error) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

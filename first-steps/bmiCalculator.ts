interface BMIValues {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / ((height * height) / 10000);

  switch (true) {
    case bmi < 16:
      return "Undeweight (Severe thinness)";

    case bmi < 17:
      return "Undeweight (Moderate thinness)";

    case bmi < 18.5:
      return "Undeweight (Mild thinness)";

    case bmi < 25:
      return "Normal range";

    case bmi < 30:
      return "Overweight (Pre-obese)";

    case bmi < 35:
      return "Obese (Class I)";

    case bmi < 40:
      return "Obese (Class II)";

    default:
      return "Obese (Class III)";
  }
};

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(Number(height), Number(weight)));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

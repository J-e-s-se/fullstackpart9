interface BMIValues {
  height: number;
  weight: number;
}

interface BMI {
  height: number;
  weight: number;
  bmi: string;
}

const calculateBmi = (height: number, weight: number): string => {
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

const parseArguments = (height: string, weight: string): BMIValues => {
  if (!weight || !height) {
    throw Error("parameters not given");
  }

  const hnum = Number(height);
  const wnum = Number(weight);

  if (isNaN(hnum) || isNaN(wnum)) {
    throw Error("parameters not numbers");
  }

  return {
    height: hnum,
    weight: wnum,
  };
};

const bmi = (h: string, w: string): BMI => {
  const { height, weight } = parseArguments(h, w);
  const bmiString = calculateBmi(height, weight);

  return {
    height,
    weight,
    bmi: bmiString,
  };
};

export default bmi;

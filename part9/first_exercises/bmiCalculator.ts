interface heightWeight {
  height: number;
  weight: number;
}

const parseArg = (args: string[]): heightWeight => {
  if (args.length != 4) throw new Error("Incorrect arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height: height,
      weight: weight,
    };
  } else {
    throw new Error("The values were not numbers");
  }
};

export const parseQuery = (
  queryHeight: string,
  queryWeight: string
): heightWeight => {
  const height = Number(queryHeight);
  const weight = Number(queryWeight);
  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight,
    };
  } else {
    throw new Error("The values were not numbers");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / height ** 2;
  if (bmi <= 18.5 && bmi >= 0) {
    return "underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "healthy weight";
  } else {
    return "overweight";
  }
};

try {
  const { height, weight } = parseArg(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let message = "Something happened. ";
  if (error instanceof Error) {
    message += "Error: " + error.message;
  }
}

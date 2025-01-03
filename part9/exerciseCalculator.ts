interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface initialValues {
    hours: number[],
    objective: number
}

const parseArgs = (args: string[]): initialValues => {
    if (args.length < 12) throw new Error("Not arguments");
  
    const objective = Number(args[2]);
    const hours = args.filter((_, index) => index >= 3).map(Number);
  
    if (!isNaN(objective) && (!hours.some(isNaN))) {
      return {
        hours: hours,
        objective: objective
      };
    } else {
      throw new Error("The values were not numbers");
    }
  };

const calculateExcercise = (hours: number[], objective: number): Result => {
  console.log(hours);
  
    const sumHours = hours.reduce((acu, val) => acu + val, 0);
  const periodLength = hours.length;
  const trainingDays = periodLength - hours.filter((x) => x == 0).length;
  const average = sumHours / periodLength;

  if (sumHours >= objective) {
    const success = true;
    const rating = 3;
    const ratingDescription = "Well done! You have achieved your goal";

    const result = {
      periodLength: periodLength,
      trainingDays: trainingDays,
      success: success,
      rating: rating,
      ratingDescription: ratingDescription,
      target: objective,
      average: average,
    };
    return result;
  } else if (sumHours >= objective * 0.6 && sumHours <= objective * 0.9) {
    const success = false;
    const rating = 2;
    const ratingDescription = "Good, but keep going";

    const result = {
      periodLength: periodLength,
      trainingDays: trainingDays,
      success: success,
      rating: rating,
      ratingDescription: ratingDescription,
      target: objective,
      average: average,
    };

    return result;
  } else {
    const success = false;
    const rating = 1;
    const ratingDescription = "Come on, the first step is to start";

    const result = {
      periodLength: periodLength,
      trainingDays: trainingDays,
      success: success,
      rating: rating,
      ratingDescription: ratingDescription,
      target: objective,
      average: average,
    };
    return result;
  }
};



try {
    const { hours, objective } = parseArgs(process.argv);
    console.log(calculateExcercise(hours, objective));
    
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

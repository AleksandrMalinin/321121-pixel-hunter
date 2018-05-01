import constants from "../constants";

export const getAnswersQuantity = (state) => {
  const correctAnswers = state.answers.filter((answer) => {
    return answer.correct === true;
  });

  const slowAnswers = state.answers.filter((answer) => {
    return answer.time > constants.HIGHER_TIME_LIMIT && answer.correct;
  });

  const fastAnswers = state.answers.filter((answer) => {
    return answer.time < constants.LOWER_TIME_LIMIT && answer.correct;
  });

  const answersQuantity = {
    correct: correctAnswers.length,
    slow: slowAnswers.length,
    fast: fastAnswers.length,
    lives: state.lives
  };

  return answersQuantity;
};

export const countPoints = (answers) => {
  const points = answers.correct * constants.CORRECT_ANSWER + answers.fast * constants.ADDITIONAL_POINTS + answers.slow * -constants.ADDITIONAL_POINTS + answers.lives * constants.ADDITIONAL_POINTS;
  return points;
};

export function CountTime(value) {
  if (typeof value !== `number`) {
    throw new Error(`Value should be a number`);
  }

  if (value < 0) {
    throw new Error(`Value should not be negative number`);
  }

  this.time = value;
  this.tick = () => {
    if (this.time === 0) {
      return `time is over`;
    }

    return this.time--;
  };
}

export const timer = new CountTime(10);
timer.tick();

import constants from "../constants";

export const getAnswersQuantity = (state) => {
  const correctAnswers = state.answers.filter((answer) => {
    return answer.correct;
  });

  const slowAnswers = state.answers.filter((answer) => {
    return answer.time > constants.HIGHER_TIME_LIMIT && answer.correct;
  });

  const fastAnswers = state.answers.filter((answer) => {
    return answer.time < constants.LOWER_TIME_LIMIT && answer.correct;
  });

  return {
    correct: correctAnswers.length,
    slow: slowAnswers.length,
    fast: fastAnswers.length,
    lives: state.lives
  };
};

export const countPoints = (answers) => {
  return answers.correct * constants.CORRECT_ANSWER + answers.fast * constants.ADDITIONAL_POINTS + answers.slow * -constants.ADDITIONAL_POINTS + answers.lives * constants.ADDITIONAL_POINTS;
};

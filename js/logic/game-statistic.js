export const CORRECT_ANSWER = 100;
export const ADDITIONAL_POINTS = 50;
export const LOWER_TIME_LIMIT = 10;
export const HIGHER_TIME_LIMIT = 20;

// export const LIVES = 3;
// export const INITIAL_GAME = {
//   correct: true,
//   time: 15
// };

export const getAnswersQuantity = (state) => {
  const correctAnswers = state.answers.filter((answer) => {
    return answer.correct === true;
  });

  const slowAnswers = state.answers.filter((answer) => {
    return answer.time > HIGHER_TIME_LIMIT;
  });

  const fastAnswers = state.answers.filter((answer) => {
    return answer.time < LOWER_TIME_LIMIT;
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
  const points = answers.correct * CORRECT_ANSWER + answers.fast * ADDITIONAL_POINTS + answers.slow * -ADDITIONAL_POINTS + answers.lives * ADDITIONAL_POINTS;
  return points;
  // if (state.lives < 0) {
  //   throw new Error(`Value should not be negative number`);
  // }
  //
  // if (state.lives === 0) {
  //   return -1;
  // }
  //
  // let points = 0;
  //
  // for (let i = 0; i < state.answers.length; i++) {
  //   if (state.answers[i].correct) {
  //     points += CORRECT_ANSWER;
  //   }
  //   // быстрый ответ
  //   if (state.answers[i].time < LOWER_TIME_LIMIT && state.answers[i].correct) {
  //     points += ADDITIONAL_POINTS;
  //   }
  //
  //   // медленный ответ
  //   if (state.answers[i].time > HIGHER_TIME_LIMIT && state.answers[i].correct) {
  //     points -= ADDITIONAL_POINTS;
  //   }
  // }
  // points += state.lives * ADDITIONAL_POINTS;
  // return points;
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

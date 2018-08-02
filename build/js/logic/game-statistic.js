var gameStatistic = (function (exports) {
'use strict';

var constants = {
  MAX_ANSWERS_COUNT: 10,
  MAX_WRONG_ANSWERS: 3,
  CORRECT_ANSWER: 100,
  ADDITIONAL_POINTS: 50,
  LOWER_TIME_LIMIT: 10,
  HIGHER_TIME_LIMIT: 20,
  CHECKED_RADIO_COUNT: 2,
  MIN_NAME_LENGTH: 2,
  INITIAL_STATE: Object.freeze({
    lives: 3,
    time: 30,
    win: false,
    level: 0
  }),
  SERVER_URL: "https://es.dump.academy/pixel-hunter",
  MAX_RESULTS_NUMBER: 3,
  LAST_SEC: 5,
  PAUSE_TIME: 3000
};

var getAnswersQuantity = function getAnswersQuantity(state) {
  var correctAnswers = state.answers.filter(function (answer) {
    return answer.correct;
  });

  var slowAnswers = state.answers.filter(function (answer) {
    return answer.time > constants.HIGHER_TIME_LIMIT && answer.correct;
  });

  var fastAnswers = state.answers.filter(function (answer) {
    return answer.time < constants.LOWER_TIME_LIMIT && answer.correct;
  });

  return {
    correct: correctAnswers.length,
    slow: slowAnswers.length,
    fast: fastAnswers.length,
    lives: state.lives
  };
};

var countPoints = function countPoints(answers) {
  return answers.correct * constants.CORRECT_ANSWER + answers.fast * constants.ADDITIONAL_POINTS + answers.slow * -constants.ADDITIONAL_POINTS + answers.lives * constants.ADDITIONAL_POINTS;
};

exports.getAnswersQuantity = getAnswersQuantity;
exports.countPoints = countPoints;

return exports;

}({}));

//# sourceMappingURL=game-statistic.js.map

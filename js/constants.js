const constants = {
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
  SERVER_URL: `https://es.dump.academy/pixel-hunter`,
  MAX_RESULTS_NUMBER: 3
};

export default constants;

const CORRECT_ANSWER = 100;
const ADDITIONAL_POINTS = 50;
const LOWER_TIME_LIMIT = 10;
const HIGHER_TIME_LIMIT = 20;

export const LIVES = 3;
export const INITIAL_GAME = {
  answer: true,
  time: 15
};

export const countPoints = (array, number) => {
  if (number < 0) {
    throw new Error(`Value should not be negative number`);
  }

  if (number === 0) {
    return -1;
  }

  let points = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i].answer) {
      points += CORRECT_ANSWER;
    }
    // быстрый ответ
    if (array[i].time < LOWER_TIME_LIMIT && array[i].answer) {
      points += ADDITIONAL_POINTS;
    }

    // медленный ответ
    if (array[i].time > HIGHER_TIME_LIMIT) {
      points -= ADDITIONAL_POINTS;
    }
  }
  points += number * ADDITIONAL_POINTS;
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

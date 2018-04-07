const INITIAL_GAME = {
  answer: true,
  time: 15
};

export const LIVES = 3;

export const answersArray = Array(10).fill(INITIAL_GAME);

export const countPoints = (array, number) => {
  if (number < 0) {
    throw new Error(`Value should not be negative number`);
  }
  let points = 0;
  for (let i = 0; i < array.length; i++) {
    if (number === 0) {
      return -1;
    }
    if (array[i].answer) {
      points += 100;
    } else {
      number--;
    }
    // быстрый ответ
    if (array[i].time < 10) {
      points += 50;
    }

    // медленный ответ
    if (array[i].time > 20) {
      points -= 50;
    }
  }
  points += number * 50;
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

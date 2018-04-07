import {assert} from 'chai';
import {countPoints, CountTime, LIVES, timer, INITIAL_GAME} from './game';

describe(`Check answers count`, () => {
  const answerTypeFirst = {
    answer: true,
    time: 22,
  };

  const answerTypeSecond = {
    answer: false,
    time: 8,
  };

  const answerTypeThird = {
    answer: true,
    time: 5,
  };

  const answersArrayFirst = Array(10).fill(INITIAL_GAME);
  const arrayFirstHalf = Array(8).fill(answerTypeFirst);
  const arraySecondHalf = Array(2).fill(answerTypeSecond);
  const answersArraySecond = arrayFirstHalf.concat(arraySecondHalf);
  const answersArraySecondCopy = answersArraySecond.slice();
  const answersArrayThird = answersArraySecondCopy.fill(answerTypeThird, 0, 8);

  it(`should return 1150 points when all lives is saved and time is normal`, () => {
    assert.equal(countPoints(answersArrayFirst, 3), 1150);
  });

  it(`should return 450 points when two lives is used and 8 answers are slow`, () => {
    assert.equal(countPoints(answersArraySecond, 3), 450);
  });

  it(`should return 1250 points when two lives is used and all answers are quick`, () => {
    assert.equal(countPoints(answersArrayThird, 3), 1250);
  });

  it(`should return -1 when all lives are used`, () => {
    assert.equal(countPoints(answersArrayFirst, 0), -1);
  });

  it(`should not allow set negative number`, () => {
    assert.throws(() => countPoints(answersArrayFirst, (LIVES, -1), /Value should not be negative number/));
  });
});

describe(`Check timer value`, () => {
  it(`should update timer value`, () => {
    assert.equal(timer.tick(), 9);
    assert.equal(timer.tick(), 8);
  });
  it(`should not allow set negative value`, () => {
    assert.throws(() => new CountTime(-1), /Value should not be negative number/);
  });
  it(`should not allow set not number value`, () => {
    assert.throws(() => new CountTime([]), /Value should be a number/);
  });
});


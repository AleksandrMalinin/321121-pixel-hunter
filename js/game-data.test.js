import {assert} from 'chai';
import {countPoints, CountTime, LIVES, timer, answersArray} from './game';


describe(`Check answers count`, () => {
  it(`should return 1150 points when all lives is saved and time is normal`, () => {
    assert.equal(countPoints(answersArray, 3), 1150);
  });

  it(`should return -1 when all lives are used`, () => {
    assert.equal(countPoints(answersArray, 0), -1);
  });

  it(`should not allow set negative number`, () => {
    assert.throws(() => countPoints(answersArray, (LIVES, -1), /Value should not be negative number/));
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


import GameLevels from "../data/game-data";
import initialGame from "./initial-game";
import constants from "../constants";

const getLevel = (index) => GameLevels[index];

class GameModel {
  constructor(player) {
    this.player = player;
    this.restart();
  }

  get state() {
    return this._state;
  }

  getCurrentLevel() {
    return getLevel(this._state.level);
  }

  hasNextLevel() {
    return getLevel(this._state.level + 1) !== void 0;
  }

  nextLevel() {
    this._state.level++;
  }

  die() {
    this._state.lives--;
  }

  isDead() {
    return this._state.lives <= 0;
  }

  win() {
    this._state.win = true;
  }

  tick() {
    this._state.time--;
  }

  addAnswer(answer) {
    this._state.answers.push({correct: answer, time: initialGame.time - this._state.time});
  }

  restart() {
    this._state = Object.assign({}, constants.INITIAL_STATE);
    this._state.answers = [];
  }

  rebootTime() {
    this._state.time = initialGame.time;
  }
}

export default GameModel;

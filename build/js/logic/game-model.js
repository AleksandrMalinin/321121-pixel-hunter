var gameModel = (function () {
'use strict';

var initialGame = {
  lives: 3,
  time: 30,
  win: false,
  level: 0
};

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

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var GameModel = function () {
  function GameModel(data, player) {
    classCallCheck(this, GameModel);

    this.data = data;
    this.player = player;
    this.restart();
  }

  createClass(GameModel, [{
    key: "getLevel",
    value: function getLevel(index) {
      return this.data[index];
    }
  }, {
    key: "getCurrentLevel",
    value: function getCurrentLevel() {
      return this.getLevel(this._state.level);
    }
  }, {
    key: "hasNextLevel",
    value: function hasNextLevel() {
      return this.getLevel(this._state.level + 1) !== void 0;
    }
  }, {
    key: "nextLevel",
    value: function nextLevel() {
      this._state.level++;
    }
  }, {
    key: "die",
    value: function die() {
      this._state.lives--;
    }
  }, {
    key: "isDead",
    value: function isDead() {
      return this._state.lives <= 0;
    }
  }, {
    key: "win",
    value: function win() {
      this._state.win = true;
    }
  }, {
    key: "tick",
    value: function tick() {
      this._state.time--;
    }
  }, {
    key: "addAnswer",
    value: function addAnswer(answer) {
      this._state.answers.push({ correct: answer, time: initialGame.time - this._state.time });
    }
  }, {
    key: "restart",
    value: function restart() {
      this._state = Object.assign({}, constants.INITIAL_STATE);
      this._state.answers = [];
    }
  }, {
    key: "rebootTime",
    value: function rebootTime() {
      this._state.time = initialGame.time;
    }
  }, {
    key: "state",
    get: function get$$1() {
      return this._state;
    }
  }]);
  return GameModel;
}();

return GameModel;

}());

//# sourceMappingURL=game-model.js.map

var gameResultsView = (function () {
'use strict';

var getElementFromTemplate = function getElementFromTemplate(markup) {
  var domElement = document.createElement("div");
  domElement.innerHTML = markup;
  return domElement;
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

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var AbstractView = function () {
  function AbstractView() {
    classCallCheck(this, AbstractView);

    if (new.target === AbstractView) {
      throw new Error("Can not create example of AbstractView, only the new one class");
    }
  }

  createClass(AbstractView, [{
    key: "render",
    value: function render() {
      return getElementFromTemplate(this.template);
    }
  }, {
    key: "bind",
    value: function bind() {}
  }, {
    key: "template",
    get: function get$$1() {
      throw new Error("Template is required");
    }
  }, {
    key: "element",
    get: function get$$1() {
      if (this._element) {
        return this._element;
      }
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }
  }]);
  return AbstractView;
}();

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

var getAnswerType = function getAnswerType(answer) {
  if (!answer.correct) {
    return "wrong";
  }

  if (answer.correct && answer.time < constants.LOWER_TIME_LIMIT) {
    return "fast";
  }

  if (answer.correct && answer.time > constants.HIGHER_TIME_LIMIT) {
    return "slow";
  }

  return "correct";
};

var StatisticView = function (_AbstractView) {
  inherits(StatisticView, _AbstractView);

  function StatisticView(answers) {
    classCallCheck(this, StatisticView);

    var _this = possibleConstructorReturn(this, (StatisticView.__proto__ || Object.getPrototypeOf(StatisticView)).call(this));

    _this.answers = answers;
    _this.answersType = _this.answers.map(function (answer) {
      return getAnswerType(answer);
    });
    return _this;
  }

  createClass(StatisticView, [{
    key: "template",
    get: function get$$1() {
      return "\n    <div class=\"stats\">\n      <ul class=\"stats\">\n      " + this.answersType.map(function (answerType) {
        return "<li class=\"stats__result stats__result--" + answerType + "\"></li>";
      }).join("") + "\n      " + new Array(10 - this.answersType.length).fill("<li class=\"stats__result stats__result--unknown\"></li>").join("") + "\n      </ul>\n    </div>";
    }
  }]);
  return StatisticView;
}(AbstractView);

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

var GameResultsView = function (_AbstractView) {
  inherits(GameResultsView, _AbstractView);

  function GameResultsView(state, index) {
    classCallCheck(this, GameResultsView);

    var _this = possibleConstructorReturn(this, (GameResultsView.__proto__ || Object.getPrototypeOf(GameResultsView)).call(this));

    _this.index = index;
    _this.state = state;
    _this.answers = _this.state.answers;
    _this.win = _this.state.win;
    _this.statsview = new StatisticView(_this.answers).template;
    _this.answerResult = getAnswersQuantity(state);
    _this.totalResult = countPoints(_this.answerResult);
    return _this;
  }

  createClass(GameResultsView, [{
    key: "template",
    get: function get$$1() {
      return "\n          <table class=\"result__table\">\n        <tr>\n          <td class=\"result__number\">" + this.index + ".</td>\n          <td colspan=\"2\">\n            " + this.statsview + "\n          </td>\n          <td class=\"result__points\">\xD7&nbsp;100</td>\n          <td class=\"result__total\">" + this.answerResult.correct * constants.CORRECT_ANSWER + "</td>\n        </tr>\n        <tr>\n          <td></td>\n          <td class=\"result__extra\">\u0411\u043E\u043D\u0443\u0441 \u0437\u0430 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C:</td>\n          <td class=\"result__extra\">" + this.answerResult.fast + "&nbsp;<span class=\"stats__result stats__result--fast\"></span></td>\n          <td class=\"result__points\">\xD7&nbsp;50</td>\n          <td class=\"result__total\">" + this.answerResult.fast * constants.ADDITIONAL_POINTS + "</td>\n        </tr>\n        <tr>\n          <td></td>\n          <td class=\"result__extra\">\u0411\u043E\u043D\u0443\u0441 \u0437\u0430 \u0436\u0438\u0437\u043D\u0438:</td>\n          <td class=\"result__extra\">" + this.answerResult.lives + "&nbsp;<span class=\"stats__result stats__result--alive\"></span></td>\n          <td class=\"result__points\">\xD7&nbsp;50</td>\n          <td class=\"result__total\">" + this.answerResult.lives * constants.ADDITIONAL_POINTS + "</td>\n        </tr>\n        <tr>\n          <td></td>\n          <td class=\"result__extra\">\u0428\u0442\u0440\u0430\u0444 \u0437\u0430 \u043C\u0435\u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C:</td>\n          <td class=\"result__extra\">" + this.answerResult.slow + "&nbsp;<span class=\"stats__result stats__result--slow\"></span></td>\n          <td class=\"result__points\">\xD7&nbsp;50</td>\n          <td class=\"result__total\">" + this.answerResult.slow * -constants.ADDITIONAL_POINTS + "</td>\n        </tr>\n        <tr>\n          <td colspan=\"5\" class=\"result__total  result__total--final\">" + this.totalResult + "</td>\n        </tr>\n      </table>";
    }
  }]);
  return GameResultsView;
}(AbstractView);

return GameResultsView;

}());

//# sourceMappingURL=game-results-view.js.map

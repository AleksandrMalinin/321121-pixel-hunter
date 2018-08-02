var gameFirstView = (function () {
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

var GameFirstView = function (_AbstractView) {
  inherits(GameFirstView, _AbstractView);

  function GameFirstView(level) {
    classCallCheck(this, GameFirstView);

    var _this = possibleConstructorReturn(this, (GameFirstView.__proto__ || Object.getPrototypeOf(GameFirstView)).call(this));

    _this.question = level.question;
    _this.answers = level.answers;
    return _this;
  }

  createClass(GameFirstView, [{
    key: "onAnswer",
    value: function onAnswer() {}
  }, {
    key: "bind",
    value: function bind() {
      var _this2 = this;

      var form = this.element.querySelector(".game__content");
      var radio = form.querySelectorAll("[type=radio]");

      form.addEventListener("change", function () {
        var checked = [];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = radio[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            // запись чекнутого элемента в массив
            if (item.checked) {
              checked.push(item);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (checked.length === constants.CHECKED_RADIO_COUNT) {
          var userAnswer = checked[0].value === _this2.answers[0].type && checked[1].value === _this2.answers[1].type;
          _this2.onAnswer(userAnswer);
          form.reset();
        }
      });
    }
  }, {
    key: "template",
    get: function get$$1() {
      return "\n    <div class=\"game\">\n      <p class=\"game__task\">" + this.question + "</p>\n      <form class=\"game__content\">\n        <div class=\"game__option\">\n          <img src=\"" + this.answers[0].image.url + "\" alt=\"Option 1\" width=\"468\" height=\"458\">\n          <label class=\"game__answer game__answer--photo\">\n            <input name=\"question1\" type=\"radio\" value=\"photo\">\n            <span>\u0424\u043E\u0442\u043E</span>\n          </label>\n          <label class=\"game__answer game__answer--paint\">\n            <input name=\"question1\" type=\"radio\" value=\"painting\">\n            <span>\u0420\u0438\u0441\u0443\u043D\u043E\u043A</span>\n          </label>\n        </div>\n        <div class=\"game__option\">\n          <img src=\"" + this.answers[1].image.url + "\" alt=\"Option 2\" width=\"468\" height=\"458\">\n          <label class=\"game__answer  game__answer--photo\">\n            <input name=\"question2\" type=\"radio\" value=\"photo\">\n            <span>\u0424\u043E\u0442\u043E</span>\n          </label>\n          <label class=\"game__answer  game__answer--paint\">\n            <input name=\"question2\" type=\"radio\" value=\"painting\">\n            <span>\u0420\u0438\u0441\u0443\u043D\u043E\u043A</span>\n          </label>\n        </div>\n      </form>\n    </div>";
    }
  }]);
  return GameFirstView;
}(AbstractView);

return GameFirstView;

}());

//# sourceMappingURL=game-first-view.js.map

var application = (function () {
'use strict';

var getElementFromTemplate = function getElementFromTemplate(markup) {
  var domElement = document.createElement("div");
  domElement.innerHTML = markup;
  return domElement;
};

var showErrorMessage = function showErrorMessage(message) {
  var template = document.createElement("div");
  template.textContent = message;

  var styles = ["position: fixed", "top: 25%", "left: 50%", "z-index: 100", "width: 800px", "padding: 20px", "color: #fff", "text-align: center", "transform: translate(-50%, -50%)", "border-radius: 2px", "background-color: #DC143C"];

  template.style.cssText = styles.join(";");
  document.body.appendChild(template);
};

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
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

var FooterView = function (_AbstractView) {
  inherits(FooterView, _AbstractView);

  function FooterView() {
    classCallCheck(this, FooterView);
    return possibleConstructorReturn(this, (FooterView.__proto__ || Object.getPrototypeOf(FooterView)).call(this));
  }

  createClass(FooterView, [{
    key: "template",
    get: function get$$1() {
      return "\n    <footer class=\"footer\">\n      <a href=\"https://htmlacademy.ru\" class=\"social-link social-link--academy\">HTML Academy</a>\n      <span class=\"footer__made-in\">\u0421\u0434\u0435\u043B\u0430\u043D\u043E \u0432 <a href=\"https://htmlacademy.ru\" class=\"footer__link\">HTML Academy</a> &copy; 2016</span>\n      <div class=\"footer__social-links\">\n        <a href=\"https://twitter.com/htmlacademy_ru\" class=\"social-link  social-link--tw\">\u0422\u0432\u0438\u0442\u0442\u0435\u0440</a>\n        <a href=\"https://www.instagram.com/htmlacademy/\" class=\"social-link  social-link--ins\">\u0418\u043D\u0441\u0442\u0430\u0433\u0440\u0430\u043C</a>\n        <a href=\"https://www.facebook.com/htmlacademy\" class=\"social-link  social-link--fb\">\u0424\u044D\u0439\u0441\u0431\u0443\u043A</a>\n        <a href=\"https://vk.com/htmlacademy\" class=\"social-link  social-link--vk\">\u0412\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0435</a>\n      </div>\n    </footer>";
    }
  }]);
  return FooterView;
}(AbstractView);

var GreetingView = function (_AbstractView) {
  inherits(GreetingView, _AbstractView);

  function GreetingView() {
    classCallCheck(this, GreetingView);
    return possibleConstructorReturn(this, (GreetingView.__proto__ || Object.getPrototypeOf(GreetingView)).call(this));
  }

  createClass(GreetingView, [{
    key: "bind",
    value: function bind() {
      var continueButton = this.element.querySelector(".greeting__continue");
      continueButton.onclick = function () {
        Application.showRules();
      };
    }
  }, {
    key: "hide",
    value: function hide() {
      this.element.children[0].style.opacity = "0";
    }
  }, {
    key: "fadeIn",
    value: function fadeIn() {
      this.element.children[1].style.opacity = "1";
      this.element.children[1].classList.add("fade--in");
    }
  }, {
    key: "addElement",
    value: function addElement(element) {
      this.element.insertAdjacentElement("afterbegin", element);
      this.element.children[0].style = "position: absolute; top: 0;";
    }
  }, {
    key: "removeElement",
    value: function removeElement(element) {
      element.remove();
    }
  }, {
    key: "template",
    get: function get$$1() {
      return "\n    <div class=\"greeting central--blur\">\n      <div class=\"greeting__logo\"><img src=\"img/logo_big.png\" width=\"201\" height=\"89\" alt=\"Pixel Hunter\"></div>\n      <h1 class=\"greeting__asterisk\">*</h1>\n      <div class=\"greeting__challenge\">\n        <h3>\u041B\u0443\u0447\u0448\u0438\u0435 \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0438-\u0444\u043E\u0442\u043E\u0440\u0435\u0430\u043B\u0438\u0441\u0442\u044B \u0431\u0440\u043E\u0441\u0430\u044E\u0442&nbsp;\u0442\u0435\u0431\u0435&nbsp;\u0432\u044B\u0437\u043E\u0432!</h3>\n        <p>\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0438\u0433\u0440\u044B \u043F\u0440\u043E\u0441\u0442\u044B.<br>\n          \u041D\u0443\u0436\u043D\u043E \u043E\u0442\u043B\u0438\u0447\u0438\u0442\u044C \u0440\u0438\u0441\u0443\u043D\u043E\u043A&nbsp;\u043E\u0442 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 \u0438 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0432\u044B\u0431\u043E\u0440.<br>\n          \u0417\u0430\u0434\u0430\u0447\u0430 \u043A\u0430\u0436\u0435\u0442\u0441\u044F \u0442\u0440\u0438\u0432\u0438\u0430\u043B\u044C\u043D\u043E\u0439, \u043D\u043E \u043D\u0435 \u0434\u0443\u043C\u0430\u0439, \u0447\u0442\u043E \u0432\u0441\u0435 \u0442\u0430\u043A \u043F\u0440\u043E\u0441\u0442\u043E.<br>\n          \u0424\u043E\u0442\u043E\u0440\u0435\u0430\u043B\u0438\u0437\u043C \u043E\u0431\u043C\u0430\u043D\u0447\u0438\u0432 \u0438 \u043A\u043E\u0432\u0430\u0440\u0435\u043D.<br>\n          \u041F\u043E\u043C\u043D\u0438, \u0433\u043B\u0430\u0432\u043D\u043E\u0435 \u2014 \u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043E\u0447\u0435\u043D\u044C \u0432\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044C\u043D\u043E.</p>\n      </div>\n      <div class=\"greeting__continue\"><span><img src=\"img/arrow_right.svg\" width=\"64\" height=\"64\" alt=\"Next\"></span></div>\n    </div>\n    " + new FooterView().template;
    }
  }]);
  return GreetingView;
}(AbstractView);

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

var RulesView = function (_AbstractView) {
  inherits(RulesView, _AbstractView);

  function RulesView() {
    classCallCheck(this, RulesView);
    return possibleConstructorReturn(this, (RulesView.__proto__ || Object.getPrototypeOf(RulesView)).call(this));
  }

  createClass(RulesView, [{
    key: "bind",
    value: function bind() {
      var input = this.element.querySelector(".rules__input");
      var button = this.element.querySelector(".rules__button");
      var backButton = this.element.querySelector(".back");
      var form = this.element.querySelector(".rules__form");
      // имя не может состоять < чем из двух символов
      input.oninput = function () {
        button.disabled = input.value.length < constants.MIN_NAME_LENGTH;
      };

      button.addEventListener("click", function (evt) {
        evt.preventDefault();
        Application.showGame(input.value);
        form.reset();
      });

      backButton.addEventListener("click", function () {
        Application.showGreeting();
      });
    }
  }, {
    key: "template",
    get: function get$$1() {
      return "\n    <header class=\"header\">\n      <div class=\"header__back\">\n        <button class=\"back\">\n          <img src=\"img/arrow_left.svg\" width=\"45\" height=\"45\" alt=\"Back\">\n          <img src=\"img/logo_small.svg\" width=\"101\" height=\"44\">\n        </button>\n      </div>\n    </header>\n    <div class=\"rules\">\n      <h1 class=\"rules__title\">\u041F\u0440\u0430\u0432\u0438\u043B\u0430</h1>\n      <p class=\"rules__description\">\u0423\u0433\u0430\u0434\u0430\u0439 10 \u0440\u0430\u0437 \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0444\u043E\u0442\u043E <img\n        src=\"img/photo_icon.png\" width=\"16\" height=\"16\"> \u0438\u043B\u0438 \u0440\u0438\u0441\u0443\u043D\u043E\u043A <img\n        src=\"img/paint_icon.png\" width=\"16\" height=\"16\" alt=\"\">.<br>\n        \u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044F\u043C\u0438 \u0438\u043B\u0438 \u0440\u0438\u0441\u0443\u043D\u043A\u0430\u043C\u0438 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043E\u0431\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F.<br>\n        \u041D\u0430 \u043A\u0430\u0436\u0434\u0443\u044E \u043F\u043E\u043F\u044B\u0442\u043A\u0443 \u043E\u0442\u0432\u043E\u0434\u0438\u0442\u0441\u044F 30 \u0441\u0435\u043A\u0443\u043D\u0434.<br>\n        \u041E\u0448\u0438\u0431\u0438\u0442\u044C\u0441\u044F \u043C\u043E\u0436\u043D\u043E \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 3 \u0440\u0430\u0437.<br>\n        <br>\n        \u0413\u043E\u0442\u043E\u0432\u044B?\n      </p>\n      <form class=\"rules__form\">\n        <input class=\"rules__input\" type=\"text\" placeholder=\"\u0412\u0430\u0448\u0435 \u0418\u043C\u044F\">\n        <button class=\"rules__button  continue\" type=\"submit\" disabled>Go!</button>\n      </form>\n    </div>\n    " + new FooterView().template;
    }
  }]);
  return RulesView;
}(AbstractView);

var HeaderView = function (_AbstractView) {
  inherits(HeaderView, _AbstractView);

  function HeaderView(state) {
    classCallCheck(this, HeaderView);

    var _this = possibleConstructorReturn(this, (HeaderView.__proto__ || Object.getPrototypeOf(HeaderView)).call(this));

    _this.state = state;
    return _this;
  }

  createClass(HeaderView, [{
    key: "bind",
    value: function bind() {
      var _this2 = this;

      this.element.querySelector(".back").addEventListener("click", function () {
        _this2.onButtonClick();
        _this2.stopFlashing();
      });

      if (this.state.time <= constants.LAST_SEC) {
        this.element.querySelector(".game__timer").classList.add("flashing");
      }
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick() {}
  }, {
    key: "stopFlashing",
    value: function stopFlashing() {
      this.element.querySelector(".game__timer").classList.remove("flashing");
    }
  }, {
    key: "template",
    get: function get$$1() {
      return "\n    <header class=\"header\">\n      <div class=\"header__back\">\n        <button class=\"back\">\n          <img src=\"img/arrow_left.svg\" width=\"45\" height=\"45\" alt=\"Back\">\n          <img src=\"img/logo_small.svg\" width=\"101\" height=\"44\">\n        </button>\n      </div>\n      <h1 class=\"game__timer\">" + this.state.time + "</h1>\n      <div class=\"game__lives\">\n        " + new Array(constants.INITIAL_STATE.lives - this.state.lives).fill("<img src=\"img/heart__empty.svg\" class=\"game__heart\" alt=\"Life\" width=\"32\" height=\"32\">").join("") + "\n        " + new Array(this.state.lives).fill("<img src=\"img/heart__full.svg\" class=\"game__heart\" alt=\"Life\" width=\"32\" height=\"32\">").join("") + "\n      </div>\n    </header>";
    }
  }]);
  return HeaderView;
}(AbstractView);

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

var GameSecondView = function (_AbstractView) {
  inherits(GameSecondView, _AbstractView);

  function GameSecondView(level) {
    classCallCheck(this, GameSecondView);

    var _this = possibleConstructorReturn(this, (GameSecondView.__proto__ || Object.getPrototypeOf(GameSecondView)).call(this));

    _this.question = level.question;
    _this.answers = level.answers;
    return _this;
  }

  createClass(GameSecondView, [{
    key: "onAnswer",
    value: function onAnswer() {}
  }, {
    key: "bind",
    value: function bind() {
      var _this2 = this;

      var form = this.element.querySelector(".game__content");

      form.addEventListener("change", function (evt) {
        var target = evt.target;
        var answer = void 0;

        if (target.tagName === "INPUT") {
          answer = target;
          var userAnswer = answer.value === _this2.answers[0].type;
          _this2.onAnswer(userAnswer);
          form.reset();
        }
      });
    }
  }, {
    key: "template",
    get: function get$$1() {
      return "\n    <div class=\"game\">\n      <p class=\"game__task\">" + this.question + "</p>\n      <form class=\"game__content  game__content--wide\">\n        <div class=\"game__option\">\n          <img src=\"" + this.answers[0].image.url + "\" alt=\"Option 1\" width=\"705\" height=\"455\">\n          <label class=\"game__answer  game__answer--photo\">\n            <input name=\"question1\" type=\"radio\" value=\"photo\">\n            <span>\u0424\u043E\u0442\u043E</span>\n          </label>\n          <label class=\"game__answer  game__answer--wide  game__answer--paint\">\n            <input name=\"question1\" type=\"radio\" value=\"painting\">\n            <span>\u0420\u0438\u0441\u0443\u043D\u043E\u043A</span>\n          </label>\n        </div>\n      </form>\n    </div>";
    }
  }]);
  return GameSecondView;
}(AbstractView);

var GameThirdView = function (_AbstractView) {
  inherits(GameThirdView, _AbstractView);

  function GameThirdView(level) {
    classCallCheck(this, GameThirdView);

    var _this = possibleConstructorReturn(this, (GameThirdView.__proto__ || Object.getPrototypeOf(GameThirdView)).call(this));

    _this.question = level.question;
    _this.answers = level.answers;
    return _this;
  }

  createClass(GameThirdView, [{
    key: "onAnswer",
    value: function onAnswer() {}
  }, {
    key: "bind",
    value: function bind() {
      var _this2 = this;

      var form = this.element.querySelector(".game__content");
      var answer = this.question.includes("\u0444\u043E\u0442\u043E") ? "photo" : "painting";
      var answerUrl = "";

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.answers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.type === answer) {
            answerUrl = item.image.url;
            break;
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

      form.addEventListener("click", function (evt) {
        var target = evt.target;
        var userAnswer = target.children[0].src === answerUrl;
        _this2.onAnswer(userAnswer);
      });
    }
  }, {
    key: "template",
    get: function get$$1() {
      return "\n    <div class=\"game\">\n      <p class=\"game__task\">" + this.question + "</p>\n      <form class=\"game__content  game__content--triple\">\n        <div class=\"game__option\">\n          <img class=\"game__image\" src=\"" + this.answers[0].image.url + "\" alt=\"Option 1\" width=\"304\" height=\"455\">\n        </div>\n        <div class=\"game__option  game__option--selected\">\n          <img class=\"game__image\" src=\"" + this.answers[1].image.url + "\" alt=\"Option 1\" width=\"304\" height=\"455\">\n        </div>\n        <div class=\"game__option\">\n          <img class=\"game__image\" src=\"" + this.answers[2].image.url + "\" alt=\"Option 1\" width=\"304\" height=\"455\">\n        </div>\n      </form>\n    </div>";
    }
  }]);
  return GameThirdView;
}(AbstractView);

var ModalView = function (_AbstractView) {
  inherits(ModalView, _AbstractView);

  function ModalView() {
    classCallCheck(this, ModalView);
    return possibleConstructorReturn(this, (ModalView.__proto__ || Object.getPrototypeOf(ModalView)).call(this));
  }

  createClass(ModalView, [{
    key: "bind",
    value: function bind() {
      var _this2 = this;

      this.element.querySelectorAll(".modal__button").forEach(function (elem) {
        elem.addEventListener("click", function () {
          if (elem.classList.contains("modal__yes")) {
            _this2.onExitClick();
          } else {
            _this2.onContinueClick();
          }
        });
      });

      this.element.style = "position: fixed; top: 0; left: 0; z-index: 1; width: 100%; height: 100vh; background-color: rgba(0, 0, 0, 0.2);";
    }
  }, {
    key: "onExitClick",
    value: function onExitClick() {}
  }, {
    key: "onContinueClick",
    value: function onContinueClick() {}
  }, {
    key: "template",
    get: function get$$1() {
      return "\n    <div class=\"modal\">\n      <p class=\"modal__text\">\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0438\u0433\u0440\u044B \u0431\u0443\u0434\u0443\u0442 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u044B. <span>\u0412\u044B\u0439\u0442\u0438?</span></p>\n      <div class=\"modal__container\">\n        <button class=\"modal__button modal__yes\">\u0414\u0430</button>\n        <button class=\"modal__button modal__no\">\u041D\u0435\u0442</button>\n      </div>\n    </div>";
    }
  }]);
  return ModalView;
}(AbstractView);

var getLevel = function getLevel(game, model) {
  if (game === "two-of-two") {
    return new GameFirstView(model.getCurrentLevel());
  }
  if (game === "tinder-like") {
    return new GameSecondView(model.getCurrentLevel());
  }
  return new GameThirdView(model.getCurrentLevel());
};

var GameScreen = function () {
  function GameScreen(model) {
    classCallCheck(this, GameScreen);

    this.model = model;
    this.header = this._getHeader();
    this.content = this._getNeededView();
    this.statistic = new StatisticView(this.model.state.answers);
    this.footer = new FooterView();

    this.root = document.createElement("div");
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.statistic.element);
    this.root.appendChild(this.footer.element);

    this._interval = null;
  }

  createClass(GameScreen, [{
    key: "_getHeader",
    value: function _getHeader() {
      var _this = this;

      var header = new HeaderView(this.model.state);
      header.onButtonClick = function () {
        _this._stopGame();
        _this.root.appendChild(_this._getModal().element);
      };

      return header;
    }
  }, {
    key: "_getModal",
    value: function _getModal() {
      var _this2 = this;

      var modal = new ModalView();
      modal.onExitClick = function () {
        Application.showGreeting();
      };
      modal.onContinueClick = function () {
        _this2.root.lastChild.remove();
        _this2._startTimer();
      };
      return modal;
    }
  }, {
    key: "_stopGame",
    value: function _stopGame() {
      clearInterval(this._interval);
    }
  }, {
    key: "_startTimer",
    value: function _startTimer() {
      var _this3 = this;

      this._interval = setInterval(function () {
        _this3.model.tick();
        if (_this3.model.state.time <= 0) {
          _this3._stopGame();
          _this3._userAnswer(false);
        }
        _this3._updateHeader();
      }, 1000);
    }
  }, {
    key: "_getNeededView",
    value: function _getNeededView() {
      var gameType = this.model.data[this.model.state.level].type;
      return getLevel(gameType, this.model);
    }
  }, {
    key: "init",
    value: function init() {
      this._changeLevel();
      this._startTimer();
    }
  }, {
    key: "_userAnswer",
    value: function _userAnswer(answer) {
      this._stopGame();
      this.model.addAnswer(answer);

      if (!answer) {
        this.model.die();
      }

      if (this.model.isDead() || !this.model.hasNextLevel()) {
        if (!this.model.isDead()) {
          this.model.win();
        }
        this._endGame();
      } else {
        this.model.nextLevel();
        this.init();
      }
    }
  }, {
    key: "_endGame",
    value: function _endGame() {
      Application.showResults(this.model);
      this.model.restart();
    }
  }, {
    key: "_updateHeader",
    value: function _updateHeader() {
      var header = this._getHeader();
      this.root.replaceChild(header.element, this.header.element);
      this.header = header;
    }
  }, {
    key: "_updateStatistic",
    value: function _updateStatistic() {
      var statistic = new StatisticView(this.model.state.answers);
      this.root.replaceChild(statistic.element, this.statistic.element);
      this.statistic = statistic;
    }
  }, {
    key: "_changeLevel",
    value: function _changeLevel() {
      this.model.rebootTime();
      this._updateHeader();
      this._updateStatistic();

      var gameType = this.model.getCurrentLevel().type;
      var level = getLevel(gameType, this.model);
      level.onAnswer = this._userAnswer.bind(this);
      this._changeContentView(level);
    }
  }, {
    key: "_changeContentView",
    value: function _changeContentView(view) {
      this.root.replaceChild(view.element, this.content.element);
      this.content = view;
    }
  }, {
    key: "element",
    get: function get$$1() {
      return this.root;
    }
  }]);
  return GameScreen;
}();

var initialGame = {
  lives: 3,
  time: 30,
  win: false,
  level: 0
};

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

var SplashScreen = function (_AbstractView) {
  inherits(SplashScreen, _AbstractView);

  function SplashScreen() {
    classCallCheck(this, SplashScreen);
    return possibleConstructorReturn(this, (SplashScreen.__proto__ || Object.getPrototypeOf(SplashScreen)).call(this));
  }

  createClass(SplashScreen, [{
    key: "fadeOut",
    value: function fadeOut() {
      this.element.classList.add("fade--out");
    }
  }, {
    key: "template",
    get: function get$$1() {
      return "\n    <div id=\"main\" class=\"central__content\">\n      <div id=\"intro\" class=\"intro\">\n        <h1 class=\"intro__asterisk load\">*</h1>\n        <p class=\"intro__motto\"><sup>*</sup> \u042D\u0442\u043E \u043D\u0435 \u0444\u043E\u0442\u043E. \u042D\u0442\u043E \u0440\u0438\u0441\u0443\u043D\u043E\u043A \u043C\u0430\u0441\u043B\u043E\u043C \u043D\u0438\u0434\u0435\u0440\u043B\u0430\u043D\u0434\u0441\u043A\u043E\u0433\u043E \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u0430-\u0444\u043E\u0442\u043E\u0440\u0435\u0430\u043B\u0438\u0441\u0442\u0430 Tjalf Sparnaay.</p>\n      </div>\n    </div>";
    }
  }]);
  return SplashScreen;
}(AbstractView);

var DEFAULT_NAME = "\u041D\u0435\u043E\u043F\u043E\u0437\u043D\u0430\u043D\u043D\u044B\u0439 \u0432\u043E\u043C\u0431\u0430\u0442";
var APP_ID = 13111983;

var checkStatus = function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    throw new Error(response.status + ": " + response.statusText);
  }
};

var toJSON = function toJSON(response) {
  return response.json();
};

var Loader = function () {
  function Loader() {
    classCallCheck(this, Loader);
  }

  createClass(Loader, null, [{
    key: "loadData",
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(constants.SERVER_URL + "/questions");

              case 2:
                response = _context.sent;

                checkStatus(response);
                _context.next = 6;
                return toJSON(response);

              case 6:
                return _context.abrupt("return", _context.sent);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _ref.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "loadResults",
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_NAME;
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch(constants.SERVER_URL + "/stats/" + APP_ID + "-" + name);

              case 2:
                response = _context2.sent;

                checkStatus(response);
                _context2.next = 6;
                return toJSON(response);

              case 6:
                return _context2.abrupt("return", _context2.sent);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadResults() {
        return _ref2.apply(this, arguments);
      }

      return loadResults;
    }()
  }, {
    key: "saveResults",
    value: function () {
      var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_NAME;
        var requestSettings, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                requestSettings = {
                  body: JSON.stringify(data),
                  headers: {
                    'Content-Type': "application/json"
                  },
                  method: "POST"
                };
                _context3.next = 3;
                return fetch(constants.SERVER_URL + "/stats/" + APP_ID + "-" + name, requestSettings);

              case 3:
                response = _context3.sent;
                return _context3.abrupt("return", checkStatus(response));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function saveResults(_x3) {
        return _ref3.apply(this, arguments);
      }

      return saveResults;
    }()
  }]);
  return Loader;
}();

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

var ManyResultsView = function (_AbstractView) {
  inherits(ManyResultsView, _AbstractView);

  function ManyResultsView(data) {
    classCallCheck(this, ManyResultsView);

    var _this = possibleConstructorReturn(this, (ManyResultsView.__proto__ || Object.getPrototypeOf(ManyResultsView)).call(this));

    _this.data = data.reverse();
    _this.win = _this.data[0].win;
    _this.results = [];

    // выодить только три последних результата
    for (var i = 0; i < Math.min(constants.MAX_RESULTS_NUMBER, _this.data.length); i++) {
      _this.results.push(new GameResultsView(_this.data[i], i + 1).template);
    }
    return _this;
  }

  createClass(ManyResultsView, [{
    key: "bind",
    value: function bind() {
      var backButton = this.element.querySelector(".back");

      backButton.onclick = function () {
        Application.showGreeting();
      };
    }
  }, {
    key: "template",
    get: function get$$1() {
      return "\n    <header class=\"header\">\n      <div class=\"header__back\">\n        <button class=\"back\">\n          <img src=\"img/arrow_left.svg\" width=\"45\" height=\"45\" alt=\"Back\">\n          <img src=\"img/logo_small.svg\" width=\"101\" height=\"44\">\n        </button>\n      </div>\n    </header>\n    <div class=\"result\">\n      <h1>" + (this.win === true ? "\u041F\u043E\u0431\u0435\u0434\u0430! \uD83D\uDC81\u200D\u2642\uFE0F" : "\u041F\u043E\u0440\u0430\u0436\u0435\u043D\u0438\u0435! \uD83E\uDD26\u200D") + "</h1>\n      " + this.results + "\n    </div>\n    " + new FooterView().template;
    }
  }]);
  return ManyResultsView;
}(AbstractView);

var changeScreen = function changeScreen(domElement) {
  var screen = document.querySelector(".central");
  screen.innerHTML = "";
  screen.appendChild(domElement);
};

var gameData = void 0;

var pause = function pause(time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, time);
  });
};

var Application = function () {
  function Application() {
    classCallCheck(this, Application);
  }

  createClass(Application, null, [{
    key: "start",
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var splash, greeting;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                splash = new SplashScreen();
                greeting = new GreetingView();

                greeting.hide();
                greeting.addElement(splash.element);
                changeScreen(greeting.element);
                _context.prev = 5;
                _context.next = 8;
                return Loader.loadData();

              case 8:
                gameData = _context.sent;

                greeting.fadeIn();
                splash.fadeOut();
                _context.next = 13;
                return pause(constants.PAUSE_TIME);

              case 13:
                greeting.removeElement(splash.element);
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](5);

                showErrorMessage(_context.t0);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 16]]);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "showGreeting",
    value: function showGreeting() {
      var greeting = new GreetingView();
      changeScreen(greeting.element);
    }
  }, {
    key: "showRules",
    value: function showRules() {
      var rules = new RulesView();
      changeScreen(rules.element);
    }
  }, {
    key: "showGame",
    value: function showGame(player) {
      var game = new GameScreen(new GameModel(gameData, player));
      changeScreen(game.element);
      game.init();
    }
  }, {
    key: "showResults",
    value: function () {
      var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(model) {
        var playerName, results;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                playerName = model.player;
                _context2.prev = 1;
                _context2.next = 4;
                return Loader.saveResults(model.state, playerName);

              case 4:
                _context2.t0 = ManyResultsView;
                _context2.next = 7;
                return Loader.loadResults(playerName);

              case 7:
                _context2.t1 = _context2.sent;
                _context2.t2 = playerName;
                results = new _context2.t0(_context2.t1, _context2.t2);

                changeScreen(results.element);
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t3 = _context2["catch"](1);

                showErrorMessage(_context2.t3);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 13]]);
      }));

      function showResults(_x) {
        return _ref2.apply(this, arguments);
      }

      return showResults;
    }()
  }]);
  return Application;
}();

return Application;

}());

//# sourceMappingURL=application.js.map

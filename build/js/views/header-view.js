var headerView = (function () {
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

return HeaderView;

}());

//# sourceMappingURL=header-view.js.map

var gameSecondView = (function () {
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

return GameSecondView;

}());

//# sourceMappingURL=game-second-view.js.map

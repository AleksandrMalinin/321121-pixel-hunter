var gameThirdView = (function () {
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

return GameThirdView;

}());

//# sourceMappingURL=game-third-view.js.map

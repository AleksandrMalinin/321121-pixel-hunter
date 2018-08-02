var splashScreen = (function () {
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

return SplashScreen;

}());

//# sourceMappingURL=splash-screen.js.map

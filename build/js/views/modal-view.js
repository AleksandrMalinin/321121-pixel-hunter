var modalView = (function () {
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

return ModalView;

}());

//# sourceMappingURL=modal-view.js.map

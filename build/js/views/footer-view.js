var footerView = (function () {
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

return FooterView;

}());

//# sourceMappingURL=footer-view.js.map

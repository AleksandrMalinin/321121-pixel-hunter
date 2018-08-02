var loader = (function () {
'use strict';

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

return Loader;

}());

//# sourceMappingURL=loader.js.map

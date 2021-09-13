"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// noinspection JSUnresolvedVariable
var OmniMailer = /*#__PURE__*/function () {
  function OmniMailer() {
    _classCallCheck(this, OmniMailer);
  }

  _createClass(OmniMailer, null, [{
    key: "init",

    /**
     * Initialize front-end functionality once DOM is loaded entirely.
     */
    value: function init() {
      var _this = this;

      var ready = function ready(callback) {
        if (document.readyState !== "loading") callback();else window.addEventListener("DOMContentLoaded", callback);
      };
      /**
       * Retrieve all OmniMailer forms available and initialize their classes.
       */


      ready(function () {
        if (_this.getQueryVar("optin_id")) {
          var _x = wp.i18n._x;

          _this.optIn().then(function (response) {
            try {
              if (response.success === true && response.data.response.code === 200) {
                OmniMailerNotificationHandler.showSuccessNotification("omnimailer-push-notification", _x("Thank you for subscribing!", "After Opt-In", "omnimailer"));
              } else {
                if (response.data) {
                  OmniMailerNotificationHandler.showErrorNotification("omnimailer-push-notification", OmniMailerMessages[response.data.service][response.data.response.code].message);
                } else {
                  OmniMailerNotificationHandler.showErrorNotification("omnimailer-push-notification", _x("Your activation code was already used or could not be verified. If your code is older than 48 hours, please re-submit the form.", "After Opt-In", "omnimailer"));
                }
              }
            } catch (error) {
              OmniMailerNotificationHandler.showErrorNotification("omnimailer-push-notification", _x("The following error happened while checking your activation code: ", "After Opt-In", "omnimailer") + error);
            }
          });
        }
      });
    }
  }, {
    key: "ajaxCall",
    value: function () {
      var _ajaxCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        var params, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = new URLSearchParams(data);
                /**
                 * Calls using fetch() must be application/x-www-form-urlencoded
                 * and same-origin.
                 */

                _context.next = 3;
                return fetch(OmniMailer.getAjaxURL(), {
                  method: "POST",
                  credentials: "same-origin",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache"
                  },
                  body: params.toString()
                });

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                return _context.abrupt("return", _context.sent);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function ajaxCall(_x2) {
        return _ajaxCall.apply(this, arguments);
      }

      return ajaxCall;
    }()
    /**
     * Adds a set of optional data to an existing set of data.
     */

  }, {
    key: "addOptionalFieldsToData",
    value: function addOptionalFieldsToData(data, optional) {
      for (var _i = 0, _Object$entries = Object.entries(optional); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        if (value) data[key] = value;
      }

      return data;
    }
  }, {
    key: "optIn",
    value: function () {
      var _optIn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = {
                  action: "omnimailer_event_ajax_handler",
                  security: OmniMailer.getAjaxNonce(),
                  handle: "optin",
                  uuid: this.getQueryVar("optin_id")
                };
                _context2.next = 3;
                return this.ajaxCall(data);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function optIn() {
        return _optIn.apply(this, arguments);
      }

      return optIn;
    }()
  }, {
    key: "getQueryVar",
    value: function getQueryVar(param) {
      var params = new URLSearchParams(window.location.search);
      return params.get(param);
    }
  }, {
    key: "getAjaxURL",
    value: function getAjaxURL() {
      return omniMailerParams.url;
    }
  }, {
    key: "getAjaxNonce",
    value: function getAjaxNonce() {
      return omniMailerParams.nonce;
    }
  }, {
    key: "isDoubleOptIn",
    value: function isDoubleOptIn() {
      return omniMailerParams.isDoubleOptIn === "1";
    }
  }, {
    key: "useHoneypot",
    value: function useHoneypot() {
      return omniMailerParams.useHoneypot === "1";
    }
  }]);

  return OmniMailer;
}();

OmniMailer.init();
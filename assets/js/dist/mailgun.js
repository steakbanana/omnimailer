"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// noinspection JSUnresolvedVariable
var OmniMailerMailgun = /*#__PURE__*/function () {
  function OmniMailerMailgun() {
    _classCallCheck(this, OmniMailerMailgun);
  }

  _createClass(OmniMailerMailgun, null, [{
    key: "callAPI",

    /**
     * Call the backend AJAX handler for an API call, wait for
     * its response and return it.
     */
    value: function () {
      var _callAPI = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data.service = "mailgun";
                data.action = "omnimailer_form_ajax_handler";
                data.security = OmniMailer.getAjaxNonce();
                _context.next = 5;
                return OmniMailer.ajaxCall(data);

              case 5:
                return _context.abrupt("return", _context.sent);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function callAPI(_x) {
        return _callAPI.apply(this, arguments);
      }

      return callAPI;
    }()
  }]);

  return OmniMailerMailgun;
}();
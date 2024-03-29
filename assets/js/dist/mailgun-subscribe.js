"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var OmniMailerMailgunSubscribeForm = /*#__PURE__*/function (_OmniMailerForm) {
  _inherits(OmniMailerMailgunSubscribeForm, _OmniMailerForm);

  var _super = _createSuper(OmniMailerMailgunSubscribeForm);

  function OmniMailerMailgunSubscribeForm(form) {
    _classCallCheck(this, OmniMailerMailgunSubscribeForm);

    return _super.call(this, form);
  }

  _createClass(OmniMailerMailgunSubscribeForm, [{
    key: "init",
    value: function init() {
      var _this = this;

      _get(_getPrototypeOf(OmniMailerMailgunSubscribeForm.prototype), "init", this).call(this);

      var __ = wp.i18n.__;
      /**
       * Handle form submission.
       */

      this.submitButton.addEventListener("click", function (event) {
        _this.onSubmit(event);

        if (_this.isValid) {
          _this.overlay.classList.remove("hide");

          var data = {
            api_action: "subscribe",
            email: _this.values.email,
            list: _this.form.getAttribute("data-omnimailer-form-list")
          };
          var optional = {
            name: _this.values.name
          };
          data = OmniMailer.addOptionalFieldsToData(data, optional);
          /**
           * Call API and wait for a response to output.
           */

          _this.callAPIAndHandleResponse(data);
        }
      });
    }
  }, {
    key: "getResponseText",
    value: function getResponseText(code) {
      return {
        heading: OmniMailerMessages.mailgun[code].heading,
        message: OmniMailerMessages.mailgun[code].message,
        type: OmniMailerMessages.mailgun[code].type
      };
    }
  }]);

  return OmniMailerMailgunSubscribeForm;
}(OmniMailerForm);
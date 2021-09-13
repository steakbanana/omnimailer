"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OmniMailerNotification = /*#__PURE__*/function () {
  function OmniMailerNotification(type, data) {
    _classCallCheck(this, OmniMailerNotification);

    this.type = type;
    this.data = data;
  }
  /**
   * Check if a notification is congruent with its data scheme
   */


  _createClass(OmniMailerNotification, [{
    key: "validate",
    value: function validate(allowedData) {
      var isValid = true;

      for (var _i = 0, _Object$keys = Object.keys(this.data); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];

        if (!allowedData.includes(key)) {
          isValid = false;
          break;
        }
      }

      return isValid;
    }
    /**
     * Creates a template clone for the requested notification, fills
     * its data fields and returns it.
     */

  }, {
    key: "createInstance",
    value: function createInstance(template) {
      var clone = template.cloneNode(true);
      var handle = clone.getAttribute("id").replace("-template", "");
      clone.removeAttribute("id");
      clone = this.attachEventHandler(clone, handle);

      for (var _i2 = 0, _Object$entries = Object.entries(this.data); _i2 < _Object$entries.length; _i2++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        var templateNode = clone.querySelector("[data-" + handle + "='" + key + "']");
        if (templateNode) templateNode.textContent = value;
      }

      return clone;
    }
    /**
     * Attaches an event handler to fire a DOM event whenever
     * an instance is closed to alert the queue and returns the instance.
     */

  }, {
    key: "attachEventHandler",
    value: function attachEventHandler(instance, handle) {
      var closeEvent = new CustomEvent(handle + "-queue");
      var closeButton = instance.querySelector("[data-" + handle + "='close-button']");

      if (closeButton) {
        closeButton.addEventListener("click", function (event) {
          event.preventDefault();
          instance.classList.add("hide");
          instance.dispatchEvent(closeEvent);
        });
      }

      return instance;
    }
  }]);

  return OmniMailerNotification;
}();

var OmniMailerPushNotification = /*#__PURE__*/function (_OmniMailerNotificati) {
  _inherits(OmniMailerPushNotification, _OmniMailerNotificati);

  var _super = _createSuper(OmniMailerPushNotification);

  function OmniMailerPushNotification(type, data) {
    var _this;

    _classCallCheck(this, OmniMailerPushNotification);

    _this = _super.call(this, type, data);
    var allowedData = ["message"];
    var template = document.getElementById("omnimailer-push-notification-template");
    if (_this.validate(allowedData)) _this.instance = _this.createInstance(template);
    return _this;
  }

  return OmniMailerPushNotification;
}(OmniMailerNotification);

var OmniMailerFieldAlert = /*#__PURE__*/function (_OmniMailerNotificati2) {
  _inherits(OmniMailerFieldAlert, _OmniMailerNotificati2);

  var _super2 = _createSuper(OmniMailerFieldAlert);

  function OmniMailerFieldAlert(type, data) {
    var _this2;

    _classCallCheck(this, OmniMailerFieldAlert);

    _this2 = _super2.call(this, type, data);
    _this2.type = "error";
    var allowedData = ["message"];
    var template = document.getElementById("omnimailer-field-alert-template");
    if (_this2.validate(allowedData)) _this2.instance = _this2.createInstance(template);
    return _this2;
  }

  return OmniMailerFieldAlert;
}(OmniMailerNotification);

var OmniMailerFormAlert = /*#__PURE__*/function (_OmniMailerNotificati3) {
  _inherits(OmniMailerFormAlert, _OmniMailerNotificati3);

  var _super3 = _createSuper(OmniMailerFormAlert);

  function OmniMailerFormAlert(type, data) {
    var _this3;

    _classCallCheck(this, OmniMailerFormAlert);

    _this3 = _super3.call(this, type, data);
    _this3.type = "error";
    var allowedData = ["message", "heading"];
    var template = document.getElementById("omnimailer-form-alert-template");

    if (_this3.validate(allowedData)) {
      _this3.instance = _this3.createInstance(template);
    }

    return _this3;
  }

  return OmniMailerFormAlert;
}(OmniMailerNotification);
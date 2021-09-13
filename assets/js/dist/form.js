"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// noinspection JSUnresolvedVariable
var OmniMailerForm = /*#__PURE__*/function () {
  function OmniMailerForm(form) {
    _classCallCheck(this, OmniMailerForm);

    this.form = form;
    this.handle = this.form.getAttribute("data-omnimailer-form-handle");
    this.overlay = this.getOverlay();
    this.messagePanel = this.getMessagePanel();
    this.submitButton = this.getSubmitButton();
    this.isValid = false;
  }
  /**
   * Adds event listeners to form elements.
   */


  _createClass(OmniMailerForm, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.messagePanel.closeButton.addEventListener("click", function (event) {
        event.preventDefault();

        _this.clearMessagePanel();
      });
    }
  }, {
    key: "getOverlay",
    value: function getOverlay() {
      return this.form.querySelector(".loader-overlay");
    }
  }, {
    key: "getMessagePanel",
    value: function getMessagePanel() {
      return {
        panel: this.form.querySelector(".omnimailer-form-message"),
        heading: this.form.querySelector(".omnimailer-form-message-heading"),
        text: this.form.querySelector(".omnimailer-form-message-text"),
        closeButton: this.form.querySelector(".omnimailer-form-message-close-button")
      };
    }
  }, {
    key: "getSubmitButton",
    value: function getSubmitButton() {
      return this.form.querySelector("button[type=submit]");
    }
    /**
     * Shows a message on the form's message panel.
     */

  }, {
    key: "showMessage",
    value: function showMessage(heading, message) {
      this.messagePanel.heading.textContent = heading;
      this.messagePanel.text.textContent = message;
      this.messagePanel.panel.classList.remove("hide");
      this.messagePanel.panel.scrollIntoView();
    }
    /**
     * Clears the form's message panel and hides it.
     */

  }, {
    key: "clearMessagePanel",
    value: function clearMessagePanel() {
      this.messagePanel.panel.classList.add("hide");
      this.messagePanel.heading.textContent = "";
      this.messagePanel.text.textContent = "";
      this.messagePanel.panel.classList.remove("success", "error");
    }
    /**
     * Prepares the form's message panel for a message indicating success.
     */

  }, {
    key: "showSuccessMessage",
    value: function showSuccessMessage(heading, message) {
      this.clearMessagePanel();
      this.messagePanel.panel.classList.add("success");
      this.showMessage(heading, message);
    }
    /**
     * Prepares the form's message panel for a message indicating failure.
     */

  }, {
    key: "showErrorMessage",
    value: function showErrorMessage(heading, message) {
      this.clearMessagePanel();
      this.messagePanel.panel.classList.add("error");
      this.showMessage(heading, message);
    }
    /**
     * Validates the form fields by checking if any transmitted fields are
     * empty or the value does not match a certain format.
     */

  }, {
    key: "validate",
    value: function validate(values) {
      var __ = wp.i18n.__;
      var result = true;

      for (var _i = 0, _Object$entries = Object.entries(values); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        var field = this.form.querySelector("[data-omnimailer-form='" + key + "']");

        if (value) {
          this.removeAlert(field);
        } else {
          this.alert(field, __("This field is mandatory.", "omnimailer"));
          result = false;
        }
      }

      var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,10})$/;
      var emailField = this.form.querySelector("[data-omnimailer-form='email']");

      if (emailField) {
        if (emailField.value && regex.test(emailField.value)) {
          this.removeAlert(emailField);
        } else {
          this.alert(emailField, __("Please enter a valid e-mail address.", "omnimailer"));
          result = false;
        }
      }

      if (OmniMailer.useHoneypot()) {
        var homepageFieldLabel = this.form.querySelector(".homepage-field-label");
        var homepageField = homepageFieldLabel.querySelector("input");

        if (homepageField) {
          if (homepageField.value) {
            this.removeAlert(homepageField);
            result = false;
          } else {
            this.alert(homepageField, __("This field is mandatory.", "omnimailer"));
          }
        }
      }

      return result;
    }
    /**
     * Add alert classes to a form element indicating incorrect user input.
     */

  }, {
    key: "alert",
    value: function alert(element, message) {
      var sibling = element.nextElementSibling;
      element.classList.remove("success");
      element.classList.add("error");

      if (sibling && sibling.classList.contains("checkbox-label")) {
        sibling.classList.add("error");
      } else {
        OmniMailerNotificationHandler.showErrorNotification('omnimailer-field-alert', message, element.parentNode);
      }
    }
    /**
     * Remove any alert classes from a form element and add success
     * classes indicating correct user input.
     */

  }, {
    key: "removeAlert",
    value: function removeAlert(element) {
      var sibling = element.nextElementSibling;
      element.classList.remove("error");
      element.classList.add("success");

      if (sibling && sibling.classList.contains("checkbox-label")) {
        sibling.classList.remove("error");
      } else {
        var notification = element.parentNode.querySelector(".omnimailer-field-alert");

        if (notification) {
          OmniMailerNotificationHandler.hideNotification(notification);
        }
      }
    }
    /**
     * Clear the entire form.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.form.querySelectorAll("input").forEach(function (element) {
        element.classList.remove("success", "error");
        element.getAttribute("type") !== "checkbox" ? element.value = "" : element.checked = false;
      });
    }
    /**
     * Aggregate input values of mandatory fields and validate them.
     */

  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      var _this2 = this;

      event.preventDefault();
      this.values = {};
      this.form.querySelectorAll(".mandatory").forEach(function (element) {
        var key = element.getAttribute("data-omnimailer-form");
        _this2.values[key] = element.getAttribute("type") !== "checkbox" ? element.value : element.checked;
      });
      this.isValid = this.validate(this.values);
      this.form.querySelectorAll("[data-omnimailer-form]:not(.mandatory)").forEach(function (element) {
        var key = element.getAttribute("data-omnimailer-form");
        _this2.values[key] = element.getAttribute("type") !== "checkbox" ? element.value : element.checked;
      });
    }
  }, {
    key: "callAPIAndHandleResponse",
    value: function callAPIAndHandleResponse(data) {
      var _this3 = this;

      OmniMailerMailgun.callAPI(data).then(function (response) {
        if (response.success === true) {
          try {
            var responseCode = response.data.response.code;

            if (responseCode) {
              var responseText = _this3.getResponseText(responseCode);

              if (responseText.type === "success") {
                _this3.showSuccessMessage(responseText.heading, responseText.message);

                _this3.clear();
              } else {
                _this3.showErrorMessage(responseText.heading, responseText.message);
              }
            }
          } catch (error) {
            _this3.showErrorMessage(OmniMailerMessages.genericErrorHeading, __("The following error occurred while displaying this message: ", "omnimailer") + error);
          }
        } else {
          _this3.showErrorMessage(OmniMailerMessages.genericErrorHeading, __("Please check your connectivity. If the error persists, try again later.", "omnimailer"));
        }

        _this3.overlay.classList.add("hide");
      });
    }
  }]);

  return OmniMailerForm;
}();
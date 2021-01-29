"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OmniMailerMailgunForm = /*#__PURE__*/function () {
  function OmniMailerMailgunForm() {
    _classCallCheck(this, OmniMailerMailgunForm);
  }

  _createClass(OmniMailerMailgunForm, null, [{
    key: "init",

    /**
     * Initialize a form's specific class.
     */
    value: function init(element, handle) {
      try {
        switch (handle) {
          case 'subscribe':
            var form = new OmniMailerMailgunSubscribeForm(element);
            form.init();
            break;
        }
      } catch (error) {
        console.log("OmniMailerMailgunForm: A form could not be initialized because the following error occurred: " + error);
      }
    }
  }]);

  return OmniMailerMailgunForm;
}();
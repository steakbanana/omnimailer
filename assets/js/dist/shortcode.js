"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// noinspection JSUnresolvedVariable
var OmniMailerShortcode = /*#__PURE__*/function () {
  function OmniMailerShortcode() {
    _classCallCheck(this, OmniMailerShortcode);
  }

  _createClass(OmniMailerShortcode, null, [{
    key: "init",

    /**
     * Initialize front-end functionality once DOM is loaded entirely.
     */
    value: function init() {
      var ready = function ready(callback) {
        if (document.readyState !== "loading") callback();else window.addEventListener("DOMContentLoaded", callback);
      };
      /**
       * Retrieve all OmniMailer forms available and initialize their classes.
       */


      ready(function () {
        var forms = document.querySelectorAll(".omnimailer-form");
        forms.forEach(function (element) {
          var service = element.getAttribute("data-omnimailer-form-service");
          var handle = element.getAttribute("data-omnimailer-form-handle");

          switch (service) {
            case 'mailgun':
              OmniMailerMailgunForm.init(element, handle);
          }
        });
      });
    }
  }]);

  return OmniMailerShortcode;
}();

OmniMailerShortcode.init();
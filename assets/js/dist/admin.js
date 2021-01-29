"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OmniMailerAdmin = /*#__PURE__*/function () {
  function OmniMailerAdmin() {
    _classCallCheck(this, OmniMailerAdmin);
  }

  _createClass(OmniMailerAdmin, null, [{
    key: "init",

    /**
     * Initialize admin functionality once DOM is loaded entirely.
     */
    value: function init() {
      var ready = function ready(callback) {
        if (document.readyState !== "loading") callback();else window.addEventListener("DOMContentLoaded", callback);
      };

      ready(function () {
        console.log("OmniMailer Admin");
      });
    }
  }]);

  return OmniMailerAdmin;
}();

OmniMailerAdmin.init();
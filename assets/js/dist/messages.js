"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OmniMailerMessages = function OmniMailerMessages() {
  _classCallCheck(this, OmniMailerMessages);
};

_defineProperty(OmniMailerMessages, "__", wp.i18n.__);

_defineProperty(OmniMailerMessages, "_x", wp.i18n._x);

_defineProperty(OmniMailerMessages, "genericErrorHeading", OmniMailerMessages.__("An error occurred", "omnimailer"));

_defineProperty(OmniMailerMessages, "mailgun", {
  200: {
    heading: OmniMailer.isDoubleOptIn() ? OmniMailerMessages.__("You've got mail!", "omnimailer") : OmniMailerMessages.__("Subscription successful!", "omnimailer"),
    message: OmniMailer.isDoubleOptIn() ? OmniMailerMessages.__("We sent you a confirmation e-mail to make sure you really want to receive our e-mails. Please check your e-mail inbox and click the activation link in our e-mail to confirm your subscription.", "omnimailer") : OmniMailerMessages.__("Thank you for subscribing.", "omnimailer"),
    type: "success"
  },
  400: {
    heading: OmniMailerMessages.genericErrorHeading,
    message: OmniMailerMessages.__("(400) It seems that you are already subscribed to this list. If you wish to unsubscribe, please click the unsubscribe link at the bottom of one of our e-mails.", "omnimailer"),
    type: "error"
  },
  401: {
    heading: OmniMailerMessages.genericErrorHeading,
    message: OmniMailerMessages.__("(401) Some permissions are missing to add you to the list. Please contact us if this error persists.", "omnimailer"),
    type: "error"
  },
  404: {
    heading: OmniMailerMessages.genericErrorHeading,
    message: OmniMailerMessages.__("(404) This list does not exist. Please contact us if this error persists.", "omnimailer"),
    type: "error"
  },
  500: {
    heading: OmniMailerMessages.genericErrorHeading,
    message: OmniMailer.isDoubleOptIn() ? OmniMailerMessages.__("(500) It seems you already tried subscribing to this list. Please click the confirmation link in the e-mail we sent to your inbox to activate your subscription.", "omnimailer") : OmniMailerMessages.__("(500) It seems that you are already subscribed to this list. If you wish to unsubscribe, please click the unsubscribe link at the bottom of one of our e-mails.", "omnimailer"),
    type: "error"
  },
  503: {
    heading: OmniMailerMessages.genericErrorHeading,
    message: OmniMailerMessages.__("(503) Our database server appears to have some trouble. Please kindly try again later and contact us if this error persists.", "omnimailer"),
    type: "error"
  }
});
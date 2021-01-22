class OmniMailerMessages {

    static __ = wp.i18n.__;
    static _x = wp.i18n._x;

    static genericErrorHeading = this.__("An error occurred", "omnimailer");

    static mailgun = {
        200: {
            heading: OmniMailer.isDoubleOptIn() ? this.__("You've got mail!", "omnimailer") : this.__("Subscription successful!", "omnimailer"),
            message: OmniMailer.isDoubleOptIn() ? this.__("We sent you a confirmation e-mail to make sure you really want to receive our e-mails. Please check your e-mail inbox and click the activation link in our e-mail to confirm your subscription.", "omnimailer") : this.__("Thank you for subscribing.", "omnimailer"),
            type: "success",
        },
        400: {
            heading: this.genericErrorHeading,
            message: this.__("(400) It seems that you are already subscribed to this list. If you wish to unsubscribe, please click the unsubscribe link at the bottom of one of our e-mails.", "omnimailer"),
            type: "error",
        },
        401: {
            heading: this.genericErrorHeading,
            message: this.__("(401) Some permissions are missing to add you to the list. Please contact us if this error persists.", "omnimailer"),
            type: "error",
        },
        404: {
            heading: this.genericErrorHeading,
            message: this.__("(404) This list does not exist. Please contact us if this error persists.", "omnimailer"),
            type: "error",
        },
        500: {
            heading: this.genericErrorHeading,
            message: OmniMailer.isDoubleOptIn() ? this.__("(500) It seems you already tried subscribing to this list. Please click the confirmation link in the e-mail we sent to your inbox to activate your subscription.", "omnimailer") : this.__("(500) It seems that you are already subscribed to this list. If you wish to unsubscribe, please click the unsubscribe link at the bottom of one of our e-mails.", "omnimailer"),
            type: "error",
        },
        503: {
            heading: this.genericErrorHeading,
            message: this.__("(503) Our database server appears to have some trouble. Please kindly try again later and contact us if this error persists.", "omnimailer"),
            type: "error",
        },
    }

}
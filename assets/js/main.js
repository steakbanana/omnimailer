// noinspection JSUnresolvedVariable
class OmniMailer {

    /**
     * Initialize front-end functionality once DOM is loaded entirely.
     */
    static init() {
        let ready = (callback) => {
            if(document.readyState !== "loading") callback();
            else window.addEventListener("DOMContentLoaded", callback);
        }

        /**
         * Retrieve all OmniMailer forms available and initialize their classes.
         */
        ready(() => {
            if(this.getQueryVar("optin_id")) {
                const _x = wp.i18n._x;

                this.optIn().then((response) => {
                    try {
                        if(response.success === true && response.data.response.code === 200) {
                            OmniMailerNotificationHandler.showSuccessNotification(
                                "omnimailer-push-notification",
                                _x("Thank you for subscribing!", "After Opt-In", "omnimailer")
                            );
                        }
                        else {
                            if(response.data) {
                                OmniMailerNotificationHandler.showErrorNotification(
                                    "omnimailer-push-notification",
                                    OmniMailerMessages[response.data.service][response.data.response.code].message
                                );
                            }
                            else {
                                OmniMailerNotificationHandler.showErrorNotification(
                                    "omnimailer-push-notification",
                                    _x("Your activation code was already used or could not be verified. If your code is older than 48 hours, please re-submit the form.", "After Opt-In", "omnimailer")
                                );
                            }
                        }
                    }
                    catch(error) {
                        OmniMailerNotificationHandler.showErrorNotification(
                            "omnimailer-push-notification",
                            _x("The following error happened while checking your activation code: ", "After Opt-In", "omnimailer") + error
                        );
                    }
                });
            }
        });
    }

    static async ajaxCall(data) {
        let params = new URLSearchParams(data);

        /**
         * Calls using fetch() must be application/x-www-form-urlencoded
         * and same-origin.
         */
        let response = await fetch(OmniMailer.getAjaxURL(), {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache",
            },
            body: params.toString()
        });

        return await response.json();
    }

    /**
     * Adds a set of optional data to an existing set of data.
     */
    static addOptionalFieldsToData(data, optional) {
        for(const [key, value] of Object.entries(optional)) {
            if(value)
                data[key] = value;
        }

        return data;
    }

    static async optIn() {
        let data = {
            action: "omnimailer_event_ajax_handler",
            security: OmniMailer.getAjaxNonce(),
            handle: "optin",
            uuid: this.getQueryVar("optin_id"),
        };
        
        return await this.ajaxCall(data);
    }

    static getQueryVar(param) {
        const params = new URLSearchParams(window.location.search);
        
        return params.get(param);
    }

    static getAjaxURL() {
        return omniMailerParams.url;
    }

    static getAjaxNonce() {
        return omniMailerParams.nonce;
    }

    static isDoubleOptIn() {
        return omniMailerParams.isDoubleOptIn === "1";
    }

    static useHoneypot() {
        return omniMailerParams.useHoneypot === "1";
    }

}

OmniMailer.init();
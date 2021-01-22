// noinspection JSUnresolvedVariable
class OmniMailerShortcode {

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
            let forms = document.querySelectorAll(".omnimailer-form");

            forms.forEach((element) => {
                const service = element.getAttribute("data-omnimailer-form-service");
                const handle = element.getAttribute("data-omnimailer-form-handle");

                switch(service) {
                    case 'mailgun':
                        OmniMailerMailgunForm.init(element, handle)
                }
            });
        });
    }

}

OmniMailerShortcode.init();
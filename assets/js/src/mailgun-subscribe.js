class OmniMailerMailgunSubscribeForm extends OmniMailerForm {

    constructor(form) {
        super(form);
    }

    init() {
        super.init();

        const __ = wp.i18n.__;

        /**
         * Handle form submission.
         */
        this.submitButton.addEventListener("click", (event) => {
            this.onSubmit(event);

            if(this.isValid) {
                this.overlay.classList.remove("hide");

                let data = {
                    api_action: "subscribe",
                    email: this.values.email,
                    list: this.form.getAttribute("data-omnimailer-form-list")
                };

                const optional = {
                    name: this.values.name
                }

                data = OmniMailer.addOptionalFieldsToData(data, optional);

                /**
                 * Call API and wait for a response to output.
                 */
                this.callAPIAndHandleResponse(data);
            }
        });
    }

    getResponseText(code) {
        return {
            heading: OmniMailerMessages.mailgun[code].heading,
            message: OmniMailerMessages.mailgun[code].message,
            type: OmniMailerMessages.mailgun[code].type,
        }
    }

}
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
                // todo refactor into form abstract class
                OmniMailerMailgun.callAPI(data).then((response) => {
                    if(response.success === true) {
                        try {
                            const responseCode = response.data.response.code;

                            if(responseCode) {
                                let responseText = this.getResponseText(responseCode);

                                if(responseText.type === "success") {
                                    this.showSuccessMessage(responseText.heading, responseText.message);
                                    this.clear();
                                }
                                else {
                                    this.showErrorMessage(responseText.heading, responseText.message);
                                }
                            }
                        }
                        catch(error) {
                            this.showErrorMessage(
                                OmniMailerMessages.genericErrorHeading,
                                __("The following error occurred while displaying this message: ", "omnimailer") + error);
                        }
                    }
                    else {
                        this.showErrorMessage(
                            OmniMailerMessages.genericErrorHeading,
                            __("Please check your connectivity. If the error persists, try again later.", "omnimailer")
                        );
                    }

                    this.overlay.classList.add("hide");
                });
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
// noinspection JSUnresolvedVariable
class OmniMailerForm {

    constructor(form) {
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
    init() {
        this.messagePanel.closeButton.addEventListener("click", (event) => {
            event.preventDefault();

            this.clearMessagePanel();
        });
    }

    getOverlay() {
        return this.form.querySelector(".loader-overlay");
    }

    getMessagePanel() {
        return {
            panel: this.form.querySelector(".omnimailer-form-message"),
            heading: this.form.querySelector(".omnimailer-form-message-heading"),
            text: this.form.querySelector(".omnimailer-form-message-text"),
            closeButton: this.form.querySelector(".omnimailer-form-message-close-button")
        }
    }

    getSubmitButton() {
        return this.form.querySelector("button[type=submit]");
    }

    /**
     * Shows a message on the form's message panel.
     */
    showMessage(heading, message) {
        this.messagePanel.heading.textContent = heading;
        this.messagePanel.text.textContent = message;
        this.messagePanel.panel.classList.remove("hide");
        this.messagePanel.panel.scrollIntoView();
    }

    /**
     * Clears the form's message panel and hides it.
     */
    clearMessagePanel() {
        this.messagePanel.panel.classList.add("hide");
        this.messagePanel.heading.textContent = "";
        this.messagePanel.text.textContent = "";
        this.messagePanel.panel.classList.remove("success", "error");
    }

    /**
     * Prepares the form's message panel for a message indicating success.
     */
    showSuccessMessage(heading, message) {
        this.clearMessagePanel();
        this.messagePanel.panel.classList.add("success");
        this.showMessage(heading ,message);
    }

    /**
     * Prepares the form's message panel for a message indicating failure.
     */
    showErrorMessage(heading, message) {
        this.clearMessagePanel();
        this.messagePanel.panel.classList.add("error");
        this.showMessage(heading ,message);
    }

    /**
     * Validates the form fields by checking if any transmitted fields are
     * empty or the value does not match a certain format.
     */
    validate(values) {
        const __ = wp.i18n.__;

        let result = true;

        for(const [key, value] of Object.entries(values)) {
            const field = this.form.querySelector("[data-omnimailer-form='" + key + "']");

            if(value) {
                this.removeAlert(field);
            }
            else {
                this.alert(field, __("This field is mandatory.", "omnimailer"));
                result = false;
            }
        }

        const regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,10})$/;
        const emailField = this.form.querySelector("[data-omnimailer-form='email']");

        if(emailField) {
            if(emailField.value && regex.test(emailField.value)) {
                this.removeAlert(emailField);
            }
            else {
                this.alert(emailField, __("Please enter a valid e-mail address.", "omnimailer"));
                result = false;
            }
        }

        if(OmniMailer.useHoneypot()) {
            const homepageFieldLabel = this.form.querySelector(".homepage-field-label");
            const homepageField = homepageFieldLabel.querySelector("input");

            if(homepageField) {
                if(homepageField.value) {
                    this.removeAlert(homepageField);
                    result = false;
                }
                else {
                    this.alert(homepageField, __("This field is mandatory.", "omnimailer"));
                }
            }
        }

        return result;
    }

    /**
     * Add alert classes to a form element indicating incorrect user input.
     */
    alert(element, message) {
        const sibling = element.nextElementSibling;

        element.classList.remove("success");
        element.classList.add("error");

        if(sibling && sibling.classList.contains("checkbox-label")) {
            sibling.classList.add("error");
        }
        else {
            OmniMailerNotificationHandler.showErrorNotification('omnimailer-form-alert', message, element.parentNode);
        }
    }

    /**
     * Remove any alert classes from a form element and add success
     * classes indicating correct user input.
     */
    removeAlert(element) {
        const sibling = element.nextElementSibling;

        element.classList.remove("error");
        element.classList.add("success");

        if(sibling && sibling.classList.contains("checkbox-label")) {
            sibling.classList.remove("error");
        }
        else {
            const notification = element.parentNode.querySelector(".omnimailer-form-alert");

            if(notification) {
                OmniMailerNotificationHandler.hideNotification(notification);
            }
        }
    }

    /**
     * Clear the entire form.
     */
    clear() {
        this.form.querySelectorAll("input").forEach((element) => {
            element.classList.remove("success", "error");
            element.getAttribute("type") !== "checkbox" ? element.value = "" : element.checked = false;
        });
    }

    /**
     * Aggregate input values of mandatory fields and validate them.
     */
    onSubmit(event) {
        event.preventDefault();

        this.values = {};

        this.form.querySelectorAll(".mandatory").forEach((element) => {
            const key = element.getAttribute("data-omnimailer-form");
            this.values[key] = element.getAttribute("type") !== "checkbox" ? element.value : element.checked;
        });

        this.isValid = this.validate(this.values);

        this.form.querySelectorAll("[data-omnimailer-form]:not(.mandatory)").forEach((element) => {
            const key = element.getAttribute("data-omnimailer-form");
            this.values[key] = element.getAttribute("type") !== "checkbox" ? element.value : element.checked;
        });
    }

    callAPIAndHandleResponse(data) {
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
        })

    }

}
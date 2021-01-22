class OmniMailerMailgunForm {

    /**
     * Initialize a form's specific class.
     */
    static init(element, handle) {
        try {
            switch(handle) {
                case 'subscribe':
                    let form = new OmniMailerMailgunSubscribeForm(element);
                    form.init();
                    break;
            }
        }
        catch(error) {
            console.log("OmniMailerMailgunForm: A form could not be initialized because the following error occurred: " + error)
        }
    }

}
// noinspection JSUnresolvedVariable
class OmniMailerMailgun {

    /**
     * Call the backend AJAX handler for an API call, wait for
     * its response and return it.
     */
    static async callAPI(data) {
        data.provider = "mailgun";
        data.action = "omnimailer_form_ajax_handler";
        data.security = OmniMailer.getAjaxNonce();

        return await OmniMailer.ajaxCall(data);
    }

}
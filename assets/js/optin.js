// noinspection JSUnresolvedVariable
class OmniMailerOptIn {

    /**
     * Call the backend AJAX handler to update the database,
     * wait for its response and return it.
     */
    static async optIn(data) {
        data.handle = "optin";
        data.action = "omnimailer_event_ajax_handler";
        data.security = OmniMailer.getAjaxNonce();

        return await OmniMailer.ajaxCall(data);
    }

}
class OmniMailerAdmin {

    /**
     * Initialize admin functionality once DOM is loaded entirely.
     */
    static init() {
        let ready = (callback) => {
            if(document.readyState !== "loading") callback();
            else window.addEventListener("DOMContentLoaded", callback);
        }

        ready(() => {
            console.log("OmniMailer Admin");
        });
    }

}

OmniMailerAdmin.init();
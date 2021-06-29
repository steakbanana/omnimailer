class OmniMailerNotification {

    constructor(type, data) {
        this.type = type;
        this.data = data;
    }

    /**
     * Check if a notification is congruent with its data scheme
     */
    validate(allowedData) {
        let isValid = true;

        for(const key of Object.keys(this.data)) {
            if(!allowedData.includes(key)) {
                isValid = false;
                break;
            }
        }

        return isValid;
    }

    /**
     * Creates a template clone for the requested notification, fills
     * its data fields and returns it.
     */
    createInstance(template) {
        let clone = template.cloneNode(true);
        const handle = clone.getAttribute("id").replace("-template", "");
        clone.removeAttribute("id");

        clone = this.attachEventHandler(clone, handle);

        for(const [key, value] of Object.entries(this.data)) {
            let templateNode = clone.querySelector("[data-" + handle + "='" + key + "']");

            if(templateNode)
                templateNode.textContent = value;
        }

        return clone;
    }

    /**
     * Attaches an event handler to fire a DOM event whenever
     * an instance is closed to alert the queue and returns the instance.
     */
    attachEventHandler(instance, handle) {
        let closeEvent = new CustomEvent(handle + "-queue");
        let closeButton = instance.querySelector("[data-" + handle + "='close-button']");

        if(closeButton) {
            closeButton.addEventListener("click", (event) => {
                event.preventDefault();

                instance.classList.add("hide");

                instance.dispatchEvent(closeEvent);
            });
        }
        
        return instance;
    }

}

class OmniMailerPushNotification extends OmniMailerNotification {

    constructor(type, data) {
        super(type, data);

        const allowedData = ["message"];
        const template = document.getElementById("omnimailer-push-notification-template");

        if(this.validate(allowedData))
            this.instance = this.createInstance(template);
    }

}


// todo rename to field alert and add form alert (big form overlay) as notification type
class OmniMailerFieldAlert extends OmniMailerNotification {

    constructor(type, data) {
        super(type, data);

        this.type = "error";

        const allowedData = ["message"];
        const template = document.getElementById("omnimailer-field-alert-template");

        if(this.validate(allowedData))
            this.instance = this.createInstance(template);
    }

}
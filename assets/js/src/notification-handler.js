class OmniMailerNotificationHandler {

    static pushNotificationQueue = [];

    static displayNotification(instance, type, parent, handle, singleton = false) {
        if(singleton) {
            parent.querySelectorAll("." + handle).forEach((element) => {
                element.parentNode.removeChild(element);
            });
        }

        parent.appendChild(instance);
        instance.classList.add(type);
        instance.classList.remove("hide");
    }

    static showNotification(handle, type, message, parent) {
        const __ = wp.i18n.__;

        const data = {message: message}

        let notification, queue;

        switch(handle) {
            case 'omnimailer-push-notification':
                notification = new OmniMailerPushNotification(type, data);
                queue = this.pushNotificationQueue;
                break;
            case 'omnimailer-field-alert':
                notification = new OmniMailerFieldAlert(type, data);
                break;
            case 'omnimailer-form-alert':
                notification = new OmniMailerFormAlert(type, data);
                break;
            default:
                notification = new OmniMailerPushNotification("error", {message: __("(404) Unknown notification type.", "omnimailer")});
                queue = this.pushNotificationQueue;
        }

        let instance = notification.instance;

        if(!queue) {
            this.displayNotification(instance, type, parent, handle, true);
        }
        else if(queue.length === 0) {
            this.displayNotification(instance, type, parent, handle);
            this.queueNotification(handle, instance, type, parent, queue);
        }
        else {
            this.queueNotification(handle, instance, type, parent, queue);
        }
    }

    static queueNotification(handle, instance, type, parent, queue) {
        const __ = wp.i18n.__;

        /**
         * Add an event listener to display the first waiting instance
         * in queue, then add current instance to the queue.
         */
        instance.addEventListener(handle + "-queue", () => {
            queue.shift();
            if(queue[0]) {
                this.displayNotification(queue[0].instance, queue[0].type, queue[0].parent, queue[0].handle);
            }
        });

        const queueItem = {
            instance: instance,
            type: type,
            parent: parent,
            handle: handle,
        }

        queue.push(queueItem);
    }

    static showSuccessNotification(handle, message, parent = document.body) {
        this.showNotification(handle, "success", message, parent);
    }

    static showErrorNotification(handle, message, parent = document.body) {
        this.showNotification(handle, "error", message, parent);
    }

    static hideNotification(notification) {
        notification.parentNode.removeChild(notification);
    }

}
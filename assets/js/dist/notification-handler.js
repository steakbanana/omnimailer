"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OmniMailerNotificationHandler = /*#__PURE__*/function () {
  function OmniMailerNotificationHandler() {
    _classCallCheck(this, OmniMailerNotificationHandler);
  }

  _createClass(OmniMailerNotificationHandler, null, [{
    key: "displayNotification",
    value: function displayNotification(instance, type, parent, handle) {
      var singleton = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (singleton) {
        parent.querySelectorAll("." + handle).forEach(function (element) {
          element.parentNode.removeChild(element);
        });
      }

      parent.appendChild(instance);
      instance.classList.add(type);
      instance.classList.remove("hide");
    }
  }, {
    key: "showNotification",
    value: function showNotification(handle, type, message, parent) {
      var __ = wp.i18n.__;
      var data = {
        message: message
      };
      var notification, queue;

      switch (handle) {
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
          notification = new OmniMailerPushNotification("error", {
            message: __("(404) Unknown notification type.", "omnimailer")
          });
          queue = this.pushNotificationQueue;
      }

      var instance = notification.instance;

      if (!queue) {
        this.displayNotification(instance, type, parent, handle, true);
      } else if (queue.length === 0) {
        this.displayNotification(instance, type, parent, handle);
        this.queueNotification(handle, instance, type, parent, queue);
      } else {
        this.queueNotification(handle, instance, type, parent, queue);
      }
    }
  }, {
    key: "queueNotification",
    value: function queueNotification(handle, instance, type, parent, queue) {
      var _this = this;

      var __ = wp.i18n.__;
      /**
       * Add an event listener to display the first waiting instance
       * in queue, then add current instance to the queue.
       */

      instance.addEventListener(handle + "-queue", function () {
        queue.shift();

        if (queue[0]) {
          _this.displayNotification(queue[0].instance, queue[0].type, queue[0].parent, queue[0].handle);
        }
      });
      var queueItem = {
        instance: instance,
        type: type,
        parent: parent,
        handle: handle
      };
      queue.push(queueItem);
    }
  }, {
    key: "showSuccessNotification",
    value: function showSuccessNotification(handle, message) {
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.body;
      this.showNotification(handle, "success", message, parent);
    }
  }, {
    key: "showErrorNotification",
    value: function showErrorNotification(handle, message) {
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.body;
      this.showNotification(handle, "error", message, parent);
    }
  }, {
    key: "hideNotification",
    value: function hideNotification(notification) {
      notification.parentNode.removeChild(notification);
    }
  }]);

  return OmniMailerNotificationHandler;
}();

_defineProperty(OmniMailerNotificationHandler, "pushNotificationQueue", []);
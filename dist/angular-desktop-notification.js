'use strict';
angular
    .module('angular-desktop-notification', [])
    .factory('Notification',[function() {
      var icon = null;

      function requestPermission(icon_path){
        Notification.requestPermission();
        icon = icon_path;
      }

      function log(body, title) {
        title = title || "Notification";
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
          new Notification(title ,{body: body, icon: icon});
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission(function (permission) {
            if (permission === "granted") {
              new Notification(title ,{body: body});
            }
          });
        }
      }
      return{
        initialize : function(icon) {
          requestPermission(icon);
        },
        notify : function(body,title) {
          log(body,title);
        }
      }
    }])

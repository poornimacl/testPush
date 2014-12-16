
var app = {
    
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var pushNotification = window.plugins.pushNotification;
        if(device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos"){ 
            alert('registering android device');
            pushNotification.register(app.successHandler, app.errorHandler, 
            {
                "senderID":"211518520885",
                "ecb":"app.onNotificationGCM"
            });
        } else if (device.platform == 'blackberry10') {
             //if we need to support it
        }else { 
            // For IOS
             alert('registering IOS device');
            pushNotification.register(tokenHandler,errorHandler,
                {
                "badge":"true",
                "sound":"true",
                "alert":"true",
                "ecb":"onNotificationAPN"
              });
        }
         
        //FOR IOS, register with token handler which returns a unique device token https://github.com/phonegap-build/PushPlugin

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        console.log('Callback Success!!! Result = '+result)
    },
    errorHandler:function(error) {
        alert(error);
    },
    tokenHandler:function(result) {
        // Your iOS push server needs to know the token before it can push to this device
        console.log('device token = ' + result);
    },
    // iOS
    onNotificationAPN: function(event) {
        if ( event.alert )
        {
            navigator.notification.alert(event.alert);
        }

        if ( event.sound )
        {
            var snd = new Media(event.sound);
            snd.play();
        }

        if ( event.badge )
        {
             pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
         }
     },
    //Android
    onNotificationGCM: function(e) {

    	console.log('GCM event received');
    	alert('GCM event received !');
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                     var registrationId = e.regid;
                     var regId = localStorage.getItem('regId');
                     var lastURL = localStorage.getItem('lastURL');
                     if (regId == null)
                     {
                         localStorage.setItem('regId',registrationId);
                       //  alert ('REg id ' +registrationId);
                      
                     }
                     if(lastURL == null)
                     {
                         //localStorage.setItem("lastURL","http://10.0.3.2:8100");
                        localStorage.setItem("lastURL","http://192.168.1.10:8100");
                         lastURL = localStorage.getItem('lastURL');
                       //  alert('Last URL ' +lastURL);
                         
                     }
                     var ref = window.open(lastURL, '_blank', 'location=yes ,toolbar=yes, EnableViewPortScale=yes');
                         ref.addEventListener('loadstart', function(event) { 
                            // alert('Opening Ionic URL: ' + event.url); 
                         });
                         ref.addEventListener('loadstop', function() {
                             ref.executeScript({ code: "localStorage.setItem('platform','" +device.platform+"');"});
                             ref.executeScript({ code: "localStorage.setItem('token','"+localStorage.getItem('regId')+"');"});                          
                         });               
                         ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
                         ref.addEventListener('exit', function(event) { alert(event.type); });      
                     
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
               // use e.foreground or e.coldstart to handle different states of launches 
                localStorage.setItem('lastURL',e.message);
          
                var ref = window.open(e.message, '_blank', 'location=yes ,toolbar=yes, EnableViewPortScale=yes');
                    ref.addEventListener('loadstart', function(event) { 
                        alert('Open URL in notification: ' + event.url); });
                
                    ref.addEventListener('loadstop', function() {
                          ref.executeScript({ code: "localStorage.setItem('platform','" +device.platform+"');"});
                          ref.executeScript({ code: "localStorage.setItem('token','"+localStorage.getItem('regId')+"');"}); 
                       
                    });
                 
                    ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
                    ref.addEventListener('exit', function(event) { alert(event.type); });      
                
                break;

            case 'error':
                alert('GCM error = '+e.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    }

};

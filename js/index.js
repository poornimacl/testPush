/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    
       // alert('Device is yum ready');
       
           // alert("Calling push notification");
            var pushNotification = window.plugins.pushNotification;
            pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"211518520885","ecb":"app.onNotificationGCM"});
        
         
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
    onNotificationGCM: function(e) {

    	console.log('GCM event received');
    	//alert('GCM event received !');
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                     var registrationId = e.regid;
                   // console.log("Regid " + registrationIdd);
                //    alert('Registration id is : '+registrationId);  
                     var regId = localStorage.getItem('regId');
                     var lastURL = localStorage.getItem('lastURL');
                     if (regId == null)
                     {
                         localStorage.setItem('regId',registrationId);
                       //  alert('Setting reg id to : '+registrationId);  
                     }
                     if(lastURL == null)
                     {
                         localStorage.setItem("lastURL","http://192.168.1.6:8100");
                         lastURL = localStorage.getItem('lastURL');
                         alert('Setting URL to : ' +lastURL );  
                     }
                     var ref = window.open(lastURL, '_blank', 'location=yes ,toolbar=yes, EnableViewPortScale=yes');
                         ref.addEventListener('loadstart', function(event) { 
                            // alert('Opening Ionic URL: ' + event.url); 
                         });
                         ref.addEventListener('loadstop', function() {
                             ref.executeScript({ code: "localStorage.setItem('platform', 'Google');"});
                             ref.executeScript({ code: "localStorage.setItem('token','"+registrationId+"');"});                          
                         });               
                         ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
                         ref.addEventListener('exit', function(event) { alert(event.type); });      
                     
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
               // alert('New URL = '+e.message+' msgcnt = '+e.msgcnt);
                localStorage.setItem('lastURL',e.message);
             //    alert('Setting URL to : ' +lastURL );  
                var ref = window.open(e.message, '_blank', 'location=yes ,toolbar=yes, EnableViewPortScale=yes');
                    ref.addEventListener('loadstart', function(event) { 
                        alert('Open URL in notification: ' + event.url); });
                
                    ref.addEventListener('loadstop', function() {
                          ref.executeScript({ code: "localStorage.setItem('platform', 'Google');"});
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

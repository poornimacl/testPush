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
        alert('Device is ready!');
        console.log('Device  ready');
          alert('Opening URL !!');
                    var ref = window.open('http://192.168.1.12:8100', '_blank', 'location=yes ,toolbar=yes, EnableViewPortScale=yes');
                    ref.addEventListener('loadstart', function(event) { 
                        alert('start: ' + event.url); });
                    ref.addEventListener('loadstop', function() {
                       ref.executeScript({ code: "var p = document.getElementById('platform').ng-value; " 
                                         }, function () { 
                           alert("Platform get " +p);
                                 });
                          ref.executeScript({ code: "var t = document.getElementById('token').ng-value;" 
                                            }, function() {
                         alert('Token get ' + t);       
                           }); 
                    });
                 
                  ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
                  ref.addEventListener('exit', function(event) { alert(event.type); });   
    //    var pushNotification = window.plugins.pushNotification;
      
    //    pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"211518520885","ecb":"app.onNotificationGCM"});
        


  

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
        alert('Callback Success!!! Result = '+result)
    },
    errorHandler:function(error) {
        alert(error);
    },
    onNotificationGCM: function(e) {
    	console.log('GCM event received');
    	alert('GCM event received !');
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    alert('Registration id is '+e.regid);
                    
                    
                    alert('Opening URL !!');
                    var ref = window.open('http://192.168.1.12:8100', '_blank', 'location=yes ,toolbar=yes, EnableViewPortScale=yes');
                    ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
                    ref.addEventListener('loadstop', function() {
                       ref.executeScript({ code: "var x = document.getElementById('platform').value = 'Google'" });
                       ref.executeScript({ code: "var x = document.getElementById('token').value = 'Testme'" }); 
                        showalert();          
                       });
                  ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
                  ref.addEventListener('exit', function(event) { alert(event.type); });   

                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                alert('message = '+e.message+' msgcnt = '+e.msgcnt);
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

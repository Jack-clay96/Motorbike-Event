/*Backendless: https://backendless.com/docs/js/doc.html#welcome*/

Backendless.initApp("BEC3A11B-2A08-4B8F-FF29-4F33380A3900","3C8378C2-F2B4-F4C9-FFCE-F0C165EBFB00"); //AppID then JS API key

//Location
var watchID;
var long= 0;
var lat= 0;
var locationOptions = { 
	maximumAge: 10000, 
	timeout: 6000, 
	enableHighAccuracy: true 
};

//Location
$(document).on('pageinit', function() {
	
	//set up listener for button clicks
	updatePosition();
});

//Event list
var idEvent = "EventButton";
var dataQueryBuilder = Backendless.DataQueryBuilder.create()
dataQueryBuilder.setSortBy( ["created"] );
$(document).on("pageshow","#homePage", onPageShow); //When home page shows
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
    function onDeviceReady() {
	console.log("device ready");
        
        /* LOGIN PAGE */
    $( "#submit" ).click(function() {
        
        console.log("button clicked")
         
        var username = $("#email").val();
        var password = $("#password").val();
        
        function userLoggedIn( user )
        {
            console.log( "user has logged in" + user);
            location.href="#homePage";
        }
 
        console.log( username + ", " + password );
         Backendless.UserService.login( username, password, true )
            .then( userLoggedIn )
            .catch( gotError );
     });
        
        /*Register Page */
    $( "#register" ).click(function() {
        console.log("button clicked")
        var email = $("#emailReg").val();
        var name = $("#nameReg").val();
        var password = $("#passwordReg").val();
        
    function userRegistered( user )
        {
            console.log( "user has been registered" );
            location.href="#loginPage";
        }
 
        var user = new Backendless.User();
        user.email = email;
        user.name = name;
        user.password = password;
 
        Backendless.UserService.register( user ).then( userRegistered ).catch( gotError );
        
    });
        
        
        /* Forgot PWD Page */
        $("#ForgpassBut").click(function(){
            console.log("forgot password button clicked");
            var emailRestPwd= $("#emailPass").val(); //user email here
            
            function passwordRecoverySent()
            {
                console.log( "an email with a link to restore password has been sent to the user" );
                location.href="#loginPage";
            }

             Backendless.UserService.restorePassword(emailRestPwd)
            .then( passwordRecoverySent )
            .catch( gotError );
            
        });
        
        
        /* Home Page */
    $('#myPanel').enhanceWithin().panel(); //Initialise my panel
        //Logout Button
    $( "#logout" ).click(function() {
            console.log("logout button clicked");
        
        function userLoggedOut()
        {
            console.log( "user has been logged out" );
            location.href="#loginPage";
        }

            Backendless.UserService.logout()
            .then( userLoggedOut )
            .catch( gotError );
    });
        
    /*Location permission
    navigator.geolocation.activator.askActivation(function(response) {
    //Success callback 
        console.log("Success: " + response);
        
    }, function(response) {
        
    //Failure callback 
                console.log("Failure: " + response);
    });*/
        
}

/* Home Page */
 function onPageShow() {
	console.log("page shown");
    Backendless.Data.of("Events").find(dataQueryBuilder).then(processResults).catch(error); // find (...) is used here to order the list by created.
    }
        
    //LISTING THE DATABASE
    function processResults(Events) {
        
    $("#EventList").empty();
        
        var latitude = position.coords.latitude;
	   var longitude = position.coords.longitude;
        
    for (var i = 0; i<Events.length; i++)
        {
            //display the first task in an array of tasks. alert(tasks[2].Task)
            $("#EventList").append("<li><a class=" + idEvent + " id=" + i  + " >" + Events[i].eventName+"<br>"+distance($('#lattext').val(latitude), $('#longtext').val(longitude), Events[i].startLat, Events[i].startLong)+"</a></li>"); 
            //#EventList where to show list in html. Events[i] is database. eventName is attribute
        }
            
        //refresh the listview
        $("#EventList").listview("refresh");
        
        $(".EventButton").click(function(){
            
            $("#eventHeader").empty();
            $("#eventDesc").empty();
             $("#milesId").empty();
            
            console.log(Events.length);
            var arrayId = this.id;
            var userLat = lat; console.log("Your lat is: " + lat);
            var userLong = long; console.log("Your Long is: " + long);
            
            console.log("This is arrayID: " + arrayId);
            console.log(Events[arrayId].eventName);
            
            $("#eventHeader").append(Events[arrayId].eventName);
            $("#eventDesc").append(Events[arrayId].eventDesc);
            
            initMap(Events[arrayId].startLat, Events[arrayId].startLong, Events[arrayId].endLat, Events[arrayId].endLong);
            
            console.log("Event button clicked");
            location.href="#eventMapPage";
        });
        
        

    }



//Call this function when you want to watch for changes in position
    function updatePosition() {
        
        /* Location */
	//instruct location service to get position with appropriate callbacks
	   watchID = navigator.geolocation.watchPosition(successPosition, failPosition, locationOptions);
}

    //Call this function when you want to stop watching for changes in position
    function stopPosition() {
	   //instruct location service to get position with appropriate callbacks
	   navigator.geolocation.clearWatch(watchID);
}

//called when the position is successfully determined
function successPosition(position) {
    
	//Get stuff out of the position object
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	//Update the display with the correct values
	$('#lattext').val(latitude);
    lat = latitude;
	$('#longtext').val(longitude);
    long = longitude;
    stopPosition();
}

function failPosition(error) {
	//change time box to show updated message
	console.log("Location issue: " + error);
	
}

/* Errors */
        function error(err) {
            alert(err);
        }
       function gotError( err ) // see more on error handling
        {
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
        }




 function initMap(startLat, startLong, endLat, endLong) {
    // Create a map object and specify the DOM element for display.
    //var myLatlng = new google.maps.LatLng(parseFloat(startLat),parseFloat(startLong));
    
    var map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: startLat, lng: startLong},
    zoom: 10
    });

    var marker1 = new google.maps.Marker({
            position: {lat: startLat, lng: startLong},
            map: map,
            title: "Start Event Location" 
            });
    
    var marker2 = new google.maps.Marker({
            position: {lat: endLat, lng: endLong},
            map: map,
            title: "End Event Location" 
            });
}

// Author: https://www.geodatasource.com/developers/javascript
    function distance(lat1, lon1, lat2, lon2) {
        console.log("lat1: " + lat1)
        console.log("long1: " + lon1)
        console.log("eventlat: " + lat2)
        console.log("eventlat: " + lon2)
	   var radlat1 = Math.PI * lat1/180;
	   var radlat2 = Math.PI * lat2/180;
	   var theta = lon1-lon2;
	   var radtheta = Math.PI * theta/180;
	   var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	   dist = Math.acos(dist);
	   dist = dist * 180/Math.PI;
	   dist = dist * 60 * 1.1515;
        console.log("dist: " + dist);
        return dist;
    }
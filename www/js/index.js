/*Backendless: https://backendless.com/docs/js/doc.html#welcome*/

Backendless.initApp("BEC3A11B-2A08-4B8F-FF29-4F33380A3900","3C8378C2-F2B4-F4C9-FFCE-F0C165EBFB00"); //AppID then JS API key

//Location
var watchID;
var locationOptions = { 
	maximumAge: 10000, 
	timeout: 6000, 
	enableHighAccuracy: true 
};

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
        
}

/* Home Page */
 function onPageShow() {
	console.log("page shown");
    Backendless.Data.of("Events").find(dataQueryBuilder).then(processResults).catch(error); // find (...) is used here to order the list by created.
     
    
    }
        
    //LISTING THE DATABASE
    function processResults(Events) {
    $("#EventList").empty();
        
    for (var i = 0; i<Events.length; i++)
        {
            //display the first task in an array of tasks. alert(tasks[2].Task)
            $("#EventList").append("<li><a class=" + idEvent + ">" +Events[i].eventName+"<br>"+"miles away frrom user"+"<a></li>"); //#EventList where to show list in html. Events[i] is database. eventName is attribute
        }
            
        //refresh the listview
        $("#EventList").listview("refresh");
        
        
         $(".EventButton").click(function(){ //not working - NEED TO PUT SOMEWHERE ELSE I THINK
            console.log("Event button clicked");
            location.href="#eventMapPage";
        });
        

    }

/* Location */
//Call this function when you want to watch for chnages in position
    function updatePosition() {
	//change time box to show updated message
	   $('#time').val("Getting data...");
	//instruct location service to get position with appropriate callbacks
	   watchID = navigator.geolocation.watchPosition(successPosition, failPosition, locationOptions);
}

    //Call this function when you want to watch for chnages in position
    function stopPosition() {
	//change time box to show updated message
	   $('#time').val("Press the button to get location data");
	   //instruct location service to get position with appropriate callbacks
	   navigator.geolocation.clearWatch(watchID);
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



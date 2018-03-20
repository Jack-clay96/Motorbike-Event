/*Backendless: https://backendless.com/docs/js/doc.html#welcome*/

Backendless.initApp("BEC3A11B-2A08-4B8F-FF29-4F33380A3900","3C8378C2-F2B4-F4C9-FFCE-F0C165EBFB00"); //AppID then JS API key
document.addEventListener("deviceready", onDeviceReady, false);



// device APIs are available
//
    function onDeviceReady() {
	console.log("device ready");
        
        /* LOGIN PAGE */
    $( "#submit" ).click(function() {
        
        console.log("button clicked")
         
        var username = $('#email').val();
        var password = $('#password').val();
        
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

       function gotError( err ) // see more on error handling
        {
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
        }


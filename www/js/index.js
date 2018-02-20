Backendless.initApp("BEC3A11B-2A08-4B8F-FF29-4F33380A3900","3C8378C2-F2B4-F4C9-FFCE-F0C165EBFB00");
document.addEventListener("deviceready", onDeviceReady, false);
//localStorage2();

/* For Logging into the app */
var loggedInUser = Backendless.UserService.loginSync( login, password, stayLoggedIn );
var user;

try
{
  user = Backendless.UserService.loginSync( username, password );
}
catch( err ) // see more on error handling
{
  console.log( "error message - " + err.message );
  console.log( "error code - " + err.statusCode );
}

var userTokenIsValid = Backendless.UserService.isValidLoginSync(); 
console.log( "Is login valid?: " +  userTokenIsValid );




//$ is used in jquery. # = ID. $ is looking at the launched in HTML document. 	
function updateDisplay() {
	$("#launched").text("Application launched: " + launched_count);
}


// device APIs are available
//
    function onDeviceReady() {
	
	updateDisplay();  
	alert("device ready");
    //localStorage2(); //best to call methods here. As it waits until phone is ready. (Cant test on webpage from here) 
    }



   /* function localStorage2() //Function name can't be something used for something else
    {
        window.localStorage.setItem( key, value );
        var getPhone = window.localStorage.getItem(key);
        alert("Phone: " + getPhone);
        
         window.localStorage.setItem( key1, value1 );
        var getPhone = window.localStorage.getItem(key1);
        $("#key1").text("Wallet: " + key1); //#key1 is being replaced by wallet - Used for positioning on page within html document
		
        var items = window.localStorage.length;
        console.log("No. item stored: " + items);
        
    }*/

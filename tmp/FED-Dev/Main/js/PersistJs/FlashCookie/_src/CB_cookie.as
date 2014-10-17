/*
-----------------------------------------------
Daniel Bulli
http://www.nuff-respec.com/technology/cross-browser-cookies-with-flash
----------------------------------------------- */


//get External interface
import flash.external.*;

// Create a local shared object + an Object for storing
var so:SharedObject = SharedObject.getLocal("cookies","/");
var oo:Object = new Object;
oo['is_capable'] = true;

// If cookie doesn't exist then create one
if (so.data.is_capable == null)
{
	so.data.is_capable = true;
	so.data.oo = oo;
	so.flush();	
}
else
{
	// If cookie does exist then grab cookie data
	oo = so.data.oo;
}


// The name of the Flash functions to be called from JavaScript
var getFunction:String    = "f_get_cookie";
var setFunction:String    = "f_set_cookie";
var deleteFunction:String = "f_delete_cookie";
var capableFunction:String = "f_cookie_able";

// real function names
var getRealFunction:Function      = get_flash_cookie;
var setRealFunction:Function      = set_flash_cookie;
var deleteRealFunction:Function   = delete_flash_cookie;
var capableRealFunction:Function  = cookie_able;

//open up functions to JavaScript
ExternalInterface.addCallback(getFunction, null, getRealFunction);
ExternalInterface.addCallback(setFunction, null, setRealFunction);
ExternalInterface.addCallback(deleteFunction, null, deleteRealFunction);
ExternalInterface.addCallback(capableFunction, null, capableRealFunction);

//is capable
function cookie_able():Boolean 
{
	if (so.data.is_capable == null)
	{
		return false;
	}
	
	return true;
}

//save flash cookie and write to hard drive
function save_flash_cookie():Void
{
	so.data.oo = oo;
	so.flush();	
}

//delete key from object and write to HD
function delete_flash_cookie(cookie_key:String):Void
{
	if(!cookie_able()) return;
	
	oo[cookie_key] = null;
	delete oo[cookie_key];
	
	save_flash_cookie();
}

//get cookie val
function get_flash_cookie(cookie_key):String
{
	if(!cookie_able()) return '';
	
	//delete and reget for side by side browser
	delete so;
	so = SharedObject.getLocal("cookies","/");
	oo = so.data.oo;

	if (oo[cookie_key] && oo[cookie_key] != undefined) 
	{		
		return oo[cookie_key];
	}

	return '';
}

//set cookie val and write to HD
function set_flash_cookie(cookie_key:String,cookie_val:String):Void
{
	if(!cookie_able()) return;	
	
	//delete and reget for side by side browser
	delete so;
	so = SharedObject.getLocal("cookies","/");
	oo = so.data.oo;
	
	oo[cookie_key] = cookie_val; 	
	save_flash_cookie();
}

//tell html we are ready
ExternalInterface.call('flash_ready',null);   
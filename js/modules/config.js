"use-strict"

var host = '10.13.1.25';	// hostname or IP address
var port = 8000;
var defaulttopic = 'default/event';		// topic to subscribe to
var useTLS = false;
var username = null;
var password = null;
var cleansession = true;

var debug = false;
var plotstatus = [];
var temp;

var x = [];
var y = Array();
var data = Array(); 

var div;

"use-strict"
var mqttclient;
var topic;
var index;

var reconnectTimeout = 2000;
var topicList = [];



function mqttclientconnect()
{
	var broker = document.getElementById("broker").value;
	var temp = broker.split(":");
	host = String(temp[0]);
	port = Number(temp[1]);
	mqttclient = 
	new Paho.MQTT.Client
	(
		host,
		port,
		"web" + new Date().getTime()
	);
	var options =
	{
		timeout: 3,
		useSSL: useTLS,
		cleanSession: cleansession,
		onSuccess: onConnectSuccess,
		onFailure: function (message)
		{
			setTimeout(mqttclientconnect, reconnectTimeout);
		}
	};
	mqttclient.connect({onSuccess:onConnectSuccess});
	mqttclient.onConnectionLost = onConnectionLost;
	mqttclient.onMessageArrived = onMessageArrived;
	if (username != null)
	{
			options.userName = username;
			options.password = password;
	}
	console.log("Host="+ host + ", port=" + port + " TLS = " + useTLS + " username=" + username + " password=" + password);
}

function onConnectSuccess()
{
	/*console.log('Connected to ' + host + ':' + port);*/
	if(document.getElementById('topic').value == "")
	{
		mqttclient.subscribe('#');
		disableButton("connect")
	}
}

function onConnectionLost(response)
{
	setTimeout(mqttclientconnect, reconnectTimeout);
	enableButton("connect");
	console.log("WTF : "+response);
};

function onMessageArrived(message)
{
	var topic = message.destinationName;
	var payload = message.payloadString;
	var index = topicList.indexOf(topic);
	//console.log("Message content : " + topic +", payload "+ payload);
	totalcount++;
	if(topicList.indexOf(topic) != 0)
	{
		updateTopicList(topicList, topic);
	}
	y.push(Number(payload), index);
	getLastPoint(Number(payload), index);
	messagecount[index]++;
};

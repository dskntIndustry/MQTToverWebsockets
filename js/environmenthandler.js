"use-strict"
function disableButton(id)
{
	document.getElementById(id).disabled = true;
}

function enableButton(id)
{
	document.getElementById(id).disabled = false;
}

function updateToActiveStyle(id)
{
	document.getElementById(id).className = "active list-group-item";
}

function updateToUnActiveStyle(id)
{
	document.getElementById(id).className = "list-group-item";
}

function validateTopic()
{
	// input field
	topic = document.getElementById('topic').value;
	if(topic!="")
	{
		updateTopicList(topicList, topic);
	}
}

function deleteAllPlots()
{
	for (var i = 0; i < plotstatus.length; i++)
	{
		div = document.getElementById("plot-area");
		child = document.getElementById('currentplot_'+i);
		
		if(child !== null)
		{
			killlineplot(i);
			div.removeChild(child);
			plotstatus[i] = 0;
		}
		updateToUnActiveStyle(topicList[i]);
	}
}

function displayTopics()
{
	if(topicList.isEmpty)
	{
		return;
	}
	for(var i=0; i<topicList.length;i++)
	{
		console.log(topicList[i]);
	}
}

function updateTopicList(topicList, topic)
{
	if (topicList.indexOf(topic)==-1 || topicList.isEmpty)
	{
		plotstatus.push(0);
		messagecount.push(0);
		topicList.push(topic);
		index = topicList.indexOf(topic);

		div = document.getElementById("topicList");
		div.innerHTML +='<a index='+index+' id='+ topic +' onclick='+"\""+
		'executeTopicLink('+index+'); '+"\""+'href="#" class="list-group-item">'+String(topic)+'</a>'
	}
}

function executeTopicLink(index)
{
	if(plotstatus[index] == 0)
	{
		plotstatus.splice(index, 1, 1);
		addlinechartdiv(index);
		addRate(index);
		computeRate(index);
		plotstatus[index] = 1;
		for (var i = 0; i < plotstatus.length; i++)
		{
			if(plotstatus[i] == 1)
			{
				updateToActiveStyle(topicList[i]);
				//startbarplot(i);
				startlineplot(i);
			}
		}
	}
}
function addlinechartdiv(index)
{
	div = document.getElementById("plot-area");
	div.innerHTML+='<div id=currentplot_'+index+' style="height:250px; width:max-width">';
}

function addRate(index)
{
	div = document.getElementById("messagerate");
	div.innerHTML+='<div id=barplot_'+index+' >';
}
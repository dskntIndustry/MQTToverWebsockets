"use-strict"
var messagecount = [];
var totalcount = 0;
var rateout = [];

function computeRate(index)
{
	var num = messagecount[index]/totalcount*100;
	num = num.toFixed(2);
	//console.log("Data rate for topic "+topicList[index]+" is "+(messagecount[index]/totalcount*100));
	div = document.getElementById('barplot_'+index);
	div.innerHTML+='<p>'+num+'%'+'\t\t'+topicList[index]+'</p>';


	return messagecount[index]/totalcount*100;
}


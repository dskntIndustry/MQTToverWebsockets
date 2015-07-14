"use-strict"

function startnodered()
{
	callOtherDomain(url);
}

function callOtherDomain(urls)
{
	var div = document.getElementById("nodered");
	div.innerHTML = '<iframe style="width:100%;height:800px;" frameborder="0" src="' + url + '" />';
}

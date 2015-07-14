"use-strict"
var chart = null;
var plotUpdateTime = 500;
var oldPointStorage = 64;

function killplot(id)
{
	if($('#currentplot_'+id).children().length != 0)
	{
		console.log("Deleting...");
		$('#currentplot_'+id).highcharts().destroy();
	}
}

function startbarplot(id)
{
	console.log("Starting to plot in div : "+'barplot_'+id);
    $('#barplot_'+id).highcharts({
		chart:
		{
		    type: 'bar',
		    marginRight: 10,
		    renderTo: 'barplot_'+id,
		    events:
		    {
		    	load : function()
		    	{
		    		chart = this;
					var series = this.series[0];
					setInterval(function () {
					    try
					    {	
					    	y = computeRate(id);
					    	console.log("data : "+y+'\t in currentplot_'+id);
/*					    	series.removeData(0);*/
					    	series.setData([y]);
					    	//series.addPoint([y], false, false, false);
					    }
					    catch(err)
					    {
					    	//Work around
					    }
					}, plotUpdateTime);
		    	}
		    }
		},

		title:
		{
		    text: 'Live data from topic '+topicList[id]
		},
		xAxis:
		{
		    type: 'linear',
		    title:
			{
		        text: 'Data Rate [%]'
		    },
		    tickPixelInterval: 20
		},
		yAxis:
		{
			title:
			{
		        text: 'Amplitude'
		    },
		    plotLines: [{value: 0, width: 1, color: '#808080'}]
		},
		series: 
		[{
            name: topicList[id],
            data: [computeRate(id)]

        }]
   	});
}

/*function getLastPoint(w, id)
{
	data[id] = w;
}*/
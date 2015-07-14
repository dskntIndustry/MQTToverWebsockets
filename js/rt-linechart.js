"use-strict"
var chart = null;
var plotUpdateTime = 500;
var oldPointStorage = 64;

function killlineplot(id)
{
	if($('#currentplot_'+id).children().length != 0)
	{
		console.log("Deleting...");
		$('#currentplot_'+id).highcharts().destroy();
	}
}

function startlineplot(id)
{
	console.log("Starting to plot in div : "+'currentplot_'+id);
	$('#currentplot_'+id).highcharts(
	{
		chart:
		{
		    type: 'spline',
		    	 marker:
		        {
		        	radius: 1,
		            enabled: true,
		            states:
		            {
		            	hover:
		            	{
		            		radiusPlus: 1
		            	}
		            }
		        },
		    animation: Highcharts.svg, // don't animate in old IE
		    marginRight: 10,
		    renderTo: 'currentplot_'+id,
		    events:
		    {
		    	load : function()
		    	{
		    		chart = this;
					var series = this.series[0];
					setInterval(function () {
					    try
					    {	

					    	var x = (new Date()).getTime(), // current time
					    	y = data[id];
					    	//console.log("data : "+y+'\t in currentplot_'+id);
					    	series.addPoint([x, y], true, true);
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
		    type: 'datetime',
		    title:
			{
		        text: 'Time [hh:mm:ss]'
		    },
		    tickPixelInterval: 100
		},
		yAxis:
		{
			title:
			{
		        text: 'Amplitude'
		    },
		    plotLines: [{value: 0, width: 1, color: '#808080'}]
		},
		tooltip:
		{
		    formatter: function ()
		    {
		        return '<b>' + this.series.name + '</b><br/>' +
		            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
		            Highcharts.numberFormat(this.y, 5);
		    }
		},
		legend:
		{
		    enabled: true
		},
		exporting:
		{
		    enabled: true
		},
		series:[{       
			marker:
			{
				radius: 1,
				enabled: true,

			},
		    name : topicList[id], 
			data :
			function() 
			{
	            var data = [],
	                time = (new Date()).getTime(),
	                i;

	            for (i = -oldPointStorage; i <= 0; i += 1)
	            {
	                data.push({
	                    x: time + i * plotUpdateTime,
	                    y: 0
	                });
	            }
	            return data;
	        	}
        ()}],

   	});
}

function getLastPoint(w, id)
{
	data[id] = w;
}
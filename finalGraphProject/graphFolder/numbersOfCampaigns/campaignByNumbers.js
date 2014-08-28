(function () {
    var audienceAPI = "http://exampleformat=json";
   
    $.getJSON(audienceAPI, function (data) {
        var graphData = [];
        var coordinate = {};

        $.each(data, function (i, item) {
            coordinate = {
            	  'name': item.c_status,
                    'x' : parseFloat(i),
                    'y' : parseFloat(item.count)
            };
            graphData.push(coordinate);
        	
        });

        var graph = new Rickshaw.Graph({
            element: document.querySelector(".chart"),
            renderer: 'bar',
            width: 1000,
            height: 500,
            padding: {top: 0.09},
            stack: false,
            series: [{
                name: "campaigns_by_status",
                color: '#f8694d',
                data: graphData
            }]
        });
        var list = {};
        for (var i = 0; i < graphData.length;) {
            list[i] = graphData[i].name;
            i++;
        }
        var format = function (n) {
            return list[n];
        };

        var xAxis = new Rickshaw.Graph.Axis.X({
            graph: graph,
            orientation: 'bottom',
            element: document.getElementById('x_axis'),
            width: 800,
            height: 250,
            tickFormat: format

        });
        graph.render();

        var yAxis = new Rickshaw.Graph.Axis.Y({
            graph: graph,
            orientation: 'left',
            element: document.getElementById('y_axis')
        });

        yAxis.render();

        d3.selectAll(".x_ticks_d3.plain").attr("transform", "translate(83,0)");
        d3.selectAll(".x_ticks_d3.plain text").attr("transform", "rotate(-45 0,0)");
        d3.selectAll(".x_ticks_d3.plain text").attr("style", "text-anchor: end");

        var legend = new Rickshaw.Graph.Legend({
            element: document.querySelector("#legend"),
            graph: graph
        });
        
        legend.render();

    });
})();
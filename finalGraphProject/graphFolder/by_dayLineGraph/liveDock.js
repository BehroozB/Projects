(function(){
    var audienceAPI = "http://exampleformat=json";
    
    $.getJSON(audienceAPI, function (data) {
        var graphData = [];
        var coordinate ={};

        $.each(data, function (i, item) {
            coordinate = {
                'name': item.report_date,
                'x' : parseFloat(i),
                'y' : parseFloat(item["eCPM"])  
            };
            graphData.push(coordinate);
        });

        var palette = new Rickshaw.Color.Palette();

        var graph = new Rickshaw.Graph({
            element : document.querySelector("#chart"),
            renderer : 'line',
            width: 1000,
            height: 500,
            stack: false,
            padding: {top: 0.10},
            series: [{
                name: "byDay",                
                color: palette.color(),
                data: graphData
            }]
        });

         var list = {}; 
            for(var i = 0; i < graphData.length;){
            list[i] = graphData[i].name;
            i++;
        }

        var format = function(n){
            return list[n];
        }; 

        var xAxis = new Rickshaw.Graph.Axis.X({
            graph: graph,
            orientation: 'bottom',
            element: document.getElementById('x_axis'),
            pixelsPerTick: 48,
            height: 200,
            tickFormat: format
        });

        graph.render();

        var yAxis = new Rickshaw.Graph.Axis.Y({ //This is needed so the y-axis can render on the left side of the div container
            graph: graph,
            orientation: 'left',
            element: document.getElementById('y_axis')
        });

        yAxis.render();


        d3.selectAll(".x_ticks_d3.plain").attr("transform", "translate(83,0)");
        d3.selectAll(".x_ticks_d3.plain text").attr("transform", "rotate(-45 0,0)");
        d3.selectAll(".x_ticks_d3.plain text").attr("style", "text-anchor: end");

    });
})();
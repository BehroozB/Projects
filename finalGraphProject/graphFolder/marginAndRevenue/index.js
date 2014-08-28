(function () {
    var audienceAPI = "http://exampleformat=json";
    //The data above is nvd and has a callback, which is then stored in the variable

    $.getJSON(audienceAPI, function (data) {
        var graphData = []; //Graphdata will hold the data so rickshaw can render the data
        var coordinate = {}; //Coordinate holds the x and y data after the http file is translated
        var graphDataMargin = [];
        var coordinateMargin = {};

        $.each(data, function (i, item) {
            coordinate = {
                'name': item.advertiser,
                'x' : parseFloat(i),
                'y' : parseFloat(item["media_cost"])  // Contains all the y axis from the http file
            };
            graphData.push(coordinate); //pushs the new translated data to a new variable called graphData
        });

        $.each(data, function (i, item) {//-- This function is collecting the margin data in the report
            coordinateMargin = {
                'name': item.advertiser,
                   'x': parseInt(i), 
                   'y': parseInt(item["revenue"]) 
            };
            graphDataMargin.push(coordinateMargin); 
        });

        var palette = new Rickshaw.Color.Palette();

        var graph = new Rickshaw.Graph({ //This is the actual Rickshaw code that is building a graph in the html div "chart"
            element: document.querySelector(".chart"),
            renderer: 'bar',
            width: 1000,
            height: 500,
            padding: {top: 0.09},
            stack: false,
            series: [{
                name: "Media Cost",
                color: palette.color(), // Set color here for the graph rect
                data: graphData
            },{
                name: "Revenue",
                color: palette.color(),
                data: graphDataMargin
            },{
                data: [{x: 0, y: 0}]
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
            pixelsPerTick: 16,
            width: 1000,
            height: 300,
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
        d3.selectAll(".x_ticks_d3.plain text").attr("transform", "rotate(-50 0,0)");
        d3.selectAll(".x_ticks_d3.plain text").attr("style", "text-anchor: end");
        

        
        var legend = new Rickshaw.Graph.Legend({
                element: document.querySelector("#legend"),
                graph: graph
        });
        legend.render();
        //The code above works keep it and don't change without keeping track


    }); //Need the closing tags below
})();





















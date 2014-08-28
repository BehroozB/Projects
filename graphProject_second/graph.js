(function () {
    var audienceAPI = "http://examplecallback=?";

    $.getJSON(audienceAPI, function (data) {
        var graphData = []; 
        var coordinate = {}; 

        $.each(data[0].values, function (i, item) {
            coordinate = {
                'x': parseInt(item.x),
                'y': parseInt(item.y) 
            };
            graphData.push(coordinate); //pushs the new translated data to a new variable called graphData
        });
        var graph = new Rickshaw.Graph({ 
            element: document.querySelector("#chart"),
            renderer: 'bar',
            width: 1000,
            height: 500,
            series: [{
                color: '#f8694d', 
                data: graphData
            }]
        });
        graph.render();
        
        var hoverDetail = new Rickshaw.Graph.HoverDetail({
            graph : graph,
            formatter : function(series, x, y) {
                return parseInt(y);
                
            }
        });
        var yAxis = new Rickshaw.Graph.Axis.Y({ 
            graph: graph,
            orientation: 'left',
            element: document.getElementById('y_axis')
        });
        yAxis.render();
    })
})();

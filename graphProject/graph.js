(function () {
    var audienceAPI = "http://example&callback=?";

    $.getJSON(audienceAPI, function (data) {
        var graphData = [];
        var coordinate = {};

        $.each(data[0].values, function (i, item) {
            coordinate = {
                'x': parseInt(item.x),
                    'y': item.y
            };
            graphData.push(coordinate);
        });
        var graph = new Rickshaw.Graph({
            element: document.querySelector("#chart"),
            renderer: 'bar',
            width: 1000,
            height: 500,
            series: [{
                data: graphData
            }]
        });
        graph.render();
    })
})();
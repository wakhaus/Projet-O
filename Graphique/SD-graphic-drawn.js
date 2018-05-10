// DRAW CO2 SD
function draw_SD_co2(SD_trend_list){
    d3.select("svg").remove() //remove the old graph
        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        // parse the date / time
        var parseTime = d3.timeParse("%Y-%m-%d");



        // Get the data
        d3.json(SD_trend_list, function(error, data) {
            if(error) throw ('There was an error while getting geoData: '+error);

            // format the data
            data.forEach(function(d) {
                    d.Date = parseTime(d.Date);
                    d.Trend = +d.Trend;
            });

        
            // set the ranges // Scale the range of the data
            
            var x = d3.scaleTime().domain(d3.extent(data, function(d) { return d.Date; })).range([0, width]);
            var y = d3.scaleLinear().domain([d3.min(data, function(d) {
                return d.Trend; }), d3.max(data, function(d) { return d.Trend; })])
                    .range([height, 0]);


            // define the line
            var valueline = d3.line()
                .x(function(d) { return x(d.Date);})
                .y(function(d) { return y(d.Trend);});

            // append the svg obgect to the body of the page
            // appends a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            var svg = d3.select("#graph_draw").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");


            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("class", "line")
                .attr("d", valueline);

            // Add the X Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));

        })
        
    } /*fin de la fonction co2 */
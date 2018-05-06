function draw_graph(url){
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%Y-%m-%d");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
        if (donnee == 'volcan'){
          var valueline = d3.line()
            .x(function(d) { return x(d.Date);})
            .y(30)
        }
        else if (donnee == 'co2') {
          var valueline = d3.line()
            .x(function(d) { return x(d.Date);})
            .y(function(d) { return y(d.Trend);})};

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.json(url, function(error, data) {
        if(error) throw ('There was an error while getting geoData: '+error);
        // format the data
        if(donnee =='co2'){
        data.forEach(function(d) {
            d.Date = parseTime(d.Date);
            d.Trend = +d.Trend;
            console.log(d.Date)
        });
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.Date; }));
    y.domain([d3.min(data, function(d) { return d.Trend; }), d3.max(data, function(d) { return d.Trend; })]);}

          else {
          data.forEach(function(d) {
              d.Date = d.Date
              d.Trend = 30


          });
      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.Date; }));
      y.domain([20, 40]);
          }

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

    });
}

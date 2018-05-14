// CO2 FUNCTION
function draw_co2(url){
    d3.select("svg").remove() //remove the old graph
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    // parse the date / time
    var parseTime = d3.timeParse("%Y-%m-%d");

    // Get the data
    d3.json(url, function(error, data) {
        if(error) throw ('There was an error while getting geoData: '+error);
        data.forEach(function(d) {
                d.Date = parseTime(d.Date);
                d.Trend = +d.Trend;
            });

        // set the ranges // Scale the range of the data
        var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) { return d.Date; }))
            .range([0, width]);
        var y = d3.scaleLinear()
            .domain([d3.min(data, function(d) { return d.Trend; }), d3.max(data, function(d) { return d.Trend; })])
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












//VOLCAN FUNCTION
function draw_volcan(url){
    d3.select("svg").remove() // remove the old graph

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    d3.json(url, function(error, data) { //chargement des data volcans
        if(error) throw ('There was an error while getting geoData: '+error);
        //get in an array the occurance of eruptions
        var volcans_incidence_annee_2018 = new Array(59).fill(0) // on prépare une array avec pour le nombre d'éruptions de volcan par année
        data.forEach(function(d) {
            var single_date_index = d.Date-1960     //année-1960 = index où il faudra ajouter 1 pour l'occurence de l'année
            volcans_incidence_annee_2018[single_date_index] += 1 //ajoute 1 d'occurance à l'année souhaitée
            });
        var volcans_incidence_annee = new Array(56).fill(0)

        for(i in volcans_incidence_annee_2018){ //créé un array volcans_incidence_annee qui contient les données de 1960 à 2015 uniquement
            if(i<56){
                volcans_incidence_annee[i] = volcans_incidence_annee_2018[i]
            };
        };

        var year_array = []
        for(var i = 1960; i<=2015; i++) {year_array.push(i);} //créé un array avec chaque année

        //create array with all the points
        var xy=[];
        for(var i = 0; i < year_array.length; i++ ) {
            xy.push({x: year_array[i], y: volcans_incidence_annee[i]});
        };

        // set the ranges
        var x = d3.scaleLinear().domain([1960, 2015]).range([0, width]);
        var y = d3.scaleLinear().domain([Math.min(...volcans_incidence_annee), Math.max(...volcans_incidence_annee)]).range([height, 0]);

        // create a line function that can convert data[] into x and y points
        var valueline = d3.line()
            .x(function(d) { return x(d.x);})
            .y(function(d) { return y(d.y);});


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
            .attr("d", valueline(xy));

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));
        //svg.append("g").attr("d", line(+volcans_incidence_annee));
    });

}















// TEMPERATURES FUNCTION
function draw_temperatures(url){
    d3.select("svg").remove() //remove the old graph
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    // parse the date / time
    var parseTime = d3.timeParse("%Y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.year);})
        .y(function(d) { return y(d.temperature);});

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#graph_draw").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.json(url, function(error, data) {
        if(error) throw ('There was an error while getting geoData: '+error);
        // format the data
        data.forEach(function(d) {
            d.year = parseTime(d.year);
            d.temperature = +d.temperature;
        });
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([d3.min(data, function(d) { return d.temperature; }), d3.max(data, function(d) { return d.temperature; })]);

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

} /*fin de la fonction température */











//TSUNAMIS FUNCTION
function draw_tsunamis(url){
    d3.select("svg").remove() // remove the old graph

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

        d3.json(url, function(error, data) { //chargement des data tsunamis
            if(error) throw ('There was an error while getting geoData: '+error);
            //get in an array the occurance of eruptions
            var tsunamis_incidence_annee_2018 = new Array(59).fill(0) // on prépare une array avec pour le nombre de tsunamis par année
            data.forEach(function(d) {
                var single_date_index = d.Date-1960     //année-1960 = index où il faudra ajouter 1 pour l'occurence de l'année
                tsunamis_incidence_annee_2018[single_date_index] += 1 //ajoute 1 d'occurance à l'année souhaitée
                });
            var tsunamis_incidence_annee = new Array(56).fill(0)

            for(i in tsunamis_incidence_annee_2018){ //créé un array tsunamis_incidence_annee qui contient les données de 1960 à 2015 uniquement
                if(i<56){
                    tsunamis_incidence_annee[i] = tsunamis_incidence_annee_2018[i]
                };
            };

            var year_array = []
            for(var i = 1960; i<=2015; i++) {year_array.push(i);} //créé un array avec chaque année

            //create array with all the points
            var xy=[];
            for(var i = 0; i < year_array.length; i++ ) {
                xy.push({x: year_array[i], y: tsunamis_incidence_annee[i]});
            };

            // set the ranges
            var x = d3.scaleLinear().domain([1960, 2015]).range([0, width]);
            var y = d3.scaleLinear().domain([Math.min(...tsunamis_incidence_annee), Math.max(...tsunamis_incidence_annee)]).range([height, 0]);

            // create a line function that can convert data[] into x and y points
            var valueline = d3.line()
                .x(function(d) { return x(d.x);})
                .y(function(d) { return y(d.y);});


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
                .attr("d", valueline(xy));

            // Add the X Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));
            //svg.append("g").attr("d", line(+tsunamis_incidence_annee));
        });

    }

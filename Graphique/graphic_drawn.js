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
        var x = d3.scaleTime().domain([new Date("1960"), new Date("2015")]).range([0, width]);
        var y = d3.scaleLinear()
            .domain([d3.min(data, function(d) { return d.Trend; })-1/100*d3.min(data, function(d) { return d.Trend; }), d3.max(data, function(d) { return d.Trend; })+1/100*d3.min(data, function(d) { return d.Trend; })])
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

        //Y Axis label
        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Carbon dioxide (ppm)");


        // Add the valueline path.
        svg.append("path")
            .data([data])
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .attr("class", "line")
            .attr("d", valueline);
        
        // Add the scatterplot
        var month = new Array();
        month[0] = "Janvier";
        month[1] = "Février";
        month[2] = "Mars";
        month[3] = "Avril";
        month[4] = "Mai";
        month[5] = "Juin";
        month[6] = "Juillet";
        month[7] = "Août";
        month[8] = "Semptembre";
        month[9] = "Octobre";
        month[10] = "Novembre";
        month[11] = "Décembre";

        var div = d3.select("#graph_coordinates")

        

        svg.selectAll("dot")	
            .data(data)			
            .enter().append("circle")								
            .attr("r", 5)		
            .attr("cx", function(d) { return x(d.Date); })		 
            .attr("cy", function(d) { return y(d.Trend); })
            .style("opacity", 0)		
            .on("mouseover", function(d) {
                div.transition()		
                    .duration(200)		
                    .style("opacity", 1);
                div	.html("Date : " + d.Date.getFullYear() + ", " + month[d.Date.getMonth()] + "<br/>ppm de CO<sub>2</sub> : "  + d.Trend)	
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY + 28) + "px")
                    .style("z-index", 5);
                })					
            .on("mouseout", function(d) {		
                div.transition()
                    .delay(600)		
                    .duration(700)		
                    .style("opacity", 0)
                    .style("z-index", "1");
                });

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // gridlines in x axis function
        function make_x_gridlines() {		
            return d3.axisBottom(x)
                .ticks(10);
        };

        // add the X gridlines
        svg.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat(""));

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
            xy.push({x: new Date(year_array[i].toString()), y: volcans_incidence_annee[i]});
        };

        // set the ranges
        var x = d3.scaleTime()
            .domain([new Date("1960"), new Date("2015")])
            .range([0, width]);
        var y = d3.scaleLinear()
            .domain([Math.min(...volcans_incidence_annee)-1/20*Math.min(...volcans_incidence_annee), Math.max(...volcans_incidence_annee)+1/20*Math.min(...volcans_incidence_annee)])
            .range([height, 0]);

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
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .attr("class", "line")
            .attr("d", valueline(xy));

        //Y Axis label
        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Occurrence of eruptions");

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .tickFormat(d3.timeFormat("%Y"))
        );

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // gridlines in x axis function
        function make_x_gridlines() {		
            return d3.axisBottom(x)
                .ticks(10);
        };

        // add the X gridlines
        svg.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat(""));


        // Add the scatterplot
        var month = new Array();
        month[0] = "Janvier";
        month[1] = "Février";
        month[2] = "Mars";
        month[3] = "Avril";
        month[4] = "Mai";
        month[5] = "Juin";
        month[6] = "Juillet";
        month[7] = "Août";
        month[8] = "Semptembre";
        month[9] = "Octobre";
        month[10] = "Novembre";
        month[11] = "Décembre";

        var div = d3.select("#graph_coordinates")


        svg.selectAll("dot")	
            .data(xy)			
            .enter().append("circle")
            .attr("fill", "transparent")
            .attr("stroke", "grey")					
            .attr("r", 10)		
            .attr("cx", function(d){return x(d.x);}) 	 
            .attr("cy", function(d){return y(d.y);}) 
            .style("opacity", 1)	
            .on("mouseover", function(d) {
                div.transition()		
                    .duration(200)		
                    .style("opacity", 1);
                div	.html("Date : " + d.x.getFullYear() + ", " + month[d.x.getMonth()] + "<br/>nombre d'éruptions : "  + d.y)	
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY + 28) + "px")
                    .style("z-index", 5);
                })					
            .on("mouseout", function(d) {		
                div.transition()
                    .delay(600)		
                    .duration(700)		
                    .style("opacity", 0)
                    .style("z-index", "1");
            });
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
    var x = d3.scaleTime().domain([new Date("1960"), new Date("2015")]).range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.year);})
        .y(function(d) { return y(d.temperature);});

    // append the svg obgect to the body of the page
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
            //let the abs_max be the limit of the graph in order to center de 0
        var abs_limit = 0
        if(Math.abs(d3.min(data, function(d) { return d.temperature; })<Math.abs(d3.max(data, function(d) { return d.temperature; })))){
            abs_limit = d3.max(data, function(d) { return d.temperature; });
        }else{
            abs_limit = d3.min(data, function(d) { return d.temperature; })
        }
        y.domain([-abs_limit-1/10*abs_limit, abs_limit+1/10*abs_limit]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .attr("class", "line")
            .attr("d", valueline);

        //Y Axis label
        svg.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Difference of degreee");

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add the scatterplot
        var month = new Array();
        month[0] = "Janvier";
        month[1] = "Février";
        month[2] = "Mars";
        month[3] = "Avril";
        month[4] = "Mai";
        month[5] = "Juin";
        month[6] = "Juillet";
        month[7] = "Août";
        month[8] = "Semptembre";
        month[9] = "Octobre";
        month[10] = "Novembre";
        month[11] = "Décembre";

        var div = d3.select("#graph_coordinates")


        svg.selectAll("dot")	
            .data(data)			
            .enter().append("circle")
            .attr("fill", "transparent")
            .attr("stroke", "grey")		
            .attr("r", 10)		
            .attr("cx", function(d){return x(d.year);}) 	 
            .attr("cy", function(d){return y(d.temperature);}) 
            .style("opacity", 1)
            .on("mouseover", function(d) {
                div.transition()		
                    .duration(200)		
                    .style("opacity", 1);
                div	.html("Date : " + d.year.getFullYear() + ", " + month[d.year.getMonth()] + "<br/>Différence de température : "  + d.temperature + " °C")	
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY + 28) + "px")
                    .style("z-index", 5);
                })					
            .on("mouseout", function(d) {		
                div.transition()
                    .delay(600)		
                    .duration(700)		
                    .style("opacity", 0)
                    .style("z-index", "1");	
                });

    })

    // gridlines in x axis function
    function make_x_gridlines() {		
        return d3.axisBottom(x)
            .ticks(10);
    };

    // add the X gridlines
    svg.append("g")			
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_gridlines()
        .tickSize(-height)
        .tickFormat(""));
    
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
            xy.push({x: new Date(year_array[i].toString()), y: tsunamis_incidence_annee[i]});
        };

        // set the ranges
        var x = d3.scaleTime().domain([new Date("1960"), new Date("2015")]).range([0, width]);
        var y = d3.scaleLinear()
            .domain([Math.min(...tsunamis_incidence_annee)-1/20*Math.max(...tsunamis_incidence_annee), Math.max(...tsunamis_incidence_annee)+1/20*Math.max(...tsunamis_incidence_annee)])
            .range([height, 0]);

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
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .attr("class", "line")
            .attr("d", valueline(xy));

        // Add the X Axis
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
            .tickFormat(d3.timeFormat("%Y"))
        );

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            //.attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dx", "10.5em")
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Occurrence of tsunamis");

        // gridlines in x axis function
        function make_x_gridlines() {		
            return d3.axisBottom(x)
                .ticks(10);
        };

        // add the X gridlines
        svg.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat(""));

        // Add the scatterplot
        var month = new Array();
        month[0] = "Janvier";
        month[1] = "Février";
        month[2] = "Mars";
        month[3] = "Avril";
        month[4] = "Mai";
        month[5] = "Juin";
        month[6] = "Juillet";
        month[7] = "Août";
        month[8] = "Semptembre";
        month[9] = "Octobre";
        month[10] = "Novembre";
        month[11] = "Décembre";

        var div = d3.select("#graph_coordinates")

        svg.selectAll("dot")	
            .data(xy)			
            .enter().append("circle")
            .attr("fill", "transparent")
            .attr("stroke", "grey")					
            .attr("r", 10)		
            .attr("cx", function(d){return x(d.x);}) 	 
            .attr("cy", function(d){return y(d.y);}) 
            .style("opacity", 1)
            .on("mouseover", function(d) {
                div.transition()		
                    .duration(200)		
                    .style("opacity", 1);
                div	.html("Date : " + d.x.getFullYear() + ", " + month[d.x.getMonth()] + "<br/>nombre de tsunamis : "  + d.y)	
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY + 28) + "px")
                    .style("z-index", 5);
                })					
            .on("mouseout", function(d) {		
                div.transition()
                    .delay(600)		
                    .duration(700)		
                    .style("opacity", 0)
                    .style("z-index", "1");
            });
    });

}












//Ouragans FUNCTION
function draw_ouragans(url){
    d3.select("svg").remove() // remove the old graph

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    d3.json(url, function(error, data) { //chargement des data tsunamis
        if(error) throw ('There was an error while getting geoData: '+error);
        //get in an array the occurance of eruptions
        var ouragans_incidence_annee_2018 = new Array(59).fill(0) // on prépare une array avec pour le nombre de tsunamis par année
        data.forEach(function(d) {
            var single_date_index = d.Date-1960     //année-1960 = index où il faudra ajouter 1 pour l'occurence de l'année
            ouragans_incidence_annee_2018[single_date_index] += 1 //ajoute 1 d'occurance à l'année souhaitée
            });
        var ouragans_incidence_annee = new Array(56).fill(0)
        for(i in ouragans_incidence_annee_2018){ //créé un array tsunamis_incidence_annee qui contient les données de 1960 à 2015 uniquement
            if(i<56){
                ouragans_incidence_annee[i] = ouragans_incidence_annee_2018[i]
            };
        };

        var year_array = []
        for(var i = 1960; i<=2015; i++) {year_array.push(i);} //créé un array avec chaque année
        //create array with all the points
        var xy=[];
        for(var i = 0; i < year_array.length; i++ ) {
            xy.push({x: new Date(year_array[i].toString()), y: ouragans_incidence_annee[i]});
        };

        // set the ranges
        var x = d3.scaleTime().domain([new Date("1960"), new Date("2015")]).range([0, width]);
        var y = d3.scaleLinear()
            .domain([Math.min(...ouragans_incidence_annee)-1/20*Math.max(...ouragans_incidence_annee), Math.max(...ouragans_incidence_annee)+1/20*Math.max(...ouragans_incidence_annee)])
            .range([height, 0]);

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
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .attr("class", "line")
            .attr("d", valueline(xy));

        // Add the X Axis
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
            .tickFormat(d3.timeFormat("%Y"))
        );

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Occurrence of tsunamis");

        // gridlines in x axis function
        function make_x_gridlines() {		
            return d3.axisBottom(x)
                .ticks(10);
        };

        // add the X gridlines
        svg.append("g")			
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat(""));

         // Add the scatterplot
         var month = new Array();
         month[0] = "Janvier";
         month[1] = "Février";
         month[2] = "Mars";
         month[3] = "Avril";
         month[4] = "Mai";
         month[5] = "Juin";
         month[6] = "Juillet";
         month[7] = "Août";
         month[8] = "Semptembre";
         month[9] = "Octobre";
         month[10] = "Novembre";
         month[11] = "Décembre";
 
         var div = d3.select("#graph_coordinates")
 
         svg.selectAll("dot")	
             .data(xy)			
             .enter().append("circle")
             .attr("fill", "transparent")
             .attr("stroke", "grey")					
             .attr("r", 10)		
             .attr("cx", function(d){return x(d.x);}) 	 
             .attr("cy", function(d){return y(d.y);}) 
             .style("opacity", 1)
             .on("mouseover", function(d) {
                 div.transition()		
                     .duration(200)		
                     .style("opacity", 1);
                 div	.html("Date : " + d.x.getFullYear() + ", " + month[d.x.getMonth()] + "<br/>nombre d'ouragans : "  + d.y)	
                     .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY + 28) + "px")
                    .style("z-index", 5);
                })					
            .on("mouseout", function(d) {		
                div.transition()
                    .delay(600)		
                    .duration(700)		
                    .style("opacity", 0)
                    .style("z-index", "1");
             });
    });

}

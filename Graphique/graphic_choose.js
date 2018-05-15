function graphic_choose(){
    var x = document.getElementsByClassName('checkbox');
    var count = 0
    for(i=0; i < x.length; i++){
        var test = x[i].checked;
        if(test == true){
            var count = count + 1;
        }
    }
    if(count==0){
        d3.select("svg").remove() //remove all graphs and let the x axis be (actually, redrawing it)
        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        var svg = d3.select("#graph_draw").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


        // set the ranges // Scale the range of the data
        var x = d3.scaleTime().domain([new Date("1960"), new Date("2015")]).range([0, width]);

         // Add the X Axis
         svg.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x));
        
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


    }else if(count==1){                       /* Drawing one graph in absolute values */
        for(i in x){
            var test = x[i].checked;
            if(test == true){
                var id = x[i].id
                break
            }
        }

        if(id=='temperatureCB'){
            url = "Donnees/temperatures/temperatures.json"; /*à définir*/
            draw_temperatures(url);

        }else if(id=='ouraganCB'){
            url = 'Donnees/ouragans/ouragans.json'
            draw_ouragans(url);

        }else if (id=='Co2CB'){
            var url = "Donnees/co2/Data/co2-mm-mlo_json.json";
            draw_co2(url);

        }else if (id=='volcanCB'){
            var url = "Donnees/volcans/volcans.json"
            draw_volcan(url);

        }else if (id=='tsunamisCB'){
            var url = "Donnees/tsunamis/tsunamis.json"
            draw_tsunamis(url);
        }



    }else {                    /* Drawing two or more graphs in Standart-Deviation values*/
        var id_list = [];
        for(i in x){           //this for-loop gives an array with the ids of all the checkboxes that are checked
            var test = x[i].checked;
            if(test == true){
                id_list.push(x[i].id);
            };
        };

        SD_transformation(id_list);    // transformation in SD-values of the checked checkboxes




    }


}

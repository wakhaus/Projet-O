function SD_transformation(list_id){
    d3.select("svg").remove() //remove the old graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    var svg = d3.select("#graph_draw").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        
    for(i in list_id){
        if(list_id[i]=='temperatureCB'){
            
        
        }else if(list_id[i]=='ouraganCB'){
        

        }else if (list_id[i]=='Co2CB'){
            // Get the data & SD-transformation
            var absolute_list = []      //cette liste contiendra toutes les valeurs d.Trend
            d3.json("Donnees/co2/data/co2-mm-mlo_json.json", function(error, data) {
                if(error) throw ('There was an error while getting geoData: '+error);
                data.forEach(function(d) {
                    absolute_list.push(d.Trend);
                });
                draw_SD_co2(SD_calculation(absolute_list));
            });

        }else if (list_id[i]=='volcanCB'){
            
        };
    };
}


function SD_calculation(absolute_list){
    // calculation of SD
    var sum = 0;
    var length=0;
    for(i in absolute_list){
        length += 1
    };
    var length = absolute_list.length;
    for(i in absolute_list){
        sum += absolute_list[i];
    };
    var moy = sum/length;
    var dist = 0;
    for(i in absolute_list){
        dist += Math.pow(absolute_list[i] - moy, 2);
    };
    var SD = Math.sqrt(dist/(length-1));
    // transformation of the absolute_values in SD_values
    var SD_trend_list = [];
    for(i in absolute_list){
        SD_trend_list.push((absolute_list[i]-moy)/SD);
    };
    console.log(SD_trend_list)
    return SD_trend_list;
};
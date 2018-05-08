function SD_transformation(list_id){
    for(i in list_id){
        if(list_id[i]=='temperatureCB'){
            
        
        }else if(list_id[i]=='ouraganCB'){
        

        }else if (list_id[i]=='Co2CB'){
            // Get the data & SD-transformation
            var absolute_list = []      //cette liste contiendra toutes les valeurs d.Trend
            d3.json("Donnees/co2/data/co2-mm-mlo_json.json", function(error, data) {
                if(error) throw ('There was an error while getting geoData: '+error);
                    data.forEach(function(d) {
                        d.Trend = +d.Trend;
                        absolute_list.push(Number(d.Trend))
                    });
            });
            var SD_Trend = SD_calculation(absolute_list)    //on transforme la liste en valeurs d'écart-type
            

        }else if (list_id[i]=='surfaceGlaciaireCB'){
            

        }else if (list_id[i]=='volcanCB'){
            
        };
    };
}


function SD_calculation(absolute_list){
    // calculation of SD
    var sum = 0;
    var length = absolute_list.length;
    for(i in absolute_list){
        sum += absolute_list[i];
    };
    var moy = sum/length;
    var dist = 0;
    for(i in absolute_list){
        dist += (absolute_list[i] - moy)^2;
    };
    var SD = Math.sqrt(dist/(length-1));
    // transformation of the absolute_values in SD_values

};
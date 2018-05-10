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
                        console.log("t'es dedans");
                        d.Trend = +d.Trend;
                        absolute_list.push(Number(d.Trend));
                        
                    });
            });
            console.log(absolute_list.length)
            var SD_trend_list = SD_calculation(absolute_list);
            console.log(SD_trend_list);
            draw_SD_co2(SD_trend_list);
            //draw_SD_co2(SD_calculation(absolute_list));    //on transforme la liste en valeurs d'écart-type, puis on dessine tout ça grâce au fichier 'SD-graphic-drawn.js'
            
            

        }else if (list_id[i]=='volcanCB'){
            
        };
    };
}


function SD_calculation(absolute_list){
    // calculation of SD
    var sum = 0;
    console.log("absolute_list")
    console.log(absolute_list)
    var length=0;
    for(i in absolute_list){
        length += 1
        console.log(length)
    };
    var length = absolute_list.length;
    console.log("longueur " + length)
    console.log("A")
    for(i in absolute_list){
        sum += absolute_list[i];
    };
    var moy = sum/length;
    var dist = 0;
    for(i in absolute_list){
        alert("B")
        dist += Math.pow(absolute_list[i] - moy, 2);
    };
    var SD = Math.sqrt(dist/(length-1));
    // transformation of the absolute_values in SD_values
    var SD_trend_list = [];
    for(i in absolute_list){
        SD_trend_list.push((absolute_list[i]-moy)/SD);
    };
    return SD_trend_list;
};
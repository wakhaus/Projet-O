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
        d3.select("svg").remove() //remove all graphs
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
            url = 'urldonnees'  /*à définir*/
            draw_graph(url);

        }else if (id=='Co2CB'){
            var url = "Donnees/co2/Data/co2-mm-mlo_json.json";
            draw_co2(url);

        }else if (id=='volcanCB'){
            var url = "Donnees/volcans/volcans.json"
            draw_volcan(url);
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

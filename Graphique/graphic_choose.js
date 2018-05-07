function graphic_choose(){
    var x = document.getElementsByClassName('checkbox');
    var count = 0
    for(i=0; i < x.length; i++){ 
        var test = x[i].checked;
        if(test == true){
            var count = count + 1;
        }
    }

    if(count!==0, count==1){                       /* Drawing one graph in absolute values */
        for(i in x){
            var test = x[i].checked;
            if(test == true){
                var id = x[i].id
                break
            }
        }

        if(id=='temperatureCB'){
            
            url = 'urltempérature'; /*à définir*/
            draw_graph(url);

        }else if(id=='ouraganCB'){
            url = 'urldonnees'  /*à définir*/
            draw_graph(url);

        }else if (id=='Co2CB'){
            var url = "Donnees/co2/Data/co2-mm-mlo_json.json";
            draw_co2(url);

        }else if (id=='surfaceGlaciaireCB'){
            url = 'urlsurfacegl'; /*à définir*/
            draw_graph(url);

        }else if (id=='volcanCB'){
            var url = ".../Donnees/volcans/volcans.json"
            draw_volcan("Donnees/volcans/volcans.json");
        }








    }else {                    /* Drawing two or more graphs in Standart-Deviation values*/



    }






}

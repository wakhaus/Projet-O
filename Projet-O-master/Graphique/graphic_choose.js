var x = document.getElementsByClassName('checkbox');
var count = 0
for(i in x){
    var test = x[i].checked;
    if(test == true){
        var count = count + 1;
    }
}



if(count==1){                       /* Drawing one graph in absolute values */
    for(i in x){
        var test = x[i].checked;
        if(test == true){
            var id = x[i].id
            break
        }
    }

    if(id=='temperatureCB'){
        var donnee= 'temp', /*j'ai besoin de cette donnee pour savoir ce que je dessine dans graphic_drawn (trend or else)*/
          url = 'urltempérature'; /*à définir*/
        draw_graph(url);

    }else if(id=='ouraganCB'){
        var donnee= 'ouragan',
          url = 'urldonnees'  /*à définir*/
        draw_graph(url);

    }else if (id=='Co2CB'){
        var url = "Donnees/co2/Data/co2-mm-mlo_json.json";
        var donnee= 'co2'
        draw_graph(url);

    }else if (id=='surfaceGlaciaireCB'){
        var donnee= 'surfaceGl',
          url = 'urlsurfacegl'; /*à définir*/
        draw_graph(url);

    }else if (id=='volcanCB'){
        var donnee= 'volcan'
        var url = "Donnees/volcans/volcans.json"
        draw_graph(url);
    }








}else {                    /* Drawing two or more graphs in Standart-Deviation values*/



}

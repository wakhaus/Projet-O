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
        var url = "Donnees/co2/Data/co2-mm-mlo_json.json";
        draw_graph(url);
    }else if(id=='ouraganCB'){

    }else if (id=='Co2CB'){

    }else if (id=='surfaceGlaciaireCB'){

    }else if (id=='volcanCB'){
        var url = "Donnees/volcans/volcans.json"

    }


















}else {                    /* Drawing two or more graphs in Standart-Deviation values*/
    
    

}



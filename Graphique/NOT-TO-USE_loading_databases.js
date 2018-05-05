// LOADING CO2 DataS
var requestURL = 'Donnees/co2/Data/co2-mm-mlo_json.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();                 // demande à traiter le fichier json

var co2_ppm = []
var co2_date = []
var co2 = []
request.onload = function() {
    var co2_temporary = request.response;
    for (i in co2_temporary) {
        co2_ppm.push(co2_temporary[i].Trend);
        co2_date.push(co2_temporary[i].Date);
        co2.push(co2_temporary[i]);
        }
    }
/*
 function init() {
    loadJSON(function(response) {
     // Parse JSON string into object
       var actual_JSON = JSON.parse(response);
       console.log("SA")
    });
   }
*/
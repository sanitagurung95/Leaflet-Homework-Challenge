// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(myMap);

   // Create the tile layer that will be the background of our map
   var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

   // Store our API endpoint as queryUrl
   var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" ;


// make markers depending upon the magnitude

function chooseColor(magnitude) {

    if (magnitude[i].points > 5) {
      color = "red";
    }
    else if (magnitude[i].points > 4) {
      color = "orange";
    }
    else if (magnitude[i].points > 3) {
      color = "gold"
    }
    else if (magnitude[i].points > 2) {
      color = "yellow"
    }
    else if (magnitude[i].points > 1) {
      color = "yellowgreen"
    }
    else {
      color = "lightgreen"

}

// function to determine to increase the markersize for shaping our radius of the circle marker
function markerSize(magnitude) {
  return magnitude* 1300;
}

// Cited from Lesson-Plans-17-Maping Activities 1 solved(7, 8 and 9)

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    console.log(data.features);
  
      // Create a new marker cluster group
  var feature = data.features;
    
    for (var i=0; i < feature.length; i++){ 
      var location = feature[i].geometry;
  }
  console.log(location);

  // Add circles to map
  L.circle(feature.geometry.coordinates[1], 
            feature.geometry.coordinates[0], {
    fillOpacity: 0.75,
    color: "grey",
    fillColor: color,
    

  // Adjust radius
  radius: feature.properties.mag * 1300
}).bindPopup("<h3>" + feature[i].properties.place + "</h3><h3" + feature.properties.mag + "</h3>")
.addTo(myMap);
});

//cited from Activities 1 solved 10
  // creating  legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  
  var grades = [0, 1, 2, 3, 4, 5];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML += '<i style="background:' + chooseColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
  };


legend.addTo(myMap);
// Cited from Lesson-Plans-17-Maping Activities 2 solved(4)
}


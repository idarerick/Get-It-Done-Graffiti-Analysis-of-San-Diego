var districtlink = "/static/council_districts_datasd.geojson";

// Function that will determine the color of a district based on the district it belongs to
function chooseColor(district) {
  switch (district) {
  case 1:
    return "teal";
  case 2:
    return "blue";
  case 3:
    return "green";
  case 4:
    return "orange";
  case 5:
    return "purple";
  case 6:
    return "brown";
  case 7:
    return "yellow";
  case 8:
    return "red";
  case 9:
    return "magenta";
  default:
    return "black";
  }
}

var districtLayer = L.geoJson([],{
  style: function(feature) {
    return {
      color: "white",
      fillColor: chooseColor(feature.properties.district),
      fillOpacity: 0.3,
      weight: 1.5
    };
  },
});

var url = "/data";
var heatArray = [];
  // var $sampleMetadata = document.getElementById("sample-metadata");
d3.json(url, function(response) {
  console.log(response);

  for (var i in response.lat) {
      var lat = response.lat[i];
      var long = response.long[i];
      //console.log(lat);
      //console.log(long);
      if (lat) {
        heatArray.push([lat, long]);
      }
  }
  console.log(heatArray);
});



d3.json(districtlink, function(districtdata) {
  districtLayer.addData(districtdata.features)
});


// Adding tile layer
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

var heatmap = L.heatLayer(heatArray, {
  radius: 1,
  blur: 50
});

// Overlays that may be toggled on or off
var overlayMaps = {
  "District Map": districtLayer,
  "Heat Map": heatmap
};

// Creating map object
var myMap = L.map("map", {
  center: [32.82, -117.1611],
  zoom: 11,
  layers: [streetmap]
});

// Pass our map layers into our layer control
// Add the layer control to the map
var layerControl = L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

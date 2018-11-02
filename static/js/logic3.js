// Add all the graffitiMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
// var graffitiMarkerLayer = L.layerGroup(graffitiMarkers);
// var graffitiHeatMapLayer = L.layerGroup(graffitiHeatMap);

var districtlink = "../council_districts_datasd.geojson";

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



// var WriterzBlok = {
//   location: [32.710720, -117.086959],
//   name: "Writerz Blok"
// };

// var marker = L.marker(WriterzBlok.location).addTo(map);

var districtLayer = L.geoJson([],{
  style: function(feature) {
    return {
      color: "white",
      fillColor: chooseColor(feature.properties.district),
      fillOpacity: 0.3,
      weight: 1.5
    };
  },

//   // Called on each feature
//   function onEachFeature(feature, layer) {

//     // Set mouse events to change map styling
//     layer.on({

//       // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
//       mouseover: function(event) {
//         layer = event.target;
//         layer.setStyle({
//           fillOpacity: 0.7
//         });
//       },

//       // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
//       mouseout: function(event) {
//         layer = event.target;
//         layer.setStyle({
//           fillOpacity: 0.3
//         });
//       },

//       // When a feature (district) is clicked, it is enlarged to fit the screen
//       click: function(event) {
//         map.fitBounds(event.target.getBounds());
//       }
//     });

//       // Giving each feature a pop-up with information pertinent to it
//     bindPopup(function(layer){
//       return ("<h1> District " + feature.properties.district + "</h1><hr>" +
//         "<h2>" + feature.properties.name + "</h2> <hr>" +
//         "<h3>" + feature.properties.phone + "</h3> <hr>" + 
//         "<h4>" + feature.properties.website + "</h4>");
//     });
//   },
});

d3.json(districtlink, function(districtdata) {
  districtLayer.addData(districtdata.features)
});


// // Grabbing our GeoJSON data..
// var districtLayer = d3.json(districtlink, function(districtdata) {

//   // Creating a geoJSON layer with the retrieved data
//   L.geoJson(districtdata, {

//     // Style each feature (in this case a district)
//     style: function(feature) {
//       return {
//         color: "white",
//         // Call the chooseColor function to decide which color to color our district (color based on district)
//         fillColor: chooseColor(feature.properties.district),
//         fillOpacity: 0.3,
//         weight: 1.5
//       };
//     },

//     // Called on each feature
//     onEachFeature: function(feature, layer) {

//       // Set mouse events to change map styling
//       layer.on({

//         // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
//         mouseover: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.7
//           });
//         },

//         // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
//         mouseout: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.3
//           });
//         },

//         // When a feature (district) is clicked, it is enlarged to fit the screen
//         click: function(event) {
//           map.fitBounds(event.target.getBounds());
//         }
//       });

//       // Giving each feature a pop-up with information pertinent to it
//       layer.bindPopup("<h1> District " + feature.properties.district + "</h1> <hr> <h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.phone + "</h3> <hr> <h4>" + feature.properties.website + "</h4>");

//     }
//   });
// });

// Adding tile layer
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 15,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 15,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

// Overlays that may be toggled on or off
var overlayMaps = {
  "District Map": districtLayer
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

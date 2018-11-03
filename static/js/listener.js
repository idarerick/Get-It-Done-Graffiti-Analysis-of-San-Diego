



L.districtLayer.on({

  // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
  mouseover: function(event) {
    layer = event.target;
    layer.setStyle({
      fillOpacity: 0.7
    });
  },

  // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
  mouseout: function(event) {
    layer = event.target;
    layer.setStyle({
      fillOpacity: 0.3
    });
  },

  // When a feature (district) is clicked, it is enlarged to fit the screen
  click: function(event) {
    map.fitBounds(event.target.getBounds());
  }
});

  // Giving each feature a pop-up with information pertinent to it
bindPopup(function(layer){
  return ("<h1> District " + feature.properties.district + "</h1><hr>" +
    "<h2>" + feature.properties.name + "</h2> <hr>" +
    "<h3>" + feature.properties.phone + "</h3> <hr>" + 
    "<h4>" + feature.properties.website + "</h4>");
});

// Called on each feature
function onEachFeature(feature, layer) {

},
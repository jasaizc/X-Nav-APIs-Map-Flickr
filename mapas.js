var map;

function chooseAddr(lat, lng,type) {
    var location = new L.LatLng(lat, lng);
    map.panTo(location);

	  if (type == 'city' || type == 'administrative') {
		map.setZoom(11);
	  } else {
		map.setZoom(13);
	  }
	};
 
    
$(document).ready(function() { 

    map = L.map('map');
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);
     
    map.locate({setView: true, maxZoom: 15, enableHighAccuracy: true});
    function onLocationFound(e) {
       var circulo = e.accuracy / 4;
       L.marker(e.latlng).addTo(map).bindPopup("Estas a " + circulo + " metros de tu ubicacion: " + '<br>'+ "Coordenadas: " + e.latlng.toString()).openPopup();
       L.circle(e.latlng, circulo).addTo(map);
    }
    map.on('locationfound', onLocationFound);
  
    function onLocationError(e) {
       alert(e.message);
    }
    map.on('locationerror', onLocationError);
    var popup = L.popup();
    function onMapClick(e) {
       popup.setLatLng(e.latlng).setContent("Has pinchado en: " + e.latlng.toString()).openOn(map);  
    }
    map.on('click', onMapClick);
    
    function buscar_direccion(){
  	var inp = document.getElementById("addr");
    
		$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
			var items = [];

			$.each(data, function(key, val) {
				items.push(
				"<li><a href='#' onclick='chooseAddr(" +
				val.lat + ", " + val.lon + ");return false;'>" + val.display_name +
				'</a></li>'
				);
        
				})
        imgs_search(inp); 
				
				$('#results').empty();
						if (items.length != 0) {
							$('<p>', { html: "Search results:" }).appendTo('#results');
							$('<ul/>', {
							'class': 'my-new-list',
							html: items.join('')
							}).appendTo('#results');
						} else {
							$('<p>', { html: "No results found" }).appendTo('#results');
						}
			})
     
	};
  
function imgs_search(e) { 
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&format=json&jsoncallback=?"; 

  $('<p>', { html: "Images:" }).appendTo('#results'); 
    $.getJSON(flickerAPI, { 
      tags: e.value, 
    }).done(function(data) { 
   $.each(data.items, function(i, item) { 
     $("<img>").attr("src", item.media.m).appendTo("#results"); 
     if (i === 3) { 
       return false; 
      }  
   }); 
})
};
    
    
    $('#buscar').click(buscar_direccion)
});


$(document).ready(function() { 

    var map = L.map('map');
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
     
});

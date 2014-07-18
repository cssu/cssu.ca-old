/** Google Map in footer */

function init_map() {
  var style = [
    {
      "featureType": "all",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "gamma": 0.5
        }
      ]
    }
  ];
  var homeLatLng = new google.maps.LatLng(43.6594888, -79.39761349999998);
  var myOptions = {
    disableDefaultUI: true,
    zoom: 17,
    center: homeLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: style
  };
  map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
  marker = new google.maps.Marker({ map: map, position: homeLatLng });
  infowindow = new google.maps.InfoWindow({ content:"<b>CSSU</b><br/>BA 2283" });
  google.maps.event.addListener(marker, "click", function(){ infowindow.open(map, marker); });
}

google.maps.event.addDomListener(window, "resize", function(){ map.setCenter(homeLatLng); });
google.maps.event.addDomListener(window, "load", init_map);

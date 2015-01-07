/** Google Map in footer */

var homeLatLng = new google.maps.LatLng(43.6594888, -79.39761349999998);

function init_map() {
  var style = [
    {
      'featureType': 'all',
      'stylers': [
        {
          'saturation': -100
        },
        {
          'gamma': 0.5
        }
      ]
    }
  ];

  var url  = '/img/pin.png';
  var size = new google.maps.Size(32, 38);

  if (window.devicePixelRatio > 1.5) {
    url  = '/img/pin@2x.png';
    size = new google.maps.Size(64, 76);
  }

  var pin = {
    url        : url,
    size       : size,
    scaledSize : new google.maps.Size(32, 38),
    origin     : new google.maps.Point(0, 0),
    anchor     : new google.maps.Point(16, 37)
  };

  var map = new google.maps.Map(
    document.getElementById('gmap_canvas'),
    {
      disableDefaultUI : true,
      zoom             : 17,
      center           : homeLatLng,
      mapTypeId        : google.maps.MapTypeId.ROADMAP,
      styles           : style
    }
  );

  var marker = new google.maps.Marker({
    map      : map,
    position : homeLatLng,
    icon     : pin
  });

  infowindow = new google.maps.InfoWindow({ content:'<b>CSSU</b><br/>BA 2283' });
  google.maps.event.addListener(marker, 'click', function() { infowindow.open(map, marker); });
}

google.maps.event.addDomListener(window, 'resize', function() { map.setCenter(homeLatLng); });
google.maps.event.addDomListener(window, 'load', init_map);

'use strict';

(function(){

/** Web font */

WebFont.load({
  google: {
    families: ['Open Sans:300,400,600']
  },
  custom: {
    families: ['Nexa Light']
  }
});


/** Google Map in footer */

var homeLatLng = new google.maps.LatLng(43.659291, -79.397370);

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

  var url  = '{% asset_path 'pin.png' %}';
  var size = new google.maps.Size(32, 38);

  if (window.devicePixelRatio > 1.5) {
    url  = '{% asset_path 'pin@2x.png' %}';
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
      mapTypeControl    : false,
      streetViewControl : false,
      scaleControl      : false,
      scrollwheel       : false,
      zoom              : 17,
      center            : homeLatLng,
      mapTypeId         : google.maps.MapTypeId.ROADMAP,
      styles            : style
    }
  );

  var marker = new google.maps.Marker({
    map      : map,
    position : homeLatLng,
    icon     : pin
  });

  var infowindow = new google.maps.InfoWindow({ content:'<b>CSSU</b><br/>BA 2250' });
  google.maps.event.addListener(marker, 'click', function() { infowindow.open(map, marker); });
  google.maps.event.addDomListener(window, 'resize', function() { map.setCenter(homeLatLng); });
}

google.maps.event.addDomListener(window, 'load', init_map);


/** Menu icon */

var showMenuClass = 'showmenu';

var closeMenu = function (e) {
  e.stopPropagation();

  if (!e.toElement.classList.contains('nav-menu-link')) {
    e.preventDefault();
  }

  document.body.classList.remove(showMenuClass);
  document.body.removeEventListener('click', closeMenu);
};

document.getElementById('mobile-menu-icon').addEventListener('click', function (e) {
  e.stopPropagation();
  e.preventDefault();

  if (document.body.classList.contains(showMenuClass)) {
    document.body.classList.remove(showMenuClass);
    document.body.removeEventListener('click', closeMenu);
  } else {
    document.body.classList.add(showMenuClass);
    document.body.addEventListener('click', closeMenu);
  }
});

})();

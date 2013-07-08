var rendererOptions = {
  draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();
var map;
var montpellier = new google.maps.LatLng(43.600, 3.883);
var browserSupportFlag = false;

function googleMaps(latitude, longitude)
{
	 var myLatlng = new google.maps.LatLng(latitude, longitude);
    
    // Carte centrée sur le spectacle
    var myMapOptions = {
      zoom: 18,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.HYBRID
    };
    
    // Création de la carte
    var myMap = new google.maps.Map(
      document.getElementById('map'),
      myMapOptions
      );
     
    // Création du marker
    var myMarker = new google.maps.Marker({
      position: myLatlng, 
      map: myMap,
      //icon: myMarkerImage,
      //title: "Cinéma Pathé Bellecour"
    });
}

function initialize() {
  var initialLocation;
  var mapOptions = {
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: montpellier
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));
  initialLocation = initialLocation;
   google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
    computeTotalDistance(directionsDisplay.directions);
  });

  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      calcRoute('WALKING', initialLocation);
    });
  }
  else
  {
    initialLocation = new google.maps.LatLng(43.600,3.883);
    calcRoute('WALKING');
  }
}

function calcRoute(selectedMode, initialLocation) {
  if (!initialLocation)
    initialLocation = 'montpellier';
  var request = {
    origin: initialLocation,
    destination: 'montpellier',
    //waypoints:[{location: 'Bourke, NSW'}, {location: 'Broken Hill, NSW'}],
    travelMode: google.maps.DirectionsTravelMode[selectedMode]
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  document.getElementById('total').innerHTML = total + ' km';
}

function normalGoogleMap(latitude, longitude)
{
  /*$('.content').fadeOut(500, function() {
    $('.inner_content').empty();
    $('.inner_content').html($descSave);
    $('.content').fadeIn(800);*/

  /*$('#map').attr("src",  "http://localhost/custom-directions-panel-google-maps-apiv3/custom-directions-panel-google-maps-apiv3/directions.php?latitude=" 
    + $locations[field].latitude + "&longitude=" + $locations[field].longitude);
  $('.zoomgmap').html('Zoomer carte').attr('onclick', 'fullGoogleMap()');*/

  //$('.gmapcontainer').empty();
  $('#map').css('max-width', '100%').css('height', '190px').css('width', '270px');
  //$('.gmapcontainer').append($('.gmapcontainerbig').html());
  //$('.gmapcontainerbig').empty();
  $('.zoomgmap').html('Zoomer carte').attr('onclick', 'fullGoogleMap()');
  setTimeout(googleMaps, 800, latitude, longitude);
}

function fullGoogleMap()
{
 $('.content').fadeOut(500, function() {
    $('.inner_content').empty();
      
      var lat;
      var longi;
      var locations;
      if ($currentItem.locations)
       locations = $currentItem.locations;
        for (var field in locations)
        {
          lat = locations[field].latitude;
          longi = locations[field].longitude;
          break;
        }
      $.ajax({
        url : "map.php?latitude=" + lat + "&longitude=" + longi,
        success: function(html) {
          $('.inner_content').html(html);
          $('.description').removeClass("container");
           $('.description').removeClass("wrapper");
          //$('#map').css('max-width', '100%').css('height', '600px').css('width', '100%');
          //setTimeout("initialize()", 800);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert('la description de l\'évènement est temporairement indisponible');
    }
  });
  $('.content').fadeIn(800);
  });
  //alert($('#directionsPanel').html());
	/*$('.titleprint').html('<h4 class="title-divider span9">Lieu <strong> du spectacle</strong><span></span></h4>');
  $('.gmapcontainerbig').append($('.gmapcontainer').html());
	$('.gmapcontainerbig div').css('width', $('.span9').css('width')).css('height', "300px");
	$('.gmapcontainer').empty();
  $('.zoomgmap').html('Dezoomer carte').attr('onclick', 'normalGoogleMap()');
	for (field in $locations)
 	{
    setTimeout("initialize()", 800);
		//googleMaps($locations[field].latitude, $locations[field].longitude);
		break;
	}
 
	$('html, body').animate({scrollTop: $(window).scrollTop() + 600}, 1000);*/
}
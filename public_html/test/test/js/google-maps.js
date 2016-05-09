    //<![CDATA[
    // https://google-developers.appspot.com/maps/documentation/javascript/examples/map-simple-async
    // https://developers.google.com/maps/documentation/javascript/tutorial#asynch    
    // https://developers.google.com/maps/documentation/javascript/tutorial
    function initializeMap() {
      var mapsLongitude = document.getElementById('adress').getAttribute('data-longitude');
      var mapsLatitude  = document.getElementById('adress').getAttribute('data-latitude');
      var mapOptions = { 
        zoom: 17,
        center: new google.maps.LatLng(mapsLongitude, mapsLatitude),
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        }
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      // https://google-developers.appspot.com/maps/documentation/javascript/examples/map-rtl
      var marker = new google.maps.Marker({
        map: map,
        position: map.getCenter()
      });
    }
    function loadMapScript() {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initializeMap';
      document.body.appendChild(script);
    }
    //]]>

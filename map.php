<!DOCTYPE html>
<html>
	<body>
		<iframe src="http://livinginmontpellier.fr/custom-directions-panel-google-maps-apiv3/custom-directions-panel-google-maps-apiv3/directions.php
			<?php
			if (isset($_GET['latitude'])) {
				echo "?latitude=";
				echo $_GET['latitude'];
			}
			if (isset($_GET['longitude'])) {
				echo "&longitude=";
				echo $_GET['longitude'];
			} ?>"
				width="1000" height="1000"></iframe>
		<!-- <div id="panel" style="width:70%">
     		<div class="btn-group">
    		<button class="btn" onclick="calcRoute('WALKING')">Piéton</button>
    		<button class="btn" onclick="calcRoute('DRIVING')">Voiture</button>
    		<button class="btn" onclick="calcRoute('BICYCLING')">Vélo</button>
    		<button class="btn" onclick="calcRoute('TRANSIT')">Transport en commun</button>
    		</div>
    	</div>
    	<div id="map" ></div>
    	<div id="directionsPanel" style="width:100%;height 100%">
    	<p>Total Distance: <span id="total"></span></p>
    	</div> -->
  </body>
</html>
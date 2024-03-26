var editaddressForm = (function() {

	var latitude  = '19.076090';
	var longitude = '72.877426';
	var map = mapMarker = geocoder ='';
	var building = landmark = area = city = state = country = "";

	function updateMarker() {
		var location = new google.maps.LatLng(latitude, longitude);
		mapMarker.setPosition(location);
		map.setCenter(location);
	}

	function initMap(searchFieldId) {
		if(google) {


			/////////////
			// Set map //
			/////////////
		    var location = new google.maps.LatLng(latitude, longitude);
		    var options = {
				center: location,
				zoom: 15,
				animation: 'DROP',
				draggable:true,
			    fullscreenControl: false,
			    scaleControl: true,
			};
			map = new google.maps.Map(document.getElementById("editMap"), options);
			
			////////////////
			// Set Marker //
			////////////////
			mapMarker = new google.maps.Marker({
				position: location,
                // title: marker.title,
                latitude: latitude,
                longitude: longitude,
                animation: 'DROP',
                draggable:true, 
            });
			mapMarker.setMap(map);

			// On drag end
			google.maps.event.addListener(mapMarker, 'dragend', function() {
				var markerlatlong = mapMarker.getPosition();
				latitude = JSON.stringify(mapMarker.getPosition().lat());
				longitude = JSON.stringify(mapMarker.getPosition().lng());
				// Reverse Geocode to get Address
				geocodeLatLng();
			});

			geocoder = new google.maps.Geocoder();

			///////////////
			// Searchbox //
			///////////////
			
			// Create the search box
			const input = document.getElementById(searchFieldId);
			const searchBox = new google.maps.places.SearchBox(input);

			// Bias the SearchBox results towards current map's viewport.
			map.addListener("bounds_changed", () => {
			    searchBox.setBounds(map.getBounds());
			});

			// Listen for the event fired when the user selects a prediction and retrieve
			// more details for that place.
			searchBox.addListener("places_changed", () => {
				const places = searchBox.getPlaces();

			    if (places.length == 0) {
			    	resetFields("No results found");
			      	return;
			    }
			    place = places[0];

			    // Set Coordinates
				latitude  = place.geometry.location.lat();
				longitude = place.geometry.location.lng();
				updateMarker();
				var addcomponent = place.address_components;

				// Set Address
			    setAddress(addcomponent);

			});

	    }
	}

	// Reverse Geocode
	function geocodeLatLng() {
		const latlng = {
		    lat: parseFloat(latitude),
		    lng: parseFloat(longitude),
		};
		geocoder.geocode({ location: latlng }, (results, status) => {
		    if (status === "OK") {
		      if (results[0]) {
		      	// Set Address
		      	setAddress(results[0].address_components);
		      } else {
		        resetFields("No results found");
		      }
		    } else {
		      resetFields("Geocoder failed due to: " + status);
		    }
		});
	}

	function setAddress(addcomponent) {
		// Set Address
		building = landmark = area = city = state = country = "";

		if(addcomponent) {
			var street_number  = route = localbuilding = '';
			for(var i = 0 ; i < addcomponent.length ; i++)
			{
			    if(addcomponent[i].types[0] == 'country') {
			     	country = addcomponent[i].long_name;
			    }
			    else if(addcomponent[i].types[0] == 'administrative_area_level_1') {
			      	state = addcomponent[i].long_name;
			    }
			    else if(addcomponent[i].types[0] == 'locality') {
			      	city = addcomponent[i].long_name;
			    }
			    else if(addcomponent[i].types[0] == 'postal_code') {
			    }
			    else if(addcomponent[i].types[0] == 'sublocality_level_1') {
			      	area = addcomponent[i].long_name;
			    }
			    else if(addcomponent[i].types[0] ==  "sublocality_level_3" || addcomponent[i].types[0] =="sublocality") {
			    	landmark = addcomponent[i].long_name;
			    }
			    else if(addcomponent[i].types[0] == 'sublocality_level_2') {
			      	localbuilding = addcomponent[i].long_name;
			    }
			    else if(addcomponent[i].types[0] == 'street_number') {
			    	street_number = addcomponent[i].long_name;
			    } else if(addcomponent[i].types[0] == 'route') {
			    	route = addcomponent[i].long_name;
			    }
			}
			building = street_number+' '+route;
			building = building.trim()==''?localbuilding:building;
		}
		$("#building_address").val(building);
		showAddress();
	}

	function resetFields(message) {
		building = landmark = area = city = state = country = "";
		showAddress();
	}

	function showAddress() {
		$("#editbuilding").val(building);
		$("#editlandmark").val(landmark);
		$("#editarea").val(area);
		$("#editcity").val(city);
		$("#editstate").val(state);
		$("#editcountry").val(country);
	}

	function updateValues() {
		building = $(".newedit #editbuilding").val();
		landmark = $(".newedit #editlandmark").val();
		area     = $(".newedit #editarea").val();
		city     = $(".newedit #editcity").val();
		state    = $(".newedit #editstate").val();
		country  = $(".newedit #editcountry").val();
	}

	function init(newLatitude, newLongitude, newBuilding, newLandmark, newArea, newCity, newState, newCountry) {
		building = newBuilding;
		landmark = newLandmark;
		area = newArea;
		city = newCity;
		state = newState;
		country = newCountry;
		latitude = newLatitude;
		longitude = newLongitude;

		var elementHtml = `
			<div class="newedit">
				<label>Locate address on map</label>
            	<input type="text" id="search_address" placeholder="Start Typing" class="form-control parent-option-field" value="" />
            </div>
            <div class="mapouter" id="editMap" style="height:467px">
			</div>
			<div class="newedit">
                <label>Building</label>
            	<input type="text" id="editbuilding" class="form-control parent-option-field" value="${building}" />
			</div>
			<div class="newedit">
                <label>Landmark</label>
            	<input type="text" id="editlandmark" class="form-control parent-option-field" value="${landmark}" />
            </div>
            <div class="newedit">
                <label>Area</label>
            	<input type="text" id="editarea" class="form-control parent-option-field" value="${area}" data-required="true" />
            </div>
            <div class="newedit">
                <label>City</label>
            	<input type="text" id="editcity" class="form-control parent-option-field" value="${city}" data-required="true" />
            </div>
            <div class="newedit">
                <label>State</label>
            	<input type="text" id="editstate" class="form-control parent-option-field" value="${state}" data-required="true" />
            </div>
            <div class="newedit">
                <label>Country</label>
            	<input type="text" id="editcountry" class="form-control parent-option-field" value="${country}" data-required="true" />
    		</div>
		 `;

	    return elementHtml;
	}

	return {
		init: function(latitude, longitude, building, landmark, area, city, state, country) {
			return init(latitude, longitude, building, landmark, area, city, state, country);
		},
		initMap: function() {
			// Initialize Map and Address Search
		    initMap('search_address');
		},
		getAddress: function() {
			// Update values
			updateValues();
			var answerJson = {
				"building": building, 
				"landmark": landmark, 
				"area": area, 
				"city": city, 
				"state": state, 
				"country": country,
				"latitude": latitude,
				"longitude": longitude
			};
			return answerJson;
		}
	};

})();

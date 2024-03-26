var addressFormField = (function() {

	var latitude  = '19.076090';
	var longitude = '72.877426';
	var map = mapMarker = geocoder ='';
	var building = landmark = area = city = state = country = "";
	var isAccepted = false;

	function nextClick() {

		var properties = JSON.parse(currentQuestion.properties);
		var answer_id = 0;

		var answerJson = {
			"option_id": answer_id,
			"answer": "",
			"address": {
				"building": building, 
				"landmark": landmark, 
				"area": area, 
				"city": city, 
				"state": state, 
				"country": country,
				"latitude": latitude,
				"longitude": longitude
			}
		};

		// Save and proceed
		saveCurrentAnswer(answer_id, answerJson);
	}

	function updateMarker() {
		console.log('updating marker');
		console.log(latitude, longitude);
		var location = new google.maps.LatLng(latitude, longitude);
		mapMarker.setPosition(location);
		map.setCenter(location);
	}

	function initMap(searchFieldId) {
	    // Enable autocomplete
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
			map = new google.maps.Map(document.getElementsByClassName("mapouter")[0], options);
			
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
				console.log(mapMarker);
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

			    console.log(places);
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

			    /*places.forEach((place) => {
				    if (!place.geometry) {
				        console.log("Returned place contains no geometry");
				        return;
				    }

			      	latitude  = place.geometry.location.lat();
			        longitude = place.geometry.location.lng();
			    });*/

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
			console.log(results);
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
		$("#area").val(area);
		showAddress();
	}

	function resetFields(message) {
		building = landmark = area = city = state = country = "";
		$("#building_address").val('');
		$("#area").val('');
		$(".pinned-add").text('');
		// Show message like Select a valid address
		// Disable next
		$("#dynamicNext").attr("disabled", "disabled");
	}

	function showAddress() {
		var displayaddress = building+', '+landmark+', '+area+', '+city+', '+state+', '+country;
		$(".pinned-add").text(displayaddress.replaceAll(/[, ]{3,}/g, ', '));
		if(latitude!='' && longitude!='' && area!='' && country!='' && state!='' && isAccepted) {
			$("#dynamicNext").removeAttr("disabled");
		} else {
			$("#dynamicNext").attr("disabled", "disabled");
		}
	}
	
	return function(data, properties, lastQuestion) {
		currentQuestion.elementId = "option" + data["question"]["id"];
		var answerJson = lastQuestion != null ? lastQuestion.currentQuestion.answerJson : "";
		if(answerJson != "") {
			isAccepted = answerJson.isAccepted;
			building = answerJson.address.building;
			landmark = answerJson.address.landmark;
			area = answerJson.address.area;
			city = answerJson.address.city;
			state = answerJson.address.state;
			country = answerJson.address.country;
			latitude = answerJson.address.latitude;
			longitude = answerJson.address.longitude;
		}

		var elementHtml = `
		 	<div class="form-group mb-4">
		 	  <label class="themeColor m-0 p-0 d-block">Locate address on map<span class="error">*</span></label>
		 	   <label class="mb-2 p-0 sub-label d-block">Start typing and select your location/nearest location from suggestions</label>
		 	  <input type="text" class="form-control form-text" id="search_address" name="" placeholder="Start Typing" value="">
			</div>

			<div class="form-group mb-4">
		 	  <label class="themeColor m-0 p-0 d-block">Please move the pin to the exact location</label>
		 	   <label class="mb-3 p-0 sub-label d-block">An exact location will help us identify patterns of violence across the city</label>
				<div class="mapouter" style="height:467px">
				</div>
			</div>

			<div class="form-group mb-4">
		 	  <label class="themeColor m-0 p-0 d-block">Address pinned on map:</label>
		 	   <p class="m-0 pt-0 pinned-add">University of Gloucestershire Oxstalls Campus, Oxstalls Ln, Longlevens GL2 9HW, United Kingdom</p>
			</div>

			<div class="form-group mb-4">
		 	  <label class="themeColor mb-2 p-0 d-block">Enter Area<span class="error">*</span></label>
		 	  <input type="text" class="form-control form-text" id="area" placeholder="Please enter area" value="">
			</div>

			<div class="form-group mb-4">
		 	  <label class="themeColor mb-2 p-0 d-block">Enter Building/Street/Locality</label>
		 	  <input type="text" class="form-control form-text" id="building_address" placeholder="Example: A wing, Pratap Apartments, Kurla Road" value="">
			</div>

			<p class="mt-4 pt-2 lignheight20">
				The information that you share with us anonymously helps shape policy and decision making. Please confirm that you are submitting information true to your knowledge. You can go back and edit your answers before submitting, if needed.
			</p>

			<div class="custom-control custom-checkbox estimate mt-1">
				<input type="checkbox" class="custom-control-input estimate map_estimate" id="confirm_address" ${isAccepted?'checked':''}>
				<label class="custom-control-label eLabel" for="confirm_address">I confirm</label>
			</div>
		 `;
		$("#options").html(elementHtml);
		//$(".locality").focus();
		$("#options input:text").eq(0).focus();
		
		// Set Address if any
		showAddress();

		// On Building Address Changed
		$("#building_address, #area").keyup(function(e){
			if($(this).attr('id')=='building_address')
				building = $(this).val();
			else if($(this).attr('id') == 'area')
				area = $(this).val();
			showAddress();
	    });

	    // On confirmation change
	    $("#confirm_address").change(function(event) {
	    	isAccepted =  $(this).is(':checked');
	    	showAddress();
	    });

		// Initialize Map and Address Search
	    initMap('search_address');

	    // Add new event listener
	    $("#dynamicNext").off('click').click(function(event) {
	    	event.preventDefault();
	    	nextClick();
	    });
	}

})();

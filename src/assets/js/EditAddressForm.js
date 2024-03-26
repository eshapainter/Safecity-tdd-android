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

		
		$("#editarea").keyup(function(event) {
area = $(this).val();
			console.log('event fired')
			showAddress(); 
		 });

		 
		$("#building_address").keyup(function(event) {
			building = $(this).val();
						console.log('event fired')
						showAddress(); 
					 });

		 

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
				gestureHandling: 'cooperative',
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
console.log(addcomponent)
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
				
				console.log(country)
				console.log(state)
				console.log(city)				
				console.log(landmark)
				console.log(localbuilding)
				console.log(street_number)
				console.log(route)

			}
			building = street_number+' '+route;
			building = building.trim()==''?localbuilding:building;
			console.log(area)
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
		//  $("#editlandmark").val(landmark);
		 $("#editarea").val(area);
		//  $("#editcity").val(city);
		//  $("#editstate").val(state);
		//  $("#editcountry").val(country);
		console.log(country)
				console.log(state)
				console.log(city)				
				console.log(landmark)
		 var addr =  building +','+ landmark +','+ area +','+city +','+ state +','+ country 
		 console.log(addr)
		$(".pinned-add").text(addr)
		$(".search_address").val(addr)
		console.log($(".newedit #editarea").val())

	}

	function updateValues() {
		console.log($(".newedit #editarea").val())
		building = building;
		landmark = landmark;
		area     = $(".newedit #editarea").val();
		city     = city;
		state    = state;
		country  = country;
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
var addr =  building +','+ landmark +','+ area +','+city +','+ state +','+ country
console.log(addr)
		//$("#search_address").val(addr)
		// $(".search_address").text(addr)
		var elementHtml = `
		<div class="">
			<div class="neweditin newedit">
				<label>Locate address on map</label>
            	<input type="text" id="search_address" placeholder="Start Typing" class="form-control parent-option-field search_address" value="${addr}" />
			</div>
			
			<div class="form-group mb-4">
			<label class="themeColorin m-0 p-0 d-block">Please move the pin to the exact location</label>
			 <label class="mb-3 p-0 sub-label d-block">An exact location will help us identify patterns of violence across the city</label>
		   <div class="mapouter" id="editMap" style="height:390px">
		   </div>
		 </div>

		 
		 <div class="form-group mb-4">
		 <label class="themeColorin m-0 p-0 d-block">Address pinned on map:</label>
		  <p class="m-0 pt-0 pinned-add"> ${addr}</p>
	  </div>
   
	  <div class="neweditin newedit">
                <label class="themeColorin mb-2 p-0 d-block">Area<span class="error ">*</span></label> 
            	<input type="text" id="editarea" class="form-control parent-option-field" value="${area}" data-required="true" />
            </div>
		 
	  <div class="form-group neweditin newedit  ">
		 <label class="themeColorin mb-2 p-0 d-block">Enter Building/Street/Locality</label>
		 <input type="text" class="form-control form-text" id="building_address" placeholder="Example: A wing, Pratap Apartments, Kurla Road" value="">
	  </div>
</div>
		 `;

		 

		 
            // <div class="mapouter" id="editMap" style="height:390px">
			// </div>
			// <div class="neweditin newedit">
            //     <label>Building</label>
            // 	<input type="text" id="editbuilding" class="form-control parent-option-field" value="${building}" />
			// </div>
			// <div class="neweditin newedit">
            //     <label>Landmark</label>
            // 	<input type="text" id="editlandmark" class="form-control parent-option-field" value="${landmark}" />
            // </div>
            // <div class="neweditin newedit">
            //     <label>Area</label> <label>*</label>
            // 	<input type="text" id="editarea" class="form-control parent-option-field" value="${area}" data-required="true" />
            // </div>
            // <div class="neweditin newedit">
            //     <label>City</label><label>*</label>
            // 	<input type="text" id="editcity" class="form-control parent-option-field" value="${city}" data-required="true" />
            // </div>
            // <div class="neweditin newedit">
            //     <label>State</label>
            // 	<input type="text" id="editstate" class="form-control parent-option-field" value="${state}"  />
            // </div>
            // <div class="neweditin newedit">
            //     <label>Country</label><label>*</label>
            // 	<input type="text" id="editcountry" class="form-control parent-option-field" value="${country}" data-required="true" />
    		// </div>

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

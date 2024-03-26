var latlong_safetytip = []; //safety tip tab
var markersListSafetyTip = [];
var country_id = null;
var city_id = null;                
var safetytip_reported_on = "";
var safety_countfilter = 0;
var pagination_safety_data_arr = {};

//filter count number for safety start
function count_safety_filter(safety_countfilter) {
  if (safety_countfilter > 0) {
    $('#safetytip_filter_set').append('<span class="number-circle cntsafetyfilter">'+safety_countfilter+'</span>');
  }
  else {
    $('.cntsafetyfilter').remove();
  }
}
//filter count number for safety end

//Safety API
function load_safetytip(reported_safetytip_data) {                    
  // console.log("safety tip: ", reported_safetytip_data);
  $.ajax({
    type: "POST",
    url: baseURL+'api/get-safety-tips',
    // url: "http://101.53.143.7/~dataduck/safecity_webapp/api/get-safety-tips",
    data: reported_safetytip_data,
    success:function(data) {
      // console.log("safety tips view: ",data);

      // code change by sonam - 14-10-2020 start
      $("#safetytip_list").html('<div class="no-incident-found">No safety tips found for this area.</div>');
      // code change by sonam - 14-10-2020 end

      removeSafetyTipMarkers();
      var datalen = data.data.length;
      if (datalen > 0) {
        lat = data.data[0].latitude;
        longi = data.data[0].longitude;
        markers = data.data[0];

        safetytipReport(data);
        pagination_safety_data_arr = {'reported_safety': reported_safetytip_data, 'reported_safety_result': data};
      }
    }
  });                    
}

//Safety Tip data load start
function safetytipReport(data) {
  var elementHtml = '';
  var safetytiplength = data.data.length;
  latlong_safetytip = [];

  /*if (safetytiplength > 0) {*/
    for (var i=0; i<safetytiplength; i++) {
      var safetydata = data.data != null ? data.data[i] : "";
      var safety_tip_title = safetydata.safety_tip_title != null ? safetydata.safety_tip_title : "";
      var safety_tip_desc = safetydata.safety_tip_desc != null ? safetydata.safety_tip_desc : "";
      var safety_tip_id = safetydata.id != null ? safetydata.id : "";
      var safety_tip_country = safetydata.country != null ? safetydata.country : "";
      var safety_tip_state = safetydata.state != null ? safetydata.state : "";
      var safety_tip_city = safetydata.city != null ? safetydata.city : "";
      var safety_tip_location = safetydata.location != null ? safetydata.location : "";
      var safety_tip_exact_location = safetydata.exact_location != null ? safetydata.exact_location : "";
      var safety_tip_landmark = safetydata.landmark != null ? safetydata.landmark : "";

      // code changed by sonam - 20-10-2020 start
      var safety_tip_added_date = safetydata.added_date != null ? safetydata.added_date : "";
      var dayBetween = days_between(safety_tip_added_date);
      var getDaysAgo = (dayBetween > 7 ? ChangeDateFormat(safety_tip_added_date,1) : (dayBetween==0) ? 'Today' : (dayBetween==1) ? dayBetween+" day ago" : dayBetween+" days ago");
      // code changed by sonam - 20-10-2020 end


      latlong_safetytip[i] = {"city":safetydata.city, "area":safetydata.location, "latitude":safetydata.map_lat, "longitude":safetydata.map_lon, "safety_tip_title":safety_tip_title};

      elementHtml += `
                <!-- Short Desc Start -->
                <div class="text shortDesc_saftey" data-id="${safety_tip_id}">
                  <div class="incident-title">${safety_tip_title}</div>
                  <div class="place-time">
                    at ${safety_tip_location}  <span class="sepration">.</span> Posted ${getDaysAgo}
                  </div>
                  <div class="text1">
                    <span class="ellipsis">${safety_tip_desc}</span>
                    <span>
                      <button class="themeColor toggleThis_saftey readbtn mb-3 ml-1" data-id="${safety_tip_id}">Read More</button>
                    </div>
                  </div>
                  <!-- Short Desc End -->
                  <!-- Long Desc Start -->
                  <div class="longDesc_saftey" data-id="${safety_tip_id}">
                    <button class="toggleUp_saftey shwobtn" data-id="${safety_tip_id}">
                      <img src="assets/images/icon-feather-arrow-left.svg" class="img-fluid leftIcon">
                    </button>
                    <div class="incident-title">${safety_tip_title}</div>
                    <div class="mb-3"></div>
                    
                    <div class="otherDetails">
                      
                      <div class="row mb-3">
                        <div class="col-md-12">
                          <div class="location">
                            <img src="assets/images/location.svg" class="img-fluid">
                            ${safety_tip_location}
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-md-12">
                          <div class="iDate">
                            <img src="assets/images/calendar-date-of-incident.svg" class="img-fluid">
                              Posted ${getDaysAgo}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>${safety_tip_desc}</p>
                    
                  </div>
                  <!-- Long Desc End -->
      `;
    }
  /*}
  else {
    elementHtml = `<div class="incident-title">No incidents are found for this Area</div>`;
  }*/

  //add elementHtml to incidents_list div
  $("#safetytip_list").html(elementHtml);

  //pagination showing current and total records e.g. 1 to 3 of 17
  // $("#safety_showing_record").text(data.showing);
  // code change by sonam - 14-10-2020 start
  $("#safety_showing_record").text('Showing '+data.showing);
  // code change by sonam - 14-10-2020 end

  //If No prev data to show on prev click
  if (data.offset <= 0) {
    $("#safety_prev").css("pointer-events", "none");
  }
  
  //Default Hide Long Description
  $(".longDesc_saftey").hide();

  $( ".toggleType" ).click(function() {     
      $(".toggleContent").toggle("fast");
  });

  $(".toggleThis_saftey").on("click",function() {
      var btnId = $(this).data('id');
      // alert(btnId);
      $('.filter2').hide('fast');
      $('.shortDesc_saftey').hide('fast');
      $('.pg2').hide('fast');
      //$('.shortDesc_saftey[data-id=' + btnId + ']').hide('fast');
      $('.longDesc_saftey[data-id=' + btnId + ']').show('fast');
  });
  
  $(".toggleUp_saftey").on("click",function() {
      var btnId = $(this).data('id');
      $('.longDesc_saftey[data-id=' + btnId + ']').hide('fast');
      //$('.shortDesc_saftey[data-id=' + btnId + ']').show('fast');
      $('.filter2').show('fast');
      $('.shortDesc_saftey').show('fast');
      $('.pg2').show('fast');
  });

  $('#accordion').on('show.bs.collapse', function () {
    //$('.filter2').hide();
    $('.shortDesc_saftey').hide();
    $('.longDesc_saftey').show();
  });

  $('#accordion').on('hide.bs.collapse', function () {
    //$('.filter2').show();
    $('.shortDesc_saftey').show();
    $('.longDesc_saftey').hide();
  });

  addMarkersToMapSafetyTip(latlong_safetytip);
}
//Safety Tip data load end

//Safetytip Map View Start
//Show Sefetytip Map Start
function showSafetyTipMap(latitude, longitude) {
  this.lat = latitude;
  this.longi = longitude;
  const location = new google.maps.LatLng(this.lat, this.longi);
  const options = {
    disableDefaultUI: true, // hide all controls of map
    //mapTypeControl: true,
    //scaleControl: true,
    zoomControl: true,
    center: location,
    zoom: 10,
    animation: google.maps.Animation.DROP,
    //animation: 'DROP',
    draggable: true,
    streetViewControl: false,
    // disableDefaultUI: true,
    scaleControl: true,
    fullscreenControl: false
  }
  this.safetytip_map = new google.maps.Map(document.getElementById("safetytip_map"), options);
}
//Show Sefetytip Map End

//Add Marker to Sefetytip Map Start
function addMarkersToMapSafetyTip(markers) {
  //create empty Safetytip LatLngBounds object for zoom
  var safetytip_bounds = new google.maps.LatLngBounds();
  for (let marker of markers) {
    geocoder1 = new google.maps.Geocoder();
    infowindow1 = new google.maps.InfoWindow();
    //console.log(marker.latitude, marker.longitude, marker.area);
    let position = new google.maps.LatLng(marker.latitude, marker.longitude);
    let mapMarker = new google.maps.Marker({
      position: position,
      map: safetytip_map,
      title: marker.area,
      latitude: marker.latitude,
      longitude: marker.longitude,
      html: marker.safety_tip_title+'<br>'+marker.area+', '+marker.city,
      animation: google.maps.Animation.DROP,
      //animation: 'DROP',
      draggable: true,
      icon: 'assets/images/Safetytip_icon.svg',
    });
    markersListSafetyTip.push(mapMarker);
    //extend the bounds to include each marker's position
    safetytip_bounds.extend(mapMarker.position);
    google.maps.event.addListener(mapMarker, 'click', function(event) {
        infowindow1.setContent(this.html);
        //infowindow1.setContent(this.city);
        infowindow1.setPosition(event.latLng);
        infowindow1.open(safetytip_map, this);
    });
  }
  safetytip_map.setOptions({draggable: false});
  safetytip_map.fitBounds(safetytip_bounds);       // auto-zoom
  safetytip_map.panToBounds(safetytip_bounds);     // auto-center
};
//Add Marker to Sefetytip Map End

//Safetytip Map Remove Start
function removeSafetyTipMarkers() {
    for(i=0; i<markersListSafetyTip.length; i++) {
        markersListSafetyTip[i].setMap(null);
    }
}
//Safetytip Map Remove End
//Safetytip Map View Start
var latlong = []; ////incident tab
var markersList = [];
var markerClustererList = [];
var categoriesList = [];
var country_id = null;
var city_id = null;                
var categories_ids = "";
var reported_time = "";
var reported_on = "";
var countfilter = 0;
var pagination_incident_data_arr = {};

function ChangeDateFormat(date,val){
  var dayDate = new Date(date);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[dayDate.getMonth()];
  var monthVal = (val==1 ? monthName.substr(0, 3) : monthName);
  var getDate = dayDate.getDate();
  var getYear = dayDate.getFullYear();

  var format_date = getDate+" "+monthVal+" "+getYear;
  return format_date;
}

function ConverttoLongDate(date) {
  var dayDate = new Date(date);

  var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var mainDate = weekday[dayDate.getDay()];

  var dateFormat = ChangeDateFormat(date,0);

  var format_date = mainDate+", "+dateFormat;
  return format_date;
}

function days_between(date) {
    // The number of milliseconds in one day
    var date1 = new Date(date);
    var todays_date = new Date();
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(todays_date - date1);
    var daydiff = Math.round(differenceMs / ONE_DAY);
    return daydiff;

    // Convert back to days and return
    /*if (daydiff >= 0 && daydiff <= 30) {
      // return daydiff + " Days ago";
      return daydiff;
    }
    else {
      return date;
    }*/
}

function timeConvert(time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

//Get all incidents categories from API
function load_categories(lang_id) {
  $.ajax({
      type: "GET",
      url: baseURL+'api/get-categories?lang_id='+lang_id,
      success:function(data) {
        categoryLen = data.data.length;
        categoryData = data.data;
        if (categoryLen > 0) {
          for(var m=0; m<categoryLen; m++) {
            categoriesList[m] = {"id": categoryData[m].id, "parent_id": categoryData[m].parent_id, "is_main": categoryData[m].is_main, "title": categoryData[m].title, "lang_id": categoryData[m].lang_id};
          }                            
        }
        IncidentShareFilter(categoriesList);
      }
  });
}

//filter count number for incidents start
function count_filter(countfilter) {
  if (countfilter > 0) {
    $('#incidents_filter_set').append('<span class="number-circle cntfilter">'+countfilter+'</span>');
  }
  else {
    $('.cntfilter').remove();
  }
}
//filter count number for incidents end


//Incidents API
function load_reportedincident(reported_incident_data) {
  //console.log("load reported_incident_data: ", reported_incident_data);
  $.ajax({
    type: "POST",
    url: baseURL+'api/reported-incidents',
    data: reported_incident_data,
    success:function(data) {
      console.log("load_reportedincident success: ", data);
      
      //$("#incident_showing_record").text('');
      if(data.total == 0) {
          $('#pagination_div').css('display','none');
          if ("categories_ids" in reported_incident_data) {
            $("#incidents_list").html('<div class="no-incident-found">'+assault_error+'</div>');
          }
          else if ("reported_on" in reported_incident_data) {
            $("#incidents_list").html('<div class="no-incident-found">'+period_error+'</div>');
          }
          else if ("reported_time" in reported_incident_data) {
            $("#incidents_list").html('<div class="no-incident-found">'+home_time_error+'</div>');
          }
          else {
            $("#incidents_list").html('<div class="no-incident-found">'+incident_no_data+'</div>');
          }
          //$('#incident_next').css('display','none');
          //$('#incident_prev').css('display','none');
      } else {
        $('#pagination_div').css('display','block');
      }
      // code change by sonam - 14-10-2020 end

      removeMarkers();
      if ((data.status == true) && (data.total > 0)) {
        if (data.data) {
          var datalen = data.data.length;
        }
        if (datalen > 0) {
          lat = data.data[0].latitude;
          longi = data.data[0].longitude;
          markers = data.data[0];
          
          incidentsReport(data); //Incidents report after select country and city
          incident_viewmore(data);
          pagination_incident_data_arr = {'reported_incidents': reported_incident_data, 'reported_incidents_result': data};
        }
      }
    }
  });
}

//Load incidents reports
function incidentsReport(data) {
  console.log(data,"====");
  var elementHtml = '';
  var attack_reason = '';
  var perpetrator_info = '';
  var medical_help = '';
  var medical_help_html = '';
  var reported_to_police = '';
  var incidentlength = data.data.length;
  latlong = [];
  latlongs = [];

  for (var i=0; i<incidentlength; i++) {
    //incident_viewmore(data);
    var incidentdata = data.data != null ? data.data[i] : "";
    var incident_desc = incidentdata.description != null ? incidentdata.description : "";
    var additional_info = incidentdata.additional_detail != null ? '<p class="reason">'+incident_additional_details+' : '+incidentdata.additional_detail+'</p>' : "";

    // code changed by sonam - 16-10-2020 start
    var person_age = incidentdata.age != null ? incidentdata.age+' Yrs' : "";
    // code changed by sonam - 16-10-2020 end

    var person_gender = incidentdata.gender_id != null && incidentdata.gender_id !=13 ? '<span class="gender"> | '+incidentdata.gender +'</span>' : "";

    // code changed by sonam - 16-10-2020 start
    var incidents_date_est = incidentdata.is_date_estimate != "0" ? home_around+" " : home_on+"";
    var incidents_time_est = incidentdata.is_time_estimate != "0" ? home_around+" " : home_at+"";
    var incidents_time_est = incidentdata.time_to != null ? home_between+" " : incidents_time_est;
    // code changed by sonam - 16-10-2020 end

    // code changed by sonam - 20-10-2020 start
    var incidents_date = incidentdata.incident_date != null ? incidentdata.incident_date : "";
    var incidents_time_range = incidentdata.time_to != null ? timeConvert(incidentdata.time_from)+" - "+timeConvert(incidentdata.time_to) : incidentdata.time_from;
    var dayBetween = days_between(incidents_date);
    var getDaysAgo = (dayBetween > 7 ? ChangeDateFormat(incidents_date,1)+' '+incidents_time_range : (dayBetween==0) ? home_today : (dayBetween==1) ? dayBetween+' '+home_day_ago+" " : dayBetween+' '+home_days_ago+" ");
    // code changed by sonam - 20-10-2020 end
    
    //var incidents_time = incidentdata.time_from != null ? incidentdata.time_from : "";
    var incidents_time = incidentdata.time_to != null ? incidentdata.time_from+" To "+incidentdata.time_to : incidentdata.time_from;
    var incidents_area = incidentdata.area != null ? incidentdata.area : "";
    var incidents_city = incidentdata.city != null ? incidentdata.city : "";
    var incidents_state = incidentdata.state != null ? incidentdata.state : "";
    var incidents_categories = incidentdata.categories != null ? incidentdata.categories : "";

    var incidentdata_answers = data.data[i].answers != null ? data.data[i].answers : "";
    var incidentdata_answers_length = incidentdata_answers.length;

    for (var j=0; j<incidentdata_answers_length; j++) {
      //console.log("incidentdata_answers");
      var incident_question_tag = incidentdata_answers[j].question_tag != null ? incidentdata_answers[j].question_tag : "";
      var incident_question_answer = incidentdata_answers[j].answer != null ? incidentdata_answers[j].answer : "";
      var incident_question_answer_id = incidentdata_answers[j].answer_id != null ? incidentdata_answers[j].answer_id : "";

      if (incident_question_tag == "attack_reason") {
        var attack_reason = '<p class="reason">'+home_led_attack+' : '+incident_question_answer+'</p>';
      }else if (incident_question_tag == "who_was_perpetrator") {
        var perpetrator_info = '<p class="reason">'+home_perpetrator+' : '+incident_question_answer+'</p>';
      }
      else if (incident_question_tag == "medical_help") {
        var medical_help_desc = (incident_question_answer_id == 28 ? home_medical_help_yes : home_medical_help_no);
        var medical_help = '<img src="assets/images/material-local-hospital.svg" class="img-fluid"> '+medical_help_desc;
        var medical_help_html = 'mb-3';
      }
      else if (incident_question_tag == "reported_to_police") {
        // code change by sonam - 16-10-2020 start
        if(incidentdata_answers[j].other_answers.length != 2){
            var incident_other_answer = JSON.parse(incidentdata_answers[j].other_answers)[42] != null ? JSON.parse(incidentdata_answers[j].other_answers)[42] : "";
        }
        var policeHtml = '<img src="assets/images/map-police.svg" class="img-fluid"> ';
        var reported_to_police = '';
        if(incident_question_answer_id == 38){
            reported_to_police = policeHtml+' '+home_police_filed;
        } else if(incident_question_answer_id == 41){
            reported_to_police = policeHtml+' '+home_police_not_filed;
        } else if(incident_question_answer_id == 42){
            reported_to_police = policeHtml+' '+home_police_tried_filed+'. '+incident_other_answer;
        } else if(incident_question_answer_id == 39){
            reported_to_police = policeHtml+' '+home_police_intend_filed;
        } else if(incident_question_answer_id == 40){
            reported_to_police = policeHtml+' '+home_police_not_sure_filed;
        } else {
            reported_to_police = '';
        }
        // code change by sonam - 16-10-2020 end
      }
    }

    latlong[i] = {"incident_id": incidentdata.id, "city":incidents_city, "area":incidents_area, "latitude":incidentdata.latitude, "longitude":incidentdata.longitude, "categories":incidents_categories, "dateTime":ChangeDateFormat(incidents_date,1)+" | "+timeConvert(incidents_time), "incident_viewmore_id":i};

    // need to cross check - 02-11-2020 -sonam
    latlongs[i] = {"incident_id": incidentdata.id, "city":incidents_city, "area":incidents_area, "lat":parseFloat(incidentdata.latitude), "lng":parseFloat(incidentdata.longitude), "categories":incidents_categories, "dateTime":ChangeDateFormat(incidents_date,1)+" | "+timeConvert(incidents_time), "incident_viewmore_id":i};
    
    elementHtml += `
        <!-- Short Desc Start -->
        <div class="text shortDesc " data-id="${i}">
          <div class="incident-title">${incidents_categories}</div>
          <div class="place-time">
            at ${incidents_area} <span class="sepration">.</span> ${getDaysAgo}
          </div>
          <div class="text1">
            <span class="ellipsis">${incident_desc}</span>
            <span>
              <button class="themeColor toggleThis readbtn mb-3 ml-1" id="readbtn_${i}" data-id="${i}">${read_more}</button>
            </span>
          </div>
        </div>
        <!-- Short Desc End -->
        <!-- Long Desc Start -->
        <div class="longDesc" id="longDesc_${i}" data-id="${i}">
          <button class="toggleUp shwobtn" id="toggleUp_${i}" data-id="${i}">
            <img src="assets/images/icon-feather-arrow-left.svg" class="img-fluid leftIcon">
          </button>
          <div class="incident-title">${incidents_categories}</div>
          <p><label>
            <span class="age">${person_age}</span>
            ${person_gender}
          </label></p>
          <p>${incident_desc}</p>
          ${perpetrator_info}
          ${attack_reason}
          ${additional_info}
          <div class="otherDetails">`;

            if (reported_to_police != "") {
              elementHtml +=
                `<div class="row mb-3">
                  <div class="col-md-12">
                    <div class="location">
                      ${reported_to_police}
                    </div>
                  </div>
                </div>`;
            }
            
            if (medical_help != "") {
              elementHtml +=
                `<div class="row mb-3">
                  <div class="col-md-12">
                    <div class="location">
                      ${medical_help}
                    </div>
                  </div>
                </div>`;
            }

            elementHtml +=
              `<div class="row mb-3">
              <div class="col-md-12">
                <div class="location">
                  <img src="assets/images/location.svg" class="img-fluid">
                  ${incidents_area}, ${incidents_city}
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-12">
                <div class="iDate">
                  <img src="assets/images/calendar-date-of-incident.svg" class="img-fluid">
                  ${incidents_date_est} ${ConverttoLongDate(incidents_date)}
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-12">
                <div class="iTime">
                  <img src="assets/images/time-of-incident.svg" class="img-fluid"> ${incidents_time_est} ${timeConvert(incidents_time)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Long Desc End -->
    `;
  }

  //add elementHtml to incidents_list div
  $("#incidents_list").html(elementHtml);

  //pagination showing current and total records e.g. 1 to 3 of 17
  // $("#incident_showing_record").text(data.showing);
  // code change by sonam - 14-10-2020 start
  $("#incident_showing_record").text(home_showing_pagination+' '+data.showing);
  // code change by sonam - 14-10-2020 end

  //If No prev data to show on prev click
  if (data.offset <= 0) {
    $("#incident_prev").css("pointer-events", "none");
  }
  
  //Default Hide Long Description
  $(".longDesc").hide();

  $( ".toggleType" ).click(function() {     
      $(".toggleContent").toggle("fast");
  });

  $(".toggleThis").on("click",function() {
      var btnId = $(this).data('id');
      $('.filter1').hide('fast');
      $('.shortDesc').hide('fast');
      $('.pg1').hide('fast');
      $('.shortDesc[data-id=' + btnId + ']').hide('fast');
      $('.longDesc[data-id=' + btnId + ']').show('fast');
  });   
  
  $(".toggleUp").on("click",function() {
      var btnId = $(this).data('id');
      $('.longDesc[data-id=' + btnId + ']').hide('fast');
      $('.shortDesc[data-id=' + btnId + ']').show('fast');
      $('.filter1').show('fast');
      $('.shortDesc').show('fast');
      $('.pg1').show('fast');
  });

  $('#accordion').on('show.bs.collapse', function () {
    $(".shortDesc").hide();
    $(".longDesc").show();
  });

  $('#accordion').on('hide.bs.collapse', function () {
    $(".shortDesc").show();
    $(".longDesc").hide();
  });

  // console.log("latlong: ",latlong);
  //addMarkersToMap(latlong);
  //latlongs[i] = {"incident_id": incidentdata.id, "city":incidents_city, "area":incidents_area, "lat":incidentdata.latitude, "lng":incidentdata.longitude, "categories":incidents_categories, "dateTime":ChangeDateFormat(incidents_date,1)+" | "+timeConvert(incidents_time), "incident_viewmore_id":i};
  //addMarkersToMap(latlongs);
  addClusterIncidentMarkersToMap(latlongs);
}

//Incidents Filter
function IncidentShareFilter(categoriesList) {
  var elementfilterdiv = '';
  elementfilterdiv = `
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">${home_all_filters}</h4>
        <button type="button" class="close" data-dismiss="modal">  <img src="assets/images/close.svg" class="img-fluid"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            <div class="incient-listing text-right">
              <button class="apply-pur-btn" id="incidents_filter_apply" data-dismiss="modal">${button_apply}</button> <button class="text-danger" id="incidents_filter_clear">${button_clear}</button>
              <div class="mb-4"></div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-5 col-sm-12 col-xs-12"><ul class="nav nav-tabs">
            <li><a data-toggle="tab" href="#Assault" class="active">${home_type_assault}</a></li>
            <li><a data-toggle="tab" href="#Showincidents">${home_show_incident_from}</a></li>
            <li><a data-toggle="tab" href="#timeofday">${home_time_of_day}</a></li>
          </ul></div>
          <div class="col-md-7 col-sm-12 col-xs-12"><div class="tab-content">
            <div id="Assault" class="tab-pane fade in active show">
              <div class="scrolbar-popup custom-scrolbar">`;

            for (var i=0; i<categoriesList.length; i++) {

              //Replace spaces and special characters by underscore to set id
              var idval = categoriesList[i].title.replace(/ \//g, "_");
              idval = idval.replace(/ /g, "_");
              idval = idval.replace(/\//g, "_");
              idval = idval.toLowerCase();
              //Replace spaces and special characters by underscore to set id

              elementfilterdiv += `
              <div class="inputGroup custom-control">
                <input type="checkbox" id="${idval}" data-id="${categoriesList[i].id}" name="sexual_violence" class="custom-control-input getAttr" data-val="${categoriesList[i].title}">
                <label class="custom-control-label label1" for="${idval}">${categoriesList[i].title}</label>
              </div>`;
            }

            elementfilterdiv += `
            </div>
            </div>
            <div id="timeofday" class="tab-pane fade">
              <div class="scrolbar-popup custom-scrolbar">
                <div class="inputGroup custom-control">
                  <input type="checkbox" id="morning" name="timeofdayform" class="custom-control-input" value="Morning">
                  <label class="custom-control-label label1" for="morning">${home_morning}</label>
                </div>
                <div class="inputGroup custom-control">
                  <input type="checkbox" id="afternoon" name="timeofdayform" class="custom-control-input" value="Afternoon">
                  <label class="custom-control-label label1" for="afternoon">${home_afternoon}</label>
                </div>
                <div class="inputGroup custom-control">
                  <input type="checkbox" id="evening" name="timeofdayform" class="custom-control-input" value="Evening">
                  <label class="custom-control-label label1" for="evening">${home_evening}</label>
                </div>
                <div class="inputGroup custom-control">
                  <input type="checkbox" id="night" name="timeofdayform" class="custom-control-input" value="Night">
                  <label class="custom-control-label label1" for="night"> ${home_night}</label>
                </div>
                <div class="inputGroup custom-control">
                  <input type="checkbox" id="post_midnight" name="timeofdayform" class="custom-control-input" value="Post Mid Night">
                  <label class="custom-control-label label1" for="post_midnight"> ${home_post_night}</label>
                </div>
              </div>
            </div>
            <div id="Showincidents" class="tab-pane fade">
              <div class="scrolbar-popup custom-scrolbar">
                <div class="inputGroup custom-control">
                  <input type="radio" id="alltime" name="showincidentsform" class="custom-control-input" value="All time">
                  <label class="custom-control-label label1" for="alltime">${home_all_time}</label>
                </div>
                <div class="inputGroup custom-control">
                  <input type="radio" id="today" name="showincidentsform" class="custom-control-input" value="Today">
                  <label class="custom-control-label label1" for="today">${home_today}</label>
                </div>
                <div class="inputGroup custom-control">
                  <input type="radio" id="week" name="showincidentsform" class="custom-control-input" value="This Week">
                  <label class="custom-control-label label1" for="week">${home_this_week}</label>
                </div>
                <div class="inputGroup custom-control">
                  <input type="radio" id="month" name="showincidentsform" class="custom-control-input" value="This Month">
                  <label class="custom-control-label label1" for="month">${home_this_month}</label>
                </div>
                <div class="inputGroup custom-control">
                  <input type="radio" id="year" name="showincidentsform" class="custom-control-input" value="This Year">
                  <label class="custom-control-label label1" for="year">${home_this_year}</label>
                </div>
              </div>
            </div></div></div>
          </div>
        </div>
      </div>
  `;

  //add elementHtml to incidents_list div
  $("#incidentshare_filtercontent").html(elementfilterdiv);

  //On Apply Click of Filter Modal
  $('#incidents_filter_apply').click(function() {
    categories_ids = "";
    reported_time = "";
    reported_on = "";
    countfilter = 0;

    $('.cntfilter').remove(); //Remove filter count span

    $('input:checkbox[name="sexual_violence"]').each(function () {
        var chk_val = $(this).data('id');
        var sThisVal = (this.checked ? chk_val : "");
        if (sThisVal != "") {
          categories_ids += (categories_ids=="" ? sThisVal : "," + sThisVal);
          countfilter++;
        }
    });

    $('input:checkbox[name="timeofdayform"]').each(function () {
        var time_val = $(this).attr('id');
        var sThisVal = (this.checked ? time_val : "");
        if (sThisVal != "") {
          reported_time += (reported_time=="" ? sThisVal : "," + sThisVal);
          countfilter++;
        }
    });

    $('input:radio[name="showincidentsform"]').each(function () {
        var showincident_val = $(this).attr('id');
        var sThisVal = (this.checked ? showincident_val : "");
        if (sThisVal != "") {
          reported_on += (reported_on=="" ? sThisVal : "," + sThisVal);
          countfilter++;
        }
    });

    count_filter(countfilter); //Add Incident filter count span

    //var filtered_reported_incident_data = {lang_id: lang_id, client_id: client_id, city: city};

    if (categories_ids != "") {
      default_reported_incident_data['categories_ids'] = categories_ids;
    }
    if (reported_time != "") {
      default_reported_incident_data['reported_time'] = reported_time;
    }
    if (reported_on != "") {
      default_reported_incident_data['reported_on'] = reported_on;
    }

    //Passed filter params to this function to load incident data according to filter
    load_reportedincident(default_reported_incident_data);
  });

  //Clear All Filters
  $('#incidents_filter_clear').click(function() {
    $('input:checkbox[name="sexual_violence"]').prop('checked', false);
    $('input:checkbox[name="timeofdayform"]').prop('checked', false);
    $('input:radio[name="showincidentsform"]').prop('checked', false);
    countfilter = 0; //Count zero after removing all selection
    $('.cntfilter').remove(); //Remove filter count span

    if (default_reported_incident_data.hasOwnProperty('categories_ids')) {
      delete default_reported_incident_data['categories_ids'];
    }
    if (default_reported_incident_data.hasOwnProperty('reported_time')) {
      delete default_reported_incident_data['reported_time'];
    }
    if (default_reported_incident_data.hasOwnProperty('reported_on')) {
      delete default_reported_incident_data['reported_on'];
    }
    load_reportedincident(default_reported_incident_data);
  });
}

//Shared Incidents Map Start
//Show Incident Map Start
function showMap(latitude, longitude) {
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
    draggable: true,
    streetViewControl: false,
    // disableDefaultUI: true,
    scaleControl: true,
    fullscreenControl: false
  }
  this.map = new google.maps.Map(document.getElementById("map"), options);

  map.addListener('idle', function() {
    var map_current_bounds = [];
    let zoomLevel = map.getZoom();
    let edgebounds = map.getBounds();
    let ne = edgebounds.getNorthEast(); // Coords of the northeast corner
    let sw = edgebounds.getSouthWest(); // Coords of the southwest corner
    let nw = new google.maps.LatLng(ne.lat(), sw.lng()); // Coords of the NW corner
    let se = new google.maps.LatLng(sw.lat(), ne.lng()); // Coords of the SE corner

    //creating array to pass in API
    mapedges = {
      'ne': {lat: ne.lat(), lng: ne.lng()}, 
      'sw': {lat: sw.lat(), lng: sw.lng()}, 
      'nw': {lat: nw.lat(), lng: nw.lng()}, 
      'se': {lat: se.lat(), lng: se.lng()}
    };
    
    default_reported_incident_data['map_zoom'] = zoomLevel;
    default_reported_incident_data['map_bound'] = mapedges;
    load_reportedincident(default_reported_incident_data);
  });

  /*map.addListener('dragend', function() {
    let edgebounds = map.getBounds();
    let ne = edgebounds.getNorthEast(); // Coords of the northeast corner
    let sw = edgebounds.getSouthWest(); // Coords of the southwest corner
    let nw = new google.maps.LatLng(ne.lat(), sw.lng()); // Coords of the NW corner
    let se = new google.maps.LatLng(sw.lat(), ne.lng()); // Coords of the SE corner
    //console.log("NE:", ne.toString(), "SW:", sw.toString(), "NW:", nw.toString(), "SE:", se.toString());
    console.log("Bounds: ", edgebounds);

    //creating array to pass in API
    mapedges = {'ne': ne.toString(), 'sw': sw.toString(), 'nw': nw.toString(), 'se': se.toString()};
    mapedges_bounds = {'edgebounds': edgebounds}
  })*/

  /*map.addListener('zoom_changed', function() {
    var zoomLevel = map.getZoom();
    console.log("Zoom Level Changed", zoomLevel);
    if (zoomLevel >= 0)
    {
      let edgebounds = map.getBounds();
      let ne = edgebounds.getNorthEast(); // Coords of the northeast corner
      let sw = edgebounds.getSouthWest(); // Coords of the southwest corner
      let nw = new google.maps.LatLng(ne.lat(), sw.lng()); // Coords of the NW corner
      let se = new google.maps.LatLng(sw.lat(), ne.lng()); // Coords of the SE corner
      //console.log("NE:", ne.toString(), "SW:", sw.toString(), "NW:", nw.toString(), "SE:", se.toString());
      console.log("Zoom Bounds: ", edgebounds);
    }
  });*/
}

//Show Incident Map Start
/*//Add Marker to Incident Map Start
function addMarkersToMap(markers) {
  //create empty Incident LatLngBounds object for zoom
  var bounds = new google.maps.LatLngBounds();
  for (let marker of markers) {
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();
    //console.log(marker.latitude, marker.longitude, marker.area);
    let position = new google.maps.LatLng(marker.latitude, marker.longitude);
    let mapMarker = new google.maps.Marker({
      position: position,
      map: map,
      title: marker.area,
      latitude: marker.latitude,
      longitude: marker.longitude,
<<<<<<< HEAD
      html: "<span class='map-grey'>"+home_type+" : </span><span class='map-grey map-dark'>#"+marker.incident_id+' '+marker.categories+'</span><br>'+"<span class='map-grey'>"+home_location+" : </span><span class='map-grey map-dark'>"+marker.area+', '+marker.city+'</span><br>'+"<span class='map-grey'>"+home_date_time+" : </span><span class='map-grey map-dark'>"+marker.dateTime+'</span>'+'<br><span class="map-grey"><a href="#" data-toggle="modal" data-target="#incident-viewmore'+marker.incident_viewmore_id+'">'+view_more_details+'</a></span>',
=======
      html: "<span class='map-grey'>Type : </span><span class='map-grey map-dark'>#"+marker.incident_id+' '+marker.categories+'</span><br>'+"<span class='map-grey'>Location : </span><span class='map-grey map-dark'>"+marker.area+', '+marker.city+'</span><br>'+"<span class='map-grey'>Date & Time : </span><span class='map-grey map-dark'>"+marker.dateTime+'</span>'+'<br><span class="map-grey"><a href="#" data-toggle="modal" data-target="#incident-viewmore'+marker.incident_viewmore_id+'">View more details</a></span>',
>>>>>>> 3d7fde4fd8bbd8b183375c2fd1961ae129ca5949
      animation: google.maps.Animation.DROP,
      //animation: 'DROP',
      draggable: true,
      icon: 'assets/images/Incidents_icon.svg',
    });
    markersList.push(mapMarker);
    //extend the bounds to include each marker's position
    bounds.extend(mapMarker.position);
    google.maps.event.addListener(mapMarker, 'click', function(event) {
        infowindow.setContent(this.html);
        //infowindow.setContent(this.city);
        infowindow.setPosition(event.latLng);
        infowindow.open(map, this);
    });
  }
<<<<<<< HEAD
=======

>>>>>>> 3d7fde4fd8bbd8b183375c2fd1961ae129ca5949
  //map.setOptions({draggable: false});
  map.fitBounds(bounds);       // auto-zoom
  map.panToBounds(bounds);     // auto-center
  //console.log("bounds list", bounds);
};*/

function addClusterIncidentMarkersToMap(locations) {
  var infoWin = new google.maps.InfoWindow();
  // Add some markers to the map.
  var markers = locations.map(function(location, i) {
    var marker = new google.maps.Marker({
      position: location,
      animation: google.maps.Animation.DROP,
      html: "<span class='map-grey'>Type : </span><span class='map-grey map-dark'>#"+locations[i].incident_id+' '+locations[i].categories+'</span><br>'+"<span class='map-grey'>Location : </span><span class='map-grey map-dark'>"+locations[i].area+', '+locations[i].city+'</span><br>'+"<span class='map-grey'>Date & Time : </span><span class='map-grey map-dark'>"+locations[i].dateTime+'</span>'+'<br><span class="map-grey"><a href="#" data-toggle="modal" data-target="#incident-viewmore'+locations[i].incident_viewmore_id+'">View more details</a></span>',
      icon: 'assets/images/Incidents_icon.svg',
    });
    google.maps.event.addListener(marker, 'click', function(evt) {
      //infoWin.setContent(location.info);
      infoWin.open(map, marker);
      infoWin.setContent(html);
      //infoWin.setContent(this.city);
      //infoWin.setPosition(event.latLng);
      //infoWin.open(map, this);
    })
    markersList.push(marker);
    return marker;
  });

  // Options to pass along to the marker clusterer
  const clusterOptions = {
    imagePath: "assets/images/incident-cluster",
    maxZoom: 15
    //imagePath: "assets/images/m",
    //imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    //gridSize: 30,
    //zoomOnClick: true,
    //maxZoom: 10,
  };

  // Add a marker clusterer to manage the markers.
  const markerClusterer = new MarkerClusterer(map, markers, clusterOptions);
  markerClustererList.push(markerClusterer);

  // Change styles after cluster is created
  const styles = markerClusterer.getStyles();
  for (let i=0; i<styles.length; i++) 
  {
    styles[i].textColor = "white";
    //styles[i].textSize = 14;
  }
}

function removeMarkers() 
{
    for(j=0; j<markerClustererList.length; j++) {
        markerClustererList[j].setMap(null);
    }
    for(i=0; i<markersList.length; i++) {
        markersList[i].setMap(null);
    }    
}

//Add Marker to Incident Map End
//Shared Incidents Map End

//MAP Autocomplete Start
function incident_autocomplete_init(incident_searchtext) {
  var options = {};
  var autocomplete = new google.maps.places.Autocomplete(incident_searchtext, options);
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var incident_address = document.getElementById('incident_searchBtn').value;
      geocoder = new google.maps.Geocoder();  
      geocoder.geocode( { 'address': incident_address}, function(results, status) {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
          map.setZoom(15);
          /*var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });*/
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
  });
}
//MAP Autocomplete End

/*function codeAddress() {
  var address = document.getElementById('incident_searchBtn').value;
  geocoder = new google.maps.Geocoder();  
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}*/

//Load incidents reports
function incident_viewmore(data) {
  console.log("====", data, "====");                
  var popup_elementHtml = '';
  var attack_reason = '';
  var perpetrator_info = '';
  var medical_help = '';
  var reported_to_police = '';
  var incidentlength = data.data.length;
  latlong = [];

  for (var i=0; i<incidentlength; i++) {
    var incidentdata = data.data != null ? data.data[i] : "";
    var incident_desc = incidentdata.description != null ? incidentdata.description : "";
    var additional_info = incidentdata.additional_detail != null ? '<p class="reason">'+incident_additional_details+' : '+incidentdata.additional_detail+'</p>' : "";

    // code changed by sonam - 16-10-2020 start
    var person_age = incidentdata.age != null ? incidentdata.age+' Yrs' : "";
    // code changed by sonam - 16-10-2020 end

    var person_gender = incidentdata.gender_id != null && incidentdata.gender_id!=13 ? '<span class="gender"> | '+incidentdata.gender+'</span>' : "";

    // code changed by sonam - 16-10-2020 start
    var incidents_date_est = incidentdata.is_date_estimate != "0" ? home_around+" " : home_on+"";
    var incidents_time_est = incidentdata.is_time_estimate != "0" ? home_around+" " : home_at+"";
    var incidents_time_est = incidentdata.time_to != null ? home_between+" " : incidents_time_est;
    // code changed by sonam - 16-10-2020 end

    // code changed by sonam - 20-10-2020 start
    var incidents_date = incidentdata.incident_date != null ? incidentdata.incident_date : "";
    var incidents_time_range = incidentdata.time_to != null ? timeConvert(incidentdata.time_from)+" - "+timeConvert(incidentdata.time_to) : incidentdata.time_from;
    var dayBetween = days_between(incidents_date);
    var getDaysAgo = (dayBetween > 7 ? ChangeDateFormat(incidents_date,1)+' '+incidents_time_range : (dayBetween==0) ? home_today : (dayBetween==1) ? dayBetween+" "+home_day_ago+" " : dayBetween+home_days_ago+" ");
    // code changed by sonam - 20-10-2020 end
    
    //var incidents_time = incidentdata.time_from != null ? incidentdata.time_from : "";
    var incidents_time = incidentdata.time_to != null ? incidentdata.time_from+" To "+incidentdata.time_to : incidentdata.time_from;
    var incidents_area = incidentdata.area != null ? incidentdata.area : "";
    var incidents_city = incidentdata.city != null ? incidentdata.city : "";
    var incidents_state = incidentdata.state != null ? incidentdata.state : "";
    var incidents_categories = incidentdata.categories != null ? incidentdata.categories : "";

    var incidentdata_answers = data.data[i].answers != null ? data.data[i].answers : "";
    var incidentdata_answers_length = incidentdata_answers.length;

    for (var j=0; j<incidentdata_answers_length; j++) {
      //console.log("incidentdata_answers");
      var incident_question_tag = incidentdata_answers[j].question_tag != null ? incidentdata_answers[j].question_tag : "";
      var incident_question_answer = incidentdata_answers[j].answer != null ? incidentdata_answers[j].answer : "";
      var incident_question_answer_id = incidentdata_answers[j].answer_id != null ? incidentdata_answers[j].answer_id : "";

      if (incident_question_tag == "attack_reason") {
        var attack_reason = '<p class="reason">'+home_led_attack+' : '+incident_question_answer+'</p>';
      }else if (incident_question_tag == "who_was_perpetrator") {
        var perpetrator_info = '<p class="reason">'+home_perpetrator+' : '+incident_question_answer+'</p>';
      }
      else if (incident_question_tag == "medical_help") {
        var medical_help_desc = (incident_question_answer_id == 28 ? home_medical_help_yes : home_medical_help_no);
        var medical_help = '<img src="assets/images/material-local-hospital.svg" class="img-fluid"> '+medical_help_desc;
      }
      else if (incident_question_tag == "reported_to_police") {
        // code change by sonam - 16-10-2020 start
        if(incidentdata_answers[j].other_answers.length != 2){
            var incident_other_answer = JSON.parse(incidentdata_answers[j].other_answers)[42] != null ? JSON.parse(incidentdata_answers[j].other_answers)[42] : "";
        }
        var policeHtml = '<img src="assets/images/map-police.svg" class="img-fluid"> ';
        var reported_to_police = '';
        if(incident_question_answer_id == 38){
            reported_to_police = policeHtml+' '+home_police_filed;
        } else if(incident_question_answer_id == 41){
            reported_to_police = policeHtml+' '+home_police_not_filed;
        } else if(incident_question_answer_id == 42){
            reported_to_police = policeHtml+' '+home_police_tried_filed+'. '+incident_other_answer;
        } else if(incident_question_answer_id == 39){
            reported_to_police = policeHtml+' '+home_police_intend_filed;
        } else if(incident_question_answer_id == 40){
            reported_to_police = policeHtml+' '+home_police_not_sure_filed;
        } else {
            reported_to_police = '';
        }
        // code change by sonam - 16-10-2020 end
      }
    }

    popup_elementHtml += `
        <div id="incident-viewmore${i}" class="modal fade incident-popup" role="dialog" data-keyboard="false" data-backdrop="static">
      <div class="modal-dialog" style="max-width:631px !important">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <!-- <h4 class="modal-title">Filters</h4> -->
            <button type="button" class="close" data-dismiss="modal"> <img src="assets/images/close.svg" class="img-fluid"></button>
          </div>
          <div class="modal-body">
           <div class="longDesc1">
            <div class="incident-title mb-1">${incidents_categories}</div>
            <p><label>
              <span class="age">${person_age}</span>
              <span class="gender"> ${person_gender}</span>
            </label></p>
            <p>${incident_desc}</p>
            ${perpetrator_info}
            ${attack_reason}
            ${additional_info}
            <div class="otherDetails">`;

            if (reported_to_police != "") {
              popup_elementHtml +=
                `<div class="row mb-3">
                  <div class="col-md-12">
                    <div class="location">
                      ${reported_to_police}
                    </div>
                  </div>
                </div>`;
            }

            if (medical_help != "") {
              popup_elementHtml +=
                `<div class="row mb-3">
                  <div class="col-md-12">
                    <div class="location">
                      ${medical_help}
                    </div>
                  </div>
                </div>`;
            }

            popup_elementHtml += 
              `<div class="row mb-3">
                <div class="col-md-12">
                  <div class="location">
                    <img src="assets/images/location.svg" class="img-fluid">
                    ${incidents_area}, ${incidents_city}
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-12">
                  <div class="iDate">
                    <img src="assets/images/calendar-date-of-incident.svg" class="img-fluid">
                    ${incidents_date_est} ${ConverttoLongDate(incidents_date)}
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-12">
                  <div class="iTime">
                    <img src="assets/images/time-of-incident.svg" class="img-fluid">
                    ${incidents_time_est} ${timeConvert(incidents_time)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  }
  //add popup_elementHtml to incident-viewmore-div
  $("#incident-viewmore-div").html(popup_elementHtml);
}
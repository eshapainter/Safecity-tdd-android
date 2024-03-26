import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery'
declare var google: any;
@Component({
  selector: 'app-safteytipone',
  templateUrl: './safteytipone.page.html',
  styleUrls: ['./safteytipone.page.scss'],
})
export class SafteytiponePage implements OnInit {
  locality: string
  landmark: string
  city: string
  state: string
  country: string
  Suburb

  locality_disable = false
  landmark_disable = false
  city_disable = false
  state_disable = false
  country_disable = false
  suburb_disable = false

  address2: string;
  address
  address1
  lat
  lat1
  longi
  longi1
  public safetyForm: FormGroup;
  autocomplete
  autoaddress = []
  autoadd1 = []
  latitude  
   longitude   
  area;
  geocoder: any;
  mapMarker: any;
  map: any;
  building;
  final_Address = []
  buttondisabled = true
  constructor(private navController: NavController, private router: Router, public formBuilder: FormBuilder) {

    // this.safetyForm = formBuilder.group({
    //   locality: ['', Validators.required],
    //   landmark: ['', Validators.required],
    //   suburb: ['', Validators.required],
    //   city: ['', Validators.required],
    //   state: ['', Validators.required],
    //   country: ['', Validators.required]

    // });

    this.latitude  = localStorage.getItem('map_lat');
    this.longitude = localStorage.getItem('map_longi');
    

  }

  
  ngOnInit() {
  }

  ionViewDidEnter() {
   // this.initAutocomplete()
    this.initMap('search_address');
  }

  updateMarker() {
    console.log('updating marker');
    console.log(this.latitude, this.longitude);
    var location = new google.maps.LatLng(this.latitude, this.longitude);
    this.mapMarker.setPosition(location);
    this.map.setCenter(location);
  }

  initMap(searchFieldId) {
    var self = this
    // Enable autocomplete
    if (google) {

      /////////////
      // Set map //
      /////////////

      // console.log(this.latitude)
      // console.log(this.longitude)

      var location = new google.maps.LatLng(this.latitude, this.longitude);
      var options = {
        center: location,
        zoom: 15,
        animation: 'DROP',
        draggable: true,
        fullscreenControl: false,
        gestureHandling: 'cooperative',
        scaleControl: true,
      };
      var map = new google.maps.Map(document.getElementsByClassName("mapouter")[0], options);
      this.map = map
      ////////////////
      // Set Marker //
      ////////////////
      var mapMarker = new google.maps.Marker({
        position: location,
        // title: marker.title,
        latitude: this.latitude,
        longitude: this.longitude,
        animation: 'DROP',
        draggable: true,
      });
      mapMarker.setMap(map);
      this.mapMarker = mapMarker
      // On drag end
      google.maps.event.addListener(mapMarker, 'dragend', function () {
        console.log(this.mapMarker);
        var markerlatlong = mapMarker.getPosition();
        self.latitude = JSON.stringify(mapMarker.getPosition().lat());
        self.longitude = JSON.stringify(mapMarker.getPosition().lng());
        
        localStorage.setItem('lat_safety',self.latitude)                                 
        localStorage.setItem('longi_safety',self.longitude) 
        // Reverse Geocode to get Address
        self.geocodeLatLng();
      });
      console.log(self.latitude)
      console.log(self.longitude)

                                             

      var geocoder = new google.maps.Geocoder();
      this.geocoder = geocoder
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


      
    var self = this

    $("#options input:text").eq(0).focus();

    // Set Address if any
    if (this.country) {
      this.showAddress();
    }
    else {
      $(".pinned-add").text('');
    }


    // On Building Address Changed
    $("#building_address , #area").keyup(function (e) {

      if ($(this).attr('id') == 'building_address')
        self.building = $(this).val();
      else if ($(this).attr('id') == 'area')
        self.area = $(this).val();
      self.showAddress();
    });


      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        console.log(places);
        if (places.length == 0) {
          self.resetFields("No results found");
          return;
        }
        var place = places[0];

        // Set Coordinates
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();

        localStorage.setItem('lat_safety',this.latitude)                                 
        localStorage.setItem('longi_safety',this.longitude) 


        self.updateMarker();
        var addcomponent = place.address_components;

        // Set Address
        self.setAddress(addcomponent);

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
  geocodeLatLng() {

    console.log(this.latitude)
    console.log(this.longitude)
    const latlng = {
      lat: parseFloat(this.latitude),
      lng: parseFloat(this.longitude),
    };
    var geocoder = this.geocoder
    geocoder.geocode({ location: latlng }, (results, status) => {
      console.log(results);
      if (status === "OK") {
        if (results[0]) {
          // Set Address
          console.log(results[0].address_components)
          this.setAddress(results[0].address_components);
        } else {
          this.resetFields("No results found");
        }
      } else {
        this.resetFields("Geocoder failed due to: " + status);
      }
    });
  }

  setAddress(addcomponent) {
    // Set Address
    this.building = this.landmark = this.area = this.city = this.state = this.country = "";

    if (addcomponent) {
      var street_number = ''
      var route = ''
      var localbuilding = '';
      this.final_Address = []
      for (var i = 0; i < addcomponent.length; i++) {
        this.final_Address.push(addcomponent[i].long_name)
        if (addcomponent[i].types[0] == 'country') {
          this.country = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'administrative_area_level_1') {
          this.state = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'locality') {
          this.city = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'postal_code') {
        }
        else if (addcomponent[i].types[0] == 'sublocality_level_1') {
          this.area = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == "sublocality_level_3" || addcomponent[i].types[0] == "sublocality") {
          this.landmark = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'sublocality_level_2') {
          localbuilding = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'street_number') {
          street_number = addcomponent[i].long_name;
        } else if (addcomponent[i].types[0] == 'route') {
          route = addcomponent[i].long_name;
        }
      }

      console.log(this.final_Address)
      var addr = this.final_Address.join(',');
      $(".search_address").val(addr)
      $("#area").val(this.area);
      console.log(addr)
      this.building = street_number + ' ' + route;
      this.building = this.building.trim() == '' ? localbuilding : this.building;
    }

    $("#building_address").val(this.building);
    this.showAddress();
  }
  

  resetFields(message) {
    this.building = this.landmark = this.area = this.city = this.state = this.country = "";
    $("#building_address").val('');
    $("#area").val('');
    $(".pinned-add").text('');
    // Show message like Select a valid address
    // Disable next
    this.buttondisabled = true
    //$("#dynamicNext").attr("disabled", "disabled");
  }

  showAddress() {
    if (this.latitude != '' && this.longitude != '' && (this.country != '' || this.country != undefined) && (this.state != '' || this.state != undefined)) {
      console.log('else', this.country, this.state)
      if (this.building != '' && this.landmark != '') {
        console.log('else', this.country, this.state)
        // $(".search_address").text(this.building+', '+this.landmark+', '+this.area+', '+this.city+', '+this.state+', '+this.country);        
        this.address1 = this.building + ', ' + this.landmark + ', ' + this.area + ', ' + this.city + ', ' + this.state + ', ' + this.country
        $(".pinned-add").text(this.building + ', ' + this.landmark + ', ' + this.area + ', ' + this.city + ', ' + this.state + ', ' + this.country);
        localStorage.setItem('address_safety',this.address1)
      }
      else if (this.building != '') {
        console.log('else', this.country, this.state)
        /// $(".search_address").text(this.building+','+this.area+', '+this.city+', '+this.state+', '+this.country);    
        this.address1 = this.building + ',' + this.area + ', ' + this.city + ', ' + this.state + ', ' + this.country
        $(".pinned-add").text(this.building + ',' + this.area + ', ' + this.city + ', ' + this.state + ', ' + this.country);
        localStorage.setItem('address_safety',this.address1)
      }
      else if (this.landmark != '') {
        console.log('else', this.country, this.state)
        this.address1 = this.landmark + ', ' + this.area + ', ' + this.city + ', ' + this.state + ', ' + this.country
        $(".pinned-add").text(this.landmark + ', ' + this.area + ', ' + this.city + ', ' + this.state + ', ' + this.country);
        localStorage.setItem('address_safety',this.address1)
        //$(".search_address").text(this.landmark+', '+this.area+', '+this.city+', '+this.state+', '+this.country);  
      }
      else if (this.area != '' && this.city != '') {
        console.log('else', this.country, this.state)
        this.address1 = this.area + ', ' + this.city + ', ' + this.state + ', ' + this.country
        $(".pinned-add").text(this.area + ', ' + this.city + ', ' + this.state + ', ' + this.country);
        localStorage.setItem('address_safety',this.address1)
        //$(".search_address").text(this.area+', '+this.city+', '+this.state+', '+this.country);
      }
      else {
        console.log('else', this.country, this.state)
        this.address1 = this.city + ', ' + this.country 
        $(".pinned-add").text('')
        localStorage.setItem('address_safety',this.address1)
      }

    }
    else {
      console.log('else', this.country, this.state)
      $(".pinned-add").text('')
    }

    if (this.latitude != '' && this.longitude != '' && this.area != '' && this.country != '' ) {
      // $("#dynamicNext").removeAttr("disabled");
      this.buttondisabled = false
    } else {
      // $("#dynamicNext").attr("disabled", "disabled");
      this.buttondisabled = true
      
    }
  }

  initAutoComplete(elementInitial) {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    var autocomplete = new google.maps.places.Autocomplete(
      // document.getElementById('autocomplete').getElementsByTagName('input')[0],
      document.getElementById(elementInitial + 'building'),
      {}
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(["address_component", "geometry"]);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener("place_changed", function () {
      var place = autocomplete.getPlace();
      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();
      document.getElementById(elementInitial + 'latitude')['value'] = latitude;
      document.getElementById(elementInitial + 'longitude')['value'] = longitude;

      var addcomponent = place.address_components;
      for (var i = 0; i < addcomponent.length; i++) {
        if (addcomponent[i].types[0] == 'country') {
          document.getElementById(elementInitial + 'country')['value'] = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'locality') {
          document.getElementById(elementInitial + 'city')['value'] = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'administrative_area_level_1') {
          document.getElementById(elementInitial + 'state')['value'] = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'sublocality_level_1') {
          document.getElementById(elementInitial + 'area')['value'] = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'sublocality_level_2') {
          document.getElementById(elementInitial + 'building')['value'] = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'postal_code') {
          document.getElementById(elementInitial + 'landmark')['value'] = addcomponent[i].long_name;
        }
      //  $("#dynamicNext").removeAttr("disabled");
        //this.buttondisabled = false
      }

    });
  }



  //  getlatlong() {

  //   this.address2 = this.safetyForm.value.locality +','+ this.safetyForm.value.landmark +','+ this.safetyForm.value.suburb +','+ this.safetyForm.value.city +','+ this.safetyForm.value.state +','+ this.safetyForm.value.country
  //     console.log(this.address2)
  //     var geocoder = new google.maps.Geocoder();
  //                                           var city,hascity,address = this.address2
  //                                           geocoder.geocode({ 'address': address }, function (results, status) {
  //                                          if (status == google.maps.GeocoderStatus.OK)
  //                                          {
  //                                            console.log(results)
  //                                            this.address = results[0].formatted_address;
  //                                            this.lat= JSON.stringify(results[0].geometry.location.lat());
  //                                            this.longi = JSON.stringify(results[0].geometry.location.lng()); 

  //                                            //this.locations = new google.maps.LatLng(this.lat, this.longi);

  //                                            console.log(this.lat)
  //                                            console.log(this.longi)       
  //                                            console.log(this.address);
  //                                            localStorage.setItem('lat_safety',this.lat)                                 
  //                                            localStorage.setItem('longi_safety',this.longi) 
  //                                            localStorage.setItem('address_safety',this.address)                                 
  //                                         }
  //                                       });


  //    }


  safetytip()
  {

    this.lat1 = localStorage.getItem('lat_safety')                                 
    this.longi1 = localStorage.getItem('longi_safety') 
    this.address1 = localStorage.getItem('address_safety') 
    console.log("locality",this.area)
    console.log("landmark",this.building)
    console.log("city",this.city)
    console.log("state",this.state)
    console.log("country",this.country)
    console.log("lat1",this.lat1)
    console.log("longi1",this.longi1)
    console.log("address1",this.address1)

      let navigationExtras: NavigationExtras = {
        queryParams: {
        locality:this.area,
        landmark:this.building,
        city:this.city,
        state:this.state,
        country:this.country,
        lat : this.latitude,
        longi : this.longitude,
        address: this.address1
        }

      };

        console.log(navigationExtras)
        this.navController.navigateForward([`safteytipthree`],navigationExtras);
    
  }



  //autocomplete code

  initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('auto').getElementsByTagName('input')[0],
      { types: ["geocode"] }
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(["address_component"]);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener("place_changed", fillInAddress => {
      console.log(this.safetyForm.value.locality)

      var autoadd = this.autocomplete.getPlace();
      this.autoadd1 = autoadd.address_components;
      console.log(this.autoadd1)
      for (var i = 0; i < this.autoadd1.length; i++) {
        //this.autoaddress.push(this.autoadd1[i].long_name)

        if (this.autoadd1[i].types[0] == 'country') {
          this.safetyForm.controls['country'].setValue(this.autoadd1[i].long_name)
          this.country_disable = true
        }
        else if (this.autoadd1[i].types[0] == 'locality') {
          this.safetyForm.controls['city'].setValue(this.autoadd1[i].long_name)
          this.city_disable = true
        }
        else if (this.autoadd1[i].types[0] == 'administrative_area_level_1') {
          this.safetyForm.controls['state'].setValue(this.autoadd1[i].long_name)
          this.state_disable = true
        }
        else if (this.autoadd1[i].types[0] == 'sublocality_level_1') {
          this.safetyForm.controls['locality'].setValue(this.autoadd1[i].long_name)
          this.locality_disable = true
        }
        else if (this.autoadd1[i].types[0] == 'sublocality_level_2') {
          this.safetyForm.controls['landmark'].setValue(this.autoadd1[i].long_name);
          this.landmark_disable = true;
        }
        else if (this.autoadd1[i].types[0] == 'postal_code') {
          this.safetyForm.controls['suberb'].setValue(this.autoadd1[i].long_name);
          this.suburb_disable = true
        }
      }
      // this.autoaddress = autoadd.long_name.join(',')
      //  console.log(this.autoaddress)
      //  var final_result = this.autoaddress.join(',')
      //   console.log(final_result)
      //   console.log(this.autoaddress)


    });
  }


}

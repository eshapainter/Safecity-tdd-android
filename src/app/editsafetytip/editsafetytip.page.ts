import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { SharedService } from '../shared.service'
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
declare var google: any;
@Component({

  selector: 'app-editsafetytip',
  templateUrl: './editsafetytip.page.html',
  styleUrls: ['./editsafetytip.page.scss'],

})
export class EditsafetytipPage implements OnInit {
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  lat = ''
  long = ''
  map
  infoWindows: any;
  location = '';
  area = ''
  safety_title = '';
  safety_desc = '';
  public editsafetyForm: FormGroup;
  autocomplete: any;
  autoaddress: any[];
  autoadd1: any;
  address1: any;
  address: string;
  safetip_id
  country
  city
  apiUrl = 'http://101.53.143.7/~dataduck/safecity_webapp/api/safety-tip/';
  state: any;
  landmark: any;
  constructor(private sharedservice: SharedService, public navContrl: NavController, public route: ActivatedRoute, public formBuilder: FormBuilder, public httpClient: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.location = params["location"];
      this.city = params["city"];
      this.state = params["state"];
      this.country = params["country"];
      this.landmark = params['landmark'];
      this.location = params["location"];
      this.lat = params["lat"];
      this.long = params["long"];
      this.safety_title = params["safety_title"];
      this.safety_desc = params["safety_desc"];
      this.safetip_id = localStorage.getItem('editSafety_id')
      // this.safetip_id = params["safety_tip_id"];

      this.editsafetyForm.controls['location'].setValue(this.location)
      this.editsafetyForm.controls['safety_title'].setValue(this.safety_title)
      this.editsafetyForm.controls['safety_desc'].setValue(this.safety_desc)
     });

    this.editsafetyForm = formBuilder.group({
      location: ['', Validators.required],
      safety_title: ['', Validators.required],
      safety_desc: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
    });
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.showMap();
    this.initAutocomplete();
  }

  showMap() {
    console.log('hi')
    console.log(this.lat)
    console.log(this.long)
    const location = new google.maps.LatLng(this.lat, this.long);
    const options = {
      center: location,
      zoom: 5,
      animation: 'DROP',
      draggable: true,
      // disableDefaultUI: true,
      scaleControl: true,
      gestureHandling: 'cooperative',
      fullscreenControl: false
    }
    console.log(options)
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.lat, this.long);
  }

  addMarkersToMap(lat, long) {
    let position = new google.maps.LatLng(lat, long);
    let mapMarker = new google.maps.Marker({
      position: position,
      title: this.safety_title,
      // latitude: marker.latitude,
      // longitude: marker.longitude,
      animation: 'DROP',
      draggable: true,
    });
    mapMarker.setMap(this.map);
    google.maps.event.addListener(mapMarker, 'dragend', function () {
      console.log(mapMarker)
      var markerlatlong = mapMarker.getPosition();
      console.log("latlong" + markerlatlong);
      console.log("lat" + mapMarker.getPosition().lat());
      console.log("long" + mapMarker.getPosition().lng());
      //this.placeMarkerAndPanTo(e.latLng, this.map);
      var lat = JSON.stringify(mapMarker.getPosition().lat());
      var longi = JSON.stringify(mapMarker.getPosition().lng());
      //code for getting formatted address from the selected latitude and longitude 

      var geocoder = new google.maps.Geocoder();
      const latlng =
      {
        lat: parseFloat(lat),
        lng: parseFloat(longi)
      };
      geocoder.geocode(
        { location: latlng },
        (
          results,
          status
        ) => {
          if (status === "OK") {
            if (results[0]) {
              console.log(results[0])
              this.title = results[0].formatted_address;
              // localStorage.setItem('address_police', this.title)
              console.log(this.title)
              this.editsafetyForm.controls['location'].setValue(this.title)

              this.autoaddress = []
              var street_number = ''
              var route = ''
              var localbuilding = '';
              this.country = undefined
              this.state = undefined
              this.city = undefined
              this.landmark = undefined
              this.autocomplete.getPlace();


              var autoadd = results[0]
              this.autoadd1 = autoadd.address_components;
              for (var i = 0; i < this.autoadd1.length; i++) {
                if (this.autoadd1[i].types[0] == 'country') {
                  this.country = this.autoadd1[i].long_name;
                }
                else if (this.autoadd1[i].types[0] == 'administrative_area_level_1') {
                  this.state = this.autoadd1[i].long_name;
                }
                else if (this.autoadd1[i].types[0] == 'locality') {
                  this.city = this.autoadd1[i].long_name;
                }
                else if (this.autoadd1[i].types[0] == 'postal_code') {
                }
                else if (this.autoadd1[i].types[0] == 'sublocality_level_1') {
                  if (this.landmark == undefined || this.landmark == null || this.landmark == '') {
                    this.landmark = this.autoadd1[i].long_name;
                  }

                }
                else if (this.autoadd1[i].types[0] == "sublocality_level_3" || this.autoadd1[i].types[0] == "sublocality") {
                  if (this.landmark == undefined || this.landmark == null || this.landmark == '') {
                    this.landmark = this.autoadd1[i].long_name;
                  }
                }
                else if (this.autoadd1[i].types[0] == 'sublocality_level_2') {
                  localbuilding = this.autoadd1[i].long_name;
                }
                else if (this.autoadd1[i].types[0] == 'street_number') {
                  street_number = this.autoadd1[i].long_name;
                } else if (this.autoadd1[i].types[0] == 'route') {
                  route = this.autoadd1[i].long_name;
                }


                this.area = street_number + ' ' + route;
                this.area = this.area.trim() == '' ? localbuilding : this.area;

              }

              for (var i = 0; i < this.autoadd1.length; i++) {
                this.autoaddress.push(this.autoadd1[i].long_name)
              }
              // this.autoaddress = autoadd.long_name.join(',')
              console.log(this.autoaddress)
              var final_result = this.autoaddress.join(',')
              console.log(final_result)
              console.log(this.autoaddress)
              // this.searchForm.value.location = '';

              this.editsafetyForm.controls['location'].setValue(final_result)

            }
            else {

            }
          } else {

          }
        }
      );
    }.bind(this));
  }

  initAutocomplete() {
    console.log("hiiiiiiiiii")
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete3').getElementsByTagName('input')[0],
      {
        types: ["geocode"]
      }
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(["address_component"]);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener("place_changed", () => {
      console.log("autocomplete", this.autocomplete.getPlace());
      this.autoaddress = []
      var street_number = ''
      var route = ''
      var localbuilding = '';
      this.autocomplete.getPlace();


      var autoadd = this.autocomplete.getPlace();
      this.autoadd1 = autoadd.address_components;
      for (var i = 0; i < this.autoadd1.length; i++) {
        if (this.autoadd1[i].types[0] == 'country') {
          this.country = this.autoadd1[i].long_name;
        }
        else if (this.autoadd1[i].types[0] == 'administrative_area_level_1') {
          this.state = this.autoadd1[i].long_name;
        }
        else if (this.autoadd1[i].types[0] == 'locality') {
          this.city = this.autoadd1[i].long_name;
        }
        else if (this.autoadd1[i].types[0] == 'postal_code') {
        }
        else if (this.autoadd1[i].types[0] == 'sublocality_level_1') {
          this.area = this.autoadd1[i].long_name;
        }
        else if (this.autoadd1[i].types[0] == "sublocality_level_3" || this.autoadd1[i].types[0] == "sublocality") {
          this.landmark = this.autoadd1[i].long_name;
        }
        else if (this.autoadd1[i].types[0] == 'sublocality_level_2') {
          localbuilding = this.autoadd1[i].long_name;
        }
        else if (this.autoadd1[i].types[0] == 'street_number') {
          street_number = this.autoadd1[i].long_name;
        } else if (this.autoadd1[i].types[0] == 'route') {
          route = this.autoadd1[i].long_name;
        }


        this.area = street_number + ' ' + route;
        this.area = this.area.trim() == '' ? localbuilding : this.area;
        console.log(this.country)
        console.log(this.state)
        console.log(this.city)
        console.log(this.area)
        console.log(this.location)
      }

      for (var i = 0; i < this.autoadd1.length; i++) {
        this.autoaddress.push(this.autoadd1[i].long_name)
      }
      // this.autoaddress = autoadd.long_name.join(',')
      console.log(this.autoaddress)
      var final_result = this.autoaddress.join(',')
      console.log(final_result)
      console.log(this.autoaddress)
      // this.searchForm.value.location = '';

      this.editsafetyForm.controls['location'].setValue(final_result)
      // this.address = this.autoadd1[0].long_name
      console.log("autocomplt", this.address1)
      // localStorage.setItem('City_name', this.address)
    });
  }

  getlatlong(value) {
    console.log(value)

    var geocoder = new google.maps.Geocoder();
    var city, hascity, address = value

    geocoder.geocode({ 'address': address }, results => {
      if (results[0].formatted_address) {
        console.log(results)
        this.address = JSON.stringify(results[0].formatted_address);
        this.lat = JSON.stringify(results[0].geometry.location.lat());
        this.long = JSON.stringify(results[0].geometry.location.lng());

        console.log(this.lat)
        console.log(this.long)
        if (this.lat != undefined && this.long != undefined) {
          this.editsafetyForm.controls['lat'].setValue(this.lat)
          this.editsafetyForm.controls['long'].setValue(this.long)
          this.showMap()
        }
      }

    });

    // this.showMap()
  }


  editSafetyTip() {



    // safety_tip_id:4
    // user_id:0
    // location_city_state:Ghatkopar East, Mumbai, Maharashtra, India Mumbai Maharashtra
    // location:Ghatkopar East, Mumbai, Maharashtra, India
    // landmark:near bus stop
    // city:Mumbai
    // state:Maharashtra
    // country:India
    // exact_location:"Ghatkopar, Near Ghatkopar Station East, Link Rd, Best Colony, Mankur, Mumbai, Maharashtra 400075, India"
    // map_lat:19.0876229
    // map_lon:72.9177548
    // safety_tip_title:testing title updated
    // safety_tip_desc:testing description

    console.log("location", this.editsafetyForm)
    // if(this.editsafetyForm)
    this.address = localStorage.getItem('City_name')
    var user_id = localStorage.getItem('userId')
    let data = new FormData();
    if (this.editsafetyForm.value.lat && this.editsafetyForm.value.long != '') {
      data.append('map_lat', this.editsafetyForm.value.lat);
      data.append('map_lon', this.editsafetyForm.value.long);
    }
    else {
      data.append('map_lat', this.lat);
      data.append('map_lon', this.long);
    }
    data.append('safety_tip_id', this.safetip_id);
    data.append('user_id', user_id);
    data.append('location_city_state', this.editsafetyForm.value.location);
    data.append('location', this.editsafetyForm.value.location);
    data.append('landmark', this.landmark);
    data.append('city', this.city);
    data.append('state', this.state);
    data.append('country', this.country);
    data.append('exact_location', this.editsafetyForm.value.location);
    data.append('safety_tip_title', this.editsafetyForm.value.safety_title);
    data.append('safety_tip_desc', this.editsafetyForm.value.safety_desc);

    this.sharedservice.sharedPostRequest('safety-tip/update', data).subscribe((rdata: any) => {
      console.log(rdata);
      if (rdata.status == true) {
        this.navContrl.navigateForward('/mysafety')
      }

    }, error => {
    }, () => {

    });


    // this.httpClient.post(this.apiUrl +'update', data)
    //   .subscribe((rdata: any) => {
    //     console.log("rdata", rdata)
    //   if(rdata.message ==  "Safety Tip updated successfully")
    //   {
    //     this.navContrl.navigateForward('/mysafetyreport')
    //   }
    //   }, error => {
    //   });

  }

}

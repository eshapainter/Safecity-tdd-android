import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service'
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
declare var google: any;
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.page.html',
  styleUrls: ['./hospital.page.scss'],
})
export class HospitalPage implements OnInit {
  public hospitalForm: FormGroup;
  public submitAttempt: boolean = false;
  lat
  locations
  longi
  l1
  l2
  address
  autocomplete
  autoaddress = []
  autoadd1 = []
  sharedData = this.sharedservice.getData();
  constructor(private navController: NavController, private router: Router, private sharedservice: SharedService, public formBuilder: FormBuilder, public httpClient: HttpClient) {
    this.hospitalForm = formBuilder.group({
      location: ['', Validators.compose([Validators.required])]
    });
    console.log(this.sharedData)
    // var lat = { 'latitude': '19.998518', 'longitude': '73.7919103' }
    // this.httpClient.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.503186,-0.126446&radius=5000&types=hospital&key=AIzaSyA-RG4hM7qRh3jHfOwSuUOBexPTn0CZf6w')
    //   .subscribe((rdata: any) => {
    //     console.log(rdata)
    //   }, err => {
    //     console.log(err)
    //   })


  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initAutocomplete()
  }

  get errorControl() {
    return this.hospitalForm.controls;
  }

  // hospitalForm.value.location

  getlatlong() {
    console.log(this.hospitalForm.value.location)
    var geocoder = new google.maps.Geocoder();
    var city, hascity, address = this.hospitalForm.value.location
    geocoder.geocode({ 'address': address }, results => {
      if (results[0].formatted_address) {
        console.log(results)
        this.address = JSON.stringify(results[0].formatted_address);
        this.lat = JSON.stringify(results[0].geometry.location.lat());
        this.longi = JSON.stringify(results[0].geometry.location.lng());

        //this.locations = new google.maps.LatLng(this.lat, this.longi);

        console.log(this.lat)
        console.log(this.longi)
        localStorage.setItem('lat', this.lat)
        localStorage.setItem('longi', this.longi)
        localStorage.setItem('address', this.address)


        this.submitAttempt = true;
        if (!this.hospitalForm.valid) {


          localStorage.setItem('lat', '')
          localStorage.setItem('longi', '')
          localStorage.setItem('address', '')
        }
        else {


          let navigationExtras: NavigationExtras = {
            state: {
              lat: this.lat,
              longi: this.longi,
              address: this.address
            }
          };
          this.router.navigate(['/findhospital'], navigationExtras);


        }
        // this.sharedData['lat_hospital'] = this.lat
        // this.sharedData['longi_hospital'] = this.longi
        // this.sharedData['address_hospital'] = this.address
        console.log(this.sharedData)
        //this.sharedservice.setData(this.sharedData)
      }
    });
  }
  find() {


    console.log(this.lat)
    console.log(this.longi)
    console.log(this.address)

    this.lat = localStorage.getItem('lat')
    this.longi = localStorage.getItem('longi')
    this.address = localStorage.getItem('address')

    // this.lat = this.sharedData['lat_hospital']
    // this.longi = this.sharedData['longi_hospital']
    // this.address = this.sharedData['address_hospital']

    console.log(this.lat)
    console.log(this.longi)
    console.log(this.address)
    this.submitAttempt = true;
    if (!this.hospitalForm.valid) {


      localStorage.setItem('lat', '')
      localStorage.setItem('longi', '')
      localStorage.setItem('address', '')
    }
    else {


      let navigationExtras: NavigationExtras = {
        state: {
          lat: this.lat,
          longi: this.longi,
          address: this.address
        }
      };
      this.router.navigate(['/findhospital'], navigationExtras);


    }
  }


  //autocomplete code

  initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete1').getElementsByTagName('input')[0]
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(["address_component"]);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener("place_changed", fillInAddress => {
      this.autoaddress = []
      this.autocomplete.getPlace();
      console.log(this.autocomplete.getPlace());
      var autoadd = this.autocomplete.getPlace();
      console.log(autoadd)
      this.autoadd1 = autoadd.address_components;
      console.log(this.autoadd1)
      for (var i = 0; i < this.autoadd1.length; i++) {
        this.autoaddress.push(this.autoadd1[i].long_name)
      }
      // this.autoaddress = autoadd.long_name.join(',')
      console.log(this.autoaddress)
      var final_result = this.autoaddress.join(',')
      console.log(final_result)
      console.log(this.autoaddress)
      this.hospitalForm.value.location = '';
      // this.getlatlong(final_result)
      this.hospitalForm.controls['location'].setValue(final_result)
    });
  }

}

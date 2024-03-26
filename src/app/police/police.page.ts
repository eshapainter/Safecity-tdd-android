import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
declare var google: any;
@Component({
  selector: 'app-police',
  templateUrl: './police.page.html',
  styleUrls: ['./police.page.scss'],
})
export class PolicePage implements OnInit {
  public policeForm: FormGroup;
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
  proceed = false
  constructor(private navController: NavController, private router: Router, public formBuilder: FormBuilder, public httpClient: HttpClient,) {
    this.policeForm = formBuilder.group({
      location: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.initAutocomplete()
  }

  get errorControl() {
    return this.policeForm.controls;
  }

  getlatlong() {
    console.log(this.policeForm.value.location)
    var geocoder = new google.maps.Geocoder();
    var city, hascity, address = this.policeForm.value.location
    geocoder.geocode({ 'address': address }, results => {
      console.log(results)
      if (results[0].formatted_address) {
        console.log(results)
        this.address = JSON.stringify(results[0].formatted_address);
        this.lat = JSON.stringify(results[0].geometry.location.lat());
        this.longi = JSON.stringify(results[0].geometry.location.lng());

        this.submitAttempt = true;
        if (!this.policeForm.valid) {


          localStorage.setItem('lat_police', '')
          localStorage.setItem('longi_police', '')
          localStorage.setItem('address_police', '')
        }
        else {


          let navigationExtras: NavigationExtras = {
            state: {
              lat: this.lat,
              longi: this.longi,
              address: this.address
            }
          };
          this.router.navigate(['/findpolice'], navigationExtras);


        }

        //this.locations = new google.maps.LatLng(this.lat, this.longi);

        console.log(this.lat)
        console.log(this.longi)
        localStorage.setItem('lat_police', this.lat)
        localStorage.setItem('longi_police', this.longi)
        localStorage.setItem('address_police', this.address)
      }

    });
  }

  find() {

    this.lat = localStorage.getItem('lat_police')
    this.longi = localStorage.getItem('longi_police')
    this.address = localStorage.getItem('address_police')
    console.log(this.lat)
    console.log(this.longi)
    console.log(this.address)
    this.submitAttempt = true;
    if (!this.policeForm.valid) {


      localStorage.setItem('lat_police', '')
      localStorage.setItem('longi_police', '')
      localStorage.setItem('address_police', '')
    }
    else {


      let navigationExtras: NavigationExtras = {
        state: {
          lat: this.lat,
          longi: this.longi,
          address: this.address
        }
      };
      this.router.navigate(['/findpolice'], navigationExtras);


    }

  }


  //autocomplete code

  initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete2').getElementsByTagName('input')[0]
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
      //this.getlatlong(final_result)
      this.policeForm.controls['location'].setValue(final_result)
    });
  }


  legal() {
    this.navController.navigateForward(`/legalresources`);
  }
}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {  FormGroup, FormBuilder, Validators } from "@angular/forms";
declare var google;

@Component({
  selector: 'app-reportfiledeleven',
  templateUrl: './reportfiledeleven.page.html',
  styleUrls: ['./reportfiledeleven.page.scss'],
})
export class ReportfiledelevenPage implements OnInit {
  addressForm: FormGroup;
  address2: any;
  lat
  longi
  address
  lat1
  longi1
  address1
 
  autocomplete
  autoaddress = []
  autoadd1 = []

  locality_disable = false
  landmark_disable = false
  city_disable = false
  state_disable = false
  country_disable = false
  area_disable = false
  constructor(private navController: NavController, private router: Router,private route: ActivatedRoute,public formBuilder:FormBuilder) {

    this.addressForm = this.formBuilder.group({
      area: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      locality :'',
      landmark:'',
      state:''
      });

  //   this.route.queryParams.subscribe(params => {
  //     this.forWho = params["forWho"];
  //     this.age = params["age"];
  //     this.pronoun = params["pronoun"];
  //     this.experience = params["experience"];
  //     this.date1 = params["date1"];
  //     this.dateEstimate = params["dateEstimate"];
  //     this.time = params["time"];
  //     this.timeEstimate = params["timeEstimate"];
  //     this.timeRange = params["timeRange"];
  //     this.violenceType = params["violenceType"];
  //     this.anythingElse = params["anythingElse"];
  //     this.policeRepo =params["policeRepo"];
  //     this.led =params["led"];

                 
  //     console.log("for Who",this.forWho);
  //     console.log("Age",this.age);
  //     console.log("pronoun",this.pronoun);
  //     console.log("experience",this.experience);
  //     console.log("date1",this.date1);
  //     console.log("time",this.time);
  //     console.log("dateEstimate",this.dateEstimate);
  //     console.log("timeEstimate",this.timeEstimate);
  //     console.log("timeRange",this.timeRange);
  //     console.log("violenceType",this.violenceType);
      
  //  })
   
   }

  ngOnInit() {
  }

  
  ionViewDidEnter()
  {
    this.initAutocomplete()
  }

  //autocomplete code

  initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete').getElementsByTagName('input')[0],
      { types: ["geocode"] ,componentRestrictions: {country: 'in'}}
    );
  
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(["address_component"]);
  
    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener("place_changed", fillInAddress =>{
          console.log(this.addressForm.value.locality)
          
          var  autoadd = this.autocomplete.getPlace();
           this.autoadd1 = autoadd.address_components;
          console.log(this.autoadd1)
          for(var i = 0 ; i < this.autoadd1.length ; i++)
          {
            //this.autoaddress.push(this.autoadd1[i].long_name)
            
            if(this.autoadd1[i].types[0] == 'country')
            {
              this.addressForm.controls['country'].setValue(this.autoadd1[i].long_name)
              this.country_disable = true
            }
            else if(this.autoadd1[i].types[0] == 'locality')
            {
              this.addressForm.controls['city'].setValue(this.autoadd1[i].long_name)
              this.city_disable = true
            }
            else if(this.autoadd1[i].types[0] == 'administrative_area_level_1')
            {
              this.addressForm.controls['state'].setValue(this.autoadd1[i].long_name)
              this.state_disable = true
            }
            else if(this.autoadd1[i].types[0] == 'sublocality_level_1')
            {
              this.addressForm.controls['locality'].setValue(this.autoadd1[i].long_name)
              this.locality_disable = true
            }
            else if(this.autoadd1[i].types[0] == 'sublocality_level_2')
            {
              this.addressForm.controls['landmark'].setValue(this.autoadd1[i].long_name);
              this.landmark_disable = true;
            }
            else if(this.autoadd1[i].types[0] ==  'postal_code')
            {
              this.addressForm.controls['area'].setValue(this.autoadd1[i].long_name);
              this.area_disable = true
            }
          }
         // this.autoaddress = autoadd.long_name.join(',')
        //  console.log(this.autoaddress)
        //  var final_result = this.autoaddress.join(',')
        //   console.log(final_result)
        //   console.log(this.autoaddress)
          
          
    });
  }

  goToFieldTwelve()
  {
      
    this.lat1 = localStorage.getItem('lat_report')                                 
    this.longi1 = localStorage.getItem('longi_report') 
    this.address1 = localStorage.getItem('address_report') 
                                        let navigationExtras: NavigationExtras = {
                                          state: {
                                                      
                                                      area:this.addressForm.value.area,
                                                      locality:this.addressForm.value.locality,
                                                      landmark:this.addressForm.value.landmark,
                                                      city:this.addressForm.value.city,
                                                      state:this.addressForm.value.state,
                                                      country:this.addressForm.value.country,
                                                      lat : this.lat1,
                                                      longi: this.longi1,
                                                      address : this.address1
                                                      
                                    
                                                }
                                          };
                                          

            this.router.navigate(['/reportfiledtwelve'],navigationExtras);    
  }
  
  getlatlong() {
    localStorage.setItem('area',this.addressForm.value.area)
    localStorage.setItem('city',this.addressForm.value.city)
    localStorage.setItem('country',this.addressForm.value.country)
    localStorage.setItem('locality',this.addressForm.value.locality)
    localStorage.setItem('landmark',this.addressForm.value.landmark)
    localStorage.setItem('state',this.addressForm.value.state)
    // console.log(this.locality);  
    // console.log(this.landmark);
    // console.log(this.city);
    // console.log(this.state);
    // console.log(this.country);
   
    
      this.address2 = this.addressForm.value.area +','+ this.addressForm.value.locality +','+ this.addressForm.value.landmark +','+ this.addressForm.value.city +','+ this.addressForm.value.state +','+ this.addressForm.value.country
      console.log(this.address)
      var geocoder = new google.maps.Geocoder();
                                    var city,hascity,address = this.address2
                                    geocoder.geocode({ 'address': address }, function (results, status) {
                                    if (status == google.maps.GeocoderStatus.OK)
                                    {
                                      console.log(results)
                                      this.address = JSON.stringify(results[0].formatted_address);
                                      this.lat= JSON.stringify(results[0].geometry.location.lat());
                                      this.longi = JSON.stringify(results[0].geometry.location.lng()); 
                                      
                                      //this.locations = new google.maps.LatLng(this.lat, this.longi);
                                      
                                      console.log(this.lat)
                                      console.log(this.longi)       
                                      console.log(this.address);
                                      localStorage.setItem('lat_report',this.lat)                                 
                                      localStorage.setItem('longi_report',this.longi) 
                                      localStorage.setItem('address_report',this.address)                                 
                                  }
                                });

                                          

    // this.navController.navigateForward(`/reportfiledten`);
}
}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators ,FormControl,ReactiveFormsModule} from '@angular/forms';
declare var google: any;
@Component({
  selector: 'app-safteytipone',
  templateUrl: './safteytipone.page.html',
  styleUrls: ['./safteytipone.page.scss'],
})
export class SafteytiponePage implements OnInit {
  locality:string
  landmark:string
  city:string
  state:string
  country:string
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
  constructor(private navController: NavController, private router: Router, public formBuilder: FormBuilder) {

    this.safetyForm = formBuilder.group({
      locality: ['', Validators.required],
      landmark: ['', Validators.required],
      suburb: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
      
    });

   }

  ngOnInit() {
  }

  ionViewDidEnter()
  {
    this.initAutocomplete()
  }
  
   getlatlong() {
    
    this.address2 = this.safetyForm.value.locality +','+ this.safetyForm.value.landmark +','+ this.safetyForm.value.suburb +','+ this.safetyForm.value.city +','+ this.safetyForm.value.state +','+ this.safetyForm.value.country
      console.log(this.address2)
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
                                             localStorage.setItem('lat_safety',this.lat)                                 
                                             localStorage.setItem('longi_safety',this.longi) 
                                             localStorage.setItem('address_safety',this.address)                                 
                                          }
                                        });

                                          
    // this.lat1 = localStorage.getItem('lat_safety')                                 
    // this.longi1 = localStorage.getItem('longi_safety') 
    // this.address1 = localStorage.getItem('address_safety') 
    

    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     locality:this.locality,
    //     landmark:this.landmark,
    //     city:this.city,
    //     state:this.state,
    //     country:this.country,
    //     lat : this.lat1,
    //     longi : this.longi1,
    //     address: this.address1
                  

    //         }
    //   };

    //         this.router.navigate(['/safteytiptwo'],navigationExtras);

// this.navController.navigateForward(`/safteytiptwo`);
  }


  safetytip()
  {

    if (!this.safetyForm.valid) {
    }
    else {
    this.lat1 = localStorage.getItem('lat_safety')                                 
    this.longi1 = localStorage.getItem('longi_safety') 
    this.address1 = localStorage.getItem('address_safety') 
    

    let navigationExtras: NavigationExtras = {
      state: {
        locality:this.safetyForm.value.locality,
        landmark:this.safetyForm.value.landmark,
        city:this.safetyForm.value.city,
        state:this.safetyForm.value.state,
        country:this.safetyForm.value.country,
        lat : this.lat1,
        longi : this.longi1,
        address: this.address1
                  

            }
      };
        console.log(navigationExtras)
            this.router.navigate(['/safteytiptwo'],navigationExtras);
    }
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
          console.log(this.safetyForm.value.locality)
          
          var  autoadd = this.autocomplete.getPlace();
           this.autoadd1 = autoadd.address_components;
          console.log(this.autoadd1)
          for(var i = 0 ; i < this.autoadd1.length ; i++)
          {
            //this.autoaddress.push(this.autoadd1[i].long_name)
            
            if(this.autoadd1[i].types[0] == 'country')
            {
              this.safetyForm.controls['country'].setValue(this.autoadd1[i].long_name)
              this.country_disable = true
            }
            else if(this.autoadd1[i].types[0] == 'locality')
            {
              this.safetyForm.controls['city'].setValue(this.autoadd1[i].long_name)
              this.city_disable = true
            }
            else if(this.autoadd1[i].types[0] == 'administrative_area_level_1')
            {
              this.safetyForm.controls['state'].setValue(this.autoadd1[i].long_name)
              this.state_disable = true
            }
            else if(this.autoadd1[i].types[0] == 'sublocality_level_1')
            {
              this.safetyForm.controls['locality'].setValue(this.autoadd1[i].long_name)
              this.locality_disable = true
            }
            else if(this.autoadd1[i].types[0] == 'sublocality_level_2')
            {
              this.safetyForm.controls['landmark'].setValue(this.autoadd1[i].long_name);
              this.landmark_disable = true;
            }
            else if(this.autoadd1[i].types[0] ==  'postal_code')
            {
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

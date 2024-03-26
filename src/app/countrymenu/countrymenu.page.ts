import { Component, OnInit ,NgZone} from '@angular/core';
import { SharedService } from '../shared.service'
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PopoverController } from '@ionic/angular';
import { CountrymenupopoverPage } from '../countrymenupopover/countrymenupopover.page'
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-countrymenu',
  templateUrl: './countrymenu.page.html',
  styleUrls: ['./countrymenu.page.scss'],
})
export class CountrymenuPage implements OnInit {
  countryList
  public form: FormGroup;
  city_list
  city
  countryId
  selected_city
  selected_city_name
  city_arr
  selected_country; country;
  cityArray
  country_selct_flag = false;
  searchTerm
  hide_city = false
  hide_city_search = false
  hide_city_search_back = false
  city_name;
  showCountrylist;
  tempArr;
  countryName
  countrySelectedFlag = false;
  isItemAvailable
  temp_country: any;
  constructor(private sharedservice: SharedService,public zone:NgZone, public popoverCtrl: PopoverController, public translate: TranslateService, public formBuilder: FormBuilder, public alertController: AlertController) {

    console.log(this.city)
    console.log(this.countryId)
    // this.form = formBuilder.group({
    //   'country': [this.country]
    // });

    this.getcountryList()
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.city = localStorage.getItem('City_id')
    //   this.countryId = localStorage.getItem('Country_id')

    // }, 1000);
    // this.selected_country = localStorage.getItem('Country_id')
    // this.searchTerm = localStorage.getItem('City_name')
    // this.city_name = localStorage.getItem('City_name');
    // this.countryName=localStorage.getItem('countryName')
    // this.temp_country = this.countryName
  }

  ionViewWillEnter(){
    this.zone.run(()=>{
      this.city = localStorage.getItem('City_id')
      this.countryId = localStorage.getItem('Country_id')
      this.selected_country = localStorage.getItem('Country_id')
      this.searchTerm = localStorage.getItem('City_name')
      this.city_name = localStorage.getItem('City_name');
      this.countryName = localStorage.getItem('countryName')
      this.temp_country = this.countryName
    })
  }


  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: CountrymenupopoverPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: false,
      componentProps: { 'countryList': this.countryList }
    });
    return await popover.present();
  }



  getCityByCountry(value, id) {
    let data = new FormData();
    data.append('security_key', 'b0e886281185cfc68a2c119f04c5b7b105f632dd');
    data.append('country_id', id);
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('user/getCities', data).subscribe((rdata: any) => {
      console.log(rdata);
      this.city_list = rdata['data']
      if (value == '2') {
        //this.form.controls['city'].setValue(this.city)
      }
      else {
        // this.form.controls['city'].setValue('')
      }

    }, error => {
      this.sharedservice.loaderDismiss()
    }, () => {
      this.sharedservice.loaderDismiss()
    });
  }
  //********************************Getting Country List for select Country**************************
  getcountryList() {
    let data = new FormData();
    data.append('security_key', '2be6704a76b7a502e2e56dd371228f2ad1d8afcc');
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('common_controller/countryList', data).subscribe((rdata: any) => {
      console.log(rdata);
      this.countryList = rdata['data']
      this.tempArr=this.countryList;
      console.log(this.countryList)
      this.ionViewDidLoad()

      //this.getCityByCountry('2',this.country)     

    }, error => {
      this.sharedservice.loaderDismiss()
    }, () => {
      this.sharedservice.loaderDismiss()
    });
  }
  ionViewDidLoad() {
    this.countryId = localStorage.getItem('Country_id')
    console.log('view loaded  ', this.countryId);

  }
  // getCountry(e) {
  //   console.log(e.detail.value)
  //   this.country_selct_flag = true
  //   this.selected_country = e.detail.value;
  //   this.hide_city = true
  //   if (e.detail.value != "") {
  //     // this.getCityByCountry('1',this.selected_country)     
  //   }
  // }
  getCountry(ev) {
     
    if(this.temp_country == ev.target.value.trim()){

    }else{
     this.showCountrylist=true;
     const val = ev.target.value;
    this.countryList=this.tempArr;
    this.countrySelectedFlag=false;
    this.hide_city_search = false
    this.hide_city_search_back = true
    this.city = ''
    this.city_name =''
    this.searchTerm=''
     
    
    if (val && val.trim() !== '') {
        this.isItemAvailable = true;
         this.countryList = this.countryList.filter((item) => {
          console.log(item);
         return (item.country_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    } else {
        this.isItemAvailable = false;
        this.countryList=this.tempArr
    }
    }
    
 }
 selectedLocation(item) {
  console.log(item)
  this.countryName = item.country_name;
  localStorage.setItem('ngo_id',item.ngo_id)
  this.isItemAvailable = false;
  this.showCountrylist=false;
  this.countrySelectedFlag=true;
  this.temp_country = item.country_name
  // this.hide_Country_search_back = true
  //localStorage.setItem('countryName',this.countryName)
 console.log( item.country_id)
    this.countryId = item.country_id
    localStorage.setItem('tempcountry_id',item.country_id)
  // this.city_name = item.name
  // this.buttondisable = false;
  // localStorage.setItem('City_id', this.city)
  //localStorage.setItem('Country_id', this.countryId)
  // localStorage.setItem('City_name', this.city_name)
  
       // Reset items back to all of the items
       

    
   
}
  getCity(e1): boolean {
    console.log(this.selected_country)
    console.log(localStorage.getItem('tempcountry_id'))
     this.country;
    if(localStorage.getItem('tempcountry_id')==null || localStorage.getItem('tempcountry_id')==="null"){
     this. country=this.selected_country;
    }else{
     this.country=localStorage.getItem('tempcountry_id');
    }
    console.log(this.country, ' country passed to the api');
    
    if (this.searchTerm.length == 0) {
      this.hide_city_search = false
      return false
    }
    console.log(this.searchTerm)
    if (localStorage.getItem('City_name') == this.searchTerm) {
      this.hide_city_search = false;
    }
    else {
      if (this.searchTerm.length >= 2) {
        if (this.hide_city_search_back == true) {
          let data = new FormData();
          console.log(this.countryId)
          data.append('query', this.searchTerm);
          data.append('country_id', this.country);

          this.sharedservice.sharedPostRequest_webappurl('get-cities-autocomplete', data).subscribe((rdata: any) => {
            console.log(rdata);
            this.hide_city_search = true
            this.hide_city_search_back = false
            this.city_list = rdata['data']
            if (this.city_list.length == 0) {
              this.hide_city_search = false
            }

          }, error => {
            //  this.sharedservice.loaderDismiss()
          }, () => {
            // this.sharedservice.loaderDismiss()
          });

          console.log(this.searchTerm.length)

        }
        else if (this.searchTerm.length >= 2) {

          let data = new FormData();
          data.append('query', this.searchTerm);
          data.append('country_id', this.country);
          //  this.sharedservice.presentLoadingDefault()
          this.sharedservice.sharedPostRequest_webappurl('get-cities-autocomplete', data).subscribe((rdata: any) => {
            console.log(rdata);
            this.hide_city_search = true
            this.hide_city_search_back = false
            this.city_list = rdata['data']
            if (this.city_list.length == 0) {
              this.hide_city_search = false
            }

          }, error => {
            //  this.sharedservice.loaderDismiss()
          }, () => {
            // this.sharedservice.loaderDismiss()
          });

          console.log(this.searchTerm.length)

          // }
        }
        else {
          this.hide_city_search = false
        }
      }
    }

  }

  selectedcity(item) {
    console.log(item)
    this.searchTerm = item.name;
    this.hide_city_search = false
    this.hide_city_search_back = true
    this.city = item.id
    this.city_name = item.name
    // localStorage.setItem('ngo_id',item.ngo_id)
    localStorage.setItem('City_id', this.city)
    localStorage.setItem('Country_id', this.country)
    localStorage.setItem('City_name', this.city_name);
    localStorage.setItem('city_latitude',item.latitude);
    localStorage.setItem('city_longitude',item.longitude);
    localStorage.setItem('countryName',this.countryName)

    var geocoder = new google.maps.Geocoder();
    var city, hascity, address = localStorage.getItem('City_name') + ' , ' + localStorage.getItem('countryName')
    
    geocoder.geocode({ 'address': address }, results => {
      console.log(results)
      if (results[0].formatted_address) {
        console.log(results)

        var lat = JSON.stringify(results[0].geometry.location.lat());
        var longi = JSON.stringify(results[0].geometry.location.lng());

        localStorage.setItem('map_lat', lat)
        localStorage.setItem('map_longi', longi)
        
      }

    });

  }

  async presentAlert() {

    var message
    var btn_msg
    this.translate.get('country_first').subscribe((res: string) => {

      message = res;
    })

    this.translate.get('done').subscribe((res: string) => {

      btn_msg = res;
    })



    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: message,
      mode: 'ios',
      buttons: [{
        text: btn_msg,
        handler: (alertData) => { //takes the data 
          console.log('in')

        }
      }]
    });

    await alert.present();
  }

}

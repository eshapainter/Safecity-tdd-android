import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationExtras } from '@angular/router';
import { NavController, ToastController, Platform } from '@ionic/angular';
import { SharedService } from '../shared.service';
import {TranslateService} from '@ngx-translate/core'
declare var google: any;
@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/common_controller/';
  apiUrl1 = 'http://101.53.143.7/~dataduck/safecity/api/user/';

  langaugeId: any;
  countryList: any;
  countryId
  showCity = false;
  cityList: any;
  cityId = '';
  orgzationList: any;
  status: any;
  buttondisable = true;
  cityArray = []
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  subscription: any;
  countryName: any;
  searchTerm: any;
  countrySelectedFlag;
  showCountrylist;
  hide_city = false
  hide_city_search = false
  hide_city_search_back = false;
  isItemAvailable
  city;
  city_name
  tempArr=[]
  constructor(public httpClient: HttpClient,
    private route: ActivatedRoute, private sharedservice: SharedService,public translate:TranslateService,
    public navController: NavController, private toastctrl: ToastController, public router: ActivatedRoute, private platform: Platform) {

    this.route.queryParams.subscribe(params => {
      this.langaugeId = params["id"];
      console.log("id", this.langaugeId)
    });
    //this.closeApp()
  }

  ngOnInit() {
    this.getcountryList();
  }
  getCountry(ev) {
     
     if(localStorage.getItem('countryName')==ev.target.value.trim()){

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
     this.buttondisable = true;
     
     if (val && val.trim() !== '') {
         this.isItemAvailable = true;
          this.countryList = this.countryList.filter((item) => {
           console.log(this.countryList);
          return (item.country_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
         })
     } else {
         this.isItemAvailable = false;
         this.countryList=this.tempArr
     }
     }
     
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
        navigator['app'].exitApp();
      }
      else {
        this.searchTerm = '';
        this.countryName = '';
        this.cityList = []
        var btn_msg = ''
      this.translate.get('press_back_again_to_exit').subscribe((res: string) => {

        btn_msg = res;
      })
       // var msg = "Press back again to exit."
        this.presentToast(btn_msg)
        this.lastTimeBackPress = new Date().getTime();
      }

    });
  }
  selectedLocation(item) {
    console.log(item)
    this.countryName = item.country_name;
    this.isItemAvailable = false;
    this.showCountrylist=false;
    this.countrySelectedFlag=true;
    localStorage.setItem('ngo_id',item.ngo_id)
    // this.hide_Country_search_back = true
    localStorage.setItem('countryName',this.countryName)
   
      this.countryId = item.country_id
    // this.city_name = item.name
    // this.buttondisable = false;
    // localStorage.setItem('City_id', this.city)
    // localStorage.setItem('Country_id', this.countryId)
    // localStorage.setItem('City_name', this.city_name)
    
         // Reset items back to all of the items
         

      
     
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }



  async presentToast(msg) {
    const toast = await this.toastctrl.create({
      message: msg,
      cssClass: 'tostclass',
      duration: 2000
    });
    toast.present();
  }

  getCity(e1): boolean {
   if (this.searchTerm.length == 0) {
      this.hide_city_search = false
      return false
    }
    if (localStorage.getItem('City_name') == this.searchTerm) {
      this.hide_city_search = false;
    }
    else {
      this.buttondisable = true;
      if (this.searchTerm.length >= 2) {
        if (this.hide_city_search_back == true) {
          let data = new FormData();
          data.append('query', this.searchTerm);
          data.append('country_id', this.countryId);

          this.sharedservice.sharedPostRequest_webappurl('get-cities-autocomplete', data).subscribe((rdata: any) => {
            console.log(rdata);
            this.hide_city_search = true
            this.hide_city_search_back = false
            this.cityList = rdata['data']
            if (this.cityList.length == 0) {
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
          data.append('country_id', this.countryId);
          //  this.sharedservice.presentLoadingDefault()
          this.sharedservice.sharedPostRequest_webappurl('get-cities-autocomplete', data).subscribe((rdata: any) => {
            console.log(rdata);
            this.hide_city_search = true
            this.hide_city_search_back = false
            this.cityList = rdata['data']
            if (this.cityList.length == 0) {
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
    this.buttondisable = false;
    // localStorage.setItem('ngo_id',item.ngo_id)
    localStorage.setItem('City_id', this.city)
    localStorage.setItem('Country_id', this.countryId)
    localStorage.setItem('City_name', this.city_name)
    localStorage.setItem('city_latitude',item.latitude);
    localStorage.setItem('city_longitude',item.longitude);
    localStorage.setItem('countryName',this.countryName)
  }
  // getCity(e)
  // {
  //     this.cityId = e.detail.value
  //     console.log(this.cityId)
  //     this.cityArray=this.cityId.split(',')
  //     console.log(this.cityArray)
  //     localStorage.setItem('City_id',this.cityArray[0])
  //     localStorage.setItem('City_name',this.cityArray[1])
  //     if(this.countryId != "" && this.cityArray[0] != "")
  //     {
  //       this.buttondisable = false;
  //     }
  //     else 
  //     {
  //       this.buttondisable = true;
  //     }
  // }

  getCityByCountry() {
    let data = new FormData();
    data.append('security_key', 'b0e886281185cfc68a2c119f04c5b7b105f632dd');
    data.append('country_id', this.countryId);
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('user/getCities', data).subscribe((rdata: any) => {
      console.log(rdata);
      this.cityList = rdata.data;

    }, error => {
      this.sharedservice.loaderDismiss()
    }, () => {
      this.sharedservice.loaderDismiss()
    });

    // this.httpClient.post(this.apiUrl1 + 'getCities', data)
    //   .subscribe((rdata: any) => {
    //     console.log(rdata);
    //     this.cityList = rdata.data;
    //   }, error => {
    //   });
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
      this.countryList = rdata.data;
      this.tempArr=this.countryList;
    }, error => {
      this.sharedservice.loaderDismiss()
    }, () => {
      this.sharedservice.loaderDismiss()
    });



    // this.httpClient.post(this.apiUrl + 'countryList', data)
    //   .subscribe((rdata: any) => {
    //     console.log(rdata);
    //     this.countryList = rdata.data;
    //   }, error => {
    //   });
  }


  organizationList() {
    let data = new FormData();
    data.append('security_key', 'b571bb06f3e196ce95f08c70324b9dd5b2d334c5');
    data.append('country_id', this.countryId);
    data.append('city_id', localStorage.getItem('City_id'));

    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('user/getOrganisations', data).subscribe((rdata: any) => {
      console.log(rdata);
      this.orgzationList = rdata.data;
      this.status = rdata.status
      if (this.status == false) {
        localStorage.setItem('Client_id', '1')
      
        // if(localStorage.getItem('ngo_id') == '0')
        // {
              let navigationExtras: NavigationExtras = {
          queryParams: {
            countryId: this.countryId,
            cityId: localStorage.getItem('City_id'),

          }
        };

        this.navController.navigateForward([`languageselection`], navigationExtras);
        // }
        // else
        // { 
        //   let navigationExtras: NavigationExtras = {
        //     queryParams: {
        //       countryId: this.countryId,
        //       cityId: localStorage.getItem('City_id'),
  
        //     }
        //   };
  
        //   this.navController.navigateForward([`ngopartner`], navigationExtras);
        // }
       

      
      }
      else {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            countryId: this.countryId,
            cityId: localStorage.getItem('City_id'),
            orgdata: rdata
          }
        };
        this.navController.navigateForward([`organization`], navigationExtras);
      }
    }, error => {
      this.sharedservice.loaderDismiss()
    }, () => {
      this.sharedservice.loaderDismiss()
    });


    // this.httpClient.post(this.apiUrl1 + 'getOrganisations', data)
    //   .subscribe((rdata: any) => {
    //     console.log(rdata);
    //     this.orgzationList = rdata.data;
    //     this.status = rdata.status
    //     if (this.status == false) {
    //       localStorage.setItem('Client_id','1')
    //       let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //           countryId: this.countryId,
    //           cityId: this.cityArray[0],

    //         }
    //       };

    //       this.navController.navigateForward([`languageselection`], navigationExtras);
    //     }
    //     else {
    //       let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //           countryId: this.countryId,
    //           cityId: this.cityArray[0],
    //           orgdata:rdata
    //         }
    //       };
    //       this.navController.navigateForward([`organization`], navigationExtras);
    //     }

    //   }, error => {
    //   });
  }

  //********************************Pass id of country and language to onboarding One Page**************************
  goToNext() {
    console.log("country id", this.countryId);
    console.log("cityid", localStorage.getItem('City_id'));
        
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


    this.organizationList()
  }



}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {SharedService} from '../shared.service'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-safteytipfour',
  templateUrl: './safteytipfour.page.html',
  styleUrls: ['./safteytipfour.page.scss'],
})
export class SafteytipfourPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/safecity_report/';
  locality:string
  landmark:string
  city:string
  state:string
  country:string
  sefety_tip:string
  safety_tip_title:string
  user_id
  buttondisable = true;
  constructor(private navController: NavController,public translate: TranslateService,public sharedservice:SharedService, private router: Router,private route: ActivatedRoute,public httpClient: HttpClient,) {
    this.user_id = localStorage.getItem('userId');
    this.route.queryParams.subscribe(params => {
      this.locality = params["locality"];
      this.landmark = params["landmark"];
      this.city = params["city"];
      this.state = params["state"];
      this.country = params["country"];
      this.sefety_tip = params["sefety_tip"];
      console.log("locality",this.locality)
      console.log("landmark",this.landmark)
      console.log("city",this.city)
      console.log("state",this.state)
      console.log("country",this.country)
     
     
    });
   }

  ngOnInit() {
  }
  
  thank() 
  {

    if(this.safety_tip_title)
    {
    let client_id = localStorage.getItem('Client_id');
    let country_id = localStorage.getItem('Country_id');
    let lang_id = localStorage.getItem('Lang_id');
    let lat = localStorage.getItem('lat_safety');
    let long = localStorage.getItem('longi_safety');
    let extlcn = localStorage.getItem('address_safety');
    console.log("safetyTiptitle",this.safety_tip_title)
    console.log("safetydiscription",this.sefety_tip)

    let data = new FormData();
    data.append('security_key','d659f8e1043f236a54e442f6b17661e95c2eecb4');
    data.append('user_id',this.user_id);
    data.append('country_id',country_id);
    data.append('language_id',lang_id);
    data.append('client_id',client_id);
    data.append('identification','Mobile');
    data.append('is_mobile_visibile','1');
    data.append('location',this.locality);
    data.append('landmark',this.landmark);
    data.append('city',this.city);
    data.append('state',this.state);
    data.append('country',this.country);
    data.append('map_lat',lat);
    data.append('map_lon',long);
    data.append('exact_location',extlcn);
    data.append('safety_tip_desc',this.sefety_tip);
    data.append('safety_tip_title',this.safety_tip_title);




    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('safecity_report/writeSafetyTips',data).subscribe((rdata: any) => {
      console.log(rdata);
      this.navController.navigateForward(`safteytip-thankyou`);
    //   this.list = rdata.data;
    //  this.content = this.sanitizer.bypassSecurityTrustHtml(rdata.data[0].content);
    //   this.title =  rdata.title
    //   console.log("list ",this.list)
     }, error => {
       this.sharedservice.loaderDismiss()
    },
    ()=>{
      this.sharedservice.loaderDismiss()
    });

  }

    // this.httpClient.post(this.apiUrl+'writeSafetyTips',data)
    // .subscribe((rdata: any) => {
    //   console.log(rdata);
    //   // this.countryList = rdata.data;
    // },error => {
    // });

    
          


  }

  getdata(e)
  {
    console.log('e',e)
    
    if(e.detail.value)
    {
      
      this.buttondisable = false;
    }
    else
    {
      this.buttondisable = true;
    }
    
  }

}

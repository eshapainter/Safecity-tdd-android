import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, NavController } from '@ionic/angular';
import { Router,NavigationExtras, ActivatedRoute} from '@angular/router';
import { SharedService } from '../shared.service'
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-ngopartner',
  templateUrl: './ngopartner.page.html',
  styleUrls: ['./ngopartner.page.scss'],
})
export class NgopartnerPage implements OnInit {
  countryId
  cityId
  orgId: any;
  ngodetails = []
  constructor(public httpClient: HttpClient, 
    public loadingCtrl:LoadingController,
    private router: Router,private sharedservice: SharedService,
    public navController:NavController,
    public loadingController: LoadingController,
    public route:ActivatedRoute,public translate:TranslateService) 
    {
      this.route.queryParams.subscribe(params => {
        this.countryId = params["countryId"];
        this.cityId = params["cityId"];
        this.orgId = params["orgId"];
        
       console.log("con",this.countryId)
       console.log("city",this.cityId)
       console.log("org",this.orgId)
       
    });

    this.ngoDetails()
    }

  ngOnInit() {
  }

  ngoDetails()
  {
    let data = new FormData();
    // data.append('security_key', 'b571bb06f3e196ce95f08c70324b9dd5b2d334c5');
    data.append('ngo_id', localStorage.getItem('ngo_id'));
    

    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('ngo/getNgoDetails',data).subscribe((rdata: any) => {
      console.log(rdata);
      console.log(rdata);
      this.ngodetails = rdata.data
      // for(var i=0;i< this.ngodetails.length;i++)
      // {
      //   this.ngodetails[i].logo_name = 'http://139.59.76.55/assets/' + this.ngodetails[i].logo
      // }
      console.log(this.ngodetails)
          // this.orgzationList = rdata.data;
         
     }, error => {
       this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });

  }

  proceed()
  {
    this.navController.navigateForward(`/preframingtwo`);
  }

  

}

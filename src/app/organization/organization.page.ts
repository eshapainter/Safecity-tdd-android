import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";
import { Router,NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {SharedService} from '../shared.service'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage implements OnInit {
  apiUrl ='http://101.53.143.7/~dataduck/safecity/api/user/';
  countryId
  cityId
  showOrgList = false;
  status: any;
  orgzationList: any;
  orgId = '';
  passcode = '';
  orgList: any;
  buttondisable =true
  constructor(public httpClient:HttpClient,public translate: TranslateService,private sharedservice : SharedService, private router: Router,public navController:NavController,public route:ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        this.countryId = params["countryId"];
        this.cityId = params["cityId"];
        this.orgList = params["orgdata"];
       console.log("id",this.countryId)
       console.log("id",this.cityId)
       console.log("id",this.orgList)
    });
     }

  ngOnInit(){

  }
   organizationList() {
    let data = new FormData();
    data.append('security_key', 'b571bb06f3e196ce95f08c70324b9dd5b2d334c5');
    data.append('country_id', this.countryId);
    data.append('city_id', this.cityId);

    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('user/getOrganisations',data).subscribe((rdata: any) => {
      console.log(rdata);
      console.log(rdata);
          this.orgzationList = rdata.data;
         
     }, error => {
       this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });

    // this.httpClient.post(this.apiUrl + 'getOrganisations', data)
    //   .subscribe((rdata: any) => {
    //     console.log(rdata);
    //     this.orgzationList = rdata.data;
       
    //   }, error => {
    //   });
  }

  selectVlaue(e)
  {
      this.status = e.detail.value
      console.log("status",this.status)
      if(this.status == 'yes')
      {
        this.organizationList()
          this.showOrgList = true;
        }
      else
      {
        localStorage.setItem('Client_id','1')
        this.showOrgList = false;
        this.buttondisable = false;
      }
  }
  selectOrg(e)
  {
    console.log(e)
    this.orgId = e.detail.value
  
    console.log('pass',this.orgId)
    if(this.orgId != '')
    {
      this.buttondisable = false;
    }
    else{
      this.buttondisable = true;
    }
  }

  verfication() 
  {
    console.log("orgId",this.orgId)
    console.log("passcode",this.passcode)
    
    if(this.status == 'yes')
    {
      let navigationExtras: NavigationExtras = {
        queryParams: {
           countryId:this.countryId,
           cityId:this.cityId,
           orgId:this.orgId,
          //  vrfcn_code:
          }
      };
      this.navController.navigateRoot([`/verfication`],navigationExtras);
    }
    else
    {



      // if(localStorage.getItem('ngo_id') == '0')
      // {
              let navigationExtras: NavigationExtras = {
        queryParams: {
           countryId:this.countryId,
           cityId:this.cityId,
          }
        };
        this.navController.navigateRoot([`/languageselection`],navigationExtras);
      // }
      // else
      // { 
      
      //   let navigationExtras: NavigationExtras = {
      //     queryParams: {
      //       countryId:this.countryId,
      //       cityId:this.cityId,
  
      //     }
      //   };
  
      //   this.navController.navigateForward([`ngopartner`], navigationExtras);
      // }
    
      

      
      
     
    }
    
  }

}

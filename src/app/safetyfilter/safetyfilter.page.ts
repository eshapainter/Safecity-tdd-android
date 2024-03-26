import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras} from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service'
@Component({
  selector: 'app-safetyfilter',
  templateUrl: './safetyfilter.page.html',
  styleUrls: ['./safetyfilter.page.scss'],
})

export class SafetyfilterPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity_webapp/api/';
address = '';
pagename = 'safetyFilterPage'
buttondisable = true
safetyFrom 
SafetyTipList: any;
  constructor(public httpClient:HttpClient,public navController: NavController,public sharedservice:SharedService) 
  {
      this.safetyFrom = this.sharedservice.getsafetyfiltersdata()
      console.log(this.safetyFrom)
  }

  ngOnInit() 
  {

  }

deselect()
{
this.safetyFrom = ''; 
}

dismiss() {
  let navigationExtras: NavigationExtras = {
    queryParams: {
      segmentModel: 'two',
      pagename: this.pagename

    }
  };
  this.navController.navigateForward([`modelreport`], navigationExtras);
}

getValue(e)
{
  console.log(e)
  this.buttondisable = false;
  this.safetyFrom = e.detail.value;
}

  // filterSafetyTip() {
  //   console.log(this.safetyFrom)
  //   let data = new FormData();
  //   data.append('lang_id','1');
  //   data.append('client_id','1');
  //   // data.append('area',this.address);
  //   data.append('city','mumbai');
  //   data.append('reported_on',this.safetyFrom);
  
  //   // let loader = this.loadingCtrl.create({
  //   //   });  
  //   // loader.present();
  //   this.httpClient.post(this.apiUrl+'get-safety-tips',data)
  //     .subscribe((rdata: any) => {
  //       if(rdata != '')
  //       {
  //         console.log(rdata)
  //         this.SafetyTipList = rdata
  //         this.SafetyTipList = JSON.stringify(this.SafetyTipList)
  //         this.goToSafetyTipViewPage(this.SafetyTipList);
  //       }
  //      }, error => {
  //     });
  // }
  goToSafetyTipViewPage()
  {

    this.sharedservice.setsafetyfiltersdata(this.safetyFrom)
    let navigationExtras: NavigationExtras = {
      queryParams: 
      {
        safetyFrom:this.safetyFrom,
        pagename:this.pagename,
        segmentModel:'two',
      }
      };
      this.navController.navigateForward([`modelreport`],navigationExtras);
  }

   
 
}

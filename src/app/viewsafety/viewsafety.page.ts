import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, Platform } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {SharedService} from '../shared.service';
@Component({
  selector: 'app-viewsafety',
  templateUrl: './viewsafety.page.html',
  styleUrls: ['./viewsafety.page.scss'],
})
export class ViewsafetyPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/safecity_report/';
  address
  pagename
  SaftyTipList: any;
  showList = false
  showAllList = false
  SaftyTipSearchList: any;
  constructor(public platform:Platform,private sharedservice : SharedService,public toastController: ToastController,private navController: NavController, private router: Router, public httpClient: HttpClient, private route: ActivatedRoute) {
    // this.platform.registerBackButtonAction(this.backButtonAction.bind(this), 500);
    this.route.queryParams.subscribe(params => {
     this.address = params["address"];
      this.pagename = params["pagename"];
      
      this.callFirst()
      
      console.log("address", this.address);
      console.log("pronoun", this.pagename);
    })
   }

  ngOnInit() {
    
  }

  callFirst()
  {
    if (this.pagename == 'safetyFilterPage') {
      this.showList = true
      this.showAllList = false
      console.log('pagein')
      this.getFilteredSafetyList()
    }
    else if(this.pagename == undefined) {
      this.showList = false
      this.showAllList = true
      console.log('pageout')
      this.getAllSafetyTipList()
    }
  }

getAllSafetyTipList() {
    let data = new FormData();
    data.append('security_key', 'c86c38648cf225ad895f634c3dc922d09e1ca27a');
    
    
    this.sharedservice.sharedPostRequest('safecity_report/getAllSafetyTips',data).subscribe((rdata: any) => {
          console.log(rdata);
        this.SaftyTipList = rdata.data;
        console.log(this.SaftyTipList);
     }, error => {
      
    },()=>{
      
    });


    // this.httpClient.post(this.apiUrl + 'getAllSafetyTips', data)
    //   .subscribe((rdata: any) => {
    //     console.log(rdata);
    //     this.SaftyTipList = rdata.data;
    //     console.log(this.SaftyTipList);

    //   }, error => {
    //   });
  }

  getFilteredSafetyList() {
    let data = new FormData();
    data.append('security_key', '5c93e42352c3f75b5eb7d0b0441bb79612aa4004');
    data.append('inc_loc', this.address);
    

    
    this.sharedservice.sharedPostRequest('safecity_report/searchSafetyTips',data).subscribe((rdata: any) => {
              console.log(rdata);
        this.SaftyTipSearchList = rdata.data;
        if(this.SaftyTipSearchList == '')
        {
          this.showList = false
           this.showAllList = true
           this.presentToast()
          console.log('pageout')
          this.getAllSafetyTipList()
        }
        console.log(this.SaftyTipList);

 }, error => {
  
},()=>{
  
});

    // this.httpClient.post(this.apiUrl + 'searchSafetyTips', data)
    //   .subscribe((rdata: any) => {
    //     console.log(rdata);
    //     this.SaftyTipSearchList = rdata.data;
    //     if(this.SaftyTipSearchList == '')
    //     {
    //       this.showList = false
    //        this.showAllList = true
    //        this.presentToast()
    //       console.log('pageout')
    //       this.getAllSafetyTipList()
    //     }
    //     console.log(this.SaftyTipList);

    //   }, error => {
    //   });
  }

  
  safteydetail(item) {
    console.log(item);
    let navigationExtras: NavigationExtras = {
      queryParams: {
              item:item.id,
              }
      };
      this.navController.navigateForward([`viewsafteydetail`],navigationExtras);
    // this.navController.navigateForward(`/viewsafteydetail`);
  }
  
   safteyfilter() {
    this.navController.navigateForward(`/safetyfilter`);
  }

  close()
  {
    this.showList = false
    this.showAllList = true
    console.log('pageout')
    this.getAllSafetyTipList()
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Record Not Found.',
      duration: 3000
    });
    toast.present();
  }
}

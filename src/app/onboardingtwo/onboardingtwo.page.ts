import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router,NavigationExtras} from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-onboardingtwo',
  templateUrl: './onboardingtwo.page.html',
  styleUrls: ['./onboardingtwo.page.scss'],
})
export class OnboardingtwoPage implements OnInit {
  langaugeId: any;
  countryId: any;
  cityId
  orgId
  constructor(private route: ActivatedRoute,public navController:NavController) { 
      
    this.route.queryParams.subscribe(params => {
     this.langaugeId = params["langaugeId"];
      this.countryId = params["countryId"];
      this.cityId = params["cityId"];
      this.orgId = params["orgId"];

      console.log("countryId",this.countryId)
      console.log("langaugeId",this.langaugeId)
      console.log("city",this.langaugeId)
      console.log("orgid",this.langaugeId)
  });
  }

  ngOnInit() {
  }

  goToNextPage()
  {
     let navigationExtras: NavigationExtras = {
     queryParams: {
        langaugeId:this.langaugeId,
        countryId:this.countryId,
        cityId:this.cityId,
        orgId:this.orgId

       }
   };
   this.navController.navigateForward([`onboardingfour`],navigationExtras);
  }
  
   nopage() {
      this.navController.navigateForward(`/onboardingtwono`);
  }


}

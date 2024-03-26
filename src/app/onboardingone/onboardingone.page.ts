import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-onboardingone',
  templateUrl: './onboardingone.page.html',
  styleUrls: ['./onboardingone.page.scss'],
})
export class OnboardingonePage implements OnInit {
  langaugeId: any;
  countryId: any;
  cityId
  orgId
  constructor(private route: ActivatedRoute,
    public navController:NavController) { 

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

  goToNext()
   {
      console.log("country id",this.countryId);
      console.log("language id",this.langaugeId)
      let navigationExtras: NavigationExtras = {
      queryParams: 
      {
         langaugeId:this.langaugeId,
         countryId:this.countryId,
         cityId : this.cityId, 
         orgId: this.orgId
      }
    };
    this.navController.navigateForward([`onboardingtwo`],navigationExtras);

   }
   helpPage()
   {
    this.navController.navigateForward(`/help`);
   }

}

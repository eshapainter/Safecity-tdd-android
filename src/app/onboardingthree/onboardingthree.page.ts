import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras} from '@angular/router';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-onboardingthree',
  templateUrl: './onboardingthree.page.html',
  styleUrls: ['./onboardingthree.page.scss'],
})
export class OnboardingthreePage implements OnInit {
  langaugeId: any;
  countryId: any;
  constructor(private route: ActivatedRoute,public navController:NavController) {  
    
    this.route.queryParams.subscribe(params => {
    this.langaugeId = params["langaugeId"];
    this.countryId = params["countryId"];
    console.log("countryId",this.countryId)
   console.log("langaugeId",this.langaugeId)
});
}

ngOnInit() {
}

goToNext()
{
   console.log("country id",this.countryId);
   console.log("language id",this.langaugeId)
   let navigationExtras: NavigationExtras = {
   queryParams: {
      langaugeId:this.langaugeId,
      countryId:this.countryId
     }
 };
 this.navController.navigateForward([`onboardingfour`],navigationExtras);

}


}


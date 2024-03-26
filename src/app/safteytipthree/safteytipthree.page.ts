import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-safteytipthree',
  templateUrl: './safteytipthree.page.html',
  styleUrls: ['./safteytipthree.page.scss'],
})
export class SafteytipthreePage implements OnInit {
  locality:string
  landmark:string
  city:string
  state:string
  country:string
  sefety_tip:string;
  buttondisable = true;
  constructor(private navController: NavController, private router: Router,private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.locality = params["locality"];
      this.landmark = params["landmark"];
      this.city = params["city"];
      this.state = params["state"];
      this.country = params["country"];
      console.log("locality",this.locality)
      console.log("landmark",this.landmark)
      console.log("city",this.city)
      console.log("state",this.state)
      console.log("country",this.country)
     
    });
  }

  ngOnInit() {
  }
  getSafetyTip(e)
  {
    console.log('e',e)
    
    if(e.detail.value)
    {
      this.sefety_tip= e.detail.value;
      this.buttondisable = false;
    }
    else
    {
      this.buttondisable = true;
    }
    
  }
  
    gotoSafetyTipFour() {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          locality:this.locality,
          landmark:this.landmark,
          city:this.city,
          state:this.state,
          country:this.country,
          sefety_tip:this.sefety_tip
                    
  
              }
        };
            this.navController.navigateForward([`safteytipfour`],navigationExtras);
  }

}

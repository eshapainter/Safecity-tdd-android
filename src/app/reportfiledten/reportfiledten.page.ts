import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reportfiledten',
  templateUrl: './reportfiledten.page.html',
  styleUrls: ['./reportfiledten.page.scss'],
})
export class ReportfiledtenPage implements OnInit {
  anythingElse: any;
  led: any;
  forWho:any;
  age:any;
  pronoun:any;
  experience: any;
  date1: any;
  dateEstimate: string;
  time: any;
  timeFrom: any;
  timeTo: any;
  timeEstimate: string;
  timeRange: any;
  violenceType: any;
  policeRepo: any;
  buttonDisabled = true;
  constructor(private navController: NavController, private router: Router,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.forWho = params["forWho"];
      this.age = params["age"];
      this.pronoun = params["pronoun"];
      this.experience = params["experience"];
      this.date1 = params["date1"];
      this.dateEstimate = params["dateEstimate"];
      this.time = params["time"];
      this.timeEstimate = params["timeEstimate"];
      this.timeRange = params["timeRange"];
      this.violenceType = params["violenceType"];
      this.policeRepo =params["policeRepo"];
      this.led =params["led"];

                 
      console.log("for Who",this.forWho);
      console.log("Age",this.age);
      console.log("pronoun",this.pronoun);
      console.log("experience",this.experience);
      console.log("date1",this.date1);
      console.log("time",this.time);
      console.log("dateEstimate",this.dateEstimate);
      console.log("timeEstimate",this.timeEstimate);
      console.log("timeRange",this.timeRange);
      console.log("violenceType",this.violenceType);
   })
   }

  ngOnInit() {
  }
  
  anyThingelse(e)
  {
    this.buttonDisabled = false;
    this.anythingElse = e.detail.value
    console.log(this.anythingElse)
  }

   goToFieldEleven() {
     localStorage.setItem("anythingelse",this.anythingElse)

    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //               age:this.age,
    //               forWho:this.forWho,
    //               pronoun:this.pronoun,
    //               experience:this.experience,
    //               date1:this.date1,
    //               dateEstimate:this.dateEstimate,
    //               time:this.time,
    //               timeEstimate:this.timeEstimate,
    //               timeRange:this.timeRange,
    //               violenceType:this.violenceType,
    //               policeRepo:this.policeRepo,
    //               led:this.led,
    //               anythingElse:this.anythingElse

    //         }
    //   };

            this.navController.navigateForward([`reportfiledeleven`]);
     
// this.navController.navigateForward(`/reportfiledeleven`);
  }

}

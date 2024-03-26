import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reportfiledeight',
  templateUrl: './reportfiledeight.page.html',
  styleUrls: ['./reportfiledeight.page.scss'],
})
export class ReportfiledeightPage implements OnInit {
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
  otherFieldData: boolean = false;
  buttonDisabled = true;
  other =''
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

  reported(e)
  {
      this.buttonDisabled = false;
      console.log(e.detail.value)
      this.policeRepo = e.detail.value;
      console.log("policeRepo",this.policeRepo)
      localStorage.setItem("policeReport",this.policeRepo)
      if(this.policeRepo == 'I tried')
      {
        this. otherFieldData = true;
      }
  }

  goToFieldNine() {
    
    localStorage.setItem("otherData_Police",this.other)
    
    
    


        
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
    //               policeRepo:this.policeRepo 

    //         }
    //   };

            this.navController.navigateForward([`reportfilednine`]);
          // this.navController.navigateForward(`/reportfilednine`);
            }
}

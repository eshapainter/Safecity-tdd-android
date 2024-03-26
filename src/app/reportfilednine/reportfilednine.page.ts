import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reportfilednine',
  templateUrl: './reportfilednine.page.html',
  styleUrls: ['./reportfilednine.page.scss'],
})
export class ReportfiledninePage implements OnInit {
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
  RelationFieldData: boolean = false;
  buttonDisabled = true;
  ledArray: any =[];
  RelationData = '';
  otherData = '';
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
  getLed(e)
  {
    console.log(e.detail.value)
    this.led = e.detail.value;
    this.ledArray.push(this.led)
    console.log("led",this.ledArray)
    this.buttonDisabled = false;
    
    if(this.led == 'Other')
    {
      this. otherFieldData = true
    }

    if(this.led == 'Because of my relationship')
    {
      this. RelationFieldData = true
    }

   
  }
  
     goToFieldTen() {
       this.led = this.ledArray.join('|')
       localStorage.setItem('led',this.led)
       localStorage.setItem('RelationData',this.RelationData)
       localStorage.setItem('otherData',this.otherData)
      
        
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
      //               led:this.led
  
      //         }
      //   };
  
              this.navController.navigateForward([`reportfiledten`]);
  
      // this.navController.navigateForward(`/reportfiledten`);
  }

}

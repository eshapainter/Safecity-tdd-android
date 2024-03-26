import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reportfiledsix',
  templateUrl: './reportfiledsix.page.html',
  styleUrls: ['./reportfiledsix.page.scss'],
})
export class ReportfiledsixPage implements OnInit {
  forWho:any;
  age:any;
  pronoun:any;
  experience: any;
  date1: any;
  dateEstimate: string;
  time = '';
  timeFrom = '';
  timeTo = '';
  timeEstimate: string = '0'
  singleTimeDisable = false
  timeRangeDisable = false
  buttonDisabled = true;
  timeArray = [];
  timerange: number;
  pop: any;
  final_time: any;
  timeRange
  
  constructor(private navController: NavController, private router: Router,private route: ActivatedRoute) { 

    this.route.queryParams.subscribe(params => {
      this.forWho = params["forWho"];
      this.age = params["age"];
      this.pronoun = params["pronoun"];
      this.experience = params["experience"];
      this.date1 = params["date1"];
      this.dateEstimate = params["dateEstimate"];

      console.log("for Who",this.forWho);
      console.log("Age",this.age);
      console.log("pronoun",this.pronoun);
      console.log("experience",this.experience);
      console.log("date1",this.date1);
      console.log("dateEstimate",this.dateEstimate);
   })

   
  

  }

  ngOnInit() {
  }

  timeClear()
  {
    console.log("clear")
    this.ngOnInit()
    // this.navController.navigateRoot(this.navController.().component);
    // this.navController.navigateRoot(`/reportfiledsix`);
  }

  getTime(e:any)
  {
    console.log(e)
    this.buttonDisabled = false;
    this.timeRangeDisable = true
    console.log(e.detail.value);
    this.time = e.detail.value
    if(this.time.length > 10) {
      this.time = this.time.substring(11, 16);
    }
    console.log(this.time)
  }

  estimate(e:any)
  {
    console.log("estimate",e)
    let value = e.detail.checked
    if(value == true)
    {
       this.timeEstimate = '1';
    }
    else
    {
      this.timeEstimate = '0';
    }
   
    console.log(this.timeEstimate)
  }

  

  getTimeFrom(e:any)
  {
      console.log(e.detail.value)
      this.singleTimeDisable = true
      this.timeFrom = e.detail.value
      if(this.timeFrom.length > 10) {
        this.timeFrom = this.timeFrom.substring(11, 16) + '-';
      }
      console.log(this.timeFrom)
  }

  getTimeTo(e:any)
  {
    console.log(e.detail.value)
      this.timeTo = e.detail.value
      this.buttonDisabled = false;
        if(this.timeTo.length > 10) {
        this.timeTo = this.timeTo.substring(11, 16);
      }
      console.log(this.timeTo)
  }
  
   gotoFieldSeven() {
    // this.timeRange = this.timeFrom + this.timeTo

    if(this.timeFrom != '' && this.timeTo != '')
    {
      var timeRange = this.timeFrom.concat(this.timeTo.toString());
      console.log("timerange",timeRange);
      localStorage.setItem('timeRange',this.timeRange)
      this.navController.navigateForward(`/reportfiledseven`);
    }
    else{
      localStorage.setItem('time',this.time)
      localStorage.setItem('timeEstimate',this.timeEstimate)
      this.navController.navigateForward(`/reportfiledseven`);

    }

    // console.log(timeRange);
    // this.final_time = this.timeArray.join('-')
    // console.log("after join",this.final_time)

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
                 
    //         }
    //   };
    
      // this.navController.navigateForward([`reportfiledseven`],navigationExtras);    
      // this.navController.navigateForward(`/reportfiledseven`);
  }

}

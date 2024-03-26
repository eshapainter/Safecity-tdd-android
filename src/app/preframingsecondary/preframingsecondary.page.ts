import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Router,NavigationExtras} from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-preframingsecondary',
  templateUrl: './preframingsecondary.page.html',
  styleUrls: ['./preframingsecondary.page.scss'],
})
export class PreframingsecondaryPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/incident_report/';
  langaugeId: any;
  anythingElse: any;
  led: any;
  forWho:any;
  age:any;
  pronoun:any;
  experience: any;
  date1: any;
  dateEstimate: string;
  time: any;
  timeEstimate: string;
  timeRange: any;
  violenceType: any;
  policeRepo: any;
  locality:string;
  landmark:string;
  city:string;
  state:string;
  country:string;
  user_id: string;
  constructor(public httpClient: HttpClient,
    private route: ActivatedRoute,
    public navController:NavController) {
      this.user_id = localStorage.getItem('userId');
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
        this.policeRepo = params["policeRepo"];
        this.anythingElse = params["anythingElse"];
        this.led = params["led"];
        this.locality = params["locality"];
        this.landmark = params["landmark"];
        this.city = params["city"];
        this.state = params["state"];
        this.country = params["country"];



                   
        console.log("for Who",this.forWho);
        console.log("Age",this.age);
        console.log("pronoun",this.pronoun);
        console.log("experience",this.experience);
        console.log("date1",this.date1);
        console.log("time",this.time);
        console.log("dateEstimate",this.dateEstimate);
        console.log("timeEstimate",this.timeEstimate);
        console.log("timeRange",this.timeRange);
        console.log("policeRepo",this.policeRepo);
        console.log("violenceType",this.violenceType);
        console.log("led",this.led);
        console.log("locality",this.locality);
        console.log("landmark",this.landmark);
        console.log("city",this.city);
        console.log("state",this.state);
        console.log("country",this.country);
     })
     }

  ngOnInit() {
  }

m
  PostInctdentReport()
  {
    
    let data = new FormData();
    data.append('security_key','d152ed16bedaf0e594319efad64e39ff0b14c2ff');
    data.append('user_id',this.user_id);
    data.append('reporting_for',this.forWho);
    data.append('age',this.age);
    data.append('preferred_pronoun',this.pronoun);
    data.append('what_happened_desc',this.experience);
    data.append('start_date',this.date1);
    data.append('date_estimate',this.dateEstimate);
    data.append('time',this.time);
    data.append('time_estimate',this.timeEstimate);
    data.append('C',this.timeRange);
    data.append('violence_type',this.violenceType);
    data.append('reported_police',this.policeRepo);
    data.append('experience',this.led);
    data.append('feel_attacked',this.anythingElse);
    data.append('location',this.locality);
    data.append('landmark',this.landmark);
    data.append('city',this.city);
    data.append('state',this.state);
    data.append('country',this.country);
    data.append('exact_location','Karanjade Old Panvel Navi Mumbai');
    data.append('report_type','1');
    data.append('is_consent','1');
    
  //   security_key:d152ed16bedaf0e594319efad64e39ff0b14c2ff
  //   user_id:1
  //   is_consent:1
  //   reporting_for:Myselft
  //   age:35
  //   preferred_pronoun:He/Him
  //   what_happened_desc:Testsss
  //   start_date:2020-01-29
  //   time:23:30
  //   C:23:30-24:00
  //   violence_type:I Don't Know
  //   reported_police:Yes I Have / I Intend To
  //   feel_attacked:Other Please specify
  //   experience:Test Experince
  //   location:Navi Mumbai
  //   landmark:Karanjade
  //   city:Panvel
  //   state:Maharashtra
  //   country:India
  //   exact_location:Karanjade Old Panvel Navi Mumbai
  //   report_type:1
  //   date_estimate:Yes
  //   time_estimate:No

    this.httpClient.post(this.apiUrl+'addIncidentReport',data)
    .subscribe((rdata: any) => {
      console.log(rdata);
      // this.countryList = rdata.data;
    },error => {
    });
  }
  
  help() {
this.navController.navigateRoot(`/helplines`);
  }
  
  // secondary() {
        // this.navController.navigateRoot(`/form-one`);
  // }

}

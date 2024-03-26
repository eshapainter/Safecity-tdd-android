import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import {SharedService} from '../shared.service';
@Component({
  selector: 'app-viewsafteydetail',
  templateUrl: './viewsafteydetail.page.html',
  styleUrls: ['./viewsafteydetail.page.scss'],
})
export class ViewsafteydetailPage implements OnInit {
  id: any;
  apiUrl='http://101.53.143.7/~dataduck/safecity/api/safecity_report/'
  data: any;
  safety_tip_title: any;
  safety_tip_desc: any;
  exact_location: any;
  added_date: any;
  safetyTipDesc:any
  getDaysAgo: any;
  time: any;

  constructor(public navController:NavController, private sharedservice : SharedService,public httpClient: HttpClient,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.safetyTipDesc = params["safetyitemDetail"];
      this.safetyTipDesc = JSON.parse(this.safetyTipDesc)
      this.safety_tip_title = this.safetyTipDesc.safety_tip_title
      this.exact_location = this.safetyTipDesc.exact_location
      this.added_date = this.safetyTipDesc.added_date
      this.safety_tip_desc = this.safetyTipDesc.safety_tip_desc
     
      console.log("data",this.safetyTipDesc)
      var dayBetween = this.days_between(this.added_date);
      this.getDaysAgo = (dayBetween > 7 ? this.ChangeDateFormat(this.added_date, 1) : (dayBetween == 0) ? 'Today' : (dayBetween == 1) ? dayBetween + " day ago" : dayBetween + " days ago");
      console.log(this.getDaysAgo)
      

      var time1 = this.added_date.substring(11, 19);
      console.log("time", time1)
      this.time = this.timeConvert(time1)
      console.log("Time",this.time)
      
      
   })

   }

  ngOnInit() {
    // this.viewSafetyDetail()
  }
  viewSafetyDetail() {
    let data = new FormData();
    data.append('security_key','2e2da14d4af021cd267cd61de81b2260628f8cb4');
    data.append('id', this.id);
    
 
    this.sharedservice.sharedPostRequest('safecity_report/getSafetyTipsById',data).subscribe((rdata: any) => {
        console.log(rdata);
        this.safety_tip_title = rdata.data.safety_tip_title
        this.exact_location = rdata.data.exact_location
        this.added_date = rdata.data.added_date
        this.safety_tip_desc = rdata.data.safety_tip_desc

}, error => {

},()=>{

});


    // this.httpClient.post(this.apiUrl + 'getSafetyTipsById', data)
    //   .subscribe((rdata: any) => {
    //     console.log(rdata);
    //     this.safety_tip_title = rdata.data.safety_tip_title
    //     this.exact_location = rdata.data.exact_location
    //     this.added_date = rdata.data.added_date
    //     this.safety_tip_desc = rdata.data.safety_tip_desc

       
    //   }, error => {
    //   });
  }
  ChangeDateFormat(date,val)
  {
    var dayDate = new Date(date.replace(/ /g,"T"));
  
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[dayDate.getMonth()];
    var monthVal = (val==1 ? monthName.substr(0, 3) : monthName);
    var getDate = dayDate.getDate();
    var getYear = dayDate.getFullYear();
  
    var format_date = getDate+" "+monthVal+" "+getYear;
    return format_date;
  }
  timeConvert(time) {
    // console.log("Time in convert ", time)
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
      console.log("time1",time[0])
      console.log("time",time)
      
     var time_array =[]
     time_array.push(time[0])
     time_array.push(time[1])
     time_array.push(time[2])
     time_array.push(time[5])
    }
    
    return time_array.join('');
     // return adjusted time or original string
  }
  days_between(date) {
    // The number of milliseconds in one day
    var date1: any
    date1 = new Date(date.replace(/ /g,"T"));
    var todays_date: any
    todays_date = new Date();
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(todays_date - date1);
    var daydiff = Math.round(differenceMs / ONE_DAY);
    return daydiff;
  }
  dismiss() 
  {
  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        // incidentList: this.incidentList,
        // safetyTipList: this.safetyTipList,
        segmentModel:'two',
        pagename: 'safetyDetail'
      }
    };
    this.navController.navigateBack([`modelreport`],navigationExtras);
  
  }
 


}

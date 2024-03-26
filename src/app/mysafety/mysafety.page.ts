import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-mysafety',
  templateUrl: './mysafety.page.html',
  styleUrls: ['./mysafety.page.scss'],
})
export class MysafetyPage implements OnInit {
apiUrl = 'http://101.53.143.7/~dataduck/safecity_webapp/api/'
safetyTipList
safetyTitle
disc
getDaysAgo
pagename:'safetyTip'
exact_loc
showDiv: boolean = false;
  showCity: boolean = false;
  constructor(private sharedservice : SharedService,public httpClient:HttpClient,private navController: NavController, private router: Router,) {
    
   }

  ngOnInit() {
    
  }
  
  mysafety() {
this.navController.navigateForward(`/safteytipone`);
  }
  ionViewDidEnter()
  {
    this.getSafetyTipsList()
  }
   detail(safety_Tip_id) 
   {
     console.log("safety_tip",safety_Tip_id)

     let navigationExtras: NavigationExtras = {
      queryParams: 
      {
        safety_tip_id:safety_Tip_id,
        pagename:'safetyTip'
      }
    };
    this.navController.navigateForward([`/mysafetyreport`],navigationExtras);
    }

          
   

   getSafetyTipsList() {
     var user_id = localStorage.getItem('userId')
       let data = new FormData();
    data.append('user_id',user_id);
    data.append('is_mobile_visibile','1');
    this.sharedservice.sharedPostRequest_webappurl('user-safety-tips',data).subscribe((rdata: any) => {
       console.log('safetyTips',rdata)
       this.safetyTipList = rdata.data
       

       for(var i = 0;i < this.safetyTipList.length;i++)
       {
        var discription =  this.safetyTipList[i].safety_tip_desc 
        console.log("discription",discription) 
        console.log("city",this.safetyTipList[i].city)
        var city  = this.safetyTipList[i].city
        console.log(city)
        
        if(discription.length > 50)
        {
          var disc = discription.substring(0, 97)
          console.log("disc",this.disc)
          this.safetyTipList[i].show_disc = disc
        }
        var safety_tip_added_date = this.safetyTipList[i].added_date != null ? this.safetyTipList[i].added_date : "";
        var dayBetween = this.days_between(safety_tip_added_date);
        var getDaysAgo = (dayBetween > 7 ? this.ChangeDateFormat(safety_tip_added_date,1) : (dayBetween==0) ? 'Today' : (dayBetween==1) ? dayBetween+" day ago" : dayBetween+" days ago");
          console.log(this.getDaysAgo)

          var time1 = this.safetyTipList[i].added_date.substr(11,19);
          // console.log("time", time1)
          let time2 = this.timeConvert(time1)
          this.safetyTipList[i].show_date = getDaysAgo

          this.safetyTipList[i].show_time = time2
         
          if(city == 'undefined')
          {
            console.log("hiiii")
            var locationArray = []
            locationArray =  this.safetyTipList[i].exact_location.split(',')
            this.safetyTipList[i].exct_lcn=locationArray[1]
            this.showDiv =true
            this.showCity = false
          }
          else
          {
            this.showCity = true
            this.showDiv = false
          }
      }

      }, error => {
      });
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
    var date1 : any 
    date1 = new Date(date.replace(/ /g,"T"));
    var todays_date  : any
    todays_date= new Date();
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(todays_date - date1);
    var daydiff = Math.round(differenceMs / ONE_DAY);
    return daydiff;
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

  formatAMPM(date) {
	  var hours = date[0];
	  var minutes = date[1];
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12;
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return strTime;
}


}

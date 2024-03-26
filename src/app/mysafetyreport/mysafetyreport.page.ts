import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {SharedService} from '../shared.service';
import {TranslateService} from '@ngx-translate/core'

@Component({
  selector: 'app-mysafetyreport',
  templateUrl: './mysafetyreport.page.html',
  styleUrls: ['./mysafetyreport.page.scss'],
})
export class MysafetyreportPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity_webapp/api/safety-tip/';
            
  safetyReport: any;
  title: any;
  disc: any;
  location: any;
  getDaysAgo: any;
  type: string;
  safety_tip_id
  safety_id: string;
 pagename
  time2: string;
  constructor(public route:ActivatedRoute,public translate : TranslateService,private sharedservice : SharedService,public httpClient:HttpClient,private navController: NavController, private router: Router,public alertController: AlertController) {
    this.route.queryParams.subscribe(params =>{
      this.safety_tip_id = params['safety_tip_id']
      this.pagename = params['pagename']
      console.log("safety_id",this.safety_tip_id)
      console.log("pagename",this.pagename)

      if(this.pagename == 'safetyTip')
      {
      
      localStorage.setItem("editSafety_id",this.safety_tip_id)
      console.log("safety_id",this.safety_tip_id)
      }
      this.safetyTipDisc()
    })
}

  ngOnInit() 
  {
  }
  
  edit() {
        let navigationExtras:NavigationExtras = {
          queryParams:{
            location:this.safetyReport.data.exact_location,
            city:this.safetyReport.data.city,
            state:this.safetyReport.data.state,
            country:this.safetyReport.data.country,
            landmark:this.safetyReport.data.landmark,
            lat:this.safetyReport.data.latitude,
            long:this.safetyReport.data.longitude,
            safety_title:this.safetyReport.data.safety_tip_title,
            safety_desc:this.safetyReport.data.safety_tip_desc,
            safety_tip_id:this.safety_tip_id
          }
        }
            this.navController.navigateForward([`/editsafetytip`],navigationExtras);
         }
  
  async presentAlertRadio() 
  {
    var message
    var cancel
    var button_done;
    var del_From_Phone;
    var del_from_safecity
    this.translate.get('del_From_Phone').subscribe((res: string) => {
        
      del_From_Phone = res;
    })
    this.translate.get('del_from_safecity').subscribe((res: string) => {
        
      del_from_safecity = res;
    })
    this.translate.get('select_one').subscribe((res: string) => {
        
      message = res;
    })

    this.translate.get('button_done').subscribe((res: string) => {
        
      button_done = res;
    })

    
    this.translate.get('cancel').subscribe((res: string) => {
        
      cancel = res;
    })
    
    const alert = await this.alertController.create({
      cssClass: 'newclass',
      header: message,
	    mode:'ios',
      inputs: [
        {
          name: del_From_Phone,
          type: 'radio',
          label: del_From_Phone,
          value: 'value1',
        },
        {
          name: del_from_safecity,
          type: 'radio',
          label: del_from_safecity,
          value: 'value2'
        },
      ],
      buttons: [
        {
          text: cancel ,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text:button_done,
          handler: (alertData) => {
            
            console.log('Confirm Ok',alertData);
            if(alertData == 'value1')
            {
              this.type = 'mobile'
            }
            else{
              this.type = 'web'
            }
            this.deleteSafetyTip()
          }
        }
      ]
    });
    await alert.present();
  }
deleteSafetyTip()
{
//   user_id:0
// safety_tip_id:3
// delete_from:mobile (web/mobile)
var userId = localStorage.getItem('userId')
  let data = new FormData();
      data.append('user_id',userId);
      data.append('safety_tip_id',this.safety_tip_id);
      data.append('delete_from',this.type);
      var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('safety-tip/delete',data).subscribe((rdata: any) => {
      if(rdata.status == true)
        {
          this.navController.navigateRoot('/mysafety')
        }
        console.log(rdata);
     }, error => {
       this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });


    
    // this.httpClient.post(this.apiUrl+'delete',data)
    //   .subscribe((rdata: any) => {
    //     if(rdata.message == 'Safety Tip deleted successfully')
    //     {
    //       this.navController.navigateRoot('/mysafety')
    //     }
    //     console.log(rdata);
    //     }, error => {
    //   });
}
  safetyTipDisc()
  {
    
      var userId = localStorage.getItem('userId')
      var lanId = localStorage.getItem('Lang_id')
      this.safety_id = localStorage.getItem('editSafety_id')
      console.log(this.safety_id)
      let data = new FormData();
      data.append('lang_id',lanId);
      data.append('safety_tip_id',this.safety_id);
      
      var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('safety-tip/details',data).subscribe((rdata: any) => {
           this.safetyReport = rdata
          this.title = this.safetyReport.data.safety_tip_title
          this.disc = this.safetyReport.data.safety_tip_desc
          this.location = this.safetyReport.data.location

          var safety_tip_added_date = this.safetyReport.data.added_date != null ? this.safetyReport.data.added_date : "";
          var dayBetween = this.days_between(safety_tip_added_date);

          var time1 = this.safetyReport.data.added_date.substr(11,19);
          // console.log("time", time1)
          this.time2 = this.timeConvert(time1)
          this.getDaysAgo = (dayBetween > 7 ? this.ChangeDateFormat(safety_tip_added_date,1) : (dayBetween==0) ? 'Today' : (dayBetween==1) ? dayBetween+" day ago" : dayBetween+" days ago");
     
     }, error => {
       this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });

      
      
      // this.httpClient.post(this.apiUrl +'details',data)
      //   .subscribe((rdata: any) => {
      //     this.safetyReport = rdata
      //     this.title = this.safetyReport.data.safety_tip_title
      //     this.disc = this.safetyReport.data.safety_tip_desc
      //     this.location = this.safetyReport.data.location

      //     var safety_tip_added_date = this.safetyReport.data.added_date != null ? this.safetyReport.data.added_date : "";
      //     var dayBetween = this.days_between(safety_tip_added_date);

      //     var time1 = this.safetyReport.data.added_date.substr(11,19);
      //     // console.log("time", time1)
      //     this.time2 = this.timeConvert(time1)
      //     this.getDaysAgo = (dayBetween > 7 ? this.ChangeDateFormat(safety_tip_added_date,1) : (dayBetween==0) ? 'Today' : (dayBetween==1) ? dayBetween+" day ago" : dayBetween+" days ago");
     

      //    }, error => {
      //   });
    }
    days_between(date) {
      // The number of milliseconds in one day
      var date1 : any 
      date1 = new Date(date);
      var todays_date  : any
      todays_date= new Date();
      const ONE_DAY = 1000 * 60 * 60 * 24;
      const differenceMs = Math.abs(todays_date - date1);
      var daydiff = Math.round(differenceMs / ONE_DAY);
      return daydiff;
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
    ChangeDateFormat(date,val)
    {
      var dayDate = new Date(date);
    
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
  }
  



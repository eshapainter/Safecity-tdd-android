import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { SharedService } from '../shared.service'
@Component({
  selector: 'app-myreport',
  templateUrl: './myreport.page.html',
  styleUrls: ['./myreport.page.scss'],
})
export class MyreportPage implements OnInit {
  incident_list =[]

  constructor(private navController: NavController, public translate: TranslateService, private sharedservice: SharedService, private router: Router) {
      
  }

ionViewDidEnter()
{
  this.getreport()
}
  getreport()
  {
    let data = new FormData();
    // data.append('security_key','96df706ef2643e000fe98cc406d1071c04dd8dfa');
    data.append('user_id', localStorage.getItem('userId'));
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest_webappurl('user-reported-incidents', data).subscribe((rdata: any) => {
      console.log(rdata);
      this.incident_list = rdata.data
      console.log(this.incident_list)

      for (var i = 0; i < this.incident_list.length; i++) {
        var incidentdata = data['data'] != null ? data['data'][i] : "";
        console.log(incidentdata)
        var incident_desc = this.incident_list[i].description != null ? this.incident_list[i].description : "";

        this.incident_list[i].incident_desc_show = incident_desc

        var additional_info = this.incident_list[i].additional_detail != null ? 'Additional Details : ' + this.incident_list[i].additional_detail : "";
        this.incident_list[i].additional_info_show = additional_info
        // code changed by sonam - 16-10-2020 start
        var yrs
        this.translate.get('yrs').subscribe((res: string) => {

          yrs = res;
        })

        var person_age = this.incident_list[i].age != null ? this.incident_list[i].age + yrs : "";
        console.log(person_age)
        this.incident_list[i].person_age_show = person_age
        // code changed by sonam - 16-10-2020 end


        var prefer_not_to_say
        this.translate.get('prefer_not_to_say').subscribe((res: string) => {

          prefer_not_to_say = res;
        })

        var person_gender = this.incident_list[i].gender != null && this.incident_list[i].gender != prefer_not_to_say ? this.incident_list[i].gender : "";
        console.log(person_gender)
        this.incident_list[i].person_gender_show = person_gender
        // code changed by sonam - 16-10-2020 start

        var around
        this.translate.get('around').subscribe((res: string) => {

          around = res;
        })

        var On
        this.translate.get('On').subscribe((res: string) => {

          On = res;
        })

        var At
        this.translate.get('At').subscribe((res: string) => {

          At = res;
        })

        var Between
        this.translate.get('Between').subscribe((res: string) => {

          Between = res;
        })

        var incidents_date_est = this.incident_list[i].is_date_estimate != "0" ? around : On;
        this.incident_list[i].incidents_date_est_show = incidents_date_est
        var incidents_time_est = this.incident_list[i].is_time_estimate != "0" ? around : At;
        this.incident_list[i].incidents_time_est_show = incidents_time_est
        var incidents_time_est = this.incident_list[i].time_to != null ? Between : incidents_time_est;
        this.incident_list[i].incidents_time_est_show = incidents_time_est
        // code changed by sonam - 16-10-2020 end

        // code changed by sonam - 20-10-2020 start
        var incidents_date = this.incident_list[i].created_on != null ? this.incident_list[i].created_on : "";
        console.log('incidents_date', incidents_date)
       // var incidents_time_range = this.incident_list[i].time_to != null ? this.timeConvert(this.incident_list[i].time_from) + " - " + this.timeConvert(this.incident_list[i].time_to) : this.timeConvert(this.incident_list[i].time_from);
        var dayBetween = this.days_between(incidents_date);

        var Today
        this.translate.get('Today').subscribe((res: string) => {

          Today = res;
        })

        var day_ago
        this.translate.get('day_ago').subscribe((res: string) => {

          day_ago = res;
        })

        var days_ago
        this.translate.get('days_ago').subscribe((res: string) => {

          days_ago = res;
        })


        this.incident_list[i].converttolongdate_show = this.ConverttoLongDate(incidents_date)
        
       var  incidents_time_range = this.incident_list[i].time_to != null ? this.timeConvert(this.incident_list[i].time_from) + " - " + this.timeConvert(this.incident_list[i].time_to) : this.timeConvert(this.incident_list[i].time_from);
console.log(',.,.,.,',incidents_time_range)
console.log(',.,.,.,',dayBetween)
        var getDaysAgo = (dayBetween > 7 ? this.ChangeDateFormat(incidents_date, 1) + ' ' + incidents_time_range : (dayBetween == 0) ? Today : (dayBetween == 1) ? dayBetween + ' ' + day_ago : dayBetween + ' ' + days_ago);

        this.incident_list[i].getDaysAgo_show = getDaysAgo

        var incidents_time = this.incident_list[i].time_to != null ? this.incident_list[i].time_from + " " + to + " " + this.incident_list[i].time_to : this.incident_list[i].time_from;
        if (incidents_time) {
          this.incident_list[i].timeconvert_show = this.timeConvert(incidents_time)
        }

         this.incident_list[i].show_time = this.incident_list[i].timeconvert_show
        // code changed by sonam - 20-10-2020 end

        //var incidents_time = incidentdata.time_from != null ? incidentdata.time_from : "";

        var to
        this.translate.get('to').subscribe((res: string) => {

          to = res;
        })

        
        var incidents_area = this.incident_list[i].area != null ? this.incident_list[i].area : "";

        this.incident_list[i].incidents_area_show = incidents_area

        var incidents_city = this.incident_list[i].city != null ? this.incident_list[i].city : "";
        this.incident_list[i].incidents_city_show = incidents_city
        var incidents_state = this.incident_list[i].state != null ? this.incident_list[i].state : "";
        this.incident_list[i].incidents_state_show = incidents_state
        var incidents_categories = this.incident_list[i].categories != null ? this.incident_list[i].categories : "";
        this.incident_list[i].incidents_categories_show = incidents_categories
        var incidentdata_answers = this.incident_list[i].answers != null ? this.incident_list[i].answers : "";
        var incidentdata_answers_length = incidentdata_answers.length;

        for (var j = 0; j < incidentdata_answers_length; j++) {
          //console.log("incidentdata_answers");
          var incident_question_tag = incidentdata_answers[j].question_tag != null ? incidentdata_answers[j].question_tag : "";
          var incident_question_answer = incidentdata_answers[j].answer != null ? incidentdata_answers[j].answer : "";
          var incident_question_answer_id = incidentdata_answers[j].answer_id != null ? incidentdata_answers[j].answer_id : "";
var police_tag = incidentdata_answers[j].answer
console.log(police_tag)
          if (incident_question_tag == "attack_reason") {

            var what_let_to_attck
            this.translate.get('what_let_to_attck').subscribe((res: string) => {

              what_let_to_attck = res;
            })
            var attack_reason = what_let_to_attck + incident_question_answer;
            this.incident_list[i].attack_reason_show = attack_reason
          } else if (incident_question_tag == "who_was_perpetrator") {
            var perpetrator_info = incident_question_answer;
            console.log('perpetrator_info', perpetrator_info)
            this.incident_list[i].perpetrator_info_show = perpetrator_info
          }
          else if (incident_question_tag == "medical_help") {

            var medical_help_received
            this.translate.get('medical_help_received').subscribe((res: string) => {

              medical_help_received = res;
            })

            var medical_hlp_noy_rcvd
            this.translate.get('medical_hlp_noy_rcvd').subscribe((res: string) => {

              medical_hlp_noy_rcvd = res;
            })

            var medical_help_desc = (incident_question_answer_id == 28 ? medical_help_received : medical_hlp_noy_rcvd);
            console.log('*******', medical_help_desc)
            console.log('*******', incident_question_answer_id)
            console.log('*******', medical_help_received)
            console.log('*******', medical_hlp_noy_rcvd)
            var medical_help = medical_help_desc;
            this.incident_list[i].medical_help_show = medical_help
          }
          else if (incident_question_tag == "reported_to_police") {
            // code change by sonam - 16-10-2020 start
            var incident_other_answer
            if (incidentdata_answers[j].other_answers.length != 2) {
              incident_other_answer = JSON.parse(incidentdata_answers[j].other_answers)['incident_question_answer_id'] != null ? JSON.parse(incidentdata_answers[j].other_answers)['incident_question_answer_id'] : "";
            }
            var policeHtml = '<img src="assets/images/map-police.svg" class="img-fluid"> ';
            var reported_to_police = '';
            console.log(police_tag)
            if (police_tag == "Yes I did") {
              reported_to_police = ' Police report filed.';

              var police_Report_filed
              this.translate.get('police_Report_filed').subscribe((res: string) => {

                police_Report_filed = res;
              })

              this.incident_list[i].reported_to_police_show = police_Report_filed
            } else if (police_tag == "No") {
              reported_to_police = ' Police report not filed.';

              var police_reprt_not_filed
              this.translate.get('police_reprt_not_filed').subscribe((res: string) => {

                police_reprt_not_filed = res;
              })

              this.incident_list[i].reported_to_police_show = police_reprt_not_filed
            } else if (police_tag == "I tried") {

              var tried_to_filed
              this.translate.get('tried_to_filed').subscribe((res: string) => {

                tried_to_filed = res;
              })


              reported_to_police = tried_to_filed + ' ' + incident_other_answer;
              this.incident_list[i].reported_to_police_show = reported_to_police
            } else if (police_tag == "I will, in the future") {
              reported_to_police = ' Intend to file police report.';

              var intent_to_filed
              this.translate.get('intent_to_filed').subscribe((res: string) => {

                intent_to_filed = res;
              })

              this.incident_list[i].reported_to_police_show = intent_to_filed
            } else if (police_tag == "I’m not sure if I want to") {
              reported_to_police = ' Not sure about filing police report.';


              var not_sure
              this.translate.get('not_sure').subscribe((res: string) => {

                not_sure = res;
              })

              this.incident_list[i].reported_to_police_show = not_sure
            } else {
              reported_to_police = '';
              this.incident_list[i].reported_to_police_show = reported_to_police
            }
            // code change by sonam - 16-10-2020 end
          }
        }



        // latlong[i] = {"city":incidents_city, "area":incidents_area, "latitude":incidentdata.latitude, "longitude":incidentdata.longitude, "categories":incidents_categories, "dateTime":incidents_time};

        // elementHtml += `
        //     <!-- Short Desc Start -->
        //     <div class="text shortDesc " data-id="${i}">
        //       <div class="incident-title">${incidents_categories}</div>
        //       <div class="place-time">
        //         at ${incidents_area} <span class="sepration">.</span> ${getDaysAgo}
        //       </div>
        //       <div class="text1">
        //         <span class="ellipsis">${incident_desc}</span>
        //         <span>
        //           <button class="themeColor toggleThis readbtn mb-3 ml-1" id="readbtn_${i}" data-id="${i}">Read More</button>
        //         </span>
        //       </div>
        //     </div>
        //     <!-- Short Desc End -->
        //     <!-- Long Desc Start -->
        //     <div class="longDesc" id="longDesc_${i}" data-id="${i}">
        //       <button class="toggleUp shwobtn" id="toggleUp_${i}" data-id="${i}">
        //         <img src="assets/images/icon-feather-arrow-left.svg" class="img-fluid leftIcon">
        //       </button>
        //       <div class="incident-title">${incidents_categories}</div>
        //       <label>
        //         <span class="age">${person_age}</span>
        //         ${person_gender}
        //       </label>
        //       <p>${incident_desc}</p><br>
        //       ${perpetrator_info}<br>
        //       ${attack_reason}<br>
        //       ${additional_info}<br>
        //       <div class="otherDetails">
        //         <div class="row mb-3">
        //           <div class="col-md-12">
        //             <div class="location">
        //                 ${reported_to_police}
        //             </div>
        //           </div>
        //         </div>
        //         <div class="row mb-3">
        //           <div class="col-md-12">
        //             <div class="location">
        //                 ${medical_help}
        //             </div>
        //           </div>
        //         </div>
        //         <div class="row mb-3">
        //           <div class="col-md-12">
        //             <div class="location">
        //               <img src="assets/images/location.svg" class="img-fluid">
        //               ${incidents_area},${incidents_city}
        //             </div>
        //           </div>
        //         </div>
        //         <div class="row mb-3">
        //           <div class="col-md-12">
        //             <div class="iDate">
        //               <img src="assets/images/calendar-date-of-incident.svg" class="img-fluid">
        //               ${incidents_date_est} ${ConverttoLongDate(incidents_date)}
        //             </div>
        //           </div>
        //         </div>
        //         <div class="row mb-3">
        //           <div class="col-md-12">
        //             <div class="iTime">
        //               <img src="assets/images/time-of-incident.svg" class="img-fluid"> ${incidents_time_est} ${timeConvert(incidents_time)}
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //     <!-- Long Desc End -->
        // `;
      }
      console.log(this.incident_list)

    }, error => {
      this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });
  }
  ngOnInit() {
  }


  share() {
    this.navController.navigateForward(`/preframingtwo`);
  }

  //   report() {
  // this.navController.navigateForward(`/myviewreport`);
  //   }


  report(item) {
    console.log(item)

    let navigationExtras: NavigationExtras = {
      state: {
        data: item
      }
    };

    this.router.navigate(['/myviewreport'], navigationExtras);
    //this.navController.navigateForward(`/myviewreport`);
  }
  ChangeDateFormat(date, val) {
    // var dayDate = new Date(date);
    // var date1: any
  var  dayDate = new Date(date.replace(/ /g,"T"));
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[dayDate.getMonth()];
    var monthVal = (val == 1 ? monthName.substr(0, 3) : monthName);
    var getDate = dayDate.getDate();
    var getYear = dayDate.getFullYear();

    var format_date = getDate + " " + monthVal + " " + getYear;
    console.log('****',format_date)
    return format_date;
  }

  ConverttoLongDate(date) {
   // var dayDate = new Date(date);
    var  dayDate = new Date(date.replace(/ /g,"T"));
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var mainDate = weekday[dayDate.getDay()];

    var dateFormat = this.ChangeDateFormat(date, 0);

    var format_date = mainDate + ", " + dateFormat;
    return format_date;
  }

  days_between(date) {
    // The number of milliseconds in one day
    console.log(date)
    var date1: any
  //  date1 = new Date(date);
      date1 = new Date(date.replace(/ /g,"T"));
    console.log(date1)
    var todays_date: any
    todays_date = new Date();
    console.log(todays_date)
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds

    const differenceMs = Math.abs(todays_date - date1);
    console.log(differenceMs)
    var daydiff = Math.round(differenceMs / ONE_DAY);
    console.log(daydiff)
    return daydiff;
    // return 0
    // Convert back to days and return
    /*if (daydiff >= 0 && daydiff <= 30) {
      // return daydiff + " Days ago";
      return daydiff;
    }
    else {
      return date;
    }*/
  }

  timeConvert(time) {
    // Check correct time format and split into components
    // time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    // if (time.length > 1) { // If time format correct
    //   time = time.slice(1);  // Remove full string match value
    //   time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    //   time[0] = +time[0] % 12 || 12; // Adjust hours
      
    //   var time_array =[]
    //   time_array.push(time[0])
    //   time_array.push(time[1])
    //   time_array.push(time[2])
    //   time_array.push(time[5])
    //  }

    var time_split = time.split(':')
    console.log(time_split)

    if (time_split[0].charAt(0) == '0') {
      var t = time_split[0].slice(1)
      time_split[0] = t;
      console.log(time_split[0])
    }
    if (time_split[1].charAt(0) == '0') {
      var t = time_split[1].slice(1)
      time_split[1] = t;
      console.log(time_split[1])
    }


    let hour = JSON.parse(time_split[0])
    let minute = JSON.parse(time_split[1])

    console.log(hour)
    console.log(minute)
    var hours = hour > 12 ? hour - 12 : hour;
    var am_pm = hour >= 12 ? "PM" : "AM";
    var minutes = minute < 10 ? "0" + minute : minute;
    let timeStart = hours + ":" + minutes + " " + am_pm;

     
     return timeStart; // return adjusted time or original string
  }


}

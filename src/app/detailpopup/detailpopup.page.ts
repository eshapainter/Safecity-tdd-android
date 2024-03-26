import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-detailpopup',
  templateUrl: './detailpopup.page.html',
  styleUrls: ['./detailpopup.page.scss'],
})
export class DetailpopupPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity_webapp/api/reported-incident/'
  reporDetail: any;
  itemDetail: any;
  data: any;
  violenceType: any;
  violence_type: any;
  age: any;
  gender: any;
  what_happened_desc: any;
  feel_attacked: any;
  suburb: any;
  city: any;
  date_estimate_name: any;
  time_estimate_name: any;
  additional_detail: any;
  showAttacked = false;
  perpetrator
  showPerpetrator = false
  show1 = false;
  show2 = false;
  show3 = false;
  show4 = false;
  show5 = false;
  other_ans: any;
  rece_medi_not_attn = false
  rece_medi_attn = false
  incidents_date_est: string;
  incidents_time_est: string;
  id
  detail
  type
  safetyTipDesc: any;
  safety_tip_title: any;
  exact_location: any;
  added_date: any;
  safety_tip_desc: any;
  getDaysAgo: string;
  time: any;
  showincident = false
  showSafetyTip = false
  constructor(public route: ActivatedRoute, public httpClient: HttpClient, private navController: NavController, private router: Router, private modalCtrl: ModalController) {
    this.route.queryParams.subscribe(params => 
      {
        this.type = params['type']
        if(this.type == 'incident')
      {
        this.showincident = true
        this.showincident = false
      var detail = params['marker']
      console.log("stringdetail", detail)
      this.itemDetail = JSON.parse(detail)
      console.log("item array", this.itemDetail)

      this.violence_type = this.itemDetail.categories
      this.age = this.itemDetail.age
      this.gender = this.itemDetail.gender
      this.what_happened_desc = this.itemDetail.description
      console.log("discription", this.what_happened_desc)

      this.suburb = this.itemDetail.building

      this.incidents_date_est = this.itemDetail.is_date_estimate != "0" ? "Around " : "On";
      this.incidents_time_est = this.itemDetail.is_time_estimate != "0" ? "Around " : "At";
      this.incidents_time_est = this.itemDetail.time_to != null ? "Between " : this.incidents_time_est;
      this.time_estimate_name = this.itemDetail.time_to != null ? this.timeConvert(this.itemDetail.time_from) + " - " + this.timeConvert(this.itemDetail.time_to) : this.itemDetail.time_from;
      this.time_estimate_name = this.timeConvert(this.itemDetail.time_from)
      this.date_estimate_name = this.ChangeDateFormat(this.itemDetail.created_on, 1)
      console.log("date_estimate", this.date_estimate_name)
      console.log("time_estimate", this.time_estimate_name)
      // this.date_estimate_name = this.itemDetail.show_date
      // this.time_estimate_name = this.itemDetail.show_time


      this.additional_detail = this.itemDetail.additional_detail
      for (let i = 0; i < this.itemDetail.answers.length; i++) {
        console.log(this.itemDetail.answers[i])
        if (this.itemDetail.answers[i].question_tag == "attack_reason") {
          this.showAttacked = true;
          this.feel_attacked = this.itemDetail.answers[i].answer
        }
        else if (this.itemDetail.answers[i].question_tag == "who_was_perpetrator") {
          this.showPerpetrator = true
          this.perpetrator = this.itemDetail.answers[i].answer;
        }
        else if (this.itemDetail.answers[i].question_tag == "reported_to_police") {
          if (this.itemDetail.answers[i].answer_id == '38') {
            this.show1 = true;
          }
          else if (this.itemDetail.answers[i].answer_id == '41') {
            this.show2 = true;
          }
          else if (this.itemDetail.answers[i].answer_id == '42') {
            this.show3 = true;
            this.other_ans = JSON.parse(this.itemDetail.answers[i].other_answers)
            this.other_ans = this.other_ans[42]
            console.log(this.other_ans)
          }

          else if (this.itemDetail.answers[i].answer_id == '39') {
            this.show4 = true;
          }
          else if (this.itemDetail.answers[i].answer_id == '40') {
            this.show5 = true;
          }

        }
        else if (this.itemDetail.answers[i].question_tag == "medical_help") {
          if (this.itemDetail.answers[i].answer_id == "28") {
            this.rece_medi_attn = true
          }
          else {
            this.rece_medi_not_attn = true
          }
        }

      }
    }
      else
      {
        this.showSafetyTip = true
        this.showincident = false
        this.safetyTipDesc = params['marker']
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
        
        
  
  
      }
    })
    
  
 

  }

  ngOnInit() {
  }

  ChangeDateFormat(date, val) 
  {
    var dayDate = new Date(date.replace(/ /g,"T"));

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[dayDate.getMonth()];
    var monthVal = (val == 1 ? monthName.substr(0, 3) : monthName);
    var getDate = dayDate.getDate();
    var getYear = dayDate.getFullYear();

    var format_date = getDate + " " + monthVal + " " + getYear;
    return format_date;
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
  dismiss()
  {
    this.navController.navigateForward("/home")
  }

}
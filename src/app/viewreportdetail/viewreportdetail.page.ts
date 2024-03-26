import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-viewreportdetail',
  templateUrl: './viewreportdetail.page.html',
  styleUrls: ['./viewreportdetail.page.scss'],
})
export class ViewreportdetailPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/incident_report/'
  pagename = 'from_detail'         
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
  rece_medi_not_attn=false
  rece_medi_attn=false
  incidents_date_est: string;
  incidents_time_est: string;
  constructor(public modalCtrl:ModalController,private route: ActivatedRoute,public httpClient: HttpClient,public navController:NavController) {

    this.route.queryParams.subscribe(params => {
      this.itemDetail = params["itemDetail"];
      this.itemDetail = JSON.parse(this.itemDetail)
      console.log("for Who",this.itemDetail);
      this.violence_type = this.itemDetail.categories
      this.age = this.itemDetail.age
      this.gender =this.itemDetail.gender
      this.what_happened_desc = this.itemDetail.description
      console.log("discription",this.what_happened_desc)
      
      this.suburb = this.itemDetail.building
      // this.city = this.itemDetail.city
      this.incidents_date_est = this.itemDetail.is_date_estimate != "0" ? "Around " : "On";
      this.incidents_time_est = this.itemDetail.is_time_estimate != "0" ? "Around " : "At";
      this.incidents_time_est = this.itemDetail.time_to != null ? "Between " : this.incidents_time_est;
      this.time_estimate_name = this.itemDetail.time_to != null ? this.timeConvert(this.itemDetail.time_from)+" - "+ this.timeConvert(this.itemDetail.time_to) : this.itemDetail.time_from;
      
      this.date_estimate_name = this.itemDetail.show_date
      this.time_estimate_name = this.itemDetail.show_time
      this.additional_detail = this.itemDetail.additional_detail
      for(let i=0; i < this.itemDetail.answers.length; i++)
      {
        console.log(this.itemDetail.answers[i])
        if(this.itemDetail.answers[i].question_tag == "attack_reason")
        {
          this.showAttacked = true;
          this.feel_attacked = this.itemDetail.answers[i].answer
        }
        else if(this.itemDetail.answers[i].question_tag == "who_was_perpetrator")
        {
          this.showPerpetrator = true
          this.perpetrator = this.itemDetail.answers[i].answer;
        }
        else if(this.itemDetail.answers[i].question_tag == "reported_to_police")
        {
          if(this.itemDetail.answers[i].answer_id == '38')
          {
            this.show1 = true;
          }
          else if(this.itemDetail.answers[i].answer_id == '41')
          {
            this.show2 = true;
          }
          else if(this.itemDetail.answers[i].answer_id == '42')
          {
            this.show3 = true;
            this.other_ans = JSON.parse(this.itemDetail.answers[i].other_answers)
            this.other_ans = this.other_ans[42]
            console.log(this.other_ans)
          }

          else if(this.itemDetail.answers[i].answer_id == '39')
          {
            this.show4 = true;
          }
          else if(this.itemDetail.answers[i].answer_id == '40')
          {
            this.show5 = true;
          }
          
        }
        else if(this.itemDetail.answers[i].question_tag == "medical_help")
        {
            if(this.itemDetail.answers[i].answer_id == "28")
            {
                this.rece_medi_attn = true
            }
            else{
                  this.rece_medi_not_attn = true
                }
        }

      }

      
   })


   }
   timeConvert(time) 
  {
    console.log("Time in convert ",time)
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
back()
{
  this.navController.navigateBack('/modelreport')
}
  ngOnInit() {
    // this.viewReportDetail()
  }
  dismiss() 
  {
  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        // incidentList: this.incidentList,
        // safetyTipList: this.safetyTipList,
        segmentModel:'one',
        pagename: this.pagename
      }
    };
    this.navController.navigateBack([`modelreport`],navigationExtras);
  
  }
 
}

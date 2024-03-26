import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { NavController,AlertController,Platform } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {SharedService} from '../shared.service';
import {TranslateService} from '@ngx-translate/core'
import * as $ from 'jquery'
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
declare var google;
@Component({
  selector: 'app-primaryform',
  templateUrl: './primaryform.page.html',
  styleUrls: ['./primaryform.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PrimaryformPage implements OnInit {
   latitude  
   longitude 
   map 
   mapMarker 
   geocoder
  isAccepted
  building
  landmark
  area
  city
  state
  country
  addressForm: FormGroup;
  led: any;
  otherFieldData: boolean = false;
  RelationFieldData: boolean = false;
  oneFieldData: boolean = false;
  apiUrl = 'http://101.53.143.7/~dataduck/safecity_webapp/get-forms/'
  formdata = []
  questiondata = []
  value = {
    "option_id": '',
    "answer": ""
  }
  subscription
  optionHtml
  ques
  subt
  // current_form
  // previous_form
  // next_form
  // question_ids_json
  incident_id = 0;
  currentQuestion = "";
  currentParentKey = 0;
  currentTreeOptions = [];
  selectedAnswers = [];
  dynamicQuestionJson = [];
  currentForm = 0;
  dependedQuestionsAnswers = {};
  clientForms: any;
  dynamicQuestionOptionJson = []
  p_bar = 0;

  category
  answerJson

  hide_question = true
  hide_thankyou = false
  title: any;
  content: any;
  totalQuestions = 0;
  totalParentAnswers = 0;
  text_field_required_msg: string = "";
  text_field_valid_msg: string = "";
  final_Address = [];
  shared_data = this.sharedservice.getData()
  completed


  building_status = false
  landmark_status = false
  area_status = false
  city_status = false
  state_status = false
  country_status = false
  constructor(private navController: NavController,public translate:TranslateService,public sharedservice:SharedService,public platform:Platform,public alertController: AlertController, private el: ElementRef, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, public httpClient: HttpClient) {

    this.getForm()

    
    this.latitude  = localStorage.getItem('map_lat');
    this.longitude = localStorage.getItem('map_longi');


  }

  ngOnInit() {

    // $(document).ready(function () {
    //   alert("Hello from New to design")
    // });
    
  }

  setProgress() {
    console.log(this.totalParentAnswers)
    console.log(this.totalQuestions)
    var progressPercent = this.totalParentAnswers / this.totalQuestions * 100;
    console.log(progressPercent)
    console.log(Math.round(progressPercent))
console.log(this.completed)

    $(".progress-bar").css("width", Math.round(progressPercent) + "%");
    $(".progress-text").text(Math.round(progressPercent) + "% " + this.completed);
  }

  calculateTotalQuestions() {
    
    this.totalQuestions = 0;
    for (var i = 0; i < this.clientForms.length; i++) {
      if (this.clientForms[i].type == 'primary') {
        console.log('calculate Total Questions:', this.totalQuestions);
        this.totalQuestions += JSON.parse(this.clientForms[i].question_ids_json).length;
      } else if (this.clientForms[i].type == 'logic') {
        console.log('calculate Total Questions:', this.totalQuestions);
        console.log(this.clientForms[i].estimate_question);
        this.totalQuestions += this.clientForms[i].estimate_question || 0;
      }
      if (this.clientForms[i].is_submit == true)
        break;
    }
    this.setProgress();
  }

  getForm() {
    let data = new FormData();
    data.append('client_id', localStorage.getItem('Client_id'));
    data.append('lang_id',localStorage.getItem('Lang_id'));
    data.append('platform',localStorage.getItem('platform'));
    data.append('app_version',this.sharedservice.app_version);
    data.append('country_id',localStorage.getItem('Country_id'));
    data.append('city_id',localStorage.getItem('City_id'));


    this.translate.get('completed').subscribe((res: string) => {
      console.log(res)
            this.completed = res;
          })
          var loadertext
          this.translate.get('loadertext').subscribe((res: string) => {
      
            loadertext = res;
          })
          this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('get-forms',data).subscribe((rdata: any) => {
              console.log(rdata);
        this.clientForms = rdata.forms;
        this.dynamicQuestionOptionJson = rdata.questions
        this.category = rdata.categories
        console.log("formdata ", JSON.stringify(this.clientForms))
        console.log("questiondata ", JSON.stringify(this.dynamicQuestionOptionJson));
        this.intiateForm()
        this.calculateTotalQuestions()
     }, error => {
       this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });

// this.sharedservice.presentLoadingDefault()
//     this.httpClient.post(this.apiUrl, data)
//       .subscribe((rdata: any) => {
//         console.log(rdata);
//         this.clientForms = rdata.forms;
//         this.dynamicQuestionOptionJson = rdata.questions
//         this.category = rdata.categories
//         console.log("formdata ", JSON.stringify(this.clientForms))
//         console.log("questiondata ", JSON.stringify(this.dynamicQuestionOptionJson));
//         this.intiateForm()
//         this.calculateTotalQuestions()
//       }, error => {
//         this.sharedservice.loaderDismiss()
//       },()=>{
//         console.log('complete')
//         this.sharedservice.loaderDismiss()
//       });
  }

  next() {
    $("#dynamicNext").attr("disabled", "disabled");
    console.log('clicked ', this.currentTreeOptions)
    
    // Set answers
    this.setAnswers(answer_id => {
      if (this.currentTreeOptions.length == 0) {
        //console.log(currentQuestion);
        // Goto next parent if exists
        this.showNextParentQuestion();
        //this.p_bar += 10;
        //  $(".progress-bar").css("width", Math.round(this.p_bar) + "%");
        //$(".progress-text").text(Math.round(this.p_bar) + "% Completed");
      } else {
        // Continue parsing the tree
        for (var i = 0; i < this.currentTreeOptions.length; i++) {
          var option = this.currentTreeOptions[i];
          if (option.id==undefined || option.id == answer_id) {
            this.currentTreeOptions = option["on_option_id"];
            this.getDynamicQuestions(option["question_id"], null);
            break;
          }
          // Last loop
          if (i == this.currentTreeOptions.length - 1) {
            // None of the option matches the condition
            // Continue to next parent if exists.
            this.showNextParentQuestion();
          }
        }
      }
    });

  }

  ionViewDidEnter() {
   // alert('enter')
      this.subscription = this.platform.backButton.subscribeWithPriority(15,(processNextHandler) => {
        //navigator['app'].exitApp();
        //alert('hit')
      this.back()
      });
  }
   ionViewWillLeave() {
   // alert('exit')
      this.subscription.unsubscribe();
    }


  back() {
    console.log(' back button clicked')
    this.latitude  = localStorage.getItem('map_lat');
    this.longitude = localStorage.getItem('map_longi');
    this.building = this.landmark = this.area = this.city = this.state = this.country = "";
    this.building_status = this.landmark_status = this.area_status = this.city_status = this.state_status = this.country_status = false
    $("#dynamicNext").removeAttr("disabled");
    // Set progress
    //	this.p_bar -= 10;
    //	$(".progress-bar").css("width", Math.round(this.p_bar) + "%");              
    //$(".progress-text").text(Math.round(this.p_bar) + "% Completed");

    if (this.selectedAnswers.length == 0) {
      // Redirect back to actual previous page
      console.log("consent page")
      this.navController.pop()
      
      //window.location.href = baseURL + "shareIncident";
    } else {
      // Back to previous question

      // Get previous question back
      var lastQuestion = this.selectedAnswers.pop();
      if ( this.clientForms[this.currentForm].type=='primary' ||  this.currentParentKey != lastQuestion.currentQuestion.currentParentKey) {
        // Update answer
        this.totalParentAnswers--;
        this.setProgress();
      }

      // Get previous question back
      //	var lastQuestion = this.selectedAnswers.pop();
      this.currentParentKey =
        lastQuestion.currentQuestion.currentParentKey;
      this.currentTreeOptions =
        lastQuestion.currentQuestion.currentTreeOptions;

      // Has form changed to previous form?
      if (this.currentForm != lastQuestion.currentQuestion.currentForm) {
        console.log('form changed!');
        this.currentForm = lastQuestion.currentQuestion.currentForm;
        this.setFormDynamicQuestion(this.clientForms[this.currentForm], callb => {

          // Show the previous question
          this.getDynamicQuestions(
            lastQuestion.currentQuestion.id,
            lastQuestion
          );

        });
      } else {
        // Show the previous question
        this.getDynamicQuestions(
          lastQuestion.currentQuestion.id,
          lastQuestion
        );
      }


    }
    
    return false
  }


  GetFormattedDate(date) {

    // var todayTime = date.string
    console.log(date)
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/');

  }

  //someone else alert
  async verifyAlert() {

    var please_ensure
    this.translate.get('please_ensure').subscribe((res: string) => {

      please_ensure = res;
    })

    var ok
    this.translate.get('ok').subscribe((res: string) => {

      ok = res;
    })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss : false,
      message:please_ensure,
	   mode:'ios',
	     buttons: [{
        text: ok,
        handler: (alertData) => { //takes the data 
         
      }
      }]
    });

    await alert.present();
  }


  setAnswers(callback) {
    // Append form type to answer
    //this.answerJson.form_type = this.clientForms[this.currentForm].name;
    console.log('set answer', this.currentQuestion)
    var properties = JSON.parse(this.currentQuestion['properties']);
    if (properties.type == "radio") {
      var answer_id = $("input[name=" + this.currentQuestion['elementId'] + "]:checked").val();
      var answer = $("input[name=" + this.currentQuestion['elementId'] + "]:checked").data('val');

      var other_answers = {};
      if ($("input[name=" + this.currentQuestion['elementId'] + "]:checked").data('showtextbox') == true) {
        other_answers['answer_id'] = $("input[name=option" + answer_id + "textbox").val();
      }

      if($("input[name="+"option"+ answer_id +"radio"+"]:checked").data('showtextbox')==true) {
        var radionId=$("input[name="+"option"+ answer_id +"radio"+"]:checked").val();
        other_answers['answer_id'] = $("input[name=option"+radionId+"textbox").val();
      }
      

      var subanswer_ids = '';
      // Get suboption answers of type checkbox
      $("input[name=suboption" + answer_id + "checkbox]:checked").each(function (index, el) {
        subanswer_ids += ',' + $(this).val();
        answer += ',' + $(this).data('val');
      });

      // Get suboption answers of type radio
      var selectedSubOptionRadio = $("input[name=suboption" + answer_id + "radio]:checked");
      if (selectedSubOptionRadio.length > 0) {
        subanswer_ids += ',' + $("input[name=suboption" + answer_id + "radio]:checked").val();
        answer += ',' + $("input[name=suboption" + answer_id + "radio]:checked").data('val');
      }


      // Update answer_id by appending subanswer id as well
      answer_id += subanswer_ids;

      if (answer_id == 'undefined') {
        $("#dynamicNext").attr("disabled", "disabled");
        return false;
      }

    

      this.answerJson = {
        "option_id": answer_id,
        "other_answers": other_answers,
        "answer": answer,
        'form_type': this.clientForms[this.currentForm].name
      };
      console.log('RADIO',this.answerJson)

     
      // this.p_bar += 10;
    }
    else if (properties.type == "text") {
      let answer_id = 0;
      let answer = $("#" + this.currentQuestion['elementId']).val();
      this.answerJson = {
        "option_id": answer_id,
        "answer": answer,
        'form_type': this.clientForms[this.currentForm].name
      }
      console.log(this.answerJson)
    }
    else if (properties.type == "checkbox") {
      let answer_id = '';
      let answer = '';
      var other_answers = {};
      var parent_answer_arr = [];
      var main_answer_arr = [];
      var is_valid = true;
      $("input[name=" + this.currentQuestion['elementId'] + "]:checked").each(function (index, el) {
        var this_ans_id = JSON.stringify($(this).val());
        this_ans_id = JSON.parse(this_ans_id)
        answer += ',' + $(this).data('val');
        answer_id += ',' + this_ans_id;
        // Has Subtext? Get textbox value
        if ($(this).data('showtextbox') == true)
          other_answers[this_ans_id] = $("input[name=option" + this_ans_id + "textbox").val();

        // Is Main? Used for logical questions of categories
        if ($(this).data('ismain'))
          main_answer_arr.push(this_ans_id);

        // Has parent id? Used for secondary questions
        var parent_id = $(this).data('parentid');
        parent_id = parent_id == 0 || parent_id == undefined ? parseInt(this_ans_id) : parent_id;
        if (!parent_answer_arr.includes(parent_id))
          parent_answer_arr.push(parent_id);

        // Get answer of suboption of type radio
        // Currently there can only be two types of suboptions i.e. radio and checkbox
        // Checbox suboption answer already gets selected as normal option
        // Below code fetches answer for suboption of type radio.
        if ($(this).data('hassuboptions') == true) {
          //$("#dynamicNext").attr("disabled", "disabled");
          var suboptionElem = $("input[name=suboption" + this_ans_id + "]:checked");
          if (suboptionElem.length > 0) {
            answer += ',' + suboptionElem.data('val');
            answer_id += ',' + suboptionElem.val();
          }
        }
      });


      answer_id = answer_id.replace(',', '');

      if (answer_id == "") {
        $("#dynamicNext").attr("disabled", "disabled");
        return false;
      }
      else {
        var parent_answer_id = parent_answer_arr.sort().join(',');
        var main_answer_id = main_answer_arr.sort().join(',');
        this.answerJson = {
          "option_id": answer_id,
          "main_answer_id": main_answer_id,
          "parent_option_id": parent_answer_id,
          "other_answers": other_answers,
          "answer": "",
          'form_type': this.clientForms[this.currentForm].name
        }
        answer = answer.replace(',', '');
        var parent_answer_id = parent_answer_arr.sort().join(',');
        var main_answer_id = main_answer_arr.sort().join(',');
        this.answerJson = {
          "option_id": answer_id,
          "main_answer_id": main_answer_id,
          "parent_option_id": parent_answer_id,
          "other_answers": other_answers,
          "answer": answer,
          'form_type': this.clientForms[this.currentForm].name
        };

        if (this.currentQuestion['has_logic_dependency'] == "1") {
          this.dependedQuestionsAnswers[this.currentQuestion['id']] = {
            "answers": answer_id,
            "main_answers": main_answer_id,
            "parent_answers": parent_answer_id
          };
        }
      }
      // this.p_bar += 10;
    }
    else if (properties.type == "estimate-datepicker") {
      let answer_id = 0;
      console.log(this.currentQuestion)
      let answer = $("input[name=" + this.currentQuestion['elementId'] + "]").val();
      var isEstimate = $("input[name=" + this.currentQuestion['elementId'] + "checked]").is(':checked');
      var date = this.GetFormattedDate(answer)
      console.log(date)
      if (answer == "") {
        $("#dynamicNext").attr("disabled", "disabled");
        return false;
      }
      this.answerJson = {
        "option_id": answer_id,
        "answer": date,
        "isEstimate": isEstimate,
        'form_type': this.clientForms[this.currentForm].name
      };
      console.log(this.answerJson)
    }
    else if (properties.type == "estimate-time-or-rangepicker") {
      let answer_id = 0;
      let answer1 = $("input[name=" + this.currentQuestion['elementId'] + "]").val();
      var isEstimate = $("input[name=" + this.currentQuestion['elementId'] + "checked]").is(':checked');
      console.log(isEstimate);
      let answer
      if (answer1) {

        var time = JSON.stringify(answer1);
        console.log(answer1)
        var date1 = time.split('T')
        console.log(date1)
        console.log(date1[0])
        console.log(date1[1])
        console.log(date1[1].split('.'))

        var time2 = date1[1].split('.')
        var final_date = time2[0]
        console.log(final_date)
        var time_split = final_date.split(':')
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
        answer = hours + ":" + minutes + " " + am_pm;
        console.log(answer)
      }

      if (answer1 == "") {
        var timeStart1 = $("input[name=" + this.currentQuestion['elementId'] + "start]").val();
        var timeEnd1 = $("input[name=" + this.currentQuestion['elementId'] + "end]").val();
        if (timeStart1 == "" && timeEnd1 == "") {
          if (!$('.timeRange').next('.timeRange_valid').length) {
            $('.timeRange').after('<div class="validdation_time" style="color:red;">' + properties["validations"][0]["startendtime"] + '</div>');
            //$('.timeRange').after('<div class="timeRange_valid" style="color:red;">Please select Start Time and End Time Both.</div>');
          }
          $("#dynamicNext").attr("disabled", "disabled");
          return false;
        }
        else {
          //for timestart
          var time = JSON.stringify(timeStart1);
          console.log(timeStart1)
          var date1 = time.split('T')
          console.log(date1)
          console.log(date1[0])
          console.log(date1[1])
          console.log(date1[1].split('.'))

          var time2 = date1[1].split('.')
          var final_date = time2[0]
          console.log(final_date)
          var time_split = final_date.split(':')
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


          //for timeend
          var timeend = JSON.stringify(timeEnd1);
          console.log(timeEnd1)
          var dateend1 = timeend.split('T')
          console.log(dateend1)
          console.log(dateend1[0])
          console.log(dateend1[1])
          console.log(dateend1[1].split('.'))

          var timeend2 = dateend1[1].split('.')
          var final_enddate = timeend2[0]
          console.log(final_enddate)
          var time_split_end = final_enddate.split(':')
          console.log(time_split_end)

          if (time_split_end[0].charAt(0) == '0') {
            var t = time_split_end[0].slice(1)
            time_split_end[0] = t;
            console.log(time_split_end[0])
          }
          if (time_split_end[1].charAt(0) == '0') {
            var t = time_split_end[1].slice(1)
            time_split_end[1] = t;
            console.log(time_split_end[1])
          }


          let hourend = JSON.parse(time_split_end[0])
          let minuteend = JSON.parse(time_split_end[1])

          console.log(hourend)
          console.log(minute)
          var hoursend = hourend > 12 ? hourend - 12 : hourend;
          var am_pm_end = hourend >= 12 ? "PM" : "AM";
          var minutesend = minuteend < 10 ? "0" + minuteend : minuteend;
          let timeEnd = hoursend + ":" + minutesend + " " + am_pm_end;


          var day = '1 1 1970 ',  // 1st January 1970
      
          hourDiff = ( Date.parse(day + timeEnd) - Date.parse(day + timeStart) ) / 1000 / 60;
          console.log(hourDiff + ' min');
      
      


          if (hourDiff < 0) {
            if (!$('.timeRange').next('.timeRange_valid').length) {
              $('.timeRange').after('<div class="validdation_time" style="color:red;">' + properties["validations"][0]["timediff"] + '</div>');
              //$('.timeRange').after('<div class="timeRange_valid" style="color:red;">End Time is Less Than Start Time.</div>');
            }
            $("#dynamicNext").attr("disabled", "disabled");
            return false;
          }


          console.log(timeStart)
          console.log(timeEnd)
          answer = timeStart + '-' + timeEnd;
          isEstimate = true;
        }
      }
      this.answerJson = {
        "option_id": answer_id,
        "answer": answer,
        "isEstimate": isEstimate,
        'form_type': this.clientForms[this.currentForm].name
      };
      console.log(this.answerJson)
    }
    else if (properties.type == "incident-address-form") {
      let answer_id = 0;
      // var building = $("input[name=" + this.currentQuestion['elementId'] + "building]").val();
      // var landmark = $("input[name=" + this.currentQuestion['elementId'] + "landmark]").val();
      // var area = $("input[name=" + this.currentQuestion['elementId'] + "area]").val();
      // var city = $("input[name=" + this.currentQuestion['elementId'] + "city]").val();
      // var state = $("input[name=" + this.currentQuestion['elementId'] + "state]").val();
      // var country = $("input[name=" + this.currentQuestion['elementId'] + "country]").val();
      // var latitude = $("input[name=" + this.currentQuestion['elementId'] + "latitude]").val();
      // var longitude = $("input[name=" + this.currentQuestion['elementId'] + "longitude]").val();

      // if (area == "" || city == "" || state == "" || country == "") {
      //   if (area == "") {
      //     if (!$('.suburb').next('.validdation_suburb').length) {
      //       $('.suburb').after('<div class="validdation_suburb" style="color:red;">' + properties.validations[0]["message"] + '</div>');
      //     }
      //   }
      //   if (city == "") {
      //     if (!$('.city').next('.validdation_city').length) {
      //       $('.city').after('<div class="validdation_city"><div style="color:red;">' + properties.validations[0]["message"] + '</div>');
      //     }
      //   }
      //   if (state == "") {
      //     if (!$('.state').next('.validdation_state').length) {
      //       $('.state').after('<div class="validdation_state" style="color:red;">' + properties.validations[0]["message"] + '</div>');
      //     }
      //   }
      //   if (country == "") {
      //     if (!$('.country').next('.validdation_country').length) {
      //       $('.country').after('<div class="validdation_country" style="color:red;">' + properties.validations[0]["message"] + '</div>');
      //     }
      //   }
      //   $("#dynamicNext").attr("disabled", "disabled");
      //   return false;
      // }

     // $("#dynamicNext").removeAttr("disabled");
      this.answerJson = {
        "option_id": answer_id,
        "answer": "",
        "address": {
          "building": this.building,
          "landmark": this.landmark,
          "area": this.area,
          "city": this.city,
          "state": this.state,
          "country": this.country,
          "latitude": this.latitude,
          "longitude": this.longitude
        },
        'form_type': this.clientForms[this.currentForm].name
      };
      console.log(this.answerJson)
      // this.p_bar += 10;
    } else if (properties.type == "incident-pin-map") {
      let answer_id = 0;
      var isAccepted = $("input[name=" + this.currentQuestion['elementId'] + "checked]").is(':checked');
      var latitude = $("#" + this.currentQuestion['elementId'] + "latitude").val();
      var longitude = $("#" + this.currentQuestion['elementId'] + "longitude").val();
      this.answerJson = {
        "option_id": 0,
        "answer": "",
        "address": {
          "latitude": latitude,
          "longitude": longitude
        },
        "isAccepted": isAccepted,
        'form_type': this.clientForms[this.currentForm].name
      };
      //this.p_bar += 5;

      console.log(this.answerJson)
    }

    // Save the questions and answers
    if (this.currentTreeOptions.length == 0) {
      this.currentQuestion['currentTreeOptions'] = [];
    } else {
      this.currentQuestion['currentTreeOptions'] = this.currentTreeOptions;
    }
    this.currentQuestion['answerJson'] = this.answerJson;
    this.selectedAnswers.push({ 'currentQuestion': this.currentQuestion });
    console.log(this.selectedAnswers)
    // Return answer id
    callback(answer_id);
  }



  diff_hours(dt2, dt1) 
  {
 
   var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60);
   return Math.abs(diff);
   
  }

  intiateForm() {
    var form = this.clientForms[this.currentForm];
    $("#dynamicNext").attr("disabled", "disabled");
    this.setFormDynamicQuestion(form, call => {
      // Reset counters
      this.currentParentKey = 0;
      if (this.dynamicQuestionJson.length > 0) {
        this.currentTreeOptions = this.dynamicQuestionJson[0]["on_option_id"];

        this.getDynamicQuestions(this.dynamicQuestionJson[0].question_id, null);
      } else {
        this.totalParentAnswers--
        this.showNextParentQuestion();
      }
    });
  }

  setFormDynamicQuestion(form, callback) {
    if (form.type == "logic") {
      // figure out the actual answer to use to get the logical questions
      var logicDetails = JSON.parse(form.question_ids_json);
      var dependant_question_id = logicDetails.dependant_question_id;
      var answer_type = logicDetails.answer_type;
      var dependent_answers
      console.log(logicDetails)
      console.log(this.dependedQuestionsAnswers)
      if (answer_type == "main") {
        dependent_answers = this.dependedQuestionsAnswers[dependant_question_id]["main_answers"];
        console.log(dependent_answers)
      } else if (answer_type == "parent") {
        dependent_answers = this.dependedQuestionsAnswers[dependant_question_id]["parent_answers"];
        console.log(dependent_answers)
      } else {
        // answer_type = "actual"
        dependent_answers = this.dependedQuestionsAnswers[dependant_question_id]["answers"];
        console.log(dependent_answers)
      }
      console.log(dependent_answers)
      // make a ajax call to get combination json data
      var baseURL = this.sharedservice.get_url()
      $.ajax({
        url: baseURL + 'get-logical-questions',
        type: 'POST',
        data: { form_id: form.id, question_id: dependant_question_id, ans_ids: dependent_answers,'lang_id' :  localStorage.getItem('Lang_id'),'platform' : localStorage.getItem('platform') ,  'app_version' : this.sharedservice.app_version,'country_id' : localStorage.getItem('Country_id'),'city_id' : localStorage.getItem('City_id')  },
      })
        .done(data => {
          console.log("success", data);
          var parsedData = data;
          this.dynamicQuestionJson = parsedData.comb_json;
          // Update Progress based on newly added questions
          //totalQuestions += dynamicQuestionJson.length;
          console.log('add ' + this.dynamicQuestionJson.length + ' questions');
          this.clientForms[this.currentForm].estimate_question = this.dynamicQuestionJson.length;
          this.calculateTotalQuestions();
          var relatedquestions = Object.values(parsedData.questions);
          // Update questin options

          relatedquestions.forEach(questionObj => {
            console.log(questionObj)
            console.log(questionObj['question'])
            console.log(questionObj['question'].id)
            console.log(this.dynamicQuestionOptionJson)
            this.dynamicQuestionOptionJson[questionObj['question'].id] = questionObj;
          });
          callback();
        })

      // }) {

      // .fail(function() {
      //   console.log("error");
      // })
      // .always(function() {
      //   console.log("complete");
      // });

      // When data was already available
      /*var parsedJSON = JSON.parse(form.question_ids_json);
      if(parsedJSON[dependent_answers]!=undefined) {
        dynamicQuestionJson = parsedJSON[dependent_answers];
        console.log(dynamicQuestionJson);
      } else {
        dynamicQuestionJson = [];
      }*/
    } else {
      this.dynamicQuestionJson = JSON.parse(form.question_ids_json);
      callback();
    }
  }

  showNextParentQuestion() {

    // We update progress only for answer to parent questions
    console.log('Set progress for parent question!');
    this.totalParentAnswers++;
    this.setProgress();

    if (this.dynamicQuestionJson[this.currentParentKey + 1] != undefined) {
      var nextParent = this.dynamicQuestionJson[++this.currentParentKey];
      this.currentTreeOptions = nextParent["on_option_id"];
      this.getDynamicQuestions(nextParent["question_id"], null);
    } else {
      // dynamicQuestionJson recursion completed
      // Check if form needs to be submitted
      
      var thisForm = this.clientForms[this.currentForm];
      if (thisForm.is_submit == true) {
        // Submit the form and get back id
        var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
        console.log("answer", JSON.stringify(this.selectedAnswers));
        console.log(this.selectedAnswers);
        var baseURL = this.sharedservice.get_url()
        $.ajax({
          url: baseURL + 'save-incident',
          type: 'POST',
          data: { answers_json: JSON.stringify(this.selectedAnswers), incident_id: this.incident_id, user_id: localStorage.getItem('userId'),'client_id' : '1', 'lang_id' : localStorage.getItem('Lang_id'),'platform' : localStorage.getItem('platform') ,  'app_version' : this.sharedservice.app_version ,'country_id' : localStorage.getItem('Country_id'),'city_id' : localStorage.getItem('City_id')},
        })
          .done(data => {
            this.sharedservice.loaderDismiss()
            console.log("success", data);
            var parsedData = data;
            if (parsedData.success == true) {
              this.incident_id = parsedData.incident_id;
              this.shared_data['incident_id'] = this.incident_id
              this.sharedservice.setData(this.shared_data)
              var incident_id = JSON.stringify(this.incident_id)
              localStorage.setItem('incident_id',incident_id)
              console.log(thisForm)
              this.onFormSaved(thisForm);
            } else {
             // alert('Something went wrong!');
            }
          })


      } else {
        // continue with the form recursion
        this.showNextForm();
      }
    }
  }

  onFormSaved(thisForm) {
    console.log('thisform', thisForm)
    // Reset the variables to disable back
    this.clientForms.splice(0, this.currentForm + 1);
    this.currentForm = -1;
    this.currentQuestion = "";
    this.currentParentKey = 0;
    this.currentTreeOptions = [];
    this.selectedAnswers = [];
    this.dynamicQuestionJson = [];
    this.totalParentAnswers = 0;

    if (thisForm.thank_you_web != null) {
      var thankyouJson = JSON.parse(thisForm.thank_you_web);
      console.log(thankyouJson)
      console.log(thankyouJson.title)
      console.log(thankyouJson.content)
      var title = thankyouJson.title;
      var content = thankyouJson.content;
      console.log(title)
      console.log(content)
      // title = JSON.parse(title)
      // content = JSON.parse(content)
      console.log(title)
      console.log(content)
      // this.title = this.sanitizer.bypassSecurityTrustHtml(thankyouJson.title) ; 
      // this.content = this.sanitizer.bypassSecurityTrustHtml(thankyouJson.content);
      // console.log(title)

      // console.log(content)
      $("#dynamic-success-title").html(title);
      $("#dynamic-success-content").html(content);
      var links = '';
      var redirect_url = "";
      thankyouJson.links.forEach(function (link) {
        if (link.is_next)
          links += '<ion-button expand="full" shape="round" class="yesbtn btn w-50 btn_purple mb-4 dynamic-thankyou-next" (click)="help()">' + link.title + '</ion-button>';
        else {
          //var baseURL = 'http://101.53.143.7/~dataduck/safecity_webapp/'
          //redirect_url = link.redirect_url != undefined ? baseURL + link.redirect_url : '#';
          
          links += '<ion-button expand="full" shape="round" fill="outline" class="nobtn btn w-50 btn_p_white dynamic-thankyou-end">' + link.title + '</ion-button>';
        }
        if(thankyouJson.links.length == 1)
        {
          $("#dynamic-success-content").addClass('secondthank');
        }
        else{
          $("#dynamic-success-content").removeClass('secondthank');
        }
      });
      $(".dynamic-success-link").html(links);
      var self = this;
      // Show thank you div
      $(".questionaire").hide();
      $(".thankyou-section").show();
      this.hide_thankyou = true
      this.hide_question = false
      $(".dynamic-thankyou-next").click(function (event) {
        event.preventDefault();
        self.calculateTotalQuestions();
        self.showNextForm();

        setTimeout( () => {
          // Hide thank you div
        $(".thankyou-section").hide();
        $(".questionaire").show();
        self.hide_thankyou = false;
         self.hide_question = true;
      }, 1000);
        console.log('next')
        
      });

      $(".dynamic-thankyou-end").click(function (event) {
        event.preventDefault();
        console.log('help')
        self.router.navigate(['/helplines']);
        //this.resetState();
        //window.location.href = redirect_url;
      });
    } else {
      // continue with the form recursion
      this.showNextForm();
    }
  }

  help() {
    console.log('help')

    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     content : content
    //   }
    // };
    this.router.navigate(['/helplines']);
  }


  showQuestionAgain() {
    //     event.stopPropagation();
    //     event.preventDefault();
    // console.log('question',event)
    $(".thankyou-section").hide();
    $(".questionaire").show();


    this.hide_question = true
    this.hide_thankyou = false
    this.showNextForm();
  }
  showNextForm() {
    if (this.clientForms[this.currentForm + 1] != undefined) {
      this.currentForm++;
      console.log('moving forward to form ' + this.currentForm);
      this.intiateForm();
    } else {
      console.log("The END!");
    }
  }

  getDynamicQuestions(questionId, lastQuestion) {
    var parsedData = this.dynamicQuestionOptionJson[questionId];
    this.currentQuestion = parsedData["question"];
    this.currentQuestion['currentParentKey'] = this.currentParentKey;
    this.currentQuestion['currentForm'] = this.currentForm;

    console.log(this.currentQuestion)
    var hide_span_for_datepicker = JSON.parse(this.currentQuestion['properties'])
    console.log(hide_span_for_datepicker)
    console.log(hide_span_for_datepicker.type)
    console.log(this.currentQuestion['properties']['type'])

    // Set question and subtext
    $("#question_span").html(this.currentQuestion['question']);

    if (hide_span_for_datepicker.type != 'estimate-datepicker' && hide_span_for_datepicker.type != 'estimate-time-or-rangepicker') {
      console.log('in')
      $("#subtext_span").html(this.currentQuestion['subtext']);
    }

    // if(hide_span_for_datepicker.type !=  'estimate-time-or-rangepicker')
    // {
    //   console.log('in')
    //   $("#subtext_span").html(this.currentQuestion['subtext']);
    // }

    this.createDynamicElement(parsedData, lastQuestion);

    //this.saveStateLocally();
  }

  createDynamicElement(data, lastQuestion) {
    var properties = JSON.parse(data.question.properties);
    switch (properties.type) {
      case "radio":
        this.componentRadio(data, lastQuestion);
        break;

      case "text":
        this.componentText(data, properties, lastQuestion);
        break;

      case "estimate-datepicker":
        this.componentEstimateDatepicker(data, lastQuestion);
        break;

      case "estimate-time-or-rangepicker":
        this.componentEstimateTimeOrRangepicker(data, lastQuestion);
        break;

      case "checkbox":
        this.componentCheckbox(data, lastQuestion);
        break;

      case "incident-address-form":
        this.componentIncidentAddressForm(data, properties, lastQuestion);
        break;

      case "incident-pin-map":
        this.componentIncidentPinMap(data, lastQuestion);
        break;

      default:
        this.componentRadio(data, lastQuestion);
        break;
    }

  }

  componentIncidentAddressForm(data, properties, lastQuestion) {
    var self =this
    this.currentQuestion['elementId'] = "option" + data["question"]["id"];
    var answerJson = lastQuestion != null ? lastQuestion.currentQuestion.answerJson : "";
    // this.building = '';
		// 	this.landmark = '';
		// 	this.area = '';
		// 	this.city = '';
		// 	this.state = '';
		// 	this.country = '';
		// 	this.latitude = '';
    //   this.longitude = '';
      
		if(answerJson != "") {
			this.isAccepted = answerJson.isAccepted;
			this.building = answerJson.address.building;
			this.landmark = answerJson.address.landmark;
			this.area = answerJson.address.area;
			this.city = answerJson.address.city;
			this.state = answerJson.address.state;
			this.country = answerJson.address.country;
			this.latitude = answerJson.address.latitude;
			this.longitude = answerJson.address.longitude;
    }
    
    var locate_add_on_map
    this.translate.get('locate_add_on_map').subscribe((res: string) => {

      locate_add_on_map = res;
    })

    var start_typing_select_from_suggestion
    this.translate.get('start_typing_select_from_suggestion').subscribe((res: string) => {

      start_typing_select_from_suggestion = res;
    })

    var start_typing
    this.translate.get('start_typing').subscribe((res: string) => {

      start_typing = res;
    })

    var map_move_pin
    this.translate.get('map_move_pin').subscribe((res: string) => {

      map_move_pin = res;
    })

    var an_exact_location_help_us
    this.translate.get('an_exact_location_help_us').subscribe((res: string) => {

      an_exact_location_help_us = res;
    })

    var address_pinned_on_map

    this.translate.get('address_pinned_on_map').subscribe((res: string) => {

      address_pinned_on_map = res;
    })

    var univercity_of_glocestershire
    this.translate.get('univercity_of_glocestershire').subscribe((res: string) => {

      univercity_of_glocestershire = res;
    })

    var enter_area
    this.translate.get('enter_area').subscribe((res: string) => {

      enter_area = res;
    })

    var please_enter_area

    this.translate.get('please_enter_area').subscribe((res: string) => {

      please_enter_area = res;
    })

    var enter_building

    this.translate.get('enter_building').subscribe((res: string) => {

      enter_building = res;
    })

    var i_confirm

    this.translate.get('i_confirm').subscribe((res: string) => {

      i_confirm = res;
    })

    var example_kurla_road
    
    this.translate.get('example_kurla_road').subscribe((res: string) => {

      example_kurla_road = res;
    })

    var the_info_shared
    this.translate.get('the_info_shared').subscribe((res: string) => {

      the_info_shared = res;
    })

		var elementHtml = `
    <div class="loctioninput">
    <div class="form-group  loctioninput mb-4">
      <label class="themeColorin m-0 p-0 d-block">${locate_add_on_map}<span class="error red">*</span></label>
       <label class="mb-2 p-0 sub-label d-block">${start_typing_select_from_suggestion}</label>
      <input type="text" class="form-control form-text search_address" id="search_address" name="" placeholder="${start_typing}" value="">
   </div>

   <div class="form-group mb-4">
      <label class="themeColorin m-0 p-0 d-block">${map_move_pin}</label>
       <label class="mb-3 p-0 sub-label d-block">${an_exact_location_help_us}</label>
     <div class="mapouter" style="height:467px">
     </div>
   </div>

   <div class="form-group mb-4">
      <label class="themeColorin m-0 p-0 d-block">${address_pinned_on_map}</label>
       <p class="m-0 pt-0 pinned-add">${univercity_of_glocestershire}</p>
   </div>

   <div class="form-group mb-4">
		 	  <label class="themeColor mb-2 p-0 d-block">${enter_area}<span class="error">*</span></label>
		 	  <input type="text" class="form-control form-text" id="area" placeholder="${please_enter_area}" value="">
      </div>
      
   <div class="form-group loctioninput mb-4">
      <label class="themeColorin mb-2 p-0 d-block">${enter_building}</label>
      <input type="text" class="form-control form-text" id="building_address" placeholder="${example_kurla_road}" value="">
   </div>

   <p class="mt-4 pt-2 lignheight20">
     ${the_info_shared}
   </p>


   <div class="custom-control custom-checkbox newchekdot estimate mt-1">
   <label class="custom-control-label eLabel" for="confirm_address">${i_confirm}
     <input type="checkbox" class="custom-control-input estimate map_estimate" id="confirm_address" ${this.isAccepted?'checked':''}>
     <span class="checkmark"></span>
     </label>
   </div>
   </div>
		 `;
    $("#options").html(elementHtml);
    
		//$(".locality").focus();
		$("#options input:text").eq(0).focus();
		
    // Set Address if any
    if(this.country)
    {
      self.showAddress();
    }
    else{
      $(".pinned-add").text('');
    }
		

		// On Building Address Changed
		$("#building_address , #area").keyup(function(e){

      if($(this).attr('id')=='building_address')
				self.building = $(this).val();
			else if($(this).attr('id') == 'area')
				self.area = $(this).val();
        if(self.area.length == 0)
        {
          self.area_status = false
        }
        else
        {
          self.area_status = true
        }

        
      self.showAddress();
      

			// self.building = $(this).val();
			// self.showAddress();
	    });

	    // On confirmation change
	    $("#confirm_address").change(function(event) {
	    	self.isAccepted =  $(this).is(':checked');
	    	self.showAddress();
	    });

		// Initialize Map and Address Search
	    self.initMap('search_address');

  }

  updateMarker() {
		console.log('updating marker');
		console.log(this.latitude, this.longitude);
		var location = new google.maps.LatLng(this.latitude, this.longitude);
		this.mapMarker.setPosition(location);
		this.map.setCenter(location);
	}

	 initMap(searchFieldId) {
     var self = this
	    // Enable autocomplete
	    if(google) {

			/////////////
			// Set map //
      /////////////
      
      // console.log(this.latitude)
      // console.log(this.longitude)
		    var location = new google.maps.LatLng(this.latitude, this.longitude);
		    var options = {
				center: location,
				zoom: 15,
				animation: 'DROP',
				draggable:true,
          fullscreenControl: false,
          gestureHandling: 'cooperative',
			    scaleControl: true,
			};
			var map = new google.maps.Map(document.getElementsByClassName("mapouter")[0], options);
			this.map = map
			////////////////
			// Set Marker //
			////////////////
			var mapMarker = new google.maps.Marker({
				position: location,
                // title: marker.title,
                latitude: this.latitude,
                longitude: this.longitude,
                animation: 'DROP',
                draggable:true, 
            });
			 mapMarker.setMap(map);
this.mapMarker = mapMarker
			// On drag end
			google.maps.event.addListener(mapMarker, 'dragend', function() {
				console.log(this.mapMarker);
				var markerlatlong = mapMarker.getPosition();
				self.latitude = JSON.stringify(mapMarker.getPosition().lat());
				self.longitude = JSON.stringify(mapMarker.getPosition().lng());
				// Reverse Geocode to get Address
				self.geocodeLatLng();
      });
      console.log(self.latitude)
      console.log(self.longitude)

			var geocoder = new google.maps.Geocoder();
this.geocoder = geocoder
			///////////////
			// Searchbox //
			///////////////
			
			// Create the search box
			const input = document.getElementById(searchFieldId);
			const searchBox = new google.maps.places.SearchBox(input);

			// Bias the SearchBox results towards current map's viewport.
			map.addListener("bounds_changed", () => {
			    searchBox.setBounds(map.getBounds());
			});

			// Listen for the event fired when the user selects a prediction and retrieve
			// more details for that place.
			searchBox.addListener("places_changed", () => {
				const places = searchBox.getPlaces();

			    console.log(places);
			    if (places.length == 0) {
			    	self.resetFields("No results found");
			      	return;
			    }
			    var place = places[0];

			    // Set Coordinates
				this.latitude  = place.geometry.location.lat();
				this.longitude = place.geometry.location.lng();
				self.updateMarker();
				var addcomponent = place.address_components;

				// Set Address
			    self.setAddress(addcomponent);

			    /*places.forEach((place) => {
				    if (!place.geometry) {
				        console.log("Returned place contains no geometry");
				        return;
				    }

			      	latitude  = place.geometry.location.lat();
			        longitude = place.geometry.location.lng();
			    });*/

			});

	    }
	}

	// Reverse Geocode
	 geocodeLatLng() {

    console.log(this.latitude)
      console.log(this.longitude)
		const latlng = {
		    lat: parseFloat(this.latitude),
		    lng: parseFloat(this.longitude),
    };
    var geocoder = this.geocoder
		geocoder.geocode({ location: latlng }, (results, status) => {
			console.log(results);
		    if (status === "OK") {
		      if (results[0]) {
            // Set Address
            console.log(results[0].address_components)
		      	this.setAddress(results[0].address_components);
		      } else {
		        this.resetFields("No results found");
		      }
		    } else {
		      this.resetFields("Geocoder failed due to: " + status);
		    }
		});
	}

	setAddress(addcomponent) {
		// Set Address
		this.building = this.landmark = this.area = this.city = this.state = this.country = "";
    this.building_status = this.landmark_status = this.area_status = this.city_status = this.state_status = this.country_status = false;
		if(addcomponent) {
      var street_number ='' 
      var  route = ''
      var localbuilding = '';
      this.final_Address = []
			for(var i = 0 ; i < addcomponent.length ; i++)
			{
        this.final_Address.push(addcomponent[i].long_name)
			    if(addcomponent[i].types[0] == 'country') {
			     	this.country = addcomponent[i].long_name;
             this.country_status = true
			    }
			    else if(addcomponent[i].types[0] == 'administrative_area_level_1') {
			      	this.state = addcomponent[i].long_name;
              this.state_status = true
			    }
			    else if(addcomponent[i].types[0] == 'locality') {
			      	this.city = addcomponent[i].long_name;
              this.city_status = true
			    }
			    else if(addcomponent[i].types[0] == 'postal_code') {
			    }
			    else if(addcomponent[i].types[0] == 'sublocality_level_1') {
			      	this.area = addcomponent[i].long_name;
              this.area_status = true
			    }
			    else if(addcomponent[i].types[0] ==  "sublocality_level_3" || addcomponent[i].types[0] =="sublocality") {
			    	this.landmark = addcomponent[i].long_name;
            this.landmark_status = true
			    }
			    else if(addcomponent[i].types[0] == 'sublocality_level_2') {
			      	localbuilding = addcomponent[i].long_name;
			    }
			    else if(addcomponent[i].types[0] == 'street_number') {
			    	street_number = addcomponent[i].long_name;
			    } else if(addcomponent[i].types[0] == 'route') {
			    	route = addcomponent[i].long_name;
			    }
      }
      
      console.log(this.final_Address)
      var addr = this.final_Address.join(',');
      $(".search_address").val(addr)
      $("#area").val(this.area);
      console.log(addr)
			this.building = street_number+' '+route;
			this.building = this.building.trim()==''?localbuilding:this.building;
    }
    
		$("#building_address").val(this.building);
		this.showAddress();
  }
  
   resetFields(message) {
		this.building = this.landmark = this.area = this.city = this.state = this.country = "";
    this.building_status = this.landmark_status = this.area_status = this.city_status = this.state_status = this.country_status = false
    $("#building_address").val('');
    $("#area").val('');
		$(".pinned-add").text('');
		// Show message like Select a valid address
		// Disable next
		$("#dynamicNext").attr("disabled", "disabled");
	}

	 showAddress() {
    if(this.latitude !=  '' && this.longitude !='' &&  this.country_status == true &&  this.state_status == true )
    {
      console.log('else',this.country,this.state)
      if(this.building != ''  && this.landmark != '')
      {
        console.log('else',this.country,this.state)
       // $(".search_address").text(this.building+', '+this.landmark+', '+this.area+', '+this.city+', '+this.state+', '+this.country);        
        
        $(".pinned-add").text(this.building+', '+this.landmark+', '+this.area+', '+this.city+', '+this.state+', '+this.country);        
      }      
      else if(this.building != '' )
      {
        console.log('else',this.country,this.state)
       /// $(".search_address").text(this.building+','+this.area+', '+this.city+', '+this.state+', '+this.country);        
        $(".pinned-add").text(this.building+','+this.area+', '+this.city+', '+this.state+', '+this.country);
      }
      else if(this.landmark != '')
      {
        console.log('else',this.country,this.state)
        $(".pinned-add").text(this.landmark+', '+this.area+', '+this.city+', '+this.state+', '+this.country);
        //$(".search_address").text(this.landmark+', '+this.area+', '+this.city+', '+this.state+', '+this.country);  
      }
      else if(this.area != ''  && this.city != '')
      {
        console.log('else',this.country,this.state)
        $(".pinned-add").text(this.area+', '+this.city+', '+this.state+', '+this.country);
        //$(".search_address").text(this.area+', '+this.city+', '+this.state+', '+this.country);
      }
      else{
        console.log('else',this.country,this.state)
        $(".pinned-add").text('')
      }
      
    }
    else{
      console.log('else',this.country,this.state)
      $(".pinned-add").text('')
    }
		
		if(this.area_status == true && this.isAccepted == true && this.country && this.state ) {
     
      $("#dynamicNext").removeAttr("disabled");       
		} else {
      $("#dynamicNext").attr("disabled", "disabled");	

		}
	}

  initAutoComplete(elementInitial) {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    var autocomplete = new google.maps.places.Autocomplete(
      // document.getElementById('autocomplete').getElementsByTagName('input')[0],
      document.getElementById(elementInitial + 'building'),
      {}
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(["address_component", "geometry"]);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener("place_changed", function () {
      var place = autocomplete.getPlace();
      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();
      document.getElementById(elementInitial + 'latitude')['value'] = latitude;
      document.getElementById(elementInitial + 'longitude')['value'] = longitude;

      var addcomponent = place.address_components;
      for (var i = 0; i < addcomponent.length; i++) {
        if (addcomponent[i].types[0] == 'country') {
          document.getElementById(elementInitial + 'country')['value'] = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'locality') {
          document.getElementById(elementInitial + 'city')['value'] = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'administrative_area_level_1') {
          document.getElementById(elementInitial + 'state')['value'] = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'sublocality_level_1') {
          document.getElementById(elementInitial + 'area')['value'] = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'sublocality_level_2') {
          document.getElementById(elementInitial + 'building')['value'] = addcomponent[i].long_name;
        }
        else if (addcomponent[i].types[0] == 'postal_code') {
          document.getElementById(elementInitial + 'landmark')['value'] = addcomponent[i].long_name;
        }
        $("#dynamicNext").removeAttr("disabled");
      }

    });
  }

  componentIncidentPinMap(data, lastQuestion) {
    this.currentQuestion['elementId'] = "option" + data["question"]["id"];
    var isAccepted = lastQuestion != null ? lastQuestion.currentQuestion.answerJson.isAccepted : false;
    var latitude = lastQuestion != null ? lastQuestion.currentQuestion.answerJson.location.latitude : '';
    var longitude = lastQuestion != null ? lastQuestion.currentQuestion.answerJson.location.longitude : '';
    if (latitude == '' || longitude == '') {
      console.log('map pin', this.selectedAnswers[this.selectedAnswers.length - 1])
      var prevAnsAdd = this.selectedAnswers[this.selectedAnswers.length - 1].currentQuestion.answerJson.address;
      latitude = prevAnsAdd.latitude;
      longitude = prevAnsAdd.longitude;
    }
    

    var elementHtml = `
    <div class="text-left">
      <div class="mapouter">
      </div>
    </div>
    <div class="custom-control custom-checkbox estimate">
    <p>The information that you share with us anonymously helps shape policy and decision making. Please confirm that you are submitting information true to your knowledge. You can go back and edit your answers before submitting, if needed. </p>
      <label class="custom-checkbox estimate">
	  
    I confirm
      <input type="checkbox" name="option${data["question"]["id"]}checked" class="custom-control-input estimate map_estimate" id="estimate" ${isAccepted?'checked':''} >
      <span class="checkmark"></span>
	  </label>
    </div>
    <input type="hidden" id="option${data["question"]["id"]}latitude" name="option${data["question"]["id"]}latitude" value="${latitude}">
    <input type="hidden" id="option${data["question"]["id"]}longitude" name="option${data["question"]["id"]}longitude" value="${longitude}">
  `;
  $("#options").html(elementHtml);
  $("#dynamicNext").attr("disabled", "disabled");
  if(isAccepted && latitude!='' && longitude!='')
    //$("#dynamicNext").removeAttr("disabled");
    $("#dynamicNext").attr("disabled", "disabled");
  $('input[name=option'+data["question"]["id"]+'checked]').change(function(event) {
    if($(this).is(':checked'))
      $("#dynamicNext").removeAttr("disabled");
    else
      $("#dynamicNext").attr("disabled", "disabled");
  });

    var location = new google.maps.LatLng(latitude, longitude);
    var options = {
      center: location,
      zoom: 15,
      animation: 'DROP',
      draggable: true,
      // disableDefaultUI: true,
      scaleControl: true,
      fullscreenControl: false,
      // Disable Zoom and pan
      //gestureHandling: 'none',
      minZoom: 17,
      maxZoom: 22
      //zoomControl: false
    };

    // Set map
    var map = new google.maps.Map(document.getElementsByClassName("mapouter")[0], options);

    // Set Marker
    var mapMarker = new google.maps.Marker({
      position: location,
      // title: marker.title,
      latitude: latitude,
      longitude: longitude,
      animation: 'DROP',
      draggable: true,
    });
    mapMarker.setMap(map);

    // On drag end
    google.maps.event.addListener(mapMarker, 'dragend', function () {
      var markerlatlong = mapMarker.getPosition();
      var lat = JSON.stringify(mapMarker.getPosition().lat());
      var lng = JSON.stringify(mapMarker.getPosition().lng());
      $("option" + data["question"]["id"] + "latitude").val(lat);
      $("option" + data["question"]["id"] + "longitude").val(lng);
      console.log(lat, lng);
    });
  }

  componentCheckbox(data, lastQuestion) {
    
    var selectedAnswerId =
      lastQuestion != null ? lastQuestion.currentQuestion.answerJson.option_id : null;
    var selectedAnswerArr = selectedAnswerId == null ? [] : selectedAnswerId.split(',');
    this.currentQuestion['elementId'] = "option" + data["question"]["id"];
    var elementHtml = `<div class="row">`;
    var i = 0;
    if (data["question"].is_category == true) {
      var data_options = [];
      var categories = this.category
      categories.forEach(function (category) {
        data_options.push({
          'id': category.id,
          'textbox_placeholder': null,
          'title': category.title,
          'parent_id': category.parent_id,
          'is_main': category.is_main
        });
      });
      data["options"] = data_options;
    }
    var thisQuestion = this.dynamicQuestionOptionJson[data["question"]["id"]];
    var hasSuboptions = thisQuestion['suboptions'] == undefined ? false : true;
    data["options"].sort(function(a, b) {
      return a.order_no - b.order_no;
    });
    data["options"].forEach(function (option) {
      if(option.title != null)
      {
      var showTextbox = option.textbox_placeholder != null;
      var isSelected = selectedAnswerArr.includes(option.id);
      var includesSuboptions = hasSuboptions ? thisQuestion["suboptions"][option.id] != undefined ? true : false : false;
      if (!hasSuboptions)
        elementHtml += `<div class="col-md-6">`;
      elementHtml += `
				<div class="inputGroup custom-control shareincidentform">
				  <input type="checkbox" id="${option.id}" data-id="1"  name="option${data["question"]["id"]}" class="custom-control-input getAttr dynamic-checkbox" value="${option.id}" data-parentid="${option.parent_id}" data-ismain="${option.is_main}" data-val="${option.title[0].toUpperCase()+option.title.substr(1)}" data-hasSuboptions="${includesSuboptions}" data-showtextbox="${showTextbox}" ${isSelected ? "checked" : ""}>
				  <label class="custom-control-label label1" for="${option.id}">${option.title[0].toUpperCase()+option.title.substr(1)}</label>
				</div>
			`;
      if (showTextbox) {
        var text_placeholder = option.textbox_placeholder;
        try {
          console.log('in')
          var text_properties = JSON.parse(option.textbox_placeholder);
          console.log(text_properties)
          text_placeholder = text_properties.placeholder;
          console.log(text_placeholder)
          console.log(text_properties.validations[0])
          // this.text_field_required_msg = text_properties.validations[0].message;
          // console.log(this.text_field_required_msg)
          // this.text_field_valid_msg = text_properties.validations[1].message;
          // console.log(this.text_field_valid_msg)
          
        }
        catch (e) {
          console.log(e)
          console.log('out',option)
          text_placeholder = option.textbox_placeholder;
          console.log(text_placeholder)
        }
        var otheranswers = selectedAnswerId != null ? lastQuestion.currentQuestion.answerJson.other_answers : null;
        var othertextval = otheranswers != null && otheranswers[option.id] != undefined ? otheranswers[option.id] : "";
        elementHtml += `
				<input type="text" class="form-control input1 specifyBox1 shareincidentform ${isSelected ? "" : "d-none"}" name="option${option.id}textbox" placeholder="${text_placeholder}" value="${othertextval}">
				`;
      } else if (hasSuboptions && includesSuboptions) {
        elementHtml += `<ul id="suboption-container-${option.id}" style="${isSelected ? '' : 'display:none'}" class="custom-radio-inside suboption-container">`;

        var subOptionProperties = JSON.parse(option.suboption_properties);
        thisQuestion['suboptions'][option.id].forEach(function (suboption) {
          var isSuboptionSelected = selectedAnswerArr.includes(suboption.id);
          if (subOptionProperties.type == 'checkbox') {
            elementHtml += `
							<li>
							  <div class="inputGroup custom-control shareincidentform">
							    <input type="checkbox" id='${suboption.id}' name="option${data["question"]["id"]}" class="custom-control-input" value="${suboption.id}" data-parentid="${suboption.parent_id}" data-ismain="${suboption.is_main}" data-val="${suboption.title}" data-hasSuboptions="false" data-showtextbox="false" ${isSuboptionSelected ? "checked" : ""} >
							    <label class="custom-control-label label1" for="${suboption.id}">${suboption.title}</label>
							  </div>
							</li>`;
          } else {
            elementHtml += `
							<li>
		                      <div class="inputGroup custom-control shareincidentform">
		                        <input type="radio" id='${suboption.id}' name="suboption${option.id}" class="custom-control-input" value="${suboption.id}"  data-val="${suboption.title}" ${isSuboptionSelected ? "checked" : ""}>
		                        <label class="custom-control-label label1" for="${suboption.id}">${suboption.title}</label>
		                      </div>
		                    </li>`;
          }
        });

        elementHtml += `</ul>`;
      }
      if (!hasSuboptions)
        elementHtml += `</div>`;
    }
    });
    elementHtml += `</div>`;
    console.log(elementHtml)

    $("#options").html(elementHtml);
    var self = this
    $("#options input[type=checkbox]").click(function (event) {
      // if (($('input:checkbox:checked').length) > 0) {
      //   console.log('in')
      //   $("#dynamicNext").removeAttr("disabled");
      // }
      // else {
      //   $("#dynamicNext").attr("disabled", "disabled");
      // }
      var optionid = $(this).attr('id');
      console.log(optionid)
      if ($(this).data('showtextbox') == true) {
        //var optionid = $(this).attr('id');
        if ($(this).is(':checked')) {
          console.log('show a textbox F');
          $("input[name=option" + optionid + "textbox").removeClass('d-none');
        } else {
          console.log('hide a textbox F');
          $("input[name=option" + optionid + "textbox").addClass('d-none');
          $("input[name=option"+optionid+"textbox]+.validdation_text").remove();
        }
      }

      // Handle suboptions toggle
      if ($(this).data('hassuboptions') == true) {
        if ($(this).is(':checked')) {
          $("#suboption-container-" + optionid).fadeIn('slow');
        } else {
          $("#suboption-container-" + optionid).fadeOut('slow');
          // Uncheck all suboptions
          $("#suboption-container-" + optionid + " input[type=checkbox]").prop('checked', false);
          $("#suboption-container-" + optionid + " input[type=radio]").prop('checked', false);
        }
      }


      // Run Validation
      console.log(self.text_field_required_msg)
      self.validate(optionid);

    });

    // Run Validation on textbox
    $("#options input[type=text]").keyup(function (event) {
      self.validate(null);
    });

    $("#options input[type=text]").change(function (event) {
      self.validate(null);
    });

    // Run validation on suboption radio click
		$(".suboption-container input[type=radio]").click(function(event) {
			self.validate(null);
		});

    // Add new event listener
    // $("#dynamicNext").off('click').click(function(event) {
    // 	event.preventDefault();
    // 	var is_valid = self.validate();
    // 	if(is_valid)
    // 		nextClick();
    // });

  }



  validate(clickedId) {
    var self = this;

    var is_valid = true;
    var total_checked = $("#options input[type=checkbox]:checked").length;
    if (total_checked == 0) {
      is_valid = false;
    }
    $("#options input[type=checkbox]:checked").each(function (index, el) {
      var parentOptionId = $(el).attr('id');
      // Check for suboptions validity
      if ($(el).data('hassuboptions') == true) {
        if ($("#suboption-container-" + parentOptionId + " input:checked").length == 0)
          is_valid = false;
      }

      // Check for other textbox validity
      if ($(el).data('showtextbox') == true) {
        var textboxSelector = 'input[name=option' + parentOptionId + 'textbox]';
        console.log(self.ValidateText($('input[name=option' + parentOptionId + 'textbox]').val()))
        if (!self.ValidateText($('input[name=option' + parentOptionId + 'textbox]').val())) {
          is_valid = false;
          if(clickedId!=parentOptionId || clickedId==null) {
						
          if ($(textboxSelector + '+.validdation_text').length == 0)
            $(textboxSelector).after('<div class="validdation_text" style="color:red;">' + self.text_field_required_msg + '</div>');
        }
       } else {
          $(textboxSelector + '+.validdation_text').remove();
        }
      }
    });


    if (!is_valid)
      $("#dynamicNext").attr("disabled", "disabled");
    else
      $("#dynamicNext").removeAttr("disabled");
    return is_valid;

  }

  ValidateText(value) {
    //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
    var regex = /^[\w\s.-]+$/

    //Validate TextBox value against the Regex.
    var isValid = regex.test(value);
    /*if (!isValid) {
        alert("Contains Special Characters.");
    } else {
        alert("Does not contain Special Characters.");
    }*/
    return isValid;
  }

  
 


  componentRadio(data, lastQuestion) {
    console.log(data)
    var self = this;
    var selectedAnswerId =
      lastQuestion != null ? lastQuestion.currentQuestion.answerJson.option_id : null;
    var selectedAnswerArr = selectedAnswerId == null ? [] : selectedAnswerId.split(',');
    this.currentQuestion['elementId'] = "option" + data["question"]["id"];

    var thisQuestion = this.dynamicQuestionOptionJson[data["question"]["id"]];
    var hasSuboptions = thisQuestion['suboptions'] == undefined ? false : true;

    var optionHtml = "";
    
    data["options"].sort(function(a,b) {
      return a.order_no - b.order_no;
    });
    data["options"].forEach(function (option) {
      if(option.title != null)
      {
      var showTextbox = option.textbox_placeholder != null;
      var isSelected = selectedAnswerArr.includes(option.id);
      var includesSuboptions = hasSuboptions ? thisQuestion["suboptions"][option.id] != undefined ? true : false : false;
      optionHtml += `
				<div class="inputGroup custom-control">
				  <input type="radio" data-option_tag="${option.tags}" id="${option.id}" name="option${data["question"]["id"]
        }" class="custom-control-input dynamic-radio" data-val="${option.title[0].toUpperCase()+option.title.substr(1)}"  data-hasSuboptions="${includesSuboptions}" value="${option.id}" 
			${isSelected ? "checked" : ""}
			data-showtextbox="${showTextbox}">
				  <label class="custom-control-label label1" for="${option.id}">${option.title[0].toUpperCase()+option.title.substr(1)
        }</label>
				</div>
			`;
      if (showTextbox) {
        var text_placeholder = option.textbox_placeholder;
        console.log('****',option)
        console.log('****',text_placeholder)
        try {
          console.log('in')
          var text_properties = JSON.parse(option.textbox_placeholder);
          console.log('****',text_properties)
          text_placeholder = text_properties.placeholder;
          self.text_field_required_msg = text_properties.validations[0].message;
          self.text_field_valid_msg = text_properties.validations[1].message;
          
        }
        catch (e) {
          console.log('out')
          text_placeholder = option.textbox_placeholder;
        }
        var otheranswers =  selectedAnswerId!=null?lastQuestion.currentQuestion.answerJson.other_answers:null;
				var othertextval = otheranswers!=null && otheranswers['answer_id']!=undefined?otheranswers['answer_id']:"";
        optionHtml += `
				<input type="text" class="form-control input1 specifyBox1 dynamic-radio-textbox ${isSelected ? "" : "d-none"}" name="option${option.id}textbox" placeholder="${text_placeholder}" value="${othertextval}">
				`;
      } else if (hasSuboptions && thisQuestion["suboptions"][option.id] != undefined) {
        optionHtml += `<ul id="suboption-container-${option.id}" class="custom-radio-inside specifyBoxradio suboption-container" style="${isSelected?'':'display:none'}"`;
				var subOptionProperties = JSON.parse(option.suboption_properties);
				thisQuestion['suboptions'][option.id].forEach(function (suboption) {
					var isSuboptionSelected = selectedAnswerArr.includes(suboption.id);
					if(subOptionProperties.type=='checkbox') {
						optionHtml += `
							<li>
							  <div class="inputGroup custom-control shareincidentform">
							    <input type="checkbox" id='${suboption.id}' name="suboption${option.id}checkbox" class="custom-control-input" value="${suboption.id}" data-parentid="${suboption.parent_id}" data-ismain="${suboption.is_main}" data-val="${suboption.title}" data-hasSuboptions="false" data-showtextbox="false" ${isSuboptionSelected?"checked":""} >
							    <label class="custom-control-label label1" for="${suboption.id}">${suboption.title}</label>
							  </div>
							</li>`;
					} else {
						if(suboption.textbox_placeholder==null){
							optionHtml += `
							<li>
		                      <div class="inputGroup custom-control shareincidentform">
		                        <input type="radio" id='${suboption.id}' name="option${option.id}radio" class="custom-control-input dynamic-radio-suboption" value="${suboption.id}"  data-val="${suboption.title}" ${isSuboptionSelected?"checked":""}>
		                        <label class="custom-control-label label1" for="${suboption.id}">${suboption.title}</label>
		                      </div>
		                    </li>`;
						}else{
							optionHtml += `
							<li>
		                      <div class="inputGroup custom-control shareincidentform">
		                        <input type="radio" id='${suboption.id}' name="option${option.id}radio" class="custom-control-input dynamic-radio-suboption" value="${suboption.id}"  data-val="${suboption.title}" ${isSuboptionSelected?"checked":""} data-showtextbox="true" data-option_tag="null">
		                        <label class="custom-control-label label1" for="${suboption.id}" >${suboption.title}</label>
		                      </div>
		                    </li>`;
		                    optionHtml += `
							<input type="text" id="dynamic-radio-textbox-suboption_id" class="form-control input1 specifyBox1 dynamic-radio-textbox-suboption ${isSuboptionSelected?"":"d-none"}" name="option${suboption.id}textbox" placeholder="${suboption.textbox_placeholder}" value="">
							`;
						}
						
					}
				});
				optionHtml += `</ul>`;
			}
    }
    });
    $("#options").html(optionHtml);
    
    $(".dynamic-radio").click(function (event) {
      $("#dynamicNext").removeAttr("disabled");
      $(".dynamic-radio-textbox").addClass('d-none');
      $('.validdation_text').remove();

      // console.log('option'+ data.options[0].id)
      // var answer_id = $("input[name=" + 'option'+ data.options[0].id + "]:checked").val();
      // var answer = $("input[name="+ 'option'+ data.options[0].id+ "]:checked").data('val');
      // console.log(answer)
      //  // Someone Else
      //  if(answer == 'Someone Else')
      //  {
      //      self.verifyAlert()
      //  }

      var optionid = $(this).attr('id');
      // Handle other textbox toggle
      if ($(this).data('showtextbox') == true) {
        if ($(this).is(':checked')) {
          $("input[name=option" + optionid + "textbox").removeClass('d-none');
        } else {
          $("input[name=option" + optionid + "textbox").addClass('d-none');
          $("input[name=option" + optionid + "textbox]+.validdation_text").remove();
        }
      }


      //Pop-up window information if sharing for someone else
			if($(this).data('option_tag')=='report_for_someone_else') {
				if($(this).is(':checked')) {
          console.log('someone else')
          self.verifyAlert()
				}
      }
      
      // Handle suboptions toggle
      if (!$("#suboption-container-" + optionid).is(':visible')) {
        // Hide all sub options first
        $(".suboption-container").fadeOut('slow');
        $(".suboption-container input[type=checkbox]").prop('checked', false);
        $(".suboption-container input[type=radio]").prop('checked', false);

        // Show sub option if current selection has one
        if ($(this).data('hassuboptions') == true && $(this).is(':checked'))
          $("#suboption-container-" + optionid).fadeIn('slow');
      }

      // Run Validation
      self.validate_radio_sub_option(optionid);
    });

    //for suboption other radion button

//ngo selection
$("body").on('click', '#suboption-container-642 .dynamic-radio-suboption', function(){
  var ngoId = $(this).attr('id');
  
  $('#options [data-val="An NGO"]').val(ngoId);
});

    $(".dynamic-radio-suboption").click(function(event) {
			var suboptionid = $(this).attr('id');
			// Handle other textbox toggle
			if($(this).data('showtextbox')==true) {
				$("#dynamicNext").attr("disabled", "disabled");
				$(".dynamic-radio-textbox-suboption").removeClass('d-none');
			}else{
				$(".dynamic-radio-textbox-suboption").addClass('d-none');
        $('#dynamic-radio-textbox-suboption_id').val('');
			}
			// Run Validation
			
		});


		// $(".dynamic-radio-suboption").click(function(event) {
		// 	var suboptionid = $(this).attr('id');
    //   console.log('suboption id',suboptionid)
		// 	// Handle other textbox toggle
		// 	if($(this).data('showtextbox')==true) {
		// 		$("#dynamicNext").attr("disabled", "disabled");
		// 		$(".dynamic-radio-textbox-suboption").removeClass('d-none');
		// 	}else{
		// 		$(".dynamic-radio-textbox-suboption").addClass('d-none');
    //     // $("input[name=option"+suboptionid+"textbox]+.dynamic-radio-textbox-suboption").remove();
		// 	}
		// 	// Run Validation
			
		// });

    // Run validation on suboption click
    $(".suboption-container input").click(function (event) {
      self.validate_radio_sub_option(null);
    });

    // Run Validation on textbox
    $("#options input[type=text]").keyup(function (event) {
      self.validate_radio_sub_option(null);
    });

    $("#options input[type=text]").change(function (event) {
      self.validate_radio_sub_option(null);
    });
    
  }


  validate_radio_sub_option(clickedId) {
    var is_valid = true;
    var self = this
    var total_checked = $("#options input[type=radio]:checked").length;
    if (total_checked == 0) {
      is_valid = false;
    }
    $("#options input[type=radio]:checked").each(function (index, el) {
      var parentOptionId = $(el).attr('id');
      // Check for suboptions validity
      if ($(el).data('hassuboptions') == true) {
        if ($("#suboption-container-" + parentOptionId + " input:checked").length == 0)
          is_valid = false;
      }

      // Check for other textbox validity
      if ($(el).data('showtextbox') == true) {
        var textboxSelector = 'input[name=option' + parentOptionId + 'textbox]';
        if (!self.ValidateText($('input[name=option' + parentOptionId + 'textbox]').val())) {
          // Check if textbox is shown just now (not dirty)
          is_valid = false;
					if(clickedId!=parentOptionId || clickedId==null) {
						
          if ($(textboxSelector + '+.validdation_text').length == 0)
            $(textboxSelector).after('<div class="validdation_text" style="color:red;">' + self.text_field_required_msg + '</div>');
        }
       } else {
          $(textboxSelector + '+.validdation_text').remove();
        }
      }
    });


    if (!is_valid)
      $("#dynamicNext").attr("disabled", "disabled");
    else
      $("#dynamicNext").removeAttr("disabled");
    return is_valid;
  }

  /** Custom components */
  componentText(data, properties, lastQuestion) {
    var answer = lastQuestion != null ? lastQuestion.currentQuestion.answerJson.answer : "";
    this.currentQuestion['elementId'] = "option" + data["question"]["id"];

    /*var attr = properties.validations;
    if (typeof attr !== typeof undefined && attr !== false) {
        console.log(attr);
    }*/
    console.log(properties.validations.length);
    if (properties.validations.length == 4) {
      var validation_type = properties.validations[1].type != null ? properties.validations[1].type : "text";
      var number_req_msg = '<div class="validdation_text" style="color:red;">' + properties["validations"][0]["message"] + '</div>';
      var number_type_msg = '<div class="validdation_text" style="color:red;">' + properties["validations"][1]["message"] + '</div>';
      var number_min_msg = '<div class="validdation_text" style="color:red;">' + properties["validations"][2]["message"] + '</div>';
      var number_max_msg = '<div class="validdation_text" style="color:red;">' + properties["validations"][3]["message"] + '</div>';
    }
    else {
      var number_req_msg = '<div class="validdation_text" style="color:red;">' + properties["validations"][0]["message"] + '</div>';
      var text_alpha_valid_msg = '<div class="validdation_text" style="color:red;">' + properties["validations"][1]["message"] + '</div>';
    }

    console.log(validation_type);
    if (validation_type == 'number') {
      var elementHtml = `<input type="${properties.validations[1].type}" id="option${data["question"]["id"]}" class="form-control inputBox getAge" name="option${data["question"]["id"]}" placeholder="${properties.placeholder}" value="${answer}" min="${properties.validations[2].min}" max="${properties.validations[3].max}" >`;
    }
    else {
      var elementHtml = `<input type="text" id="option${data["question"]["id"]}" class="form-control inputBox getAge" name="option${data["question"]["id"]}" placeholder="${properties.placeholder}" value="${answer}" >`;
    }
    //var elementHtml = `<input type="text" id="option${data["question"]["id"]}" class="form-control inputBox getAge" name="option${data["question"]["id"]}" placeholder="${properties.placeholder}" value="${answer}" >`;
    //console.log(elementHtml);
    $("#options").html(elementHtml);

    $('.inputBox').focus();


    $(".inputBox").change(function (e) {
      console.log('20202020202020202020202020')
      $('.validdation_text').remove();
      if (validation_type == 'number') {
        var input_val = $(".inputBox").val();
        if (input_val) {
          if (input_val < 18) {
            $('.inputBox').after('<div class="validdation_text" style="color:red;">' + number_min_msg + '</div>');
            $("#dynamicNext").attr("disabled", "disabled");
          }
          else if (input_val > 120) {
            $('.inputBox').after('<div class="validdation_text" style="color:red;">' + number_max_msg + '</div>');
            $("#dynamicNext").attr("disabled", "disabled");
          }
          else {
            $('.validdation_text').remove();
            $("#dynamicNext").removeAttr("disabled");
          }
        }
        else {
          $('.inputBox').after('<div class="validdation_text" style="color:red;" >' + number_type_msg + '</div>');
          $("#dynamicNext").attr("disabled", "disabled");
        }
      }
      else {

        $('.validdation_text').remove();
        $("#dynamicNext").removeAttr("disabled");

        if (($(".inputBox").val()) != "") {
          // let txt_value = JSON.stringify($(".inputBox").val());
          // console.log(JSON.parse(txt_value))
          // var regex = /^[\w\s.-]+$/
          // var value1 = JSON.parse(txt_value)
          // //Validate TextBox value against the Regex.
          // var isValid = regex.test(value1);
          // console.log(isValid)
          // if (isValid) {


          $('.validdation_text').remove();
          $("#dynamicNext").removeAttr("disabled");
          // }
          // else {
          //   $('#options').append('<div class="validdation_text" style="color:red;">' + text_alpha_valid_msg + '</div>');
          //   $("#dynamicNext").attr("disabled", "disabled");
          // }
        }
        else {
          $('#options').append('<div class="validdation_text" style="color:red;">' + number_req_msg + '</div>');
          $("#dynamicNext").attr("disabled", "disabled");
        }

      }
    });

    $(".inputBox").keyup(function (e) {
      console.log('20202020202020202020202020')
      $('.validdation_text').remove();
      if (validation_type == 'number') {
        var input_val = $(".inputBox").val();
        if (input_val) {
          if (input_val < 18) {
            $('.inputBox').after('<div class="validdation_text" style="color:red;">' + number_min_msg + '</div>');
            $("#dynamicNext").attr("disabled", "disabled");
          }
          else if (input_val > 120) {
            $('.inputBox').after('<div class="validdation_text" style="color:red;">' + number_max_msg + '</div>');
            $("#dynamicNext").attr("disabled", "disabled");
          }
          else {
            $('.validdation_text').remove();
            $("#dynamicNext").removeAttr("disabled");
          }
        }
        else {
          $('.inputBox').after('<div class="validdation_text" style="color:red;" >' + number_type_msg + '</div>');
          $("#dynamicNext").attr("disabled", "disabled");
        }
      }
      else {

        $('.validdation_text').remove();
        $("#dynamicNext").removeAttr("disabled");

        if (($(".inputBox").val()) != "") {
          // let txt_value = JSON.stringify($(".inputBox").val());
          // console.log(JSON.parse(txt_value))
          // var regex = /^[\w\s.-]+$/
          // var value1 = JSON.parse(txt_value)
          // //Validate TextBox value against the Regex.
          // var isValid = regex.test(value1);
          // console.log(isValid)
          // if (isValid) {


          $('.validdation_text').remove();
          $("#dynamicNext").removeAttr("disabled");
          // }
          // else {
          //   $('#options').append('<div class="validdation_text" style="color:red;">' + text_alpha_valid_msg + '</div>');
          //   $("#dynamicNext").attr("disabled", "disabled");
          // }
        }
        else {
          $('#options').append('<div class="validdation_text" style="color:red;">' + number_req_msg + '</div>');
          $("#dynamicNext").attr("disabled", "disabled");
        }

      }
    });


  }



  /** Get Todays date helper */
  getTodayDate(format) {
    var date = new Date().toJSON().slice(0, 10);
    console.log(date)
    switch (format) {
      case 'Y-m-d':
        return date;
      case 'd-m-Y':
        return date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);
      case 'm-d-Y':
        return date.slice(5, 7) + '/' + date.slice(8, 10) + '/' + date.slice(0, 4);
      default:
        return date;
    }
  }

  componentEstimateDatepicker(data, lastQuestion) {
    this.currentQuestion['elementId'] = "option" + data["question"]["id"];
    var answer = lastQuestion != null ? lastQuestion.currentQuestion.answerJson.answer : "";
    
    var isEstimate = lastQuestion != null ? lastQuestion.currentQuestion.answerJson.isEstimate : false;
     var elementHtml = "";

     
   // var setDate = answer == "" ? this.getTodayDate('Y-m-d') : answer;
    var de =new Date();
        var d = new Date(de),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
        
            var date =  [year, month, day].join('-');
        
    console.log(date)
        
var select_date


this.translate.get('select_date').subscribe((res: string) => {

  select_date = res;
})


var this_is_an_estimate


this.translate.get('this_is_an_estimate').subscribe((res: string) => {

  this_is_an_estimate = res;
})

    elementHtml = `<ion-list>
  <ion-item class="newtextthree">
 <ion-label position="stacked">${select_date}</ion-label>
   <!-- <ion-img width="24" height="24" src="assets/images/icons/calendar.svg" tappable item-right> </ion-img>  -->
 <div class="new">
 <ion-datetime  displayFormat="YYYY-MM-DD" id="datetimepicker" name="option${data["question"]["id"]}" data-target="#datetimepicker" data-target="#datetimepicker" data-toggle="datetimepicker" [dayShortNames]="customDayShortNames"
  placeholder="${select_date}"  max="${date}"></ion-datetime>
<ion-icon name="" class="newcal" slot="end"></ion-icon>
</div>

</ion-item>

</ion-list>
<label class="custom-checkbox estimate">
${this_is_an_estimate}
  <input type="checkbox"  class="custom-control-input estimate" id="estimate"  name="option${data["question"]["id"]}checked" ${isEstimate ? "checked" : ""}>
  <span class="checkmark"></span>

                     </label>
                     `


    // `<div class="input-group date selectDate" id="datetimepicker" data-target-input="nearest">
    //                       <input type="text" class="form-control datetimepicker-input getDate"  name="option${data["question"]["id"]}" data-target="#datetimepicker">
    //                       <div class="input-group-append" data-target="#datetimepicker" data-toggle="datetimepicker">
    //                         <div class="input-group-text"> <img src="assets/images/calender.png" class="img-fluid"></div>
    //                       </div>
    //                     </div>
    //                     <div class="custom-control custom-checkbox estimate">
    //                       <input type="checkbox" name="option${data["question"]["id"]}checked" class="custom-control-input estimate" id="estimate" ${isEstimate?"checked":""}>
    //                       <label class="custom-control-label eLabel" for="estimate">This is an estimate</label>
    //                     </div>`;
    $("#options").html(elementHtml);




    // Initialize Datepicker
    var todaydate = new Date();
    // $('#datetimepicker').datetimepicker({
    //      format: 'L', 
    //      todayHighlight: true,
    //      showClose: true,
    //      toolbarplacement: 'bottom',
    //      showClear: true,
    //      //showClose: true,
    //      endDate: todaydate,
    //      maxDate: todaydate,
    //      icons: { 
    //        close: 'OK'
    //      },
    //      // debug: true
    // });
    //$('#datetimepicker').data("datetimepicker").date(setDate);

    $("#dynamicNext").removeAttr("disabled");

    $("#datetimepicker").click(function (event) {
      $("#dynamicNext").removeAttr("disabled");
    });
  }

  componentEstimateTimeOrRangepicker(data, lastQuestion) {
    this.currentQuestion['elementId'] = "option" + data["question"]["id"];
    var answer = lastQuestion != null ? lastQuestion.currentQuestion.answerJson.answer : "";
    var selectedTime = answer != "" && !answer.includes("-") ? answer : "";
    var selectedStarTime = answer.includes("-") ? answer.split("-")[0] : "";
    var selectedEndTime = answer.includes("-") ? answer.split("-")[1] : "";
    var isEstimate = lastQuestion != null ? lastQuestion.currentQuestion.answerJson.isEstimate : false;
    var elementHtml = "";
    var select_time

    
this.translate.get('select_time').subscribe((res: string) => {

  select_time = res;
})

var select_time_range

this.translate.get('select_time_range').subscribe((res: string) => {

  select_time_range = res;
})

var clear_time
this.translate.get('clear_time').subscribe((res: string) => {

  clear_time = res;
})

var clear_time_range
this.translate.get('clear_time_range').subscribe((res: string) => {

  clear_time_range = res;
})

var or
this.translate.get('or').subscribe((res: string) => {

  or = res;
})


var this_is_an_estimate


this.translate.get('this_is_an_estimate').subscribe((res: string) => {

  this_is_an_estimate = res;
})

var to

this.translate.get('to').subscribe((res: string) => {

  to = res;
})

    elementHtml = `
    
  <ion-row>
        <ion-col size="12">
  <div class="newtextfour">
 
  <ion-row class="mainTime" >
        <ion-col size="12">
   <ion-list>
     <ion-item>
    <ion-label position="stacked" >${select_time}</ion-label>
       <div class="new">
     <ion-datetime class="input-group-append timePick timepicker" id="timepicker"  picker-format="hh : mm A" display-format="hh : mm A" name="option${data["question"]["id"]}" placeholder=${select_time} ></ion-datetime>
     <ion-icon name="" class="newtime" slot="end"></ion-icon>
     
     </div>
       </ion-item>
    <ion-item class="newclearitem">
    <p  class="clearTime themeColor newclear" >${clear_time}</p>
       </ion-item>
  <label class="custom-checkbox estimate">
${this_is_an_estimate}
  <input type="checkbox" class="estimate1" id="estimate1" name="option${data["question"]["id"]}checked" ${isEstimate ? "checked" : ""}>
  <span class="checkmark"></span>

                     </label>
   
  </ion-list>
  </ion-col>
     </ion-row>
        <ion-row>
        <ion-col size="12">
      <div class="newadd">${or}</div>
      </ion-col>
     </ion-row>

     <ion-row class="timeRange">
        <ion-col size="12">
  <ion-list>
  <ion-list-header >
    <ion-label class="topmargin" >${select_time_range}</ion-label>
  </ion-list-header>
   <ion-item class="timenext">
  
       <div class="new">
     <ion-datetime id="timepicker1" class="input-group-append rangeTime selectTime startTime"   picker-format="hh : mm A" display-format="hh : mm A" name="option${data["question"]["id"]}start" placeholder=${select_time} ></ion-datetime>
     <ion-icon name="" class="newtime" slot="end" ></ion-icon>
     </div>
  </ion-item >
    <ion-item class="newarea">
    <ion-label position="stacked" >${to}</ion-label>
  </ion-item >
    <ion-item class="timenext">
    
    <div class="new">
     <ion-datetime id="timepicker2" class="input-group-append rangeTime selectTime endTime"   picker-format="hh : mm A" display-format="hh : mm A" name="option${data["question"]["id"]}end" placeholder=${select_time}  ></ion-datetime>
     <ion-icon name="" class="newtime" slot="end"></ion-icon>
     </div>
  
  </ion-item>
  <ion-item class="newclear">
  <p class="clearTimeRange themeColor newclear"  >${clear_time_range}</p>
  </ion-item>
  </ion-list>
  
  </ion-col>
     </ion-row>
     </div>
      </ion-col>
     </ion-row>`



    // `<div class="mainTime">
    //                   <div class="row">
    //                     <div class="col-md-8">
    //                       <div class="input-group date selectTime" id="timepicker" data-target-input="nearest">
    //                         <input type="text" class="form-control datetimepicker-input timepicker" name="option${data["question"]["id"]}" data-target="#timepicker" value=""/>
    //                         <div class="input-group-append timePick" data-target="#timepicker" data-toggle="datetimepicker">
    //                           <div class="input-group-text">
    //                             <img src="assets/images/timer.png" class="img-fluid">
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div class="col-md-4">
    //                       <a class="clearTime btn animated fadeInUp pull-right mt-0 themeColor">Clear Time</a>
    //                     </div>
    //                   </div>
    //                   <div class="custom-control custom-checkbox estimate mb-20">
    //                     <input type="checkbox" name="option${data["question"]["id"]}checked" class="custom-control-input estimate1" id="estimate1" ${isEstimate?"checked":""}>
    //                     <label class="custom-control-label eLabel" for="estimate1">This is an estimate</label>
    //                   </div>
    //                 </div>

    //                 <div class="timeRange">
    //                   <div class="text-center">
    //                     <label class="themeColor">OR</label>
    //                   </div>
    //                   <div class="row">
    //                     <div class="col-md-12">
    //                       <label>
    //                         <h6 class="textColor">Select a Time Range</h6>
    //                       </label>
    //                     </div>
    //                     <div class="col-md-12">
    //                       <div class="row">
    //                         <div class="col-md-12">
    //                           <div class="row">
    //                             <div class="col-md-8">
    //                               <div class="col-md-5 p-0 float-left">
    //                                 <div class="input-group date selectTime" id="timepicker1" data-target-input="nearest">
    //                                   <input type="text" name="option${data["question"]["id"]}start" class="form-control datetimepicker-input startTime" data-target="#timepicker1" value=""/>
    //                                   <div class="input-group-append rangeTime" data-target="#timepicker1" data-toggle="datetimepicker">
    //                                     <div class="input-group-text"><img src="assets/images/timer.png" class="img-fluid"></div>
    //                                   </div>
    //                                 </div>
    //                               </div>
    //                               <div class="col-md-2 text-center p-0 float-left">
    //                                 <span class="themeColor">To</span>
    //                               </div>
    //                               <div class="col-md-5 p-0 float-left">
    //                                 <div class="input-group date selectTime" id="timepicker2" data-target-input="nearest">
    //                                   <input type="text" name="option${data["question"]["id"]}end" class="form-control datetimepicker-input endTime" data-target="#timepicker2" value=""/>
    //                                   <div class="input-group-append rangeTime" data-target="#timepicker2" data-toggle="datetimepicker">
    //                                     <div class="input-group-text"><img src="assets/images/timer.png" class="img-fluid"></div>
    //                                   </div>
    //                                 </div>
    //                               </div>
    //                             </div>
    //                             <div class="col-md-4">
    //                               <a class="clearTimeRange btn animated fadeInUp pull-right mt-0 themeColor">Clear Time Range</a>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div> 
    //                 </div>
    //               `;
    $("#options").html(elementHtml);

    // Intialize Timepickers
    //   $('#timepicker').datetimepicker({
    //     format: 'LT',
    //   });
    // $('#timepicker').data("datetimepicker").date(selectedTime);

    //   $('#timepicker1').datetimepicker({
    //     format: 'LT',
    //   });
    // $('#timepicker1').data("datetimepicker").date(selectedStarTime);

    //   $('#timepicker2').datetimepicker({
    //     format: 'LT',
    //   });
    // $('#timepicker2').data("datetimepicker").date(selectedEndTime);

    // // Hide a picker if ones value is already selected
    // if (selectedTime != "") {
    //   $('.timeRange').css('opacity', '0.2').css('pointer-events', 'none');
    //   //$("#dynamicNext").removeAttr("disabled");
    // } else if (selectedStarTime != "" && selectedEndTime != "") {
    //   $('.mainTime').css('opacity', '0.2').css('pointer-events', 'none');
    //   //$("#dynamicNext").removeAttr("disabled");
    // }

    // Hide/show other picker based on selections
    var self = this;
    $(".timePick").change(function (e) {
      let answer1 = $("input[name=" + self.currentQuestion['elementId'] + "]").val();
      console.log(answer1)
    });
    $(".timePick").click(function (e) {
      $('.startTime').val('');
      $('.endTime').val('');
      console.log('in')
      
      $('.timeRange').css('opacity', '0.2').css('pointer-events', 'none');
      $(".timeRange_valid").remove();
      $("#dynamicNext").removeAttr("disabled");
      $('.validdation_time').remove();
    });

    $(".clearTime").click(function (e) {
      $('.timepicker').val('');
      $('.estimate1').prop('checked', false);
      $('.timeRange').css('opacity', '1').css('pointer-events', 'all');
      $("#dynamicNext").attr("disabled", "disabled");
      $('.validdation_time').remove();
    });

    $(".rangeTime").click(function (e) {
      console.log(e)
      $('.timepicker').val('');
      $('.estimate1').prop('checked', false);
      $('.mainTime').css('opacity', '0.2').css('pointer-events', 'none');
      $(".timeRange_valid").remove();
      $("#dynamicNext").removeAttr("disabled");
      $('.validdation_time').remove();
    });

    $(".clearTimeRange").click(function (e) {
      console.log(e)
      $('.startTime').val('');
      $('.endTime').val('');
      $('.mainTime').css('opacity', '1').css('pointer-events', 'all');
      $("#dynamicNext").attr("disabled", "disabled");
      $('.validdation_time').remove();
    });
  }





}









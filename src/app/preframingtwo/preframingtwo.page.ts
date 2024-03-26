import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service'
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core'
import * as $ from 'jquery'
@Component({
  selector: 'app-preframingtwo',
  templateUrl: './preframingtwo.page.html',
  styleUrls: ['./preframingtwo.page.scss'],
})
export class PreframingtwoPage implements OnInit {
  buttonDisabled = true;
  error: boolean = false;
  data
  content
  hide = false
  hide_for_jordan = false
  hide_for_jordan_p = false
  constructor(private navController: NavController, public translate: TranslateService,private sharedservice: SharedService, private sanitizer: DomSanitizer, private router: Router) {

    var self = this;

    //this.isEstimate = false
    let data = new FormData();
    data.append('security_key', '8140c7e293aaa1c933b29b53a2a9140cf176dcfd');
    data.append('country_id', localStorage.getItem('Country_id'));
    data.append('client_id', localStorage.getItem('Client_id'));
    data.append('lang_id', localStorage.getItem('Lang_id'));
    if(localStorage.getItem('Country_id') == '111')
    {
      data.append('type', 'welcome');
      this.hide_for_jordan = true;
      this.hide = false;
    }
    else
    {
      data.append('type', 'consent');
      this.hide_for_jordan = false;
      this.hide = true;
    }
    
    data.append('content_for', 'mobile');
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('faq/getClientResourceList', data).subscribe((rdata: any) => {
      console.log(rdata);
      this.data = rdata['data']

      this.sharedservice.loaderDismiss()
      console.log(this.data)
      this.content = this.data[0].content
      
      $(".dynamic-success-link1").html(this.content);
      $(".checkerrors").hide()
      $(".dynamic-click").attr("disabled", "disabled");
      $(".dynamic-click").click(function (event) {
        event.preventDefault();
        self.addReport1()
        console.log('next')

      });

      $(".dynamic-privacy").click(function (event) {
        event.preventDefault();


        console.log('privacy');
        self.policy()

      });


      $("#estimate").click(function (event) {
        // event.preventDefault();
        //console.log($("input[name='hidechecked]").is(':checked'))
        // var isEstimate = $(this).is(":checked");

        if ($(this).is(":checked")) {
          console.log("Checkbox is checked.");
          $(".dynamic-click").removeAttr("disabled");
         // $(".checkerrors").hide()
        }
        else if ($(this).is(":not(:checked)")) {
          console.log("Checkbox is unchecked.");
          //$(".checkerrors").show();
          $(".dynamic-click").attr("disabled", "disabled");
        }
        // console.log(isEstimate)
        console.log('next', event)

      });

    }, error => {
      this.sharedservice.loaderDismiss()
    },()=>{
      console.log('complete')
      this.sharedservice.loaderDismiss()
    });
  }

  ngOnInit() {
  }

  // ***********************************Button unable disable***********************************
  ButtonEnableDisable(e: any) {
    // console.log(e.detail.checked);
    if (e.detail.checked == true) {
      // console.log("in")
      this.buttonDisabled = false;
      this.error = false;
    }
    else {
      this.buttonDisabled = true;
      this.error = true;

    }

  }

  experiance()
  {
    var self = this;

    //this.isEstimate = false
    let data = new FormData();
    data.append('security_key', '8140c7e293aaa1c933b29b53a2a9140cf176dcfd');
    data.append('country_id', localStorage.getItem('Country_id'));
    data.append('client_id', localStorage.getItem('Client_id'));
    data.append('lang_id', localStorage.getItem('Lang_id'));
    if(localStorage.getItem('Country_id') == '111')
    {
      data.append('type', 'experience');
      this.hide_for_jordan = false;
      this.hide_for_jordan_p = true;
      this.hide = true;
      console.log(this.hide,this.hide_for_jordan,this.hide_for_jordan_p)
    }
    else
    {
      data.append('type', 'consent');
      this.hide = true
    }
    
    data.append('content_for', 'mobile');
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('faq/getClientResourceList', data).subscribe((rdata: any) => {
      console.log(rdata);
      this.data = rdata['data']

      this.sharedservice.loaderDismiss()
      console.log(this.data)
      this.content = this.data[0].content
      this.hide = true;
      $(".dynamic-success-link1").html(this.content);
      $(".checkerrors").hide()
      $(".dynamic-click").attr("disabled", "disabled");
      $(".dynamic-click").click(function (event) {
        event.preventDefault();
        self.addReport1()
        console.log('next')

      });

      $(".dynamic-privacy").click(function (event) {
        event.preventDefault();


        console.log('privacy');
        self.policy()

      });


      $("#estimate").click(function (event) {
        // event.preventDefault();
        //console.log($("input[name='hidechecked]").is(':checked'))
        // var isEstimate = $(this).is(":checked");

        if ($(this).is(":checked")) {
          console.log("Checkbox is checked.");
          $(".dynamic-click").removeAttr("disabled");
         // $(".checkerrors").hide()
        }
        else if ($(this).is(":not(:checked)")) {
          console.log("Checkbox is unchecked.");
          //$(".checkerrors").show();
          $(".dynamic-click").attr("disabled", "disabled");
        }
        // console.log(isEstimate)
        console.log('next', event)

      });

    }, error => {
      this.sharedservice.loaderDismiss()
    },()=>{
      console.log('complete')
      this.sharedservice.loaderDismiss()
    });
  }

  addReport1() {
    this.navController.navigateForward(`primaryform`);
  }

  policy() {
    this.navController.navigateForward(`privacypolicy`);
  }
}

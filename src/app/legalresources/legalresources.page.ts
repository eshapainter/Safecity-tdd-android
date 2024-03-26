import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {SharedService} from '../shared.service'
import {TranslateService} from '@ngx-translate/core'
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-legalresources',
  templateUrl: './legalresources.page.html',
  styleUrls: ['./legalresources.page.scss'],
})
export class LegalresourcesPage implements OnInit {
  public form: FormGroup;
  country
  selected_country
  country_list
  constructor(private navController: NavController,public translate:TranslateService,private sharedservice : SharedService, public formBuilder: FormBuilder,private router: Router,public alertController: AlertController) { 
    
    // this.country =  localStorage.getItem('Country_id')
    // this.form = formBuilder.group({
    //   country: [this.country ]
      
    // });

    this.getcountryList()
  }

  ngOnInit() {
    this.presentAlert();
    setTimeout(()=>{
      this.country =  localStorage.getItem('Country_id')
    },700);
  
  }

  getCountry(e) {
    console.log(e.detail.value)
    this.selected_country = e.detail.value
    if (e.detail.value != "") {
      //localStorage.setItem('Country_id',this.selected_country)
     
    }
  }

  getcountryList() {
    let data = new FormData();
    data.append('security_key', '2be6704a76b7a502e2e56dd371228f2ad1d8afcc');
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('common_controller/countryList',data).subscribe((rdata: any) => {
      console.log(rdata);
      this.country_list = rdata['data']
    console.log(this.country_list)
    //this.getCityByCountry()     
    
    }, error => {
      this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });
  }

  
   police() {
this.navController.navigateForward(`/police`);
  }
  
    ipc() {
this.navController.navigateForward(`/ipc`);
  }
  
   fir() {
this.navController.navigateForward(`/filing-fir`);
  }
  
    async presentAlert() {
var message
var btn_msg 
this.translate.get('popup_content').subscribe((res: string) => {

  message = res;
})

      this.translate.get('i_understand').subscribe((res: string) => {

        btn_msg = res;
      })

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss : false,
      message: message,
	   mode:'ios',
      buttons: [btn_msg]
    });

    await alert.present();
  }

}

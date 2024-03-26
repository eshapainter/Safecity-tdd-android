import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {SharedService} from '../shared.service'
import { FormBuilder, FormGroup, Validators ,FormControl,ReactiveFormsModule} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  public form: FormGroup;
  heliplinelist = []
  sharedData = this.sharedservice.getData();
  country_list
  country_id = localStorage.getItem('Country_id')
  country
  apiurl = 'http://101.53.143.7/~dataduck/safecity/api/common_controller/'
  constructor(private navController: NavController,public translate: TranslateService,public formBuilder: FormBuilder,private sharedservice : SharedService, private router: Router, public httpClient: HttpClient, private callNumber: CallNumber) {

console.log(this.country_id)
  //   this.form = formBuilder.group({      
  //     country: [localStorage.getItem('Country_id')]
  // });

    


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
    //this.sharedData['country_id']
    this.getEmergencyhelplinelist(localStorage.getItem('Country_id'))
    }, error => {
      this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });
    
      // this.sharedData['roll'] = '22'
      // this.sharedservice.setData(this.sharedData)
  }

  onOptChange(e)
  {
    console.log(e)
     console.log(e.detail.value)
    // this.sharedData['country_id'] =e.detail.value;
    // this.sharedservice.setData(this.sharedData)
    // console.log(this.sharedData)
    
  this.getEmergencyhelplinelist(e.detail.value)



  }

  getEmergencyhelplinelist(country_id)
  {
    let data1 = new FormData();
    data1.append("security_key", '99402b5fff8f2a45890fb8bf6de094ee00a210ce');
    data1.append("country_id", country_id);
    data1.append('city_id',localStorage.getItem('City_id'));
    data1.append("lang_id",localStorage.getItem('Lang_id'))
    
   // console.log(this.sharedData)
   var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('common_controller/emergencyHelpList',data1).subscribe((rdata: any) => {
      console.log(rdata);
      if(rdata['status'] == true)
      {
        this.heliplinelist = rdata['data']
        console.log(this.heliplinelist)     
      }
      else
      {
        this.heliplinelist = []
      }
      
    }, error => {
      this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });
  }


  call(no) {
    console.log('call clicked', no)

    this.callNumber.callNumber(no, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));

  }


  ngOnInit() {
    setTimeout(()=>{
      this.country =  localStorage.getItem('Country_id')
    },700);
  }

  hospital() {
    this.navController.navigateForward(`/hospital`);
  }

  policein() {
    this.navController.navigateForward(`/police`);
  }
  legal() {
    this.navController.navigateForward(`/legalresources`);
  }

}

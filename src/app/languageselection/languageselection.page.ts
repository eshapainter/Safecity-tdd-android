import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, NavController } from '@ionic/angular';
import { Router,NavigationExtras, ActivatedRoute} from '@angular/router';
import { SharedService } from '../shared.service'
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-languageselection',
  templateUrl: './languageselection.page.html',
  styleUrls: ['./languageselection.page.scss'],
})
export class LanguageselectionPage implements OnInit {
  // apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/common_controller/';
  languageList: any;

  langaugeId = '';
  countryId
  cityId
  orgId: any;
  buttondisable = true
  constructor(public httpClient: HttpClient, 
    public loadingCtrl:LoadingController,
    private router: Router,private sharedservice: SharedService,
    public navController:NavController,
    public loadingController: LoadingController,
    public route:ActivatedRoute,public translate:TranslateService) 
    { 
      this.route.queryParams.subscribe(params => {
        this.countryId = params["countryId"];
        this.cityId = params["cityId"];
        this.orgId = params["orgId"];
        
       console.log("con",this.countryId)
       console.log("city",this.cityId)
       console.log("org",this.orgId)
       
    });

  }

  ngOnInit() {
    this.getLanguageList()
  }


  // *********************Getting language List for select Language**************************
  getLanguageList()
  {
    let data = new FormData();
    data.append('security_key','07b337e9971f28d49c9c4b0449ea071131f4a3b6');
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('common_controller/languagesList', data).subscribe((rdata: any) => {
      console.log(rdata);
      this.languageList = rdata.data;
      console.log(this.languageList[1]);
      console.log("language",this.languageList)

    }, error => {
      this.sharedservice.loaderDismiss()
    }, () => {
      this.sharedservice.loaderDismiss()
    });



    // this.httpClient.post(this.apiUrl+'languagesList',data)
    // .subscribe((rdata: any) => {
    //   console.log(rdata);
    //   this.languageList = rdata.data;
    //   console.log(this.languageList[1]);
    //   console.log("language",this.languageList)
    // },error => {
    // });
  }

  selectLanguage(e)
  {
    this.langaugeId = e.detail.value
    localStorage.setItem('Lang_id',this.langaugeId)

    if(e.detail.value == '1')
    {
      this.translate.setDefaultLang('en')
      this.translate.use('en')
      localStorage.setItem('language', 'en')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
   else if(e.detail.value == '42')
    {
      this.translate.setDefaultLang('hi')
      this.translate.use('hi')
      localStorage.setItem('language', 'hi')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '77')
    {
      this.translate.setDefaultLang('ml')
      this.translate.use('ml')
      localStorage.setItem('language', 'ml')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '76')
    {
      this.translate.setDefaultLang('ma')
      this.translate.use('ma')
      localStorage.setItem('language', 'ma')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '43')
    {
      this.translate.setDefaultLang('cr')
      this.translate.use('cr')
      localStorage.setItem('language', 'cr')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '27')
    {
      this.translate.setDefaultLang('sp')
      this.translate.use('sp')
      localStorage.setItem('language', 'sp')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '6')
    {
      this.translate.setDefaultLang('ar')
      this.translate.use('ar')
      localStorage.setItem('language', 'ar')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '89')
    {
      this.translate.setDefaultLang('po')
      this.translate.use('po')
      localStorage.setItem('language', 'po')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '93')
    {
      this.translate.setDefaultLang('ro')
      this.translate.use('ro')
      localStorage.setItem('language', 'ro')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '64')
    {
      this.translate.setDefaultLang('ki')
      this.translate.use('ki')
      localStorage.setItem('language', 'ki')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '107')
    {
      this.translate.setDefaultLang('sr')
      this.translate.use('sr')
      localStorage.setItem('language', 'sr')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }
    else if(e.detail.value == '126')
    {
      this.translate.setDefaultLang('uk')
      this.translate.use('uk')
      localStorage.setItem('language', 'uk')  
      localStorage.setItem('Lang_id', e.detail.value)  
    }

    if(this.langaugeId != "")
    {
      this.buttondisable = false
    }
    else{
      this.buttondisable = true
    }
  }

 async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

}
 // *********************Pass language id to Next page***********************************
 onboarding() {
  console.log(this.langaugeId)
  let navigationExtras: NavigationExtras = {
    queryParams: {
      countryId:this.countryId,
      cityId:this.cityId,
      orgId:this.orgId,
      langaugeId:this.langaugeId
    }
  };
        this.navController.navigateRoot([`/onboardingone`],navigationExtras);
  }
}

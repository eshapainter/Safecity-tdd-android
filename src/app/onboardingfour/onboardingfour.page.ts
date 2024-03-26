import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router,NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-onboardingfour',
  templateUrl: './onboardingfour.page.html',
  styleUrls: ['./onboardingfour.page.scss'],
})
export class OnboardingfourPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/user/';
  langaugeId: any;
  countryId: any;
  loading: any;
  cityId: any;
  orgId: any;
  constructor(private navController: NavController,public translate: TranslateService,private route: ActivatedRoute,private sharedservice: SharedService,
    public httpClient: HttpClient,public router:Router,public loadingController: LoadingController) {

      this.route.queryParams.subscribe(params => {
      this.langaugeId = params["langaugeId"];
      this.countryId = params["countryId"];
      this.cityId = params["cityId"];
      this.orgId = params["orgId"];
      console.log("countryId",this.countryId)
      console.log("langaugeId",this.langaugeId)
      console.log("city",this.cityId)
      console.log("orgid",this.orgId)
  });

   }

  ngOnInit() {
  }
  
  home() 
  {
    let data = new FormData();
    data.append('security_key','80b9d8f6dc4beeebd22ba44af9f247eadf13170b');
    data.append('country_id',this.countryId);
    data.append('language_id',this.langaugeId);
    data.append('city_id',this.cityId);
    data.append('organisation_id',this.orgId);
    data.append('age','1');
   
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('user/userRegistration', data).subscribe((rdata: any) => {
      console.log(rdata);
      console.log(rdata);
        // this.presentLoading()
        if(rdata.status == true)
        {
          localStorage.setItem('userId', rdata.data.id)
          this.navController.navigateForward('/home')
        }
        else{
          this.router.navigate(['languageselection'])
          //  this.navController.(`/languageselection`);
          // this.navController.navigateForward('languageselection')
        }

    }, error => {
      this.sharedservice.loaderDismiss()
    }, () => {
      this.sharedservice.loaderDismiss()
    });
    // this.httpClient.post(this.apiUrl+'userRegistration',data)
    // .subscribe((rdata: any) => {
    //   console.log(rdata);
    //   this.presentLoading()
    //   if(rdata.status == true)
    //   {
    //     localStorage.setItem('userId', rdata.data.id)
    //     this.navController.navigateForward('/home')
    //   }
    //   else{
    //     this.router.navigate(['languageselection'])
    //     //  this.navController.(`/languageselection`);
    //     // this.navController.navigateForward('languageselection')
    //   }
    //   },error => {
    // });

    
          
  }
  
  //  home() 
  //  {
	//      this.navController.navigateForward('home')
  //  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
  }
}

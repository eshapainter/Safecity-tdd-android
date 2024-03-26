import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {SharedService} from '../shared.service'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-reportfiledseven',
  templateUrl: './reportfiledseven.page.html',
  styleUrls: ['./reportfiledseven.page.scss'],
})
export class ReportfiledsevenPage implements OnInit {

  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/incident_report/';
  forWho: any;
  age: any;
  pronoun: any;
  experience: any;
  date1: any;
  dateEstimate: string;
  time: any;
  timeFrom: any;
  timeTo: any;
  timeEstimate: string;
  timeRange: any;
  violenceType: any;
  buttonDisabled = true;
  value: any;
  public selectcity: any = [];
  id: any;
  idArray: any = [];
  str: any;
  catstatus
  link: any;
  constructor(private navController: NavController,public translate: TranslateService,private sharedservice : SharedService, private router: Router, private route: ActivatedRoute, public httpClient: HttpClient) {

    this.route.queryParams.subscribe(params => {
      this.forWho = params["forWho"];
      this.age = params["age"];
      this.pronoun = params["pronoun"];
      this.experience = params["experience"];
      this.date1 = params["date1"];
      this.dateEstimate = params["dateEstimate"];
      this.time = params["time"];
      this.timeEstimate = params["timeEstimate"];
      this.timeRange = params["timeRange"];


      console.log("for Who", this.forWho);
      console.log("Age", this.age);
      console.log("pronoun", this.pronoun);
      console.log("experience", this.experience);
      console.log("date1", this.date1);
      console.log("time", this.time);
      console.log("dateEstimate", this.dateEstimate);
      console.log("timeEstimate", this.timeEstimate);
      console.log("timeRange", this.timeRange);
    })
  }

  ngOnInit() {
  }

  getViolence(e: any) {
    this.buttonDisabled = false;
    this.value = e.detail.value;
    console.log(e)
    if (e.detail.checked == true) {
      this.idArray.push(this.value)
    }
    else {
      this.idArray.pop(this.value)
    }
    // Array Sorting
    console.log("Random Array", this.idArray)
    this.idArray.sort(function (a, b) {
      return a - b;
    });
    console.log("sortArray", this.idArray)

  }
  goToFieldEight() {
    this.str = this.idArray.join(',')
    console.log(this.str)
    localStorage.setItem('categories',this.str)

    this.getCategory()


  }
  getCategory() {
    let data = new FormData();
    data.append('security_key', 'f9f59256b4c2a0514d954d0218600f6f74d3a747');
    data.append('country_id', '102');
    data.append('language_id', '1');
    data.append('category_comb', this.str);
    // let loader = this.loadingCtrl.create({
    //   });  
    // loader.present();


    
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('incident_report/getCategoriesList',data).subscribe((rdata: any) => {
      console.log(rdata);
          this.catstatus = rdata.status
          if(this.catstatus == true)
          {
          this.link = rdata.data[0].category_links
          this. pageRedirection()
          console.log(this.link)
          }
          else{
            this.navController.navigateForward([`reportfiledeight`]);
          }
     }, error => {
       this.sharedservice.loaderDismiss()
    },
    ()=>{
      this.sharedservice.loaderDismiss()
    });


    
    // this.httpClient.post(this.apiUrl + 'getCategoriesList', data)
    //   .subscribe((rdata: any) => {
    //     console.log(rdata);
    //     this.catstatus = rdata.status
    //     if(this.catstatus == true)
    //     {
    //     this.link = rdata.data[0].category_links
    //     this. pageRedirection()
    //     console.log(this.link)
    //     }
    //     else{
    //       this.navController.navigateForward([`reportfiledeight`]);
    //     }

    //         }, error => {
    //   });
  }

  pageRedirection()
  {
   
    if (this.link == '{"mainLink":"form_pc"}') {
      this.navController.navigateForward([`sevensubfieldone`]);
    }
    else if (this.link == '{"mainLink":"form_pb","form_pb":{"yes":"form_pa","no":"form_p8","form_pa":{"next":"form_p8"}}}') {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          category: 'GoToA'
        }
      };
      this.navController.navigateForward([`sevensubfieldthree`], navigationExtras);
    }
    else if (this.link == '{"mainLink":"form_pa","form_pa":{"next":"form_pc"}}') {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          category: 'GoToC'
        }
      };
      this.navController.navigateForward([`sevensubfieldtwo`], navigationExtras);
    }
    else if (this.link == '{"mainLink":"form_pb","form_pb":{"yes":"form_pa","no":"form_pc","form_pa":{"next":"form_pc"}}}') {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          category: 'GoToB'
        }
      };
      this.navController.navigateForward([`sevensubfieldthree`], navigationExtras);
    }
    else if (this.link == '{"mainLink":"form_pa","form_pa":{"next":"form_p8"}}') {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          category: 'GoToA1'
        }
      };
      this.navController.navigateForward([`sevensubfieldtwo`], navigationExtras);
    }

  }
  // }
}

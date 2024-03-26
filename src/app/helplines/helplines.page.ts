import { Component, OnInit } from '@angular/core';
import { NavController,Platform } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {SharedService} from '../shared.service';
import {TranslateService} from '@ngx-translate/core';
import { PopoverController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {SocialpopPage} from '../socialpop/socialpop.page';
@Component({
  selector: 'app-helplines',
  templateUrl: './helplines.page.html',
  styleUrls: ['./helplines.page.scss'],
})
export class HelplinesPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity_webapp/getHelplines/' ;
  helpline_data
  category_val
  subscription
  some_useful_info = []
  some_useful_info_final = []
  final_userful_info
  shared_data = this.sharedservice.getData()
  incident_id
  helpline_data_hide = false
  category_val_hide = false 
  response = false
  userful_info
  some_useful_info_regarding
  constructor(public navController: NavController,private socialSharing: SocialSharing, private popoverController: PopoverController,
    private router: Router,public httpClient:HttpClient,public translate:TranslateService,public sharedservice:SharedService,private platform : Platform) { 
     this.incident_id = this.shared_data['incident_id']
     console.log(this.incident_id)
      this.gethelplineinfo()
    }

  ngOnInit() {
  }


  
//  ionViewDidEnter() {
//   this.initAutocomplete()
//     this.subscription = this.platform.backButton.subscribe(() => {
//       navigator['app'].exitApp();
//     });
// }
//  ionViewWillLeave() {
//     this.subscription.unsubscribe();
//   }


  ionViewDidEnter() {
    // alert('enter')
       this.subscription = this.platform.backButton.subscribeWithPriority(10,(processNextHandler) => {
         //navigator['app'].exitApp();
         //alert('hit')
       
       });
   }
    ionViewWillLeave() {
    // alert('exit')
       this.subscription.unsubscribe();
     }

  gethelplineinfo()
  {
    let data = new FormData();
    data.append('security_key','8140c7e293aaa1c933b29b53a2a9140cf176dcfd');
    data.append('country_id',localStorage.getItem('Country_id'));
    data.append('client_id',localStorage.getItem('Client_id'));
    data.append('lang_id',localStorage.getItem('Lang_id'));    
    data.append('city_id',localStorage.getItem('City_id'));
    data.append('inc_id',this.incident_id);
         

    // let loader = this.loadingCtrl.create({
    //   });  
    // loader.present();

    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('getHelplines/',data).subscribe((rdata: any) => {
      console.log(rdata);
      console.log(rdata);
      this.response = true
      this.helpline_data = rdata.helpline;
      this.category_val = rdata.CategoryVal;
      if(this.helpline_data.length > 0)
      {
          this.helpline_data_hide = true
      }

      if(this.category_val.length > 0)
      {
          this.category_val_hide = true
      }
       console.log("list ",this.helpline_data)
       console.log("list ",this.category_val)
var t_msg = {'text' : ''}
var len = this.category_val.length
       for(var i =0;i < this.category_val.length;i++)
       {
        
        if(i == this.category_val.length -1)
        {
          if(this.category_val.length == 1)
          {
            t_msg = { text : this.category_val[i].title +':'}
            this.some_useful_info.push(t_msg)
          }
          else
          {
            t_msg = { text : ' and '+ this.category_val[i].title +':'}
            this.some_useful_info.push(t_msg)
          }
           
        }
        else if(i   == this.category_val.length -2)
        {
          t_msg = { text : this.category_val[i].title}
          this.some_useful_info.push(t_msg)
        }
        else{
          t_msg = { text : this.category_val[i].title + ', '}
          this.some_useful_info.push(t_msg)
          
        }
         
       }

       for(var j =0;j < this.some_useful_info.length;j++)
       {
        
        this.some_useful_info_final.push(this.some_useful_info[j].text)
         
       }


       console.log(this.some_useful_info_final)

       this.translate.get('some_useful_info_regarding').subscribe((res: string) => {
        console.log(res)
              this.some_useful_info_regarding = res;
            })

      this.final_userful_info = this.some_useful_info_regarding + this.some_useful_info_final.join('')
       console.log(this.final_userful_info)
      
    }, error => {
      this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });


//     this.httpClient.post(this.apiUrl,data)
//     .subscribe((rdata: any) => {
//       console.log(rdata);
//       this.helpline_data = rdata.helpline;
//       this.category_val = rdata.CategoryVal;
//        console.log("list ",this.helpline_data)
//        console.log("list ",this.category_val)
// var t_msg = {'text' : ''}
// var len = this.category_val.length
//        for(var i =0;i < this.category_val.length;i++)
//        {
        
//         if(i == this.category_val.length -1)
//         {
//           if(this.category_val.length == 1)
//           {
//             t_msg = { text : this.category_val[i].title +':'}
//             this.some_useful_info.push(t_msg)
//           }
//           else
//           {
//             t_msg = { text : ' and '+ this.category_val[i].title +':'}
//             this.some_useful_info.push(t_msg)
//           }
           
//         }
//         else if(i   == this.category_val.length -2)
//         {
//           t_msg = { text : this.category_val[i].title}
//           this.some_useful_info.push(t_msg)
//         }
//         else{
//           t_msg = { text : this.category_val[i].title + ', '}
//           this.some_useful_info.push(t_msg)
          
//         }
         
//        }

//        for(var j =0;j < this.some_useful_info.length;j++)
//        {
        
//         this.some_useful_info_final.push(this.some_useful_info[j].text)
         
//        }


//        console.log(this.some_useful_info_final)
//       this.final_userful_info = 'Here’s some useful information regarding ' + this.some_useful_info_final.join('')
//        console.log(this.final_userful_info)
//     },error => {
//     });
  }


  
  home() {
this.navController.navigateForward(`/home`);
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

  report()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })

          if(this.platform.is('android'))
          {
            this.socialSharing.share(  share_msg,
              null , null,
              'webapp.safecity.in' )
          }
          else{
            console.log('else not android ')
            this.presentPopover('ev')
          }
  

     this.navController.navigateForward(`/chat`);
  }


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SocialpopPage,
      cssClass: 'popover_setting',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  email()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })
    this.socialSharing.shareViaEmail( share_msg + 'webapp.safecity.in',
      null , null,
      )
  }

  facebook()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })
    this.socialSharing.shareViaFacebook( share_msg + 'webapp.safecity.in',
      null , null,
      )
  }

  insta()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })
    this.socialSharing.shareViaInstagram( share_msg + 'webapp.safecity.in',
      null   )
  }

  sms()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })
    this.socialSharing.shareViaSMS( share_msg + 'webapp.safecity.in',
      null   )
  }

  twitter()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })
    this.socialSharing.shareViaTwitter( share_msg + 'webapp.safecity.in',
      null   )
  }

  whatsapp()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })
    this.socialSharing.shareViaWhatsApp( share_msg + 'webapp.safecity.in',
      null   )
  }
}

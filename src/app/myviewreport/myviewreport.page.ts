import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {SharedService} from '../shared.service';
import {TranslateService} from '@ngx-translate/core'

@Component({
  selector: 'app-myviewreport',
  templateUrl: './myviewreport.page.html',
  styleUrls: ['./myviewreport.page.scss'],
})
export class MyviewreportPage implements OnInit {
  report_data = []
  type
  selected_inc_id
  constructor(private navController: NavController,public translate:TranslateService,private sharedservice : SharedService,public httpClient:HttpClient, private route: ActivatedRoute, private router: Router,public alertController: AlertController) { 

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state)
        this.report_data.push(this.router.getCurrentNavigation().extras.state.data);
        this.selected_inc_id = this.report_data[0].id
console.log(this.report_data)

      }
    })

  }

  ngOnInit() {
  }
  
  async presentAlertRadio() {
    var message
    var cancel
    var button_done;
    var del_From_Phone;
    var del_from_safecity
    this.translate.get('del_From_Phone').subscribe((res: string) => {
        
      del_From_Phone = res;
    })
    this.translate.get('del_from_safecity').subscribe((res: string) => {
        
      del_from_safecity = res;
    })
    this.translate.get('select_one').subscribe((res: string) => {
        
      message = res;
    })

    this.translate.get('button_done').subscribe((res: string) => {
        
      button_done = res;
    })

    
    this.translate.get('cancel').subscribe((res: string) => {
        
      cancel = res;
    })
    
    const alert = await this.alertController.create({
      cssClass: 'newclass',
      header: message,
	  mode:'ios',
      inputs: [
        {
          name:del_From_Phone,
          type: 'radio',
          label:del_From_Phone,
          value: 'value1',
          checked: true
        },
        {
          name: del_from_safecity,
          type: 'radio',
          label: del_from_safecity,
          value: 'value2'
        },
      
      ],
      buttons: [
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: button_done,
          handler: (alertData) => {
           
            if(alertData == 'value1')
            {
              this.type = 'mobile'
            }
            else{
              this.type = 'web'
            }
            this.deleteIncident()
          }
        }
      ]
    });

    await alert.present();
  }

  deleteIncident()
{
//   user_id:0
// safety_tip_id:3
// delete_from:mobile (web/mobile)
var userId = localStorage.getItem('userId')
  let data = new FormData();
      data.append('user_id',localStorage.getItem('userId'));
      data.append('incident_id',this.selected_inc_id);
      data.append('delete_from',this.type);

      var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('reported-incident/delete',data).subscribe((rdata: any) => {
      console.log(rdata);
      if(rdata.status == true)
          {
            this.navController.navigateForward('/myreport')
          }
     }, error => {
       this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });


    // this.httpClient.post('http://101.53.143.7/~dataduck/safecity_webapp/api/reported-incident/delete',data)
    //   .subscribe((rdata: any) => {
    //     if(rdata.status == true)
    //     {
    //       this.navController.navigateForward('/myreport')
    //     }
    //     console.log(rdata);
    //     }, error => {
    //   });
}
  
  edit() {

    
    let navigationExtras: NavigationExtras = {
      state: {
      data: this.report_data
      }
    };
    this.router.navigate(['/editreport'], navigationExtras);
//this.navController.navigateForward(`/editreport`);
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {SharedService} from '../shared.service';
import {TranslateService} from '@ngx-translate/core'
@Component({
  selector: 'app-organizationmenu',
  templateUrl: './organizationmenu.page.html',
  styleUrls: ['./organizationmenu.page.scss'],
})
export class OrganizationmenuPage implements OnInit {
  orgzationList
  constructor(private sharedservice : SharedService,public translate:TranslateService,private navController: NavController, private router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }


  organizationList() {
    let data = new FormData();
    data.append('security_key', 'b571bb06f3e196ce95f08c70324b9dd5b2d334c5');
    data.append('country_id', localStorage.getItem('Country_id'));
    data.append('city_id', localStorage.getItem('City_id'));    

    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('user/getOrganisations',data).subscribe((rdata: any) => {
      console.log(rdata);
        this.orgzationList = rdata['data']
        console.log(this.orgzationList)
         
     }, error => {
       this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });


    // this.sharedservice.sharedPostRequest('user/getOrganisations',data).subscribe((rdata: any) => {
    //   console.log(rdata);
    //   this.orgzationList = rdata['data']
    //   console.log(this.orgzationList)
    //  }, error => {
    // });
  }

  
     async verifyAlert() {

      var msg 
      var btn_msg
      var plc_holder
      this.translate.get('enter_verifi').subscribe((res: string) => {

        msg = res;
      })

      
      this.translate.get('done').subscribe((res: string) => {

        btn_msg = res;
      })

      this.translate.get('ent_organ').subscribe((res: string) => {

        plc_holder = res;
      })


    const alert = await this.alertController.create({
      cssClass: 'newalertcss',
      backdropDismiss : false,
      message: msg,
	   mode:'ios',
	    inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: plc_holder 
        }
		],
      buttons: [{
        text: btn_msg,
        handler: (alertData) => { //takes the data 
          console.log(alertData.name1);
          if(alertData.name1 == localStorage.getItem('ov_code'))
          {
            this.organizationList()
          }
      }
      }]
    });

    await alert.present();
  }


  selectOrg(e)
  {
    console.log(e)
    e.detail.value
    console.log('pass',e.detail.value)
    if(e.detail.value)
    {
      var temp = e.detail.value.split(',')
      console.log(temp)
      var client_id = temp[0]
      localStorage.setItem('Client_id',client_id)
      var passcode = temp[1]
      console.log(passcode)
      localStorage.setItem('ov_code',passcode)
    }
    
  }

}

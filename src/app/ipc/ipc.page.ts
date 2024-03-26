import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {SharedService} from '../shared.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-ipc',
  templateUrl: './ipc.page.html',
  styleUrls: ['./ipc.page.scss'],
})
export class IpcPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/faq/getClientResourceList/'
  title:string
  ipcList
  constructor(private navController: NavController,public translate: TranslateService,private sharedservice : SharedService, private router: Router,public httpClient:HttpClient) { }

  ngOnInit() {
    this.getIPCList()
  }
  

  getIPCList(){
    let data = new FormData();
    data.append('security_key','8140c7e293aaa1c933b29b53a2a9140cf176dcfd');
    data.append('country_id',localStorage.getItem('Country_id'));
    data.append('client_id',localStorage.getItem('Client_id'));
    data.append('lang_id',localStorage.getItem('Lang_id'));
    data.append('type','legal');
    data.append('content_for','mobile');
     
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('faq/getClientResourceList',data).subscribe((rdata: any) => {
      console.log(rdata);
      this.ipcList = rdata.data;
      this.title = rdata.title
      console.log("ipc list",this.ipcList)
     }, error => {
       this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });



  }


   domestic(content,title) {

    console.log(content)

    
    let navigationExtras: NavigationExtras = {
      state: {
        content : content,
        title : title
      }
    };
  this.router.navigate(['/domesticviolence'],navigationExtras);  

//this.navController.navigateForward(`/domesticviolence`);
  }
  
    online() {
this.navController.navigateForward(`/onlineipc`);
  }
  
  sexualassault() {
this.navController.navigateForward(`/sexualassaultipc`);
  }

 ogling() {
this.navController.navigateForward(`/oglingipc`);
  }
  
  taking() {
this.navController.navigateForward(`/takingphotoipc`);
  }

 commenting() {
this.navController.navigateForward(`/commentingipc`);
  }
  
  indecent() {
this.navController.navigateForward(`/indecentipc`);
  }
   touching() {
this.navController.navigateForward(`/touchingipc`);
  }
  
   sexualinvite() {
this.navController.navigateForward(`/sexualinvitesipc`);
  }
  chain() {
this.navController.navigateForward(`/chainsnachtingipc`);
  }
  
  human() {
this.navController.navigateForward(`/humanipc`);
  }
  
  catcalls() {
this.navController.navigateForward(`/catcallsipc`);
  }
  
    staking() {
this.navController.navigateForward(`/stakingipc`);
  }
  
}

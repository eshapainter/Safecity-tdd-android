import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {SharedService} from '../shared.service'
@Component({
  selector: 'app-aboutsafecity',
  templateUrl: './aboutsafecity.page.html',
  styleUrls: ['./aboutsafecity.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutsafecityPage implements OnInit {
   title:string
about
content
  constructor(private sharedservice : SharedService,public httpClient:HttpClient, private sanitizer:DomSanitizer) { 

    this.getSafecityinfo()
  }



  getSafecityinfo()
  {
    let data = new FormData();
    data.append('security_key','8140c7e293aaa1c933b29b53a2a9140cf176dcfd');
    data.append('country_id',localStorage.getItem('Country_id'));
    data.append('client_id',localStorage.getItem('Client_id'));
    data.append('lang_id',localStorage.getItem('Lang_id'));
    data.append('type','about_safecity');
    data.append('content_for','mobile');
     

    // let loader = this.loadingCtrl.create({
    //   });  
    // loader.present();

    this.sharedservice.sharedPostRequest('faq/getClientResourceList',data).subscribe((rdata: any) => {
      console.log(rdata);
      this.about = rdata.data;
	  this.content = this.sanitizer.bypassSecurityTrustHtml(rdata.data[0].content);
          this.title =  rdata.data[0].title
      console.log("list ",this.about)
     }, error => {
    });

    // this.httpClient.post(this.apiUrl+'list',data)
    // .subscribe((rdata: any) => {
    //   console.log(rdata);
    //   this.about = rdata.data;
	  // this.content = this.sanitizer.bypassSecurityTrustHtml(rdata.data[0].content);
    //       this.title =  rdata.data[0].title
    //   console.log("list ",this.about)
    // },error => {
    // });
  }


  ngOnInit() {
  }

}

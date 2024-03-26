import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {SharedService} from '../shared.service';
import { TranslateService } from '@ngx-translate/core'
@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TermsPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/faq/getClientResourceList/'
  title:string
list
content
  constructor(public httpClient:HttpClient,public translate: TranslateService, private sharedservice : SharedService,private sanitizer:DomSanitizer) { 
   this.getinfo()
  }

  ngOnInit() {
  }


  getinfo()
  {
    let data = new FormData();
    data.append('security_key','8140c7e293aaa1c933b29b53a2a9140cf176dcfd');
    data.append('country_id',localStorage.getItem('Country_id'));
    data.append('client_id',localStorage.getItem('Client_id'));
    data.append('lang_id',localStorage.getItem('Lang_id'));
    data.append('type','term_and_conditions');
    data.append('content_for','mobile');
     

    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('faq/getClientResourceList',data).subscribe((rdata: any) => {
      console.log(rdata);
      this.list = rdata.data;
       this.content = this.sanitizer.bypassSecurityTrustHtml(rdata.data[0].content);
      this.title =  rdata.title
      console.log("list ",this.list)
     }, error => {
       this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });


    
    // this.httpClient.post(this.apiUrl+'list',data)
    // .subscribe((rdata: any) => {
    //   console.log(rdata);
    //   this.list = rdata.data;
    //    this.content = this.sanitizer.bypassSecurityTrustHtml(rdata.data[0].content);
    //   this.title =  rdata.title
    //   console.log("list ",this.list)
    // },error => {
    // });
  }

}

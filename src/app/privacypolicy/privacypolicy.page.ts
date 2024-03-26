import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {SharedService} from '../shared.service';
import { TranslateService } from '@ngx-translate/core'
@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.page.html',
  styleUrls: ['./privacypolicy.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PrivacypolicyPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/faq/getClientResourceList/'
  title:string
list
content
  constructor(public httpClient:HttpClient,public translate: TranslateService,private sharedservice : SharedService, private sanitizer:DomSanitizer) { 

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
    if(localStorage.getItem('Country_id') == '111')
    {
      data.append('type','protection_policy');
    }
    else
    {
      data.append('type','privacy_policy');
    }
    
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
    },
    ()=>{
      this.sharedservice.loaderDismiss()
    });
  }


}

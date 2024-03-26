import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {SharedService} from '../shared.service'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqPage implements OnInit {
  shownGroup = false
  faqList: any;
  title:string
  constructor(public httpClient:HttpClient,public translate: TranslateService,private sharedservice : SharedService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.getFAQList()
  }
  
 
   toggleGroup(group) 
   {
    if (this.isGroupShown(group)) 
    {
      this.shownGroup = null;
    } 
    else 
    {
       this.shownGroup = group;
    }
  };

  isGroupShown(group) 
  {
    return this.shownGroup === group;
  };

  getFAQList()
  {

    let data = new FormData();
    data.append('security_key','8140c7e293aaa1c933b29b53a2a9140cf176dcfd');
    data.append('country_id',localStorage.getItem('Country_id'));
    data.append('client_id',localStorage.getItem('Client_id'));
    data.append('lang_id',localStorage.getItem('Lang_id'));
    data.append('type','faq');
    data.append('content_for','mobile');
     

    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('faq/getClientResourceList',data).subscribe((rdata: any) => {
      console.log(rdata);
      this.faqList = rdata.data;
      for(var i=0;i < this.faqList.length;i++)
      {
        this.faqList[i].content = this.sanitizer.bypassSecurityTrustHtml(this.faqList[i].content)
      }
      this.title = rdata.title
      console.log("Faq list",this.faqList)
     }, error => {
       this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });

    
  }



}

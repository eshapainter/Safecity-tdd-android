import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {SharedService} from '../shared.service'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-filing-fir',
  templateUrl: './filing-fir.page.html',
  styleUrls: ['./filing-fir.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilingFIRPage implements OnInit {
 shownGroup = false
 firList
 title:string
  constructor(public httpClient:HttpClient,public translate: TranslateService,private sharedservice : SharedService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.getIPCList()
  }
  

  getIPCList(){
    let data = new FormData();
    data.append('security_key','8140c7e293aaa1c933b29b53a2a9140cf176dcfd');
    data.append('country_id',localStorage.getItem('Country_id'));
    data.append('client_id',localStorage.getItem('Client_id'));
    data.append('lang_id',localStorage.getItem('Lang_id'));
    data.append('type','fir');
    data.append('content_for','mobile');
     
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.sharedservice.presentLoadingDefault(loadertext)
    this.sharedservice.sharedPostRequest('faq/getClientResourceList',data).subscribe((rdata: any) => {
      console.log(rdata);
      this.firList = rdata.data;

      for(var i=0;i < this.firList.length;i++)
      {
        this.firList[i].content = this.sanitizer.bypassSecurityTrustHtml(this.firList[i].content)
      }

      this.title = rdata.title
      console.log("fir list",this.firList)
     }, error => {
      this.sharedservice.loaderDismiss()
    },()=>{
      this.sharedservice.loaderDismiss()
    });


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


}

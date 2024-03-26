import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service'
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
data
content
  constructor(private sharedservice : SharedService,private sanitizer:DomSanitizer) {

    let data = new FormData();
    data.append('security_key', '8140c7e293aaa1c933b29b53a2a9140cf176dcfd');
    data.append('country_id',localStorage.getItem('Country_id'));
    data.append('client_id',localStorage.getItem('Client_id'));
    data.append('lang_id',localStorage.getItem('Lang_id'));
    data.append('type','donate');
    data.append('content_for','mobile');
     this.sharedservice.sharedPostRequest('faq/getClientResourceList',data).subscribe((rdata: any) => {
      console.log(rdata);
      this.data = rdata['data']
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.data[0].content)
      console.log(this.content)
    console.log(this.data)     
    
    }, error => {
    });
   }

  ngOnInit() {
  }

}

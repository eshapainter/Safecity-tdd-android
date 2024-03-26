import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {SharedService} from '../shared.service'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/faq/getClientResourceList/'
  title:string
contatc_list
content
   constructor(private callNumber: CallNumber,private sharedservice : SharedService,public httpClient:HttpClient, private sanitizer:DomSanitizer) {this.getContactinfo() }

  ngOnInit() {
    
  }


  getContactinfo()
  {
    let data = new FormData();
    data.append('security_key','8140c7e293aaa1c933b29b53a2a9140cf176dcfd');
    data.append('country_id',localStorage.getItem('Country_id'));
    data.append('client_id',localStorage.getItem('Client_id'));
    data.append('lang_id',localStorage.getItem('Lang_id'));
    data.append('type','contact_us');
    data.append('content_for','mobile');
     
    this.sharedservice.sharedPostRequest('faq/getClientResourceList',data).subscribe((rdata: any) => {
      console.log(rdata);
      this.contatc_list = rdata.data;
      this.content = this.sanitizer.bypassSecurityTrustHtml(rdata.data[0].content);
      this.title =  rdata.data[0].title
      console.log("contatc_list ",this.contatc_list)
     }, error => {
    });


  }


// openDailerPad()
// {
//   this.callNumber.callNumber("9876432456", true)
//   .then(res => console.log('Launched dialer!', res))
//   .catch(err => console.log('Error launching dialer', err));
// }


// openEmail()
// {
//           // add alias
//           this.emailComposer.addAlias('gmail','com.google.android.gm');

//         // then use alias when sending email
//         this.emailComposer.open({
//           app: 'gmail',
//           to: 'info@reddotfoundation.org'
         
//         });
// }


}
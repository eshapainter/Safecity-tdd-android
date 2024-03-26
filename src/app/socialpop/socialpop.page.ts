import { Component, OnInit } from '@angular/core';
import { PopoverController,NavController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-socialpop',
  templateUrl: './socialpop.page.html',
  styleUrls: ['./socialpop.page.scss'],
})
export class SocialpopPage implements OnInit {

  constructor(private nav:NavController,private popoverController: PopoverController,private socialSharing: SocialSharing,public translate:TranslateService) { }

  ngOnInit() {}


  eventFromPopover() {
    this.popoverController.dismiss('edupala.com');
  }


  email()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })
    this.socialSharing.shareViaEmail( share_msg + 'webapp.safecity.in',
      null , null,
      )
      this.pop()
  }

  facebook()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })
    this.socialSharing.shareViaFacebook( share_msg + 'webapp.safecity.in',
      null , null,
      )
      this.pop()
  }

  insta()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })
    this.socialSharing.shareViaInstagram( share_msg + 'webapp.safecity.in',
      null   )
      this.pop()
  }

  sms()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })
    this.socialSharing.shareViaSMS( share_msg + 'webapp.safecity.in',
      null   )
      this.pop()
  }

  twitter()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })
    this.socialSharing.shareViaTwitter( share_msg + 'webapp.safecity.in',
      null   )
      this.pop()
  }

  whatsapp()
  {
    var share_msg 
    this.translate.get('share_msg').subscribe((res: string) => {
      console.log(res)
      share_msg = res;
          })
    this.socialSharing.shareViaWhatsApp( share_msg + 'webapp.safecity.in',
      null   )
      this.pop()
  }

  pop()
  {
    this.nav.pop()
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { IonContent } from '@ionic/angular';
import { AlertController,NavController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {TranslateService} from '@ngx-translate/core'
// import { setInterval } from 'timers';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) contentArea: IonContent;
  msgArr = []; chat_message = ""; admin_sync = false
  bottomClass=false;is_admin_online=true;
  // start chat variables
  client_id; to_User_Id = '0'; from_User_Id; guest_login_details_id; chatInterval;
  prevChatLen = 0; newChatLen;
  //Testing variables 
  msgcounter = 0; isUser = 'false'
  constructor(private navController: NavController,public translate:TranslateService,private callNumber: CallNumber,public apiProvider: SharedService,
     public keyboard: Keyboard,public alertController: AlertController) { }

  ngOnInit() {
    this.client_id = localStorage.getItem('Client_id');
    this.from_User_Id = localStorage.getItem('incident_id')
    this.initMessages()
  }

callnumber()
{
  this.callNumber.callNumber('+91 90155 10510', true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));

} 

  initMessages() {
    // console.log(this.formatAmPm(new Date(date)))
    this.startChat();
    this.chatInterval = setInterval(() => {
      this.chat_Login_Update()
      console.log('calling update api');

    }, 4000);
  }
  ionViewWillEnter(){
    this.keyboard.onKeyboardWillShow().subscribe((res) => {
      this.bottomClass=true;
       
    })
    this.keyboard.onKeyboardHide().subscribe((res) => {
      this.bottomClass=false
    })
  }
  startChat() {
    console.log(this.from_User_Id, this.to_User_Id);
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.apiProvider.presentLoadingDefault(loadertext)
    let data = new FormData();
    data.append('client_id', this.client_id)
    data.append('incident_id', this.from_User_Id);

    this.apiProvider.startChat('chat-start', data).subscribe((res: any) => {
      console.log(res);
       this.guest_login_details_id = res.data.guest_login_details_id;
      console.log(this.guest_login_details_id);

    }, error => {
      console.log(error);

    });


  }
  chat_Login_Update() {
    // clearInterval(this.chatInterval)
    
    let chatlogData = new FormData();
    chatlogData.append('client_id', this.client_id);
    chatlogData.append('from_user_id', this.from_User_Id);
    chatlogData.append('to_user_id', this.to_User_Id.toString());
    chatlogData.append('guest_login_details_id', this.guest_login_details_id)
    this.apiProvider.chatsync('chat-login-update', chatlogData).subscribe((res: any) => {
     
      this.admin_sync = res.admin_sync
      this.to_User_Id = res.to_user_id;
      this.is_admin_online=res.is_admin_online
      this.msgArr = res.chat_history;

      this.newChatLen = this.msgArr.length;
      if (this.newChatLen > this.prevChatLen) {
        this.contentArea.scrollToBottom();
        this.prevChatLen = this.newChatLen
      } else { }

      for (let i = 0; i < this.msgArr.length; i++) {
        this.msgArr[i].ampmTime = this.formatAmPm(this.msgArr[i].timestamp);
        this.msgArr[i].chat_message+" "
      }
      

    }, error => {
      console.log(error);

    });
  }
  formatAmPm(dates:string) {
    var date1 = new Date(dates.replace(/ /g,"T") )
    var date= new Date(date1+ " UTC")
    var hours = date.getHours();
    var minutes : any
    minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  sendmsg() {
    if(this.to_User_Id!='0'){
      let myStaticChat = {
        'chat_message': this.chat_message,
        'chat_message_id': "31",
        'client_id': this.client_id,
        'from_user_id': this.from_User_Id,
        'status': "1",
        'timestamp': '',
        'sent_by':'web',
        'to_user_id': this.to_User_Id,
      }
      if (this.chat_message.length > 0) {
        let chat = new FormData();
        chat.append('chat_message', this.chat_message);
        chat.append('to_user_id', this.to_User_Id.toString());
        chat.append('from_user_id', this.from_User_Id)
        chat.append('client_id', this.client_id)
        chat.append('sent_by','web')
        this.apiProvider.insertChat('chat-insert', chat).subscribe((res: any) => {
          console.log(res);
          this.msgArr.push(myStaticChat)
  
          this.chat_message = ''
           this.contentArea.scrollToBottom(); 
        }, error => {
          console.log(error);
  
        });
      }
  
    }
  }

  ionViewWillLeave() {
    this.unsyncAdminUser()
  }
  unsyncAdminUser() {
    let unsyncData = new FormData();
    unsyncData.append('client_id', this.client_id);
    unsyncData.append('from_user_id', this.from_User_Id);
    this.apiProvider.unsyncAdminUser('chat-unsync-user-guest', unsyncData).subscribe((res: any) => {
      console.log(res);
      if (res.status == false) {
        clearInterval(this.chatInterval)
      }
    }, error => {
      console.log(error);

    });
  }
  backtoHome(){
    this.presentAlert();
  }


  async presentAlert() {
    var message
    var no 
    var yes
    
    this.translate.get('do_you_want_to_leave_the_chat').subscribe((res: string) => {
        
      message = res;
    })

    this.translate.get('no').subscribe((res: string) => {
        
      no = res;
    })

    
    this.translate.get('yes').subscribe((res: string) => {
        
      yes = res;
    })
    
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          backdropDismiss : false,
          message: message,
         mode:'ios',
          buttons: [ {
            text: no,
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: yes,
            handler: () => {
              console.log('Buy clicked');
              this.navController.navigateForward('/home')
            }
          }]
        });
    
        await alert.present();
      }

  // clearInterval(this.chatInterval)

  // console.log('this.chat_message' , this.chat_message);;
  // this.msgcounter++;
  // console.log(this.msgcounter%2);
  // if(this.msgcounter%2==0){
  //   this.isUser='true'
  // }else{
  //   this.isUser='false';
  // }
  // let chatObj={
  //   chat_message_id: "5",
  //   client_id: "1",
  //   to_user_id: "4",
  //   from_user_id: "202",
  //   chat_message: this.chat_message,
  //   isUser: this.isUser,
  //   time: "11:13 AM"
  // }
  // this.msgArr.push(chatObj);


  // this.chat_message=''

}

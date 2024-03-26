import { Component, OnInit } from '@angular/core';
import { Platform, NavController  } from '@ionic/angular';
@Component({
  selector: 'app-nointernet',
  templateUrl: './nointernet.page.html',
  styleUrls: ['./nointernet.page.scss'],
})
export class NointernetPage implements OnInit {
  subscription
  constructor(public navController:NavController,private platform : Platform) { 
    console.log(this.navController)
  }

  ngOnInit() {
  }


  
  ionViewDidEnter() {
    // alert('enter')
       this.subscription = this.platform.backButton.subscribeWithPriority(20,(processNextHandler) => {
         //navigator['app'].exitApp();
         //alert('hit')
       
       });
   }
    ionViewWillLeave() {
    // alert('exit')
       this.subscription.unsubscribe();
     }

}

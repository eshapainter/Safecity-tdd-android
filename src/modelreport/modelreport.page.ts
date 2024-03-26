import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modelreport',
  templateUrl: './modelreport.page.html',
  styleUrls: ['./modelreport.page.scss'],
})
export class ModelreportPage implements OnInit {
segmentModel = "one";
showFull = ''
toparrow =true
  constructor(private navController: NavController, private router: Router, public modalController: ModalController ) {
    
      if(localStorage.getItem('data') == 'false')
      {
        this.showFull = 'true';
      }else{
        this.showFull = 'false';
      }
   }

  ngOnInit() {
  }
  
  segmentChanged(event){
    console.log(this.segmentModel);
    
    console.log(event);
  }
  
  async back()
  {
    localStorage.setItem('data','true')
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: ModelreportPage,
      cssClass: 'newmodel',
	   showBackdrop:true,
    });
    return await modal.present();
  }
    async newmodalin() {
      this.showFull = 'true';
      this.toparrow =false
      localStorage.setItem('data','false')
      this.modalController.dismiss();
      
    const modal = await this.modalController.create({
      component: ModelreportPage,
      cssClass: 'custommodel',
     showBackdrop:true,
    });
    return await modal.present();
  }
  
   preframing() {
	     this.modalController.dismiss( 'cancel'); //
this.navController.navigateForward(`/preframingtwo`);
  }
  
 help() {
	  this.modalController.dismiss( 'cancel');
this.navController.navigateForward(`/help`);
  }
  
   menu() {
	   this.modalController.dismiss( 'cancel');
     this.navController.navigateForward(`/menu`);
  }
  
 safetytip() {
	 this.modalController.dismiss( 'cancel');
   this.navController.navigateForward(`/safteytipone`);
  }
  
  viewreport() {
	 this.modalController.dismiss( 'cancel');
   this.navController.navigateForward(`/viewreportdetail`);
  }
}

 




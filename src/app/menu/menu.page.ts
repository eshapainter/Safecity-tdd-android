import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private navController: NavController, private router: Router,) { }

  ngOnInit() {
  }

  view_data()
  {
    this.navController.navigateForward(`/viewdata`);
  }
  
volunteer() {
this.navController.navigateForward(`/volunteer`);
  }
  
  donate() {
this.navController.navigateForward(`/donate`);
  }
  
  contact() {
this.navController.navigateForward(`/contact`);
  }
  
  setting() {
this.navController.navigateForward(`/setting`);
  }
  
  faq() {
this.navController.navigateForward(`/faq`);
  }
  
  report() {
this.navController.navigateForward(`/myreport`);
  }
  
    legal() {
this.navController.navigateForward(`/legalresources`);
  }

safety() {
this.navController.navigateForward(`/mysafety`);
  }
  
  about() {
this.navController.navigateForward(`/aboutsafecity`);
  }

  wellness()
  {
    this.navController.navigateForward(`/wellness`);
  }

}

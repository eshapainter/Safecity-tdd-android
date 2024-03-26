import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-safteytip-thankyou',
  templateUrl: './safteytip-thankyou.page.html',
  styleUrls: ['./safteytip-thankyou.page.scss'],
})
export class SafteytipThankyouPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {
  }
  
   home() {
    this.navController.navigateRoot(`/home`);
  }

 view() {
this.navController.navigateForward(`/modelreport`);
  }

}

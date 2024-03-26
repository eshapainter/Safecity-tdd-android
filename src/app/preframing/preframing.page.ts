import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preframing',
  templateUrl: './preframing.page.html',
  styleUrls: ['./preframing.page.scss'],
})
export class PreframingPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {
  }
  
    preframing() {
          this.navController.navigateForward(`preframingtwo`);
  }


}

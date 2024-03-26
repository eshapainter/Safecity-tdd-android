import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {
    
  }
  
   privacy() {
this.navController.navigateForward(`/privacypolicy`);
  }
  
  term() {
this.navController.navigateForward(`/terms`);
  }
  
  country() {
this.navController.navigateForward(`/countrymenu`);
  }
  
  language() {
this.navController.navigateForward(`/languagemenu`);
  }
   organization() {
this.navController.navigateForward(`/organizationmenu`);
  }

}

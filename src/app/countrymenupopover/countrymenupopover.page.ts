import { Component, OnInit } from '@angular/core';
import { NavController,NavParams } from '@ionic/angular';
@Component({
  selector: 'app-countrymenupopover',
  templateUrl: './countrymenupopover.page.html',
  styleUrls: ['./countrymenupopover.page.scss'],
})
export class CountrymenupopoverPage implements OnInit {
  country_list
  constructor(public navctrl:NavController,public navParams:NavParams) {
    console.log(this.navctrl)
   }

  ngOnInit() {
    this.country_list = this.navParams.get('country_list')
    console.log(this.country_list)
  }

}

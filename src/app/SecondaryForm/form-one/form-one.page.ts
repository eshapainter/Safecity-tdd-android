import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.page.html',
  styleUrls: ['./form-one.page.scss'],
})
export class FormOnePage implements OnInit {
 led: any;
 otherFieldData: boolean = false;

 
  constructor(private navController: NavController, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
  }
  
    getLed(e)
  {
    console.log(e.detail.value)
    this.led = e.detail.value;
    if(this.led == 'Verbal')
    {
      this. otherFieldData = true
    }

   
  }
  
  

}

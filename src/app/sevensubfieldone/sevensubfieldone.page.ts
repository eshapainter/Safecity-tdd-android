import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sevensubfieldone',
  templateUrl: './sevensubfieldone.page.html',
  styleUrls: ['./sevensubfieldone.page.scss'],
})
export class SevensubfieldonePage implements OnInit {
  category: any;
  value: any;

  constructor(private navController: NavController,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.category= params["category"];
      console.log("category",this.category)

    })
   }

  ngOnInit() {
  }
  getViolence(e)
  {
      this.value = e.detail.value;
  }

  goToFieldEight()
  {
    if(this.category == undefined && this.value != undefined)
    {
      this.navController.navigateForward(`/reportfiledeight`);
    }
   
    
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sevensubfieldtwo',
  templateUrl: './sevensubfieldtwo.page.html',
  styleUrls: ['./sevensubfieldtwo.page.scss'],
})
export class SevensubfieldtwoPage implements OnInit {
  category =''
  yesOrNo: any;
  constructor(public navController:NavController,public route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.category= params["category"];
      console.log("category",this.category)
    })
   
  }

  ngOnInit() {

  }

  getViolence(e)
  {
    console.log(e.detail.value)
    this.yesOrNo = e.detail.value
  }

  goToFieldEight()
  {
    if(this.category == undefined || this.category == 'GoToA1')
    {
    this.navController.navigateForward(`/reportfiledeight`);
    }
    else if(this.category == 'GoToC' || this.category == 'GoToC1')
    {
    this.navController.navigateForward(`/sevensubfieldone`);
    }
   
    
  }

}

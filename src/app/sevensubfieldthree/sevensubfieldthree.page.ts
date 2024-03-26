import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-sevensubfieldthree',
  templateUrl: './sevensubfieldthree.page.html',
  styleUrls: ['./sevensubfieldthree.page.scss'],
})
export class SevensubfieldthreePage implements OnInit {
 
  category
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
    if(this.category == 'GoToA' && this.yesOrNo == 'Yes')
    {
      this.navController.navigateForward(`/sevensubfieldtwo`);
     
    }
    if(this.category == 'GoToA' && this.yesOrNo == 'No')
    {
      this.navController.navigateForward(`/reportfiledeight`);
    }
    else if(this.category == 'GoToB' && this.yesOrNo == 'Yes')
    {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          category: 'GoToC1'
        }
      };
      this.navController.navigateForward([`/sevensubfieldtwo`],navigationExtras);
    }
    else if(this.category == 'GoToB' && this.yesOrNo == 'No')
    {
      this.navController.navigateForward(`/sevensubfieldone`);
    }
    
  }
}

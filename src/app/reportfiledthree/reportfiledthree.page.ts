import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reportfiledthree',
  templateUrl: './reportfiledthree.page.html',
  styleUrls: ['./reportfiledthree.page.scss'],
})
export class ReportfiledthreePage implements OnInit {
  forWho:any;
  age:any;
  pronoun: any;
  buttonDisabled = true;
  gender: any;
  constructor(private navController: NavController, private router: Router,private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.forWho = params["forWho"];
      this.age = params["age"];
      console.log("for Who",this.forWho);
      console.log("Age",this.age);
   })
   }

  ngOnInit() {
  }

  selectPronoun(e:any)
  {
      console.log(e.detail.value)
      this.gender = e.detail.value;
      localStorage.setItem('gender',this.gender);
      this.buttonDisabled = false;
  }
  
     goToFieldFour() {

        // let navigationExtras: NavigationExtras = {
        //   queryParams: {
        //           age:this.age,
        //           forWho:this.forWho,
        //           pronoun:this.pronoun
        //         }
        //   };
        // this.navController.navigateForward(`/reportfiledfour`);
        this.navController.navigateForward([`reportfiledfour`]);
  }
}

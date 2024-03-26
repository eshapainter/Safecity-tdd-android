import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reportfiledfour',
  templateUrl: './reportfiledfour.page.html',
  styleUrls: ['./reportfiledfour.page.scss'],
})
export class ReportfiledfourPage implements OnInit {
  forWho:any;
  age:any;
  pronoun:any;
  experience: any;
  buttonDisabled = true;
  constructor(private navController: NavController, private router: Router,private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.forWho = params["forWho"];
      this.age = params["age"];
      this.pronoun = params["pronoun"];

      console.log("for Who",this.forWho);
      console.log("Age",this.age);
      console.log("pronoun",this.pronoun);
   })

   }

  ngOnInit() {
  }

  addExperience(e:any)
  {
    // console.log(e.detail.value)
    this.experience = e.detail.value;
    localStorage.setItem('whatHappend',this.experience);
    this.buttonDisabled = false;
  }
  
    report() {
      let navigationExtras: NavigationExtras = {
        queryParams: {
                age:this.age,
                forWho:this.forWho,
                pronoun:this.pronoun,
                experience:this.experience
              }
        };
      
      this.navController.navigateForward([`reportfiledfive`],navigationExtras);
                // this.navController.navigateForward(`/reportfiledfive`);
  }


}

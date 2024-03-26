import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reportfiledfive',
  templateUrl: './reportfiledfive.page.html',
  styleUrls: ['./reportfiledfive.page.scss'],
})
export class ReportfiledfivePage implements OnInit {
  forWho:any;
  age:any;
  pronoun:any;
  experience: any;
  date1: any;
  value: any;
  dateEstimate: string = '0';
  buttonDisabled = true;
  today: number;
  maxDate: string;
  constructor(private navController: NavController, private router: Router,private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.forWho = params["forWho"];
      this.age = params["age"];
      this.pronoun = params["pronoun"];
      this.experience = params["experience"];

      console.log("for Who",this.forWho);
      console.log("Age",this.age);
      console.log("pronoun",this.pronoun);
      console.log("experience",this.experience);
   })

   }

  ngOnInit() {
    this.maxDate = new Date().toISOString();
    
  }

  date(e)
  {   
      console.log("date",e.detail.value)
      this.date1 = e.detail.value
      this.buttonDisabled = false;
      if(this.date1.length > 10) {
        this.date1 = this.date1.substring(0, 10);
      }
      console.log(this.date1)
      localStorage.setItem('date',this.date1);
  }

  estimate(e)
  {
    console.log("estimate",e)
    let value = e.detail.checked
    
    if(value == true)
    {
       this.dateEstimate = '1';
    }
    else
    {
      this.dateEstimate = '0';
    }
    localStorage.setItem('dateEstimate',this.dateEstimate);
  }

  goToFieldSix()
   {

    let navigationExtras: NavigationExtras = {
      queryParams: {
              age:this.age,
              forWho:this.forWho,
              pronoun:this.pronoun,
              date1:this.date1,
              dateEstimate:this.dateEstimate,
              experience:this.experience
            }
      };
      this.navController.navigateForward([`reportfiledsix`],navigationExtras);
          // this.navController.navigateForward(`/reportfiledsix`);
   }
}

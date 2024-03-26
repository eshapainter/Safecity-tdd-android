import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reportfiledtwo',
  templateUrl: './reportfiledtwo.page.html',
  styleUrls: ['./reportfiledtwo.page.scss'],
})
export class ReportfiledtwoPage implements OnInit {
  forWho:any;
  age: any;
  buttonDisabled = true;
  error = false
  constructor(private navController: NavController, private router: Router,private route: ActivatedRoute) {

  //   this.route.queryParams.subscribe(params => {
  //     this.forWho = params["forWho"];
  //     console.log("for Who",this.forWho);
  //  })
  }

  ngOnInit() {
  }

  getAge(e:any)
  {
    // console.log(e.detail.value)
    this.age = e.detail.value;
    localStorage.setItem('age',this.age);
    if(this.age >= '18')
    {
      this.error = false
      this.buttonDisabled = false;
    }
    else
    {
      this.error = true
      this.buttonDisabled = false;
    }
    
  }
 
  goTofieldThree() {
    
   if(this.age >= '18')
   {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //           age:this.age,
    //           forWho:this.forWho
              
    //     }
    //   };
      this.navController.navigateForward([`reportfiledthree`]);
    }
    else
    {
      this.navController.navigateForward('/tabs/home')
    }
          
  }

 

}

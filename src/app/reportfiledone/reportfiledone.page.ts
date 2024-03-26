import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-reportfiledone',
  templateUrl: './reportfiledone.page.html',
  styleUrls: ['./reportfiledone.page.scss'],
})
export class ReportfiledonePage implements OnInit {
  forWho:any;
  buttonDisabled = true;
  constructor(public navController: NavController, 
    private router: Router,
    ) { } 

  ngOnInit() {
  }

  buttonSelect(e:any)
  {
      this.forWho = e.detail.value;
      localStorage.setItem('forwho',this.forWho);
      this.buttonDisabled = false;
    // console.log(this.forWho)
  }
  
  goToFieldSecond() {
    
    //  console.log("for who",this.forWho)
    //  let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //           forWho:this.forWho
    //     }
    //   };
      this.navController.navigateForward([`reportfiledtwo`]);
    }

}

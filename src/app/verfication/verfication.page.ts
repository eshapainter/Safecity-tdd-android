import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router,NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-verfication',
  templateUrl: './verfication.page.html',
  styleUrls: ['./verfication.page.scss'],
})
export class VerficationPage implements OnInit {
  langaugeId
  countryId
  cityId
  orgId
  orgArray =[];
  showError  = false
  buttondisable = true
  constructor(private router: Router,
    public navController:NavController,public route:ActivatedRoute) { 
      this.route.queryParams.subscribe(params => {
      
        this.countryId = params["countryId"];
        this.cityId = params["cityId"];
        this.orgId = params["orgId"];
        console.log("orgid",this.orgId)
        this.orgArray=this.orgId.split(',')
        localStorage.setItem('ov_code',this.orgArray[1])
        console.log("array",this.orgArray)
        console.log("countryId",this.countryId)
        console.log("city",this.cityId)
        
    });
    }

  ngOnInit() {
  }
  
  verification(e)
  {
    console.log(e.detail.value)
    if(e.detail.value != this.orgArray[1])
    {
      this.showError  = true
      this.buttondisable = true
    }
    else{
      this.showError  = false
      this.buttondisable = false
    }
  }

   language() {
     localStorage.setItem('Client_id',this.orgArray[0])



    //  if(localStorage.getItem('ngo_id') == '0')
    //  {
               let navigationExtras: NavigationExtras = {
      queryParams: {
         countryId:this.countryId,
         cityId:this.cityId,
         orgId:this.orgArray[0]
 
        }
    };
this.navController.navigateRoot([`/languageselection`],navigationExtras);
    //  }
    //  else
    //  { 
    //   let navigationExtras: NavigationExtras = {
    //     queryParams: {
    //       countryId:this.countryId,
    //        cityId:this.cityId,
    //        orgId:this.orgArray[0]
  
    //     }
    //   };
  
    //   this.navController.navigateForward([`ngopartner`], navigationExtras);
    //  }
    



     


  }

}

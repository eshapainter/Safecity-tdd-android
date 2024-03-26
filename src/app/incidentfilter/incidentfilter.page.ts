import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras} from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-incidentfilter',
  templateUrl: './incidentfilter.page.html',
  styleUrls: ['./incidentfilter.page.scss'],
})
export class IncidentfilterPage implements OnInit {
  catArray:any = []
  checked: any;
  BV1:boolean;BV2:boolean;BV3:boolean;BV4:boolean;
  BV5:boolean;BV6:boolean;BV7:boolean;BV8:boolean;
  BV9:boolean;BV10:boolean;BV11:boolean;BV12:boolean;
  BV13:boolean;BV14:boolean;
  buttonDisable = true
  categoryArray: any;
  catIdArray: any;
  categoryData: any;
  constructor(public sharedService:SharedService,public navController: NavController) { 
   

  }

  ngOnInit() {
  }
  deselectAll()
  {
    this.BV1 = false; this. BV2 = false; this.BV3 = false;this.BV4 = false,
    this.BV5 = false,this.BV6 = false,this.BV7 = false,this.BV8 = false,
    this.BV9 = false,this.BV10 = false,this.BV11 = false,this.BV12 = false,
    this.BV13 = false,this.BV14 = false;
    // this.sharedService.setCatArray(this.catArray)
  }
  ionViewWillEnter()
  {
    this.categoryData = this.sharedService.getCatArray()
    console.log("categoryData",this.categoryData)
    for(let j = 0;j<this.categoryData.length;j++)
    {
            var catData = this.categoryData[2]
    for(let i = 0;i<catData.length;i++)
    {
      if(catData[i] == "Domestic Violence")
      {
        this.BV1 = true
      }
      else if(catData[i] == "Online Harassment")
      {
        this.BV2 = true
      }
      else if(catData[i] == "Rape/Sexual Assault")
      {
        this.BV3 = true
      }
      else if(catData[i] == "Physical Assault")
      {
        this.BV4 = true
      }
      else if(catData[i] == "Stalking")
      {
        this.BV5 = true
      }
      else if(catData[i] == "Ogling/Facial Expressions/Staring")
      {
        this.BV6 = true
      }
      else if(catData[i] == "Touching /Groping")
      {
        this.BV7 = true
      }
      else if(catData[i] == "Showing Pornography without consent")
      {
        this.BV8 = true
      }
      else if(catData[i] == "Commenting/Sexual Invites")
      {
        this.BV9 = true
      }
      else if(catData[i] == "Chain Snatching/Robbery")
      {
        this.BV10 = true
      }
      else if(catData[i] == "Human Trafficking")
      {
        this.BV11 = true
      }
      else if(catData[i] == "Other")
      {
        this.BV12 = true
      }
    
    }
  }
  
  }
  
 getCategory(e)
  {
    
      console.log(e)
      this.checked = e.detail.checked
      if(this.checked == true)
      {
        this.catArray.push(e.detail.value)
        console.log(this.catArray)
        if(this.catArray != [])
        {
          this.buttonDisable = false
        }
      }
      else if(this.checked == false)
      {
        var index = this.catArray.indexOf(e.detail.value)
        console.log(index)
        this.catArray.splice(index,1)
        console.log(this.catArray)
      }
       
  }

  filter() {
  //  this.categoryArray = []
  //  this.catIdArray = []
    // for(let i =0; i<this.catArray.length; i++)
    // {
    //   console.log(this.catArray[i])
    //   var splitValue = this.catArray[i].split(',')
    //   console.log(splitValue)
    
    //   this.categoryArray.push(splitValue[0])
    //   this.catIdArray.push(splitValue[1])
    // }
    // this.sharedService.setCatArray(this.catArray)
    var catArray = JSON.stringify(this.catArray)
    // var catId = JSON.stringify(this.catIdArray)

    // console.log("catArray",cat)
    // console.log("catIDs",catId)
   
    let navigationExtras: NavigationExtras = {
      queryParams: {
        catData:catArray,
        // catIDs:catId,
        pagename:'incidentFilter'
      }
    };
          this.navController.navigateRoot([`/filter`],navigationExtras);
    }

}

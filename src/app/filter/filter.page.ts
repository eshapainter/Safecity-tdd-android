import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})

export class FilterPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity_webapp/api/';
  shownGroup = false;
  address = '';
  pagename = 'IncidentFilterPage';
  violenceType: any;
  buttonDisabled = true;
  violenceTypeArray = [];
  addressArray: any = [];
  catData
  catIds
  incidentFrom = '';
  timeOfDayArray: any = []
  catData2 = []
  value: any
  checked: any;
  incidentList
  catDatalen=0;
  pagename1
  calIds
  segmentmodel
  categoryData
  morning: boolean; 
  afternoon: boolean; evening: boolean; night: boolean; post_midnight: boolean;
  timeOfString: any;
  catData1
  catIdArray: any=[];
  shared_data = this.sharedService.getData()
  constructor(public sharedService:SharedService,public httpClient: HttpClient, private navController: NavController, private router: Router, public route: ActivatedRoute) {
    // this.categoryData = this.sharedService.getCatArray()
    // console.log("categoryData",this.categoryData)
    console.log(this.shared_data)
    console.log(this.shared_data['safetytipdata'])
    
  }

  ngOnInit() {
    
  }

  ionViewWillEnter()
  {
    this.categoryData = this.sharedService.getCatArray()
    console.log("categoryData",this.categoryData)
    if(this.categoryData.length > 0)
    {
      this.incidentFrom = this.categoryData[1]

      for(var i =0; i < this.categoryData[0].length ; i++)
      {
          if(this.categoryData[0][i] == 'morning')
          {
            this.morning = true;
          }
          else if(this.categoryData[0][i] == 'afternoon')
          {
            this.afternoon = true
          }
          else if(this.categoryData[0][i] == 'evening')
          {
            this.evening = true
          }
          else if(this.categoryData[0][i] == 'night')
          {
            this.night = true
          }
          else if(this.categoryData[0][i] == 'post_midnight')
          {
            this.post_midnight = true
          }
      }
      
      console.log(this.morning)
      console.log(this.afternoon)
      console.log(this.morning)
      console.log(this.morning)
      console.log(this.morning)
     console.log( this.sharedService.getCatArray())
     var data = this.sharedService.getCatArray()
      this.catData2 = data [2]
      this.catIdArray = data[3]
    }
    


    //this.catData2 =[]
    this.route.queryParams.subscribe(params => 
      {
              this.catData1 = params["catData"]
              console.log(this.catData1,"++++++++")
              // this.catIds = params["catIDs"]
              this.pagename1 = params["pagename"]
              this.segmentmodel = params["segmentModel"]
          
              console.log("pagename", this.pagename1)
              if (this.pagename1 == 'incidentFilter') 
              {
                this.catData2 = []
                this.catIdArray = []
                console.log("if condition")
                this.parseData()
              }
              if (this.pagename1 == null  || this.pagename1 == undefined) 
              {
                this.deSelectAll()
              }
    })

    console.log(this.incidentFrom)
    // for(let i=0;i<this.categoryData.length;i++)
    // {

    // }
    // this.catData = this.categoryData[0]
    // this.catIds = this.categoryData[1]
   
    // console.log("categoryid",this.catIds)
    // this.catIds = this.catIds.join(',')
    // console.log("categoryid after join",this.catIds)
  }
 
  parseData() 
  {
    this.catData = JSON.parse(this.catData1)
    console.log("+++",this.catData)

    for(let i =0; i<this.catData.length;i++)
      {
        console.log(this.catData[i])
        var splitValue = this.catData[i].split(',')
        console.log(splitValue)
      
        this.catData2.push(splitValue[0])
        this.catIdArray.push(splitValue[1])
      }
    console.log("con", this.catData2)
    console.log("con", this.catIdArray)
   
    // this.catDatalen = this.catData.length;
    // console.log("datalegth", this.catDatalen)
    // console.log("ids", this.catIds)
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    }
    else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) 
  {
    return this.shownGroup === group;
  };


  timeOfDay(e) 
  {
    console.log(e)

    this.checked = e.detail.checked
    console.log(this.checked)

    if (this.checked == true) {
      this.timeOfDayArray.push(e.detail.value)
      console.log(this.timeOfDayArray)
    }
    else if (this.checked == false) 
    {
      var index = this.timeOfDayArray.indexOf(e.detail.value);
      console.log(index)
      this.timeOfDayArray.splice(index, 1)

      console.log(this.timeOfDayArray)
    }

  }
  filter() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        //incidentList:this.incidentList,
        pagename: this.pagename,
      }
    };
    this.navController.navigateForward([`/incidentfilter`], navigationExtras);
  }

  // ionViewWillEnter()
  // {
  //   this. deSelectAll() 
  // }
  deSelectAll() 
  {
    // this.sharedService.timeofArray(null)
   
    this.incidentFrom = '';
    console.log(this.incidentFrom)
    console.log(this.catData)
    this.timeOfDayArray =[]
    this.catData2 = []
    this.catIdArray =[]
    this.morning = false,
    this.afternoon = false,
    this.evening = false,
    this.night = false,
    this.post_midnight = false
  }

  getFilterdIncident() 
  {
    var all_Array = []
    all_Array.push(this.timeOfDayArray,this.incidentFrom,this.catData2,this.catIdArray) 
    console.log("allArray from filterd page",all_Array)
    
    this.sharedService.timeofArray(all_Array)
      this.timeOfDayArray.length;
    //   console.log('timelenggth=>',this.timeOfDayArray.length," catDatalen==>",( this.categoryData.length),);
      
    // if(this.incidentFrom.length>=1)
    // {
    //   var totalFilterLen = ( this.categoryData.length) + this.timeOfDayArray.length + 1;
    // }
    // else
    // {
    //   var totalFilterLen =( this.categoryData.length) + this.timeOfDayArray.length;
    // }
    
    // console.log("totallen", totalFilterLen)
    this.timeOfString = this.timeOfDayArray.join(',')
    let navigationExtras: NavigationExtras = {
      queryParams: {
        pagename: this.pagename,
        // totalFilterLen: totalFilterLen,
        // incidentFrom: this.incidentFrom,
        // catId: this.catIds,
        // timeOfString: this.timeOfString,
        segmentModel: 'one'
      }
    };
    this.navController.navigateForward([`modelreport`], navigationExtras);
  }

  dismiss() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        segmentModel: 'one',
        pagename: this.pagename

      }
    };
    this.navController.navigateForward([`modelreport`], navigationExtras);
  }
  incedents() {
    console.log(this.incidentFrom);

  }
}

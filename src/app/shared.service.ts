import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core'
@Injectable({
  providedIn: 'root'
})
export class SharedService {
sharedData = {}
loading
sharedSafetyTipData
// apiurl = 'http://139.59.76.55/api/'   //localhttp://101.53.143.7/~dataduck/safecity_webapp/api/http://139.59.76.55/api/
// apiurlwebapp = 'http://139.59.76.55/api/' //localhttp://101.53.143.7/~dataduck/safecity_webapp/api/http://139.59.76.55/api/
catArray: any = [] ;
catId: any;
categoryArray: any = [];
catIdArray: any=  [];
timeOfArray
incidentFrom
categoryData
catIdData
all_Array = []
safetyfiltersdata = ''
// apiurl = 'https://webapp.safecity.in/api/'  //production
// apiurlwebapp = 'https://webapp.safecity.in/api/' //production

app_version = '1.3.8'
 apiurl = 'http://139.59.76.55/api/'  //local
 apiurlwebapp = 'http://139.59.76.55/api/' //local
//http://101.53.143.7/~dataduck/safecity_webapp/api
  constructor(public httpClient: HttpClient,public translate: TranslateService,public loadingCtrl: LoadingController) { }
  async  presentLoadingDefault(loadertext) 
  {

    
   

    console.log('data')
      this.loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message:loadertext,
        duration: 2500        
      });
      await this.loading.present();
    }

  get_url() : string
  {
    return this.apiurl
  }


  loaderDismiss()
  {
    console.log('data',this.loading)
    this.loading.dismiss()
  }

  getData()
  {
      return this.sharedData
  }

  setData(data)
  {
      this.sharedData = data;
  }

  setSafetyTipData(data)
  {
    this.sharedSafetyTipData = data
  }

  getSafetyTipData()
  {
    return this.sharedSafetyTipData
  }

  sharedPostRequest(api_name,data)
  {
    
    return this.httpClient.post(this.apiurl +api_name , data)
      
  }

  sharedPostRequest_webappurl(api_name,data)
  {
    
    return this.httpClient.post(this.apiurlwebapp +api_name , data)
      
  }
// set data for incident filter
 
  timeofArray(all_Array)
  {
    this.all_Array = all_Array
    console.log("1",this.all_Array)
    if(this.all_Array.length > 0)
    {
          var timeofArray = this.all_Array[0].length
          var catId = this.all_Array[2].length
          var incidentFrom = this.all_Array[1].length
             
    
    if(incidentFrom != "")
    {
      incidentFrom = 1
    }
    else
    {
      incidentFrom = 0
    }
    var totalLen = 0
    totalLen = timeofArray + catId + incidentFrom

    console.log("totalLen",totalLen)
    if(totalLen >= 1)
    {
    this.all_Array.push(totalLen)
    }
  }
  }
  getCatArray()
  {
   return this.all_Array
  }


  getsafetyfiltersdata()
  {
    return this.safetyfiltersdata
  }

  setsafetyfiltersdata(data)
  {
     this.safetyfiltersdata = data
  }
  
//Chat Module apis started**************************************************
  startChat(api_name, data){
    return this.httpClient.post(this.apiurlwebapp +api_name , data)
  }
  chatsync(api_name,data){
    return this.httpClient.post(this.apiurlwebapp +api_name , data)
  }
  insertChat(api_name,data){
    return this.httpClient.post(this.apiurlwebapp +api_name , data)
  }
  unsyncAdminUser(api_name,data){
    return this.httpClient.post(this.apiurlwebapp +api_name , data)
  }
}

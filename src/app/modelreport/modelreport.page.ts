import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service'
import { TranslateService } from '@ngx-translate/core'


@Component({
  selector: 'app-modelreport',
  templateUrl: './modelreport.page.html',
  styleUrls: ['./modelreport.page.scss'],
})
export class ModelreportPage implements OnInit {
  apiUrl1 = 'http://101.53.143.7/~dataduck/safecity_webapp/api/';
  segmentModel
  showFull = ''
  toparrow = true
  incidentList = []
  incidentData
  safetyTipData
  safetyTipList = []
  pagename: any
  number = false
  filterCount = 0
  incidentNumber = false;
  listAfterClear;
  incidentFrom
  catId
  timeOfString
  safetyFrom
  getDaysAgo: any;
  mapBound
  mapZoom
  showing: any;
  safetyShowing: any;
  pagename1 = 'modelpage'
  all_array
  offset = 0
  total_offset = 0
  safetytotaloffset = 0
  safecity_offset = 0
  forwardincidentdisabled = false
  forwardsafetydisabled = false
  shared_data = this.shareddata.getData()
  hide_back = false
  hide_safety_back = false
  constructor(public loadingController: LoadingController,public translate: TranslateService, private shareddata: SharedService, public httpClient: HttpClient, public route: ActivatedRoute, private navController: NavController, private router: Router, public modalController: ModalController) {
    
    this.route.queryParams.subscribe(params => {
      console.log(this.pagename)
      this.pagename = params['pagename']
      this.segmentModel = params['segmentModel'];
      var clear_filter = params['clear_filter']
      console.log("segment model", this.segmentModel)
      // this.incidentFrom = params['incidentFrom'];
      // this.catId = params['catId'];
      // this.timeOfString = params['timeOfString'];
      this.safetyFrom = params['safetyFrom'];
      console.log("safetyFrom", this.safetyFrom)
      console.log("pagename", this.pagename)

      if(this.pagename == 'from_detail')
      {
        this.all_array = this.shareddata.getCatArray();
        console.log('all arraay', this.all_array)
        for (let i = 0; i < this.all_array.length; i++) {
          this.filterCount = this.all_array[4]
        }
        if (this.filterCount != 0) {
          console.log("hellow")
          this.incidentNumber = true;
        } else {
          console.log("hellow")
          this.incidentNumber = false;
        }
        this.getReportedIncident()
      }

      if (this.pagename == 'IncidentFilterPage') {
        this.all_array = this.shareddata.getCatArray();
        console.log('all arraay', this.all_array)
        for (let i = 0; i < this.all_array.length; i++) {
          this.filterCount = this.all_array[4]
        }
        if (this.filterCount != 0) {
          console.log("hellow")
          this.getReportedIncident()
          this.incidentNumber = true;
        } else {
          console.log("hellow")
          this.incidentNumber = false;
        }
       
      }
      // if(clear_filter == 'true')
      // {
      //   this.incidentNumber = false;
      //   var empty1 = {}
      //   this.shareddata.setData(empty1)
      //   var empty = []
      // this.shareddata.timeofArray(empty)  
      // }
      if (this.pagename == 'safetyFilterPage') {
        this.number = true
        this.getSafetyTipsList()
      }
      var safety_tip_filter = this.shareddata.getsafetyfiltersdata()
      if (safety_tip_filter.length == 0) {
        this.number = false
      }
      else {
        this.number = true
      }

    });

  }

  ngOnInit() {
    

  }

  ionViewDidEnter() {
    // this.getReportedIncident()
    //this.getSafetyTipsList()

    console.log('in ngoninit')
    // this.presentLoading() 
    this.all_array = this.shareddata.getCatArray();
    console.log(this.all_array)
    console.log(this.shared_data)
    this.mapBound = localStorage.getItem('mapBound')
    this.mapZoom = localStorage.getItem('map_zoom')
    if (this.all_array.length) {
      this.getReportedIncident()
    }
    else {
      this.getReportedIncident()
    }

    if (this.shareddata.getsafetyfiltersdata()) {
      this.getSafetyTipsList()
    }
    else {
      this.getSafetyTipsList()
    }

  }

  previousforward(key) {
    if (key == 'previous') {
      this.offset -= this.incidentData['limit']
    }
    else {

    }

    if (this.all_array.length > 0) {
      this.getReportedIncident()
    }
    else {
      this.getincident_list()
    }

  }


  previousforwardsafety(key) {
    if (key == 'previous') {
      this.safecity_offset -= this.safetyTipData['limit']
    }
    else {

    }
    if (this.shareddata.getsafetyfiltersdata()) {
      this.getSafetyTipsList()
    }
    else {
      this.getSafetyTip()
    }

  }

  getincident_list() {
    console.log(this.offset)
    console.log(JSON.stringify(this.offset))
    // this.shareddata.presentLoadingDefault()
    var address = localStorage.getItem('City_name')
    var client_id = localStorage.getItem('Client_id')
    var lang_id = localStorage.getItem('Lang_id')

    

    let data = new FormData();
    data.append('lang_id', lang_id);
    data.append('client_id', client_id);
    data.append('city', address);    
    data.append('offset', JSON.stringify(this.offset));
    data.append('map_bound', localStorage.getItem('mapBound'));
    data.append('map_zoom', localStorage.getItem('map_zoom'));
if(this.all_array.length > 0){
     for (let i = 0; i < this.all_array.length; i++) {

      var timeOfArray = this.all_array[0]
      var incidentFrom = this.all_array[1]
      var catIdFrom = this.all_array[3]
    }
    if (this.catId == undefined) {
      this.catId = '';
    }
    this.incidentFrom = incidentFrom
    console.log("****", this.all_array.length)
    var all_array_status = this.all_array.length
    if (all_array_status > 0) {
      this.catId = catIdFrom.join(',')
      this.timeOfString = timeOfArray.join(',')

    }
    
    data.append('reported_on', this.incidentFrom);
    data.append('categories_ids', this.catId);
    data.append('reported_time', this.timeOfString);
  }
    //   this.shareddata.presentLoadingDefault()
    this.shareddata.sharedPostRequest('reported-incidents', data).subscribe((rdata: any) => {
      //console.log(rdata);
      //console.log("incidents", rdata);
      this.incidentList = rdata.data
      this.incidentData = rdata
      if (rdata.data.length > 0) {        
        this.showing = this.incidentData.showing
        this.forwardincidentdisabled = false        
        this.total_offset = this.incidentData.total
        console.log(this.offset)
        if (this.offset == 0) {
          this.hide_back = true
          this.offset += this.incidentData['limit']
        }
        else {
          this.offset += this.incidentData['limit']
          this.hide_back = false
        }

        console.log(this.offset)
        if (this.offset >= this.total_offset) {
          console.log(this.offset)
          this.forwardincidentdisabled = true
          this.offset -= this.incidentData['limit']
        }
        console.log(this.offset)
        this.shareddata.setData(this.incidentList)
        for (let i = 0; i < this.incidentList.length; i++) {

          var added_date = this.incidentList[i].created_on != null ? this.incidentList[i].created_on : "";
          var dayBetween = this.days_between(added_date);


          
        var Today
        this.translate.get('Today').subscribe((res: string) => {

          Today = res;
        })

        var day_ago
        this.translate.get('day_ago').subscribe((res: string) => {

          day_ago = res;
        })

        var days_ago
        this.translate.get('days_ago').subscribe((res: string) => {

          days_ago = res;
        })


          this.getDaysAgo = (dayBetween > 7 ? this.ChangeDateFormat(added_date, 1) : (dayBetween == 0) ? Today : (dayBetween == 1) ? dayBetween +' ' + day_ago : dayBetween + ' ' + days_ago);
          // console.log(this.getDaysAgo)
          this.incidentList[i].show_date = this.getDaysAgo

          let time = this.timeConvert(this.incidentList[i].time_from)
          // console.log("Time", time)
          this.incidentList[i].show_time = time

          var disc = this.incidentList[i].description.substring(0, 97)
          // console.log("disc", disc)
          this.incidentList[i].show_disc = disc
        }
      }
      else {
        this.forwardincidentdisabled = true
      }

      // this.shared_data['incidentdata'] = this.incidentList
      // this.shareddata.setData(this.shared_data)
      //  this.shareddata.loaderDismiss()
    }, error => {
      // this.shareddata.loaderDismiss()
    }, () => {

    });

  }
  getReportedIncident() {
    var address = localStorage.getItem('City_name')
    var client_id = localStorage.getItem('Client_id')
    var lang_id = localStorage.getItem('Lang_id')

    if (this.pagename == 'Incit_safety_fr_Home')
    //  || this.pagename == 'from_detail' || this.pagename == 'safetyFilterPage' || this.pagename == 'safetyDetail') 
    {
      // this.incidentData = this.shareddata.getData()
      // console.log("incident from shared",this.incidentData)
      // this.incidentList = this.incidentData.data
      // console.log("incidentList",this.incidentList)
      // this.showing = this.incidentData.showing

      

      this.mapZoom = localStorage.getItem('map_zoom')
      if (this.incidentList.length == 0 && this.mapZoom < 15) {
        this.getincident_list()
      }
      else if (this.mapZoom >= 15) {
        this.getincident_list()
      }



    }
    else if (this.pagename == 'safetyFilterPage') {
      this.getSafetyTipsList()
    }
    else if (this.pagename == 'IncidentFilterPage' || this.pagename == 'from_detail') {
      // this.timeOfString
      // this.incidentFrom =''
      // this.catId =''
      console.log("all_array", this.all_array)
      console.log("all_array", this.all_array.length)
      if (this.all_array.length > 0) {
        

        let data = new FormData();
        data.append('lang_id', lang_id);
        data.append('client_id', client_id);
        data.append('city', address);
        data.append('reported_on', this.incidentFrom);        
        data.append('map_bound', localStorage.getItem('mapBound'));
      data.append('map_zoom', localStorage.getItem('map_zoom'));

if(this.all_array.length > 0){
      for (let i = 0; i < this.all_array.length; i++) {

        var timeOfArray = this.all_array[0]
        var incidentFrom = this.all_array[1]
        var catIdFrom = this.all_array[3]
      }
      if (this.catId == undefined) {
        this.catId = '';
      }
      this.incidentFrom = incidentFrom
      console.log("****", this.all_array.length)
      var all_array_status = this.all_array.length
      if (all_array_status > 0) {
        this.catId = catIdFrom.join(',')
        this.timeOfString = timeOfArray.join(',')
      }
      data.append('categories_ids', this.catId);
        data.append('reported_time', this.timeOfString);
        data.append('offset', JSON.stringify(this.offset));
    }
    var loadertext
    this.translate.get('loadertext').subscribe((res: string) => {

      loadertext = res;
    })
    this.shareddata.presentLoadingDefault(loadertext)
        this.shareddata.sharedPostRequest('reported-incidents', data).subscribe((rdata: any) => {
          console.log(rdata);
          console.log("incidents", rdata);
          this.incidentData = rdata
          this.incidentList = rdata.data
          if (rdata.data.length > 0) {            
            this.total_offset = this.incidentData.total
            this.showing = this.incidentData.showing
            this.forwardincidentdisabled = false
            

            if (this.offset == 0) {
              this.hide_back = true
              this.offset += this.incidentData['limit']
            }
            else {
              this.offset += this.incidentData['limit']
              this.hide_back = false
            }
            if (this.offset >= this.total_offset) {

              this.forwardincidentdisabled = true
              this.offset -= this.incidentData['limit']
            }

            this.shareddata.setData(this.incidentList)

            for (let i = 0; i < this.incidentList.length; i++) {

              var added_date = this.incidentList[i].created_on != null ? this.incidentList[i].created_on : "";
              var dayBetween = this.days_between(added_date);

              
        var Today
        this.translate.get('Today').subscribe((res: string) => {

          Today = res;
        })

        var day_ago
        this.translate.get('day_ago').subscribe((res: string) => {

          day_ago = res;
        })

        var days_ago
        this.translate.get('days_ago').subscribe((res: string) => {

          days_ago = res;
        })

              this.getDaysAgo = (dayBetween > 7 ? this.ChangeDateFormat(added_date, 1) : (dayBetween == 0) ? Today : (dayBetween == 1) ? dayBetween + ' ' + day_ago : dayBetween + ' ' + days_ago);
              // console.log(this.getDaysAgo)
              this.incidentList[i].show_date = this.getDaysAgo

              let time = this.timeConvert(this.incidentList[i].time_from)
              // console.log("Time", time)
              this.incidentList[i].show_time = time

              var disc = this.incidentList[i].description.substring(0, 97)
              // console.log("disc", disc)
              this.incidentList[i].show_disc = disc
            }
            this.shared_data['incidentdata'] = this.incidentList
          }
          else {
            this.forwardincidentdisabled = true
          }
          // this.shareddata.setData(this.shared_data)
          // this.shareddata.loaderDismiss()
        }, error => {
          this.shareddata.loaderDismiss()
        }, () => {

        });



        // this.httpClient.post(this.apiUrl1 + 'reported-incidents', data)
        //   .subscribe((rdata: any) => {
        //     console.log("incidents", rdata);
        //     this.incidentData = rdata
        //     // this.showing = this.incidentData.showing
        //     this.incidentList = rdata.data
        //     this.shareddata.setData(this.incidentData)
        //     for (let i = 0; i < this.incidentList.length; i++) {

        //       var added_date = this.incidentList[i].created_on != null ? this.incidentList[i].created_on : "";
        //       var dayBetween = this.days_between(added_date);
        //       this.getDaysAgo = (dayBetween > 7 ? this.ChangeDateFormat(added_date, 1) : (dayBetween == 0) ? 'Today' : (dayBetween == 1) ? dayBetween + " day ago" : dayBetween + " days ago");
        //       // console.log(this.getDaysAgo)
        //       this.incidentList[i].show_date = this.getDaysAgo

        //       let time = this.timeConvert(this.incidentList[i].time_from)
        //       // console.log("Time", time)
        //       this.incidentList[i].show_time = time

        //       var disc = this.incidentList[i].description.substring(0, 97)
        //       // console.log("disc", disc)
        //       this.incidentList[i].show_disc = disc
        //     }

        //     // this.showMap();
        //   }, error => {
        //   });
      }
      else {
        this.filterCount = 0;
        if (this.incidentList.length == 0 && this.mapZoom < 15) {
          this.getincident_list()
        }
        else if (this.mapZoom >= 15) {
          this.getincident_list()
        }

      }
    }



  }

  getSafetyTip() {
    var address = localStorage.getItem('City_name')
    var client_id = localStorage.getItem('Client_id')
    var lang_id = localStorage.getItem('Lang_id')
    let data = new FormData();
    data.append('lang_id', lang_id);
    data.append('client_id', client_id);
    data.append('city', address);
    data.append('map_bound', localStorage.getItem('mapBound'));
    data.append('map_zoom', localStorage.getItem('map_zoom'));
    data.append('offset', JSON.stringify(this.safecity_offset));
    if (this.shareddata.getsafetyfiltersdata()) {
      data.append('reported_on', this.shareddata.getsafetyfiltersdata());
    }


    // this.shareddata.presentLoadingDefault()
    this.shareddata.sharedPostRequest('get-safety-tips', data).subscribe((rdata: any) => {
      //  console.log(rdata);
      this.safetyTipData = rdata
      this.safetyTipList = rdata.data

      if (rdata.data.length > 0) {
        
        this.safetytotaloffset = this.safetyTipData.total
        this.shareddata.setSafetyTipData(this.safetyTipData)
        this.safetyShowing = this.safetyTipData.showing
        
        this.forwardsafetydisabled = false
        this.shareddata.setSafetyTipData(this.safetyTipList)



        if (this.safecity_offset == 0) {
          this.hide_safety_back = true
          this.safecity_offset += this.safetyTipData['limit']
        }
        else {
          this.safecity_offset += this.safetyTipData['limit']
          this.hide_safety_back = false
        }

        if (this.safecity_offset >= this.safetytotaloffset) {
          //this.safecity_offset = 0
          this.forwardsafetydisabled = true
          this.safecity_offset -= this.safetyTipData['limit']
        }

        for (let i = 0; i < this.safetyTipList.length; i++) {

          var added_date = this.safetyTipList[i].added_date != null ? this.safetyTipList[i].added_date : "";
          var dayBetween = this.days_between(added_date);

          
        var Today
        this.translate.get('Today').subscribe((res: string) => {

          Today = res;
        })

        var day_ago
        this.translate.get('day_ago').subscribe((res: string) => {

          day_ago = res;
        })

        var days_ago
        this.translate.get('days_ago').subscribe((res: string) => {

          days_ago = res;
        })

          var getDaysAgo = (dayBetween > 7 ? this.ChangeDateFormat(added_date, 1) : (dayBetween == 0) ? Today : (dayBetween == 1) ? dayBetween + ' ' + day_ago : dayBetween + ' ' + days_ago);
          // console.log(getDaysAgo)
          this.safetyTipList[i].show_date = getDaysAgo

          var time1 = this.safetyTipList[i].added_date.substring(11, 19);
          // console.log("time", time1)
          let time2 = this.timeConvert(time1)
          // console.log("Time", time2)
          this.safetyTipList[i].show_time = time2
          var disc = this.safetyTipList[i].safety_tip_desc.substring(0, 97)
          // console.log("disc", disc)
          this.safetyTipList[i].show_disc = disc
        }
      }
      else {
        this.forwardsafetydisabled = true
      }
      // this.shared_data['safetytipdata'] = this.safetyTipList
      // this.shareddata.setData(this.shared_data)
      // this.safetyTipData.rdata
    }, error => {
      // this.shareddata.loaderDismiss()
    }, () => {
      //this.shareddata.loaderDismiss()
    });

  }

  getSafetyTipsList() {
    var address = localStorage.getItem('City_name')
    var client_id = localStorage.getItem('Client_id')
    var lang_id = localStorage.getItem('Lang_id')
    if (this.pagename == 'from_detail' || this.pagename == 'safetyDetail' || this.pagename == 'IncidentFilterPage' || this.pagename == 'safetyFilterPage') {

      //  this.safetyTipData = this.shareddata.getSafetyTipData()

      // this.safetyShowing = this.safetyTipData.showing
      //this.safetyTipList = this.safetyTipData
      console.log("pagename in safety else", this.pagename)
      let data = new FormData();
      data.append('lang_id', lang_id);
      data.append('client_id', client_id);
      data.append('city', address);
      data.append('map_bound', localStorage.getItem('mapBound'));
      data.append('map_zoom', localStorage.getItem('map_zoom'));
      if (this.shareddata.getsafetyfiltersdata()) {
        data.append('reported_on', this.shareddata.getsafetyfiltersdata());
      }
      // data.append('reported_time', this.timeOfString);
      data.append('offset', JSON.stringify(this.safecity_offset));

      //  this.shareddata.presentLoadingDefault()
      this.shareddata.sharedPostRequest('get-safety-tips', data).subscribe((rdata: any) => {
        console.log(rdata);

        this.safetyTipData = rdata
        this.safetyTipList = rdata.data
        if (rdata.data.length > 0) {
          
          this.safetytotaloffset = this.safetyTipData.total
          this.safetyShowing = this.safetyTipData.showing
          
          this.forwardsafetydisabled = false
          this.shareddata.setSafetyTipData(this.safetyTipList)


          if (this.safecity_offset == 0) {
            this.hide_safety_back = true
            this.safecity_offset += this.safetyTipData['limit']
          }
          else {
            this.safecity_offset += this.safetyTipData['limit']
            this.hide_safety_back = false
          }
          if (this.safecity_offset >= this.safetytotaloffset) {
            this.forwardsafetydisabled = true
            this.safecity_offset -= this.safetyTipData['limit']
          }

          for (let i = 0; i < this.safetyTipList.length; i++) {

            var added_date = this.safetyTipList[i].added_date != null ? this.safetyTipList[i].added_date : "";
            var dayBetween = this.days_between(added_date);

            
        var Today
        this.translate.get('Today').subscribe((res: string) => {

          Today = res;
        })

        var day_ago
        this.translate.get('day_ago').subscribe((res: string) => {

          day_ago = res;
        })

        var days_ago
        this.translate.get('days_ago').subscribe((res: string) => {

          days_ago = res;
        })
            var getDaysAgo = (dayBetween > 7 ? this.ChangeDateFormat(added_date, 1) : (dayBetween == 0) ? Today : (dayBetween == 1) ? dayBetween + ' ' + day_ago : dayBetween + ' ' + days_ago);
            // console.log(getDaysAgo)
            this.safetyTipList[i].show_date = getDaysAgo

            var time1 = this.safetyTipList[i].added_date.substring(11, 19);
            // console.log("time", time1)
            let time2 = this.timeConvert(time1)
            // console.log("Time", time2)
            this.safetyTipList[i].show_time = time2
            var disc = this.safetyTipList[i].safety_tip_desc.substring(0, 97)
            // console.log("disc", disc)
            this.safetyTipList[i].show_disc = disc
          }
        }
        else {
          this.forwardsafetydisabled = true
        }
        // this.shared_data['safetytipdata'] = this.safetyTipList
        // this.shareddata.setData(this.shared_data)
        // this.safetyTipData.rdata
      }, error => {
        //  this.shareddata.loaderDismiss()
      }, () => {
        // this.shareddata.loaderDismiss()
      });



    }
    else {




      if (this.safetyTipList.length == 0 && this.mapZoom < 15) {
        this.getSafetyTip()
      }
      else if (this.mapZoom >= 15) {
        this.getSafetyTip()
      }


      // this.httpClient.post(this.apiUrl1 + 'get-safety-tips', data)
      //   .subscribe((rdata: any) => {
      //     this.safetyTipData =rdata
      //     this.shareddata.setSafetyTipData(this.safetyTipData)
      //     // this.safetyShowing = this.safetyTipData.showing
      //     this.safetyTipList = rdata.data
      //     for (let i = 0; i < this.safetyTipList.length; i++) 
      //     {

      //       var added_date = this.safetyTipList[i].added_date != null ? this.safetyTipList[i].added_date : "";
      //       var dayBetween = this.days_between(added_date);
      //       var getDaysAgo = (dayBetween > 7 ? this.ChangeDateFormat(added_date, 1) : (dayBetween == 0) ? 'Today' : (dayBetween == 1) ? dayBetween + " day ago" : dayBetween + " days ago");
      //       // console.log(getDaysAgo)
      //       this.safetyTipList[i].show_date = getDaysAgo

      //       var time1 = this.safetyTipList[i].added_date.substring(11, 19);
      //       // console.log("time", time1)
      //       let time2 = this.timeConvert(time1)
      //       // console.log("Time", time2)
      //       this.safetyTipList[i].show_time = time2
      //       var disc = this.safetyTipList[i].safety_tip_desc.substring(0, 97)
      //       // console.log("disc", disc)
      //       this.safetyTipList[i].show_disc = disc
      //     }
      //     // this.safetyTipData.rdata

      //   }, error => {
      //   });
    }
  }

  ionViewDidLoad() {

  }
  clearList(e) {

    console.log(e)
    if (e == 'incident') {
      this.all_array = []
      this.shareddata.timeofArray(this.all_array)
      this.timeOfString = ''
      this.incidentFrom = ''
      this.catId = ''
      this.pagename = ''
      console.log("name", this.incidentFrom)
      console.log("name", this.timeOfString)
      console.log("name", this.catId)
      console.log("name", this.pagename)

      this.incidentNumber = false;
      this.pagename = null
      this.offset = 0
      this.getincident_list()
    }
    else {
      this.number = false
      this.safetyFrom = '';
      this.pagename = null
      this.getSafetyTip()
      this.safecity_offset = 0
      this.shareddata.safetyfiltersdata = ''
    }

  }
  segmentChanged(event) {
    console.log(this.segmentModel);
    console.log(event);
    if (this.segmentModel == "two") {
      this.getSafetyTipsList()
    }
    else {
      this.getReportedIncident()
    }
  }

  async back() {
    this.navController.navigateBack('/home')
  }

  preframing() {
    this.navController.navigateForward(`/preframingtwo`);
  }

  help() {

    this.navController.navigateForward(`/help`);
  }

  menu() {

    this.navController.navigateForward(`/menu`);
  }

  safetytip() {
    this.navController.navigateForward(`/safteytipone`);
  }

  viewreport(item) {
    console.log(item)
    var itemDetail = JSON.stringify(item)
    let navigationExtras: NavigationExtras = {
      queryParams:
      {
        itemDetail: itemDetail,
      }
    };
    this.navController.navigateForward([`/viewreportdetail`], navigationExtras);
  }


  viewsafety(item) {
    console.log(item)
    var itemDetail = JSON.stringify(item)
    let navigationExtras: NavigationExtras = {
      queryParams:
      {
        safetyitemDetail: itemDetail,
      }
    };

    this.navController.navigateForward([`/viewsafteydetail`], navigationExtras);
  }

  filter() {
    this.offset = 0
    console.log('-+-+-+-+',this.pagename)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        catData: [],
        // catIDs:catId,
        pagename: this.pagename
      }
    };
    this.navController.navigateForward([`/filter`], navigationExtras);

    //this.navController.navigateForward(`/filter`);
  }

  safteyfilter() {
    this.safecity_offset = 0
    this.navController.navigateForward(`/safetyfilter`);
  }
  ChangeDateFormat(date, val) {
    var dayDate = new Date(date.replace(/ /g,"T" ));

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[dayDate.getMonth()];
    var monthVal = (val == 1 ? monthName.substr(0, 3) : monthName);
    var getDate = dayDate.getDate();
    var getYear = dayDate.getFullYear();

    var format_date = getDate + " " + monthVal + " " + getYear;
    return format_date;
  }
  timeConvert(time: any) {
    //  console.log("Time in convert ", time)


    var time_split = time.split(':')
    //  console.log(time_split)

    if (time_split[0].charAt(0) == '0') {
      var t = time_split[0].slice(1)
      time_split[0] = t;
      //console.log(time_split[0])
    }
    if (time_split[1].charAt(0) == '0') {
      var t = time_split[1].slice(1)
      time_split[1] = t;
      // console.log(time_split[1])
    }


    let hour = JSON.parse(time_split[0])
    let minute = JSON.parse(time_split[1])

    //  console.log(hour)
    //  console.log(minute)
    var hours = hour > 12 ? hour - 12 : hour;
    var am_pm = hour >= 12 ? "PM" : "AM";
    var minutes = minute < 10 ? "0" + minute : minute;
    let timeStart = hours + ":" + minutes + " " + am_pm;


    // Check correct time format and split into components
    // time = time.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    // if (time.length > 1) { // If time format correct
    //   time = time.slice(1);  // Remove full string match value
    //   time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
    //   time[0] = +time[0] % 12 || 12; // Adjust hours
    // }
    return timeStart // return adjusted time or original string
  }
  days_between(date) {
    // The number of milliseconds in one day
    var date1: any
    date1 = new Date(date.replace(/ /g,"T"));
    var todays_date: any
    todays_date = new Date();
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(todays_date - date1);
    var daydiff = Math.round(differenceMs / ONE_DAY);
    return daydiff;
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

  }
  dismiss() {

    let navigationExtras: NavigationExtras = {
      queryParams:
      {
        pagename: this.pagename1,
        safetyFrom: this.safetyFrom
      }
    };
    this.navController.navigateForward([`/home`], navigationExtras);
  }


}






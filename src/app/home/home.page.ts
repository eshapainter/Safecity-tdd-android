import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, Platform, IonRouterOutlet, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
// import { ViewController } from '@ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';
import { ModelreportPage } from '../modelreport/modelreport.page';
import { DetailpopupPage } from '../detailpopup/detailpopup.page';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service'
import { Keyboard } from '@ionic-native/keyboard/ngx';
import {TranslateService} from '@ngx-translate/core'
import MarkerClusterer, { MarkerClustererOptions } from '@googlemaps/markerclustererplus';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
declare var google: any;

import * as $ from 'jquery'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/safecity_report/';
  apiUrl1 = 'http://101.53.143.7/~dataduck/safecity_webapp/api/';
  subscription: any;
  segmentModel = "one";
  map: any;
  componentRestrictions: { country: ['in', 'uk'] }
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  // @ViewChild('map') mapElement: ElementRef;

  location;

  lat;
  longi;
  infoWindows: any = [];
  address
  locations
  title
  autoaddress = []
  autoadd1 = []
  radius = 3000
  pagename = 'Incit_safety_fr_Home';
  listing_data;
  incident_remove_marker = []
  safety_remove_marker = []
  public searchForm: FormGroup;
  autocomplete: any;
  markers: any;
  inputDiv
  incidentList: any;
  saftyTipsList: any;
  SafetyMarkers: any;
  IncidentMarkers: any;
  safetyTipList: any;
  hide = false
  show = true
  incidentMarker = 'assets/images/icons/Incident_Icon.svg'
  safetyMarker = 'assets/images/icons/Safety_Tip_Icon.svg'
  getDaysAgo: string;
  GoDetail
  incident = 'incident'
  safety = 'safety'
  markerClustererList = [];
  langId: string;
  clientId: string;
  default_reported_incident_data = []
  latLongData = []
  icident_markersList = []
  pagename1
  incidentData: any;
  safetyTipData: any;
  locations1: any;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  isFilterempty = false
  safetyFrom
  clearfilter = false;
  incidentFrom
  catId
  timeOfString
  all_array = []
  constructor(public zone: NgZone, public route: ActivatedRoute,
    private toastctrl: ToastController,
    private shareddata: SharedService,
    private routerOutlet: IonRouterOutlet,
    public formBuilder: FormBuilder,
    public httpClient: HttpClient,
    private navController: NavController,
    private router: Router,
    public platform: Platform,
    public keyboard: Keyboard,public translate:TranslateService,
    public modalController: ModalController) {
    // angularComponent = { GoDetail: this.GoDetail, zone: zone }
    // this.platform.backButton.subscribeWithPriority(-1, () => {
    //   if (!this.routerOutlet.canGoBack()) {
    //     App.exitApp();
    //   }
    // });

    this.address = localStorage.getItem('City_name')
    this.langId = localStorage.getItem('Lang_id')
    this.clientId = localStorage.getItem('Client_id')

    this.searchForm = formBuilder.group({
      location: ['', Validators.compose([Validators.required])]
    });

    var bttn = document.getElementById("Show");
    // bttn.onclick = function(){
    // greetings({firstName: myUser1[0], lastName: myUser1[1]});
    // }
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
        navigator['app'].exitApp();
      }
      else {

        var btn_msg = ''
      this.translate.get('press_back_again_to_exit').subscribe((res: string) => {

        btn_msg = res;
      })
       // var msg = "Press back again to exit."
        this.presentToast(btn_msg)
        this.lastTimeBackPress = new Date().getTime();
      }

    });
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }


  async presentToast(msg) {
    const toast = await this.toastctrl.create({
      message: msg,
      cssClass: 'tostclass',
      duration: 2000
    });
    toast.present();
  }

  // public viewCtrl: ViewController
  ngOnInit() {
    // this.initAutocomplete()
    // this.presentModal()
  }
  segmentChanged(event) {
    if (this.segmentModel == 'one') {
      for (let marker of this.safety_remove_marker) {
        marker.setMap(null);
      }
      this.showMap()
      // this.getReportedIncident()

    }

    else {
      for (let marker of this.incident_remove_marker) {
        marker.setMap(null);
      }
      this.showMap()
    }
  }
  ionViewWillEnter() {
    console.log("Enter called ");

    this.route.queryParams.subscribe(params => {
      this.pagename1 = params['pagename'];
      this.safetyFrom = params['safetyFrom'];
      console.log("pagename1******", this.pagename1)
    })
    this.initAutocomplete();
    this.address = localStorage.getItem('City_name')
    var country_name = localStorage.getItem('countryName')
    var value = this.address + ' ' + country_name
    this.getlatlong(value)
    // this.showMap()

    /// keyboard events try
    this.keyboard.onKeyboardWillShow().subscribe((res) => {
      this.showFullMap()
    })
    this.keyboard.onKeyboardHide().subscribe((res) => {
      this.hide1()
    })
  }

  //*****************Filter incident Report by search***************
  getReportedIncident(mapData) {
    var mapbound = mapData.map_bound
    var map_zoom = mapData.map_zoom
    mapbound = JSON.stringify(mapbound)

    // mapbound = mapbound.map(user => );

    if (this.pagename1 == 'modelpage') {
      console.log("pagename from home", this.pagename1)
      var filter_data = this.shareddata.getCatArray()
      console.log("filter len",filter_data)
      if (filter_data.length > 0) {


        
        this.address = localStorage.getItem('City_name')
        let data = new FormData();
        data.append('lang_id', this.langId);
        data.append('client_id', this.clientId);
        //  data.append('city', this.address);
        data.append('map_bound', mapbound);
        data.append('map_zoom', map_zoom);
        this.all_array = this.shareddata.getCatArray();
        if (this.all_array.length > 0) {
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

        // this.shareddata.presentLoadingDefault()
        this.shareddata.sharedPostRequest('reported-incidents/map-coordinates', data).subscribe((rdata: any) => {
          //this.shareddata.setData(rdata)
          this.incidentList = rdata.data
          this.latLongData = []
          for (let i = 0; i < this.incidentList.length; i++) {
            //this.latLongData.push({ "id": this.incidentList[i].id, 'city': this.incidentList[i].city, "area": this.incidentList[i].area, "lat": parseFloat(this.incidentList[i].latitude), "lng": parseFloat(this.incidentList[i].longitude), "categories": this.incidentList[i].categories, "dateTime": this.ChangeDateFormat(this.incidentList[i].created_on, 1) + " | " + this.timeConvert(this.incidentList[i].time_from), "viewmore_id": this.incidentList[i] })
            this.latLongData.push({ "id": this.incidentList[i].id, "lat": parseFloat(this.incidentList[i].latitude), "lng": parseFloat(this.incidentList[i].longitude) })

          }
          const path = 'assets/images/icons/incidents_mobile_cluster_icon'
          this.addClusterIncidentMarkersToMap(this.latLongData, this.incidentMarker, path, this.incident)

        }, error => {
          // this.shareddata.loaderDismiss()
        }, () => {
          // this.shareddata.loaderDismiss()
        });


        
        // this.incidentData = this.shareddata.getData()
        // if (this.incidentData) {
        // this.incidentList = this.incidentData
        // this.latLongData = []
        // for (let i = 0; i < this.incidentList.length; i++) {
        //   this.latLongData.push({ "id": this.incidentList[i].id, 'city': this.incidentList[i].city, "area": this.incidentList[i].area, "lat": parseFloat(this.incidentList[i].latitude), "lng": parseFloat(this.incidentList[i].longitude), "categories": this.incidentList[i].categories, "dateTime": this.ChangeDateFormat(this.incidentList[i].created_on, 1) + " | " + this.timeConvert(this.incidentList[i].time_from), "viewmore_id": this.incidentList[i] })
        //   // this.latLongData.push({ "lat": parseFloat('19.076090'), "lng": parseFloat('72.8777'),'city':'mumbai',"categories":'phycsical asualt',"dateTime": this.ChangeDateFormat('20-11-2020',1)+" | "+ this.timeConvert('00:20:20')})
        // }
        // const path = 'assets/images/icons/incidents_mobile_cluster_icon'
        // this.addClusterIncidentMarkersToMap(this.latLongData, this.incidentMarker, path, this.incident)
        // }
      }
      else {

        this.address = localStorage.getItem('City_name')
        let data = new FormData();
        data.append('lang_id', this.langId);
        data.append('client_id', this.clientId);
        //  data.append('city', this.address);
        data.append('map_bound', mapbound);
        data.append('map_zoom', map_zoom);
        this.all_array = this.shareddata.getCatArray();
        if (this.all_array.length > 0) {
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

        // this.shareddata.presentLoadingDefault()
        this.shareddata.sharedPostRequest('reported-incidents/map-coordinates', data).subscribe((rdata: any) => {
          //this.shareddata.setData(rdata)
          this.incidentList = rdata.data
          this.latLongData = []
          for (let i = 0; i < this.incidentList.length; i++) {
            //this.latLongData.push({ "id": this.incidentList[i].id, 'city': this.incidentList[i].city, "area": this.incidentList[i].area, "lat": parseFloat(this.incidentList[i].latitude), "lng": parseFloat(this.incidentList[i].longitude), "categories": this.incidentList[i].categories, "dateTime": this.ChangeDateFormat(this.incidentList[i].created_on, 1) + " | " + this.timeConvert(this.incidentList[i].time_from), "viewmore_id": this.incidentList[i] })
            this.latLongData.push({ "id": this.incidentList[i].id, "lat": parseFloat(this.incidentList[i].latitude), "lng": parseFloat(this.incidentList[i].longitude) })

          }
          const path = 'assets/images/icons/incidents_mobile_cluster_icon'
          this.addClusterIncidentMarkersToMap(this.latLongData, this.incidentMarker, path, this.incident)

        }, error => {
          // this.shareddata.loaderDismiss()
        }, () => {
          // this.shareddata.loaderDismiss()
        });


      }

    }
    else {
      this.address = localStorage.getItem('City_name')
      let data = new FormData();
      data.append('lang_id', this.langId);
      data.append('client_id', this.clientId);
      //  data.append('city', this.address);
      data.append('map_bound', mapbound);
      data.append('map_zoom', map_zoom);

      this.all_array = this.shareddata.getCatArray();
        if (this.all_array.length > 0) {
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
        

      // this.shareddata.presentLoadingDefault()
      this.shareddata.sharedPostRequest('reported-incidents/map-coordinates', data).subscribe((rdata: any) => {
      //  this.shareddata.setData(rdata)
        this.incidentList = rdata.data
        this.latLongData = []
        for (let i = 0; i < this.incidentList.length; i++) {
          //this.latLongData.push({ "id": this.incidentList[i].id, 'city': this.incidentList[i].city, "area": this.incidentList[i].area, "lat": parseFloat(this.incidentList[i].latitude), "lng": parseFloat(this.incidentList[i].longitude), "categories": this.incidentList[i].categories, "dateTime": this.ChangeDateFormat(this.incidentList[i].created_on, 1) + " | " + this.timeConvert(this.incidentList[i].time_from), "viewmore_id": this.incidentList[i] })
          this.latLongData.push({ "id": this.incidentList[i].id, "lat": parseFloat(this.incidentList[i].latitude), "lng": parseFloat(this.incidentList[i].longitude) })

        }
        const path = 'assets/images/icons/incidents_mobile_cluster_icon'
        this.addClusterIncidentMarkersToMap(this.latLongData, this.incidentMarker, path, this.incident)

      }, error => {
        // this.shareddata.loaderDismiss()
      }, () => {
        // this.shareddata.loaderDismiss()
      });


      // this.httpClient.post(this.apiUrl1 + 'reported-incidents', data)
      //   .subscribe((rdata: any) => {
      //     console.log("incidents", rdata);
      //     this.shareddata.setData(rdata)
      //     this.incidentList = rdata.data
      //     this.latLongData = []
      //     for (let i = 0; i < this.incidentList.length; i++) {

      //       this.latLongData.push({ "id": this.incidentList[i].id, 'city': this.incidentList[i].city, "area": this.incidentList[i].area, "lat": parseFloat(this.incidentList[i].latitude), "lng": parseFloat(this.incidentList[i].longitude), "categories": this.incidentList[i].categories, "dateTime": this.ChangeDateFormat(this.incidentList[i].created_on, 1) + " | " + this.timeConvert(this.incidentList[i].time_from), "viewmore_id": this.incidentList[i] })
      //       // this.latLongData.push({ "lat": parseFloat('19.076090'), "lng": parseFloat('72.8777'),'city':'mumbai',"categories":'phycsical asualt',"dateTime": this.ChangeDateFormat('20-11-2020',1)+" | "+ this.timeConvert('00:20:20')})

      //     }
      //     console.log("formed array", this.latLongData)
      //     const path = 'assets/images/icons/incidents_mobile_cluster_icon'
      //     this.addClusterIncidentMarkersToMap(this.latLongData, this.incidentMarker, path, this.incident)

      //   }, error => {
      //   });
    }
  }
  //*****************get saftey tips***************
  public getSafetyTipsList(mapData) {
    var mapbound = mapData.map_bound
    mapbound = JSON.stringify(mapbound)
    var map_zoom = mapData.map_zoom
    console.log(mapData)

    if (this.pagename1 == 'modelpage') {
      console.log("safetyFrom", this.safetyFrom)
      this.safetyFrom = this.shareddata.getsafetyfiltersdata()
      console.log(this.safetyFrom)
      if (this.safetyFrom != undefined) {
        this.safetyTipData = this.shareddata.getSafetyTipData()
        console.log(" safety list from shared", this.safetyTipData)

        this.address = localStorage.getItem('City_name')
        console.log("clientid", this.clientId)
        console.log("langId", this.langId)
        let data = new FormData();
        data.append('lang_id', this.langId);
        data.append('client_id', this.clientId);
        // data.append('city', this.address);
        data.append('map_bound', mapbound);
        data.append('map_zoom', map_zoom);
        if(this.shareddata.getsafetyfiltersdata())
        {
          data.append('reported_on', this.shareddata.getsafetyfiltersdata());
        }
        //this.shareddata.presentLoadingDefault()
        this.shareddata.sharedPostRequest('safety-tip/map-coordinates', data).subscribe((rdata: any) => {
          this.saftyTipsList = rdata
          console.log('safetyTips', this.saftyTipsList)
          this.safetyTipList = rdata
          this.shareddata.setSafetyTipData(this.safetyTipList)
          this.SafetyMarkers = rdata.data
          console.log(this.SafetyMarkers)

          this.latLongData = []
          for (let i = 0; i < this.SafetyMarkers.length; i++) {
            //var time = this.SafetyMarkers[i].added_date.substr(11, 19)
            //console.log("time*****", time)
            // this.latLongData.push({ "lat": parseFloat('19.076090'), "lng": parseFloat('72.8777'),'city':'mumbai',"categories":'phycsical asualt',"dateTime": this.ChangeDateFormat('20-11-2020',1)+" | "+ this.timeConvert('00:20:20')})
            //this.latLongData.push({ "lat": parseFloat(this.SafetyMarkers[i].latitude), "lng": parseFloat(this.SafetyMarkers[i].longitude), title: this.SafetyMarkers[i].safety_tip_title, city: this.SafetyMarkers[i].city, "viewmore_id": this.SafetyMarkers[i], "dateTime": this.ChangeDateFormat(this.SafetyMarkers[i].added_date, 1) + " | " + this.timeConvert(time) })
            this.latLongData.push({ "id": this.SafetyMarkers[i].id, "lat": parseFloat(this.SafetyMarkers[i].latitude), "lng": parseFloat(this.SafetyMarkers[i].longitude) })
          }
          const path = 'assets/images/icons/safety_tip_mobile_cluster_icon'
          this.addClusterIncidentMarkersToMap(this.latLongData, this.safetyMarker, path, this.safety)
        }, error => {
          // this.shareddata.loaderDismiss()
        }, () => {
          // this.shareddata.loaderDismiss()
        });

      }
      else {
        this.address = localStorage.getItem('City_name')
        console.log("clientid", this.clientId)
        console.log("langId", this.langId)
        let data = new FormData();
        data.append('lang_id', this.langId);
        data.append('client_id', this.clientId);
        // data.append('city', this.address);
        data.append('map_bound', mapbound);
        data.append('map_zoom', map_zoom);
        if(this.shareddata.getsafetyfiltersdata())
        {
          data.append('reported_on', this.shareddata.getsafetyfiltersdata());
        }

        //this.shareddata.presentLoadingDefault()
        this.shareddata.sharedPostRequest('safety-tip/map-coordinates', data).subscribe((rdata: any) => {
          this.saftyTipsList = rdata
          console.log('safetyTips', this.saftyTipsList)
          this.safetyTipList = rdata
          this.shareddata.setSafetyTipData(this.safetyTipList)
          this.SafetyMarkers = rdata.data
          console.log(this.SafetyMarkers)

          this.latLongData = []
          for (let i = 0; i < this.SafetyMarkers.length; i++) {
            //var time = this.SafetyMarkers[i].added_date.substr(11, 19)
            //console.log("time*****", time)
            // this.latLongData.push({ "lat": parseFloat('19.076090'), "lng": parseFloat('72.8777'),'city':'mumbai',"categories":'phycsical asualt',"dateTime": this.ChangeDateFormat('20-11-2020',1)+" | "+ this.timeConvert('00:20:20')})
            //this.latLongData.push({ "lat": parseFloat(this.SafetyMarkers[i].latitude), "lng": parseFloat(this.SafetyMarkers[i].longitude), title: this.SafetyMarkers[i].safety_tip_title, city: this.SafetyMarkers[i].city, "viewmore_id": this.SafetyMarkers[i], "dateTime": this.ChangeDateFormat(this.SafetyMarkers[i].added_date, 1) + " | " + this.timeConvert(time) })
            this.latLongData.push({ "id": this.SafetyMarkers[i].id, "lat": parseFloat(this.SafetyMarkers[i].latitude), "lng": parseFloat(this.SafetyMarkers[i].longitude) })
          }
          const path = 'assets/images/icons/safety_tip_mobile_cluster_icon'
          this.addClusterIncidentMarkersToMap(this.latLongData, this.safetyMarker, path, this.safety)
        }, error => {
          // this.shareddata.loaderDismiss()
        }, () => {
          // this.shareddata.loaderDismiss()
        });
      }
    }
    else {
      this.address = localStorage.getItem('City_name')
      console.log("clientid", this.clientId)
      console.log("langId", this.langId)
      let data = new FormData();
      data.append('lang_id', this.langId);
      data.append('client_id', this.clientId);
      // data.append('city', this.address);
      data.append('map_bound', mapbound);
      data.append('map_zoom', map_zoom);
      if(this.shareddata.getsafetyfiltersdata())
{
  data.append('reported_on', this.shareddata.getsafetyfiltersdata());
}

      // this.shareddata.presentLoadingDefault()
      this.shareddata.sharedPostRequest('safety-tip/map-coordinates', data).subscribe((rdata: any) => {
        this.saftyTipsList = rdata
        console.log('safetyTips', this.saftyTipsList)
        this.safetyTipList = rdata
        this.shareddata.setSafetyTipData(this.safetyTipList)
        this.SafetyMarkers = rdata.data
        console.log(this.SafetyMarkers)

        this.latLongData = []
        for (let i = 0; i < this.SafetyMarkers.length; i++) {
          //var time = this.SafetyMarkers[i].added_date.substr(11, 19)
          //console.log("time*****", time)
          // this.latLongData.push({ "lat": parseFloat('19.076090'), "lng": parseFloat('72.8777'),'city':'mumbai',"categories":'phycsical asualt',"dateTime": this.ChangeDateFormat('20-11-2020',1)+" | "+ this.timeConvert('00:20:20')})
          //this.latLongData.push({ "lat": parseFloat(this.SafetyMarkers[i].latitude), "lng": parseFloat(this.SafetyMarkers[i].longitude), title: this.SafetyMarkers[i].safety_tip_title, city: this.SafetyMarkers[i].city, "viewmore_id": this.SafetyMarkers[i], "dateTime": this.ChangeDateFormat(this.SafetyMarkers[i].added_date, 1) + " | " + this.timeConvert(time) })
          this.latLongData.push({ "id": this.SafetyMarkers[i].id, "lat": parseFloat(this.SafetyMarkers[i].latitude), "lng": parseFloat(this.SafetyMarkers[i].longitude) })
        }
        const path = 'assets/images/icons/safety_tip_mobile_cluster_icon'
        this.addClusterIncidentMarkersToMap(this.latLongData, this.safetyMarker, path, this.safety)
      }, error => {
        // this.shareddata.loaderDismiss()
      }, () => {
        // this.shareddata.loaderDismiss()
      });


      // this.httpClient.post(this.apiUrl1 + 'get-safety-tips', data)
      //   .subscribe((rdata: any) => {
      //     this.saftyTipsList = rdata
      //     console.log('safetyTips', this.saftyTipsList)
      //     this.safetyTipList = rdata
      //     this.shareddata.setSafetyTipData(this.safetyTipList)
      //     this.SafetyMarkers = rdata.data
      //     console.log(this.SafetyMarkers)

      //     this.latLongData = []
      //     for (let i = 0; i < this.SafetyMarkers.length; i++) {
      //       var time = this.SafetyMarkers[i].added_date.substr(11, 19)
      //       console.log("time*****", time)
      //       // this.latLongData.push({ "lat": parseFloat('19.076090'), "lng": parseFloat('72.8777'),'city':'mumbai',"categories":'phycsical asualt',"dateTime": this.ChangeDateFormat('20-11-2020',1)+" | "+ this.timeConvert('00:20:20')})
      //       this.latLongData.push({ "lat": parseFloat(this.SafetyMarkers[i].latitude), "lng": parseFloat(this.SafetyMarkers[i].longitude), title: this.SafetyMarkers[i].safety_tip_title, city: this.SafetyMarkers[i].city, "viewmore_id": this.SafetyMarkers[i], "dateTime": this.ChangeDateFormat(this.SafetyMarkers[i].added_date, 1) + " | " + this.timeConvert(time) })
      //     }
      //     const path = 'assets/images/icons/safety_tip_mobile_cluster_icon'
      //     this.addClusterIncidentMarkersToMap(this.latLongData, this.safetyMarker, path, this.safety)
      //   }, error => {
      //   });

    }
  }
  //***************************Show map*******************
  showMap() {
    console.log('hi')

    this.lat = localStorage.getItem('latitude')
    this.longi = localStorage.getItem('longitude')
    console.log(this.lat)
    console.log(this.longi)
    const location = new google.maps.LatLng(this.lat, this.longi);
    const options = {
      disableDefaultUI: true, // hide all controls of map
      //mapTypeControl: true,
      //scaleControl: true,
      zoomControl: true,
      center: location,
      zoom: 13,
      animation: google.maps.Animation.DROP,
      draggable: true,
      streetViewControl: false,
      // disableDefaultUI: true,
      scaleControl: true,
      fullscreenControl: false
    }

    console.log(options)
    // this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    var map = new google.maps.Map(document.getElementById("map"), options);
    this.map = map
    console.log("map", map)
    this.map.addListener('idle', () => {
      let zoomLevel = map.getZoom();
      let edgebounds = map.getBounds();
      let ne = edgebounds.getNorthEast(); // Coords of the northeast corner
      let sw = edgebounds.getSouthWest(); // Coords of the southwest corner
      let nw = new google.maps.LatLng(ne.lat(), sw.lng()); // Coords of the NW corner
      let se = new google.maps.LatLng(sw.lat(), ne.lng()); // Coords of the SE corner
      map.setOptions({ minZoom: 3, maxZoom: 45 });
      //creating array to pass in API
      let mapedges = {
        'ne': { lat: ne.lat(), lng: ne.lng() },
        'sw': { lat: sw.lat(), lng: sw.lng() },
        'nw': { lat: nw.lat(), lng: nw.lng() },
        'se': { lat: se.lat(), lng: se.lng() }
      };

      var default_reported_incident_data =
      {
        'map_zoom': zoomLevel,
        'map_bound': mapedges
      }

      localStorage.setItem('map_zoom',zoomLevel)
      localStorage.setItem('mapBound',JSON.stringify(mapedges))

      // this.show = false
      // this.hide = true
      if (this.segmentModel == "two") {

        this.getSafetyTipsList(default_reported_incident_data);
      } else {
        this.getReportedIncident(default_reported_incident_data);
      }

    });




  }

  //*****************Add marker founded by List***************
  addMarkersToMap(markers, icon, romove_flag) {
    console.log("Markers in Add markers", markers)
    for (let marker of markers) {
      console.log(marker)
      var incident_added_date = marker.created_on != null ? marker.created_on : "";
      var dayBetween = this.days_between(incident_added_date);
      this.getDaysAgo = (dayBetween > 7 ? this.ChangeDateFormat(incident_added_date, 1) : (dayBetween == 0) ? 'Today' : (dayBetween == 1) ? dayBetween + " day ago" : dayBetween + " days ago");
      console.log(this.getDaysAgo)
      marker.show_date = this.getDaysAgo
      var id = marker.id
      // time convert
      // let time = this.timeConvert(marker.time_from)
      // console.log("Time",time)
      // marker.show_time = time
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({

        position: position,
        area: marker.area,
        latitude: marker.latitude,
        longitude: marker.longitude,
        animation: 'DROP',
        type: marker.categories,
        date: marker.show_date,
        time: marker.show_time,
        id: marker.id,
        // draggable: true,
        icon: icon
      });
      mapMarker.setMap(this.map);
      if (romove_flag == 'incident') {
        this.incident_remove_marker.push(mapMarker)
      }
      else if (romove_flag == 'safety') {
        this.safety_remove_marker.push(mapMarker)
      }
      google.maps.event.addListener(mapMarker, 'dragend', function () {
        console.log(mapMarker)
        var markerlatlong = mapMarker.getPosition();
        console.log("latlong" + markerlatlong);
        console.log("lat" + mapMarker.getPosition().lat());
        console.log("long" + mapMarker.getPosition().lng());
        //this.placeMarkerAndPanTo(e.latLng, this.map);
        var lat = JSON.stringify(mapMarker.getPosition().lat());
        var longi = JSON.stringify(mapMarker.getPosition().lng());
        // localStorage.setItem('lat', lat)
        // localStorage.setItem('longi', longi)
        //code for getting formatted address from the selected latitude and longitude 
        var geocoder = new google.maps.Geocoder();
        const latlng = {
          lat: parseFloat(lat),
          lng: parseFloat(longi)
        };
        geocoder.geocode(
          { location: latlng },
          (
            results,
            status
          ) => {
            if (status === "OK") {
              if (results[0]) {
                this.title = results[0].formatted_address;
                localStorage.setItem('address', this.title)
                console.log(this.title)
                //this.markers = [];
                var title = localStorage.getItem('address')
                var lat1 = localStorage.getItem('lati');
                var longi1 = localStorage.getItem('longit')
                console.log(title)
                let position = new google.maps.LatLng(lat1, longi1);
                mapMarker.position = position,
                  mapMarker.title = title,
                  mapMarker.latitude = lat1,
                  mapMarker.longitude = longi1,
                  mapMarker.animation = 'DROP',
                  mapMarker.draggable = true,
                  mapMarker.setMap(this.map);
                //var self = this;
                this.addInfoWindowToMarker(mapMarker);
                var data = { 'latitude': lat1, 'longitude': longi1, 'title': title }
                this.markers = data;
                console.log('3', this.markers)
              }
              else {
                window.alert("No results found");
              }
            }
            else {
              window.alert("Geocoder failed due to: " + status);
            }
          }
        );
      }.bind(this));

      this.addInfoWindowToMarker(mapMarker);
    }
  }


  // ******************Get lat & long by Search******************
  getlatlong(value) {
    var geocoder = new google.maps.Geocoder();
    var city, hascity, address = value

    geocoder.geocode({ 'address': address }, results => {
      if (results[0].formatted_address) {
        console.log(results)
        this.address = JSON.stringify(results[0].formatted_address);
        this.lat = JSON.stringify(results[0].geometry.location.lat());
        this.longi = JSON.stringify(results[0].geometry.location.lng());

        console.log(this.lat)
        console.log(this.longi)
        if (this.lat != undefined && this.longi != undefined) {
          localStorage.setItem('latitude', this.lat)
          localStorage.setItem('longitude', this.longi)
          this.showMap()
        }
      }

    });
  }
  getOriginal(e) {
    console.log(e.target.value);
    if (e.target.value.length == 0) {
      this.pagename1 = ''
      var cityname = localStorage.getItem('City_name')
      this.getlatlong(e.target.value)          
    }

  }
  initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete').getElementsByTagName('input')[0],
      {
        types: ["geocode"]
      }
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(["address_component"]);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener("place_changed", fillInAddress => {
      this.autoaddress = []
      this.autocomplete.getPlace();
      console.log("autocomplete", this.autocomplete.getPlace());
      var autoadd = this.autocomplete.getPlace();
      this.autoadd1 = autoadd.address_components;
      // console.log(this.autoadd1[0].long_name)
      for (var i = 0; i < this.autoadd1.length; i++) {
        this.autoaddress.push(this.autoadd1[i].long_name)
      }
      // this.autoaddress = autoadd.long_name.join(',')
      console.log(this.autoaddress)
      var final_result = this.autoaddress.join(',')
      console.log(final_result)
      console.log(this.autoaddress)
      this.searchForm.value.location = '';
      //this.searchForm.controls['location'].setValue(final_result)
      this.address = this.autoadd1[0].long_name
      console.log("autocomplt", this.address)      
      this.clearfilter = true;
      console.log(this.clearfilter)
      this.getlatlong(final_result)
      this.shareddata.safetyfiltersdata = ''
      this.pagename1 = ''
      // localStorage.setItem('City_name', this.address)
    });
    // this.autocomplete.clearInstanceListeners('autocomplete');

  }
  clearInput(e) {
    $('.pac-container').hide();

  }
  setinfo(id, infowindow, marker) {




    if (this.segmentModel == 'one') {
      let data = new FormData();
      data.append('incident_id', id);
      // this.shareddata.presentLoadingDefault()
      this.shareddata.sharedPostRequest('reported-incident/details', data).subscribe((rdata: any) => {
        console.log(rdata);
        var infoWindowContent = '<div id="incident1">' +
          //'<h5 id="firstHeading" class"firstHeading;display:none">' + marker.id + '</h5>' +
          '<p>Type: <span style="font-weight:500; color:#292020;">' + rdata.data.categories + '</span></p>' +
          '<p>Location: <span style="font-weight:500; color:#292020;">' + rdata.data.city + '</span></p>' +
          '<p style="float:left;">Date & Time: <span style="font-weight:500; color:#292020;">' + this.ChangeDateFormat(rdata.data.incident_date, 1) + " | " + this.timeConvert(rdata.data.time_from) + '</span></p>' +
          '<h5 style="width:100% !important; float:left;margin-bottom: 5px;text-align:left; margin-top:6px; font-size:11px; color:#592D8D !important; font-weight:500;">View more details </h5>'
          + '</div>';
        // return infoWindowContent
        infowindow.setContent(infoWindowContent);
        this.infoWindows.push(infowindow)
        this.closeAllInfoWindows();
        infowindow.open(this.map, marker);
        google.maps.event.addListener(infowindow, 'domready', () => {
          document.getElementById('incident1').addEventListener("click", () => {
            this.zone.run(() => {
              console.log("hiiiiiii")
              this.getIncidentDetails(rdata);
            })
          })
        })
      }, error => {
        // this.shareddata.loaderDismiss()
      }, () => {
        // this.shareddata.loaderDismiss()
      });
    }
    else {
      let data = new FormData();
      data.append('safety_tip_id', id);
      // this.shareddata.presentLoadingDefault()
      this.shareddata.sharedPostRequest('safety-tip/details', data).subscribe((rdata: any) => {
        console.log(rdata);
        var time = rdata.data.added_date.substr(11, 19)
        let infoWindowContent = '<div id="safetyTip">' +
          '<p>Title: <span style="font-weight:500; color:#292020;">' + rdata.data.safety_tip_title + '</span></p>' +
          '<p>Location: <span style="font-weight:500; color:#292020;">' + rdata.data.city + '</span></p>' +
          '<p style="float:left;">Date & Time: <span style="font-weight:500; color:#292020;">' +
          this.ChangeDateFormat(rdata.data.added_date, 1) + " | " + this.timeConvert(time) + '<h5 style="width:100% !important; float:left;margin-bottom: 5px;text-align:left; margin-top:6px; font-size:11px; color:#592D8D !important; font-weight:500;">View more details </h5>'
          + '</div>';
        // return infoWindowContent
        infowindow.setContent(infoWindowContent);
        this.infoWindows.push(infowindow)
        this.closeAllInfoWindows();
        infowindow.open(this.map, marker);
        google.maps.event.addListener(infowindow, 'domready', () => {
          document.getElementById('safetyTip').addEventListener("click", () => {
            this.zone.run(() => {
              console.log("hiiiiiii")
              this.getSafetyDetails(rdata);
            })
          })
        })
      }, error => {
        // this.shareddata.loaderDismiss()
      }, () => {
        // this.shareddata.loaderDismiss()
      });

    }
  }

  addInfoWindowToMarker(marker) {
    this.zone.run(() => {
      console.log("marker", marker);
      console.log("marker", marker.id);

      // if (this.segmentModel == 'one') {

      console.log("segment", this.segmentModel)

      let infoWindow = new google.maps.InfoWindow({});
      this.setinfo(marker.id, infoWindow, marker)

      console.log("windowOpen")

      // var infoWindowContent = '<div id="incident1">' +
      //    '<h5 id="firstHeading" class"firstHeading;display:none">' + marker.id + '</h5>' +
      //   '<p>Type: <span style="font-weight:500; color:#292020;">' + marker.category + '</span></p>' +
      //   '<p>Location: <span style="font-weight:500; color:#292020;">' + marker.city + '</span></p>' +
      //   '<p style="float:left;">Date & Time: <span style="font-weight:500; color:#292020;">' + marker.dateTime + '</span></p>' +
      //   '<h5 style="width:100% !important; float:left;margin-bottom: 5px;text-align:left; margin-top:6px; font-size:11px; color:#592D8D !important; font-weight:500;">View more details </h5>'
      //   + '</div>';

      // marker.set(marker.id)


      //         marker.addListener('click', (cm) => {
      // console.log(this.id)


      //           console.log("*****", cm)
      //           this.closeAllInfoWindows();
      //           infoWindow.open(this.map, marker);
      //           console.log("windowOpen")
      //         });

      // this.infoWindows.push(infoWindow);
      // google.maps.event.addListener(infoWindow, 'domready', () => {
      //   document.getElementById('incident1').addEventListener("click", () => {
      //     this.zone.run(() => {
      //       this.getIncidentDetails(marker);
      //     })
      //   })
      // })
      // }
      // else {
      //     console.log("segment", this.segmentModel)
      //     let infoWindowContent = '<div id="safetyTip">' +
      //       '<p>Title: <span style="font-weight:500; color:#292020;">' + marker.title + '</span></p>' +
      //       '<p>Location: <span style="font-weight:500; color:#292020;">' + marker.city + '</span></p>' +
      //       '<p style="float:left;">Date & Time: <span style="font-weight:500; color:#292020;">' +
      //       marker.dateTime + '<h5 style="width:100% !important; float:left;margin-bottom: 5px;text-align:left; margin-top:6px; font-size:11px; color:#592D8D !important; font-weight:500;">View more details </h5>'
      //       + '</div>';

      //     let infoWindow = new google.maps.InfoWindow({
      //       content: infoWindowContent,
      //     });

      //     marker.addListener('click', () => {

      //       this.closeAllInfoWindows();

      //       infoWindow.open(this.map, marker);

      //       console.log("windowOpen")

      //     });


      //     google.maps.event.addListener(infoWindow, 'domready', () => {
      //       document.getElementById('safetyTip').addEventListener("click", () => {
      //         this.zone.run(() => {
      //           console.log("marker**", marker)
      //           this.getSafetyDetails(marker);
      //         })
      //       })
      //     })
      // }
    })

  }


  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      // this.navController.navigateForward("/detailpopup")
      window.close();
    }
  }

  newmodalin() {
    var default_reported_incident_data =
    {
      'map_zoom': localStorage.getItem('map_zoom'),
      'map_bound': localStorage.getItem('mapBound'),
    }
    // this.getReportedIncident(default_reported_incident_data)
   // this.getSafetyTipsList(default_reported_incident_data)
console.log('++++++++++++++',this.clearfilter)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        segmentModel: this.segmentModel,
        clear_filter : this.clearfilter,
        // incidentList: this.incidentList,
        // safetyTipList: this.safetyTipList,
        pagename: this.pagename
      }
    };
    this.navController.navigateForward([`modelreport`], navigationExtras);
  }

  share() {
    this.navController.navigateForward(`/preframingtwo`);
  }

  legal() {
    this.navController.navigateForward(`/domesticviolence`);
  }

  help() {
    // this.modalController.dismiss('cancel');
    this.navController.navigateForward(`help`);
  }

  menu() {
    // this.modalController.dismiss('cancel');
    // this.navController.navigateForward(`/safetyfilter`)
    this.navController.navigateForward(`/menu`);
  }

  safetytip() {
    this.navController.navigateForward(`/safteytipone`);
  }

  viewsafety() {
    this.navController.navigateForward(`/viewsafety`);
  }


  preframing() {

    if(localStorage.getItem('ngo_id') == '0')
    {

     this.navController.navigateForward(`/preframingtwo`);
    }
    else
    {
   let navigationExtras: NavigationExtras = {
         queryParams: {
         
   
         }
       };
   
       this.navController.navigateForward(`/ngopartner`, navigationExtras);

   }
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
  ChangeDateFormat(date, val) {
    var dayDate = new Date(date.replace(/ /g,"T"));

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
  timeConvert(time) {
    // console.log("Time in convert ", time)
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
      var time_array = []
      time_array.push(time[0])
      time_array.push(time[1])
      time_array.push(time[2])
      time_array.push(time[5])
    }

    return time_array.join('');
    // return adjusted time or original string
  }
  showFullMap() {
    this.hide = true
    this.show = false
    // console.log("e",map)
  }
  hide1() {
    this.hide = false
    this.show = true

  }

  openModel() {
    console.log("openModel")
  }
  incidentViewmore(e) {
    console.log(e)
  }

  addClusterIncidentMarkersToMap(locations, icon, path, type) {
    console.log(icon)
    console.log(locations)
    this.locations1 = locations

    var bounds = new google.maps.LatLngBounds();

    var infoWin = new google.maps.InfoWindow();
    let maxZoomService: google.maps.MaxZoomService;
    var markersList = []
    let markers = []
    // Add some markers to the map.

    markers = locations.map((location, i) => {

      var marker = new google.maps.Marker({
        position: location,
        animation: google.maps.Animation.DROP,
        // html: "<span class='map-grey'>Type:</span><span class='map-grey map-dark'>#"+locations[i].incident_id+' '+locations[i].categories+'</span><br>'+"<span class='map-grey'>Location : </span><span class='map-grey map-dark'>"+locations[i].area+', '+locations[i].city+'</span><br>'+"<span class='map-grey'>Date & Time : </span><span class='map-grey map-dark'>"+locations[i].dateTime+'</span>'+'<br><span class="map-grey"><a href="#" data-toggle="modal" data-target="#incident-viewmore'+locations[i].incident_viewmore_id+'">View more details</a></span>',
        icon: icon,
        // title: locations[i].title,
        // city: locations[i].city,
        // dateTime: locations[i].dateTime,
        // category: locations[i].categories,
        // detail: locations[i].id

      });
      marker.set('id', locations[i].id)



      google.maps.event.addListener(marker, 'click', () => {
        this.addInfoWindowToMarker(marker)


      })
      this.icident_markersList.push(marker);
      //   //extend the bounds to include each marker's position
      bounds.extend(marker.position);
      return marker;
    });

    // const path = 'assets/images/icons/incidents_mobile_cluster_icon'
    // Options to pass along to the marker clusterer
    const clusterOptions = {
      imagePath: path,
      maxZoom: 20,
    };

    console.log("map", this.map)
    console.log("marker", markers)
    console.log("options", clusterOptions)

    // Add a marker clusterer to manage the markers.
    var markerClusterer = new MarkerClusterer(this.map, markers, clusterOptions);
    // console.log("***",markerClusterer)
    this.markerClustererList.push(markerClusterer);

    // Change styles after cluster is created
    const styles = markerClusterer.getStyles();
    for (let i = 0; i < styles.length; i++) {
      if (type == 'incident') {
        styles[i].textColor = "white";
      }
      else {
        styles[i].textColor = "black";
      }
    }

    console.log("bounds list", bounds);
    // this.map.fitBounds(bounds);       // auto-zoom
    // this.map.panToBounds(bounds);     // auto-center
  }


  removeMarkers() {
    for (let j = 0; j < this.markerClustererList.length; j++) {
      this.markerClustererList[j].setMap(null);
    }
    for (let i = 0; i < this.icident_markersList.length; i++) {
      this.icident_markersList[i].setMap(null);
    }
  }


  getIncidentDetails(marker) {
    console.log("marker", marker.data)
    var detail_string = JSON.stringify(marker.data)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        type: 'incident',
        marker: detail_string
      }
    };
    this.navController.navigateForward([`/detailpopup`], navigationExtras);
  }

  getSafetyDetails(marker) {
    console.log("marker", marker)
    var detail_string = JSON.stringify(marker.data)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        type: 'safetyTip',
        marker: detail_string
      }
    };
    this.navController.navigateForward([`/detailpopup`], navigationExtras);

  }
}

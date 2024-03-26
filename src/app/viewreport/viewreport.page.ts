import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {SharedService} from '../shared.service';
@Component({
  selector: 'app-viewreport',
  templateUrl: './viewreport.page.html',
  styleUrls: ['./viewreport.page.scss'],
})
export class ViewreportPage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/incident_report/';
  reportList: any;
  violenceType
  address
  pagename
  showList = false
  showAllList = false
  addressArray = [];
  violenceTypeArray = [];
  allCategoryArray = []
  type: any;
  item: any;
  resultNotFound = false

  constructor(public toastController: ToastController,private sharedservice : SharedService, private navController: NavController, private router: Router, public httpClient: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.violenceType = params["violenceType"];
      this.address = params["address"];
      this.pagename = params["pagename"];


      this.callFirst()
      console.log("address", this.address);
      console.log("violenceType", this.violenceType);
      console.log("pagename", this.pagename);
    })
  }

  ngOnInit() {

  }

  callFirst() {
    if (this.pagename == 'reportFilterPage') {
      this.showList = true
      this.showAllList = false
      console.log('pagein')
      this.getFilteredReportList()

    }
    else if (this.pagename == undefined) {
      this.showList = false
      this.showAllList = true
      console.log('pageout')
      this.getAllReportList()
    }
  }

  getAllReportList() {
    let data = new FormData();
    data.append('security_key', '4b89b2831f1aae8067eb87a2d042e0fc4d8dd432');

    this.sharedservice.sharedPostRequest('incident_report/getAllIncidentReport',data).subscribe((rdata: any) => {
      console.log(rdata);
          this.reportList = rdata.data;
          console.log(this.reportList);
     }, error => {
      
    },()=>{
      
    });


    
    // this.httpClient.post(this.apiUrl + 'getAllIncidentReport', data)
    //   .subscribe((rdata: any) => {
    //     console.log(rdata);
    //     this.reportList = rdata.data;
    //     console.log(this.reportList);

    //   }, error => {

    //   });
  }
getFilteredReportList() {
    let addstring = this.address.join(',')
    let violenceString = this.violenceType.join(',')
    let data = new FormData();
    data.append('security_key', '14a077af215a19bcf0c3c9a28a1ae27b1260df7d');
    data.append('incloc', addstring);
    data.append('inctype', violenceString);
    
    this.sharedservice.sharedPostRequest('incident_report/searchIncidentReport',data).subscribe((rdata: any) => {
              console.log(rdata);
        this.reportList = rdata.data;
        if (this.reportList == '') {
          this.showList = false
          this.resultNotFound = true
          // this.showAllList = true
          //  this.presentToast()
          console.log('pageout')
          // this.getAllReportList()
        }
        console.log(this.reportList);

     }, error => {
      
    },()=>{
      
    });


    // this.httpClient.post(this.apiUrl + 'searchIncidentReport', data)
    //   .subscribe((rdata: any) => {
    //     console.log(rdata);
    //     this.reportList = rdata.data;
    //     if (this.reportList == '') {
    //       this.showList = false
    //       this.resultNotFound = true
    //       // this.showAllList = true
    //       //  this.presentToast()
    //       console.log('pageout')
    //       // this.getAllReportList()
    //     }
    //     console.log(this.reportList);

    //   }, error => {
    //   });
  }

  reportdetail(item) {
    console.log(item);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        item: item.id,
      }
    };
    this.navController.navigateForward([`viewreportdetail`], navigationExtras);
    // this.navController.navigateForward(`/viewreportdetail`);
  }

  filterin() {
    this.navController.navigateForward(`/filter`);
  }

  close(i, type) {
    this.item = i
    console.log(i)
    console.log(type)

    if (type == 'violence_type') {
      if (this.violenceType == []) {

      }
      else {
        this.violenceType.pop(this.item)
        this.getFilteredReportList()
        console.log(this.violenceType)
      }
    }
    else {
      if (this.address == []) {

      }
      else {
        this.address.pop(this.item)
        this.getFilteredReportList()
        console.log(this.addressArray)
      }
    }
  }


}

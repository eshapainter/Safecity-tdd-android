import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ViewChild, ElementRef } from '@angular/core';


declare var google: any;
@Component({
  selector: 'app-reportfiledtwelve',
  templateUrl: './reportfiledtwelve.page.html',
  styleUrls: ['./reportfiledtwelve.page.scss'],
})
export class ReportfiledtwelvePage implements OnInit {
  apiUrl = 'http://101.53.143.7/~dataduck/safecity/api/incident_report/';
  anythingElse: any;
  led: any;
  forWho:any;
  age:any;
  pronoun:any;
  experience: any;
  date1: any;
  dateEstimate: string;
  time: any;
  timeEstimate: string;
  timeRange: any;
  violenceType: any;
  policeRepo: any;
  locality:string;
  landmark:string;
  city:string;
  state:string;
  country:string;
  user_id 
  otherData_policeRepo
  area: string;
  otherData
  otherRelationData
  kwlg: any;
  address2
  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  location;
  lat;
  longi;
  address
  
  infoWindows: any = [];
  address1
  locations
  title
  markers: any = [
    
  ];
  constructor(public httpClient: HttpClient,private navController: NavController, private router: Router,private route: ActivatedRoute) {
    // this.user_id = localStorage.getItem('userId');
    // this.route.queryParams.subscribe(params => {
    //   this.forWho = localStorage.getItem('forwho')
    //   this.age = localStorage.getItem('age')
    //   this.pronoun = localStorage.getItem('pronoun')
    //   this.experience = localStorage.getItem('whatHappend')
    //   this.date1 = localStorage.getItem('date')
    //   this.dateEstimate = localStorage.getItem('dateEstimate')
    //   this.time = localStorage.getItem('time')
    //   this.timeEstimate = localStorage.getItem('timeEstimate')
    //   this.timeRange = localStorage.getItem('timeRange')
    //   this.violenceType = localStorage.getItem('categories')
    //   this.policeRepo = localStorage.getItem('policeReport')
    //   this.otherData_policeRepo = localStorage.getItem('otherData_Police')
    //   this.led = localStorage.getItem('led')
    //   this.otherData = localStorage.getItem('otherData')
    //   this.otherRelationData = localStorage.getItem('RelationData')
    //   this.anythingElse =localStorage.getItem('anythingelse')
    this.route.queryParams.subscribe(params => {
      console.log(params)
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state)
      this.locality = this.router.getCurrentNavigation().extras.state.locality
      this.landmark = this.router.getCurrentNavigation().extras.state.landmark
      this.city = this.router.getCurrentNavigation().extras.state.city
      this.state =this.router.getCurrentNavigation().extras.state.state
      this.country = this.router.getCurrentNavigation().extras.state.country
      this.area = this.router.getCurrentNavigation().extras.state.area
      this.lat = this.router.getCurrentNavigation().extras.state.lat;
        this.longi = this.router.getCurrentNavigation().extras.state.longi;
        this.address = this.router.getCurrentNavigation().extras.state.address;
      }
this.address2 = this.area ,+','+ this.locality +','+ this.landmark +','+ this.city +','+ this.state +','+ this.country
console.log(this.address2)


        var data = {'latitude' : this.lat , 'longitude' : this.longi, 'title' : this.address}
        this.markers.push(data)
})
   
   }
   knowledge(e)
   {
      this.kwlg = e.detail.value
      console.log("estimate",e)
    let value = e.detail.checked
    if(value == true)
    {
       this.kwlg = '1';
    }
    else
    {
      this.kwlg = '0';
    }
   
    
   }

  
   back()
   {
     localStorage.setItem('lat_report',this.lat)                                 
     localStorage.setItem('longi_report',this.longi) 
     localStorage.setItem('address_report',this.address)    
         console.log(this.lat)
         console.log(this.longi)
         console.log(this.address)
   }
 
   ngOnInit() {
   }
 
   ionViewDidEnter() {
      
       
         this.showMap();
       
     
     
   }

   addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
        animation: 'DROP',
         draggable:true, 
      });

      mapMarker.setMap(this.map);


      google.maps.event.addListener(mapMarker, 'dragend', function()
      {
        console.log(mapMarker)
          var markerlatlong = mapMarker.getPosition();

          console.log("latlong   "+markerlatlong);
          console.log("lat    "+mapMarker.getPosition().lat());
          console.log("long   "+mapMarker.getPosition().lng());


          //this.placeMarkerAndPanTo(e.latLng, this.map);

      var lat= JSON.stringify(mapMarker.getPosition().lat());
      var longi = JSON.stringify(mapMarker.getPosition().lng());

      localStorage.setItem('lat_report',lat)                                 
      localStorage.setItem('longi_report',longi) 
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
              
             this.title =  results[0].formatted_address;
             localStorage.setItem('address_report',this.title)
             console.log(this.title)

             //this.markers = [];
      var title = localStorage.getItem('address_report')

      var lat1 = localStorage.getItem('lat_report') ;                                
      var longi1 = localStorage.getItem('longi_report') 
      console.log(title)

      let position = new google.maps.LatLng(lat1, longi1);
        
      mapMarker.position = position,
      mapMarker.title = title,
      mapMarker.latitude = lat1,
      mapMarker.longitude = longi1,
      mapMarker.animation = 'DROP',
      mapMarker.draggable =true, 
    

      mapMarker.setMap(this.map);
      //var self = this;
      this.addInfoWindowToMarker(mapMarker);

      var data = {'latitude' : lat1, 'longitude' : longi1, 'title' : title}
      this.markers = data;
      console.log('3',this.markers)
              
            } else {
              window.alert("No results found");
            }
          } else {
            window.alert("Geocoder failed due to: " + status);
          }
        }
      );

      
    

    
      }.bind(this));

      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
                              '<h5 id="firstHeading" class"firstHeading">' + marker.title + '</h5>' +
                              '<p>Latitude: ' + marker.latitude + '</p>' +
                              '<p>Longitude: ' + marker.longitude + '</p>' +
                            '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

   placeMarkerAndPanTo(latLng,map) {
    new google.maps.Marker({
      position: latLng,
      map: map
    });
    map.panTo(latLng);
  }

  showMap() {
    console.log('hi')
    console.log(this.lat)
    console.log(this.longi)   
    const location = new google.maps.LatLng(this.lat, this.longi);
    const options = {
      center: location,
      zoom: 15,
      animation: 'DROP',
      draggable:true,
      // disableDefaultUI: true,
      scaleControl: true,
      fullscreenControl: false
    }
    console.log(options)
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    
    // this.map.addListener('click', (e) => {
    //   console.log('clicked',e)
    //   this.placeMarkerAndPanTo(e.latLng, this.map);

    //   var lat= JSON.stringify(e.latLng.lat());
    //   var longi = JSON.stringify(e.latLng.lng());


    //   //code for getting formatted address from the selected latitude and longitude 

    //   var geocoder = new google.maps.Geocoder();
    //   const latlng = {
    //     lat: parseFloat(lat),
    //     lng: parseFloat(longi)
    //   };
    //   geocoder.geocode(
    //     { location: latlng },
    //     (
    //       results,
    //       status
    //     ) => {
    //       if (status === "OK") {
    //         if (results[0]) {
              
    //          this.title =  results[0].formatted_address;
    //          localStorage.setItem('title',this.title)
    //          console.log(this.title)
              
    //         } else {
    //           window.alert("No results found");
    //         }
    //       } else {
    //         window.alert("Geocoder failed due to: " + status);
    //       }
    //     }
    //   );

    //   //this.markers = [];
    //   var title = localStorage.getItem('title')
    //   console.log(title)
    //   var data = {'latitude' : lat, 'longitude' : longi, 'title' : title}
    //   this.markers.push(data);
    //   console.log('3',this.markers)
    // this.addMarkersToMap(this.markers);

    // });
    
    console.log('3',this.markers)
    this.addMarkersToMap(this.markers);
  }
 
 preframing() {
    let data = new FormData();
    data.append('security_key','d152ed16bedaf0e594319efad64e39ff0b14c2ff');
    data.append('user_id',this.user_id);
    data.append('country_id','102');
    data.append('language_id','1');
    data.append('is_consent','1');
    data.append('reporting_for',this.forWho);
    data.append('age',this.age);
    data.append('preferred_pronoun',this.pronoun);
    data.append('what_happened_desc',this.experience);
    data.append('start_date',this.date1);
    data.append('date_estimate',this.dateEstimate);
    data.append('time',this.time);
    data.append('time_estimate',this.timeEstimate);
    data.append('time_range',this.timeRange);
    data.append('violence_type',this.violenceType);
    data.append('reported_police',this.policeRepo);
    data.append('reported_police_tried',this.otherData_policeRepo);
    data.append('feel_attacked',this.led);
    data.append('feel_attacked_other',this.otherData);
    data.append('feel_attacked_relation',this.otherRelationData);
    data.append('experience',this.anythingElse);
    data.append('locality',this.locality);
    data.append('landmark',this.landmark);
    data.append('suburb',this.area);
    data.append('city',this.city);
    data.append('state',this.state);
    data.append('country',this.country);
    data.append('map_lat','19.0856');
    data.append('map_lon','72.9082');
    data.append('map_knowledge',this.kwlg);
    data.append('medical_attention','1');
    data.append('physically_hurt','0');
    data.append('perpetrator','0');
    data.append('exact_location','Karanjade Old Panvel Navi Mumbai');
    data.append('report_type','1');
    data.append('gender','male');
    
    this.httpClient.post(this.apiUrl+'addIncidentReport',data)
    .subscribe((rdata: any) => {
      console.log(rdata);
      // this.countryList = rdata.data;
    },error => {
    });
    

            // this.navController.navigateForward([`preframingsecondary`]);


//  this.navController.navigateRoot(`/preframingsecondary`);
  }

}

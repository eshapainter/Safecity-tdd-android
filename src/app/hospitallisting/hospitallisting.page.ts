import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { InAppBrowser,InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core'
declare var google: any;
@Component({
  selector: 'app-hospitallisting',
  templateUrl: './hospitallisting.page.html',
  styleUrls: ['./hospitallisting.page.scss'],
})
export class HospitallistingPage implements OnInit {
  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  location;
  lat;
  longi;
  infoWindows: any = [];
  address
  locations
  title
  data1
  listing_data
  options : InAppBrowserOptions = {
    location : 'no',//Or 'no' 
    hidden : 'no', //Or  'yes'
    zoom : 'no',//Android only ,shows browser zoom controls 
    hideurlbar:'yes',//Or 'no'
    toolbar:'no',
    beforeload:'yes'
};
  markers: any = [
    
  ];
  constructor(private navController: NavController,public translate:TranslateService,public alertController: AlertController,private iab: InAppBrowser,private callNumber: CallNumber,private platform:Platform,private route: ActivatedRoute, private router: Router,public httpClient: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state)
       this.markers = JSON.parse(this.router.getCurrentNavigation().extras.state.data);
        this.lat = this.router.getCurrentNavigation().extras.state.lat;
        this.longi = this.router.getCurrentNavigation().extras.state.longi;
        this.address = this.router.getCurrentNavigation().extras.state.address;
        // var data1 = {'latitude' : this.lat , 'longitude' : this.longi, 'title' : this.address}
        //this.markers.push(data1)
        
        console.log(this.markers)
        // console.log(this.location)
        // console.log(this.lat)
        // console.log(this.longi)
        // console.log(this.address)

    
          
    
        

          }
        })

          
   }


   callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results)
      //this.listing_data = results;
      for (var i = 0; i < results.length; i++) {
        
        results[i].imgsrc = 'assets/images/icons/numberlisting/number' + i+1; 
        console.log(results)
        //createMarker(results[i]);
      }

      this.markers = results;

      // var title = localStorage.getItem('address')

      // var lat1 = localStorage.getItem('lat') ;                                
      // var longi1 = localStorage.getItem('longi') 
          
          console.log(this.markers)
          // let navigationExtras: NavigationExtras = {
          //   state: {
          //     data: results,
          //     lat: lat1,
          // longi: longi1,
          // address: title
              
          //   }
          // };
 // this.navController.navigateForward(['/hospitallisting'],navigationExtras);

    }
  }

  ngOnInit() {
  }

  direction(item)
  {
    
    // if(this.platform.is('android'))
    // {

       var lat1 = localStorage.getItem('lat') ;                                
       var longi1 = localStorage.getItem('longi') 
       let destination = item.geometry.location.lat + ',' + item.geometry.location.lng;
       //let source = lat1 + ',' + longi1;
     //  let source = '51.8642112' + ',' + '-2.2380335';
      // console.log(source)
       let label = encodeURI('My');
     //  console.log('geo:'+source+'?q=' + destination + '(' + label + ')', '_system')
       //window.open('geo:'+source+'?q=' + destination + '(' + label + ')', '_system');
      // this.iab.create('http://maps.google.com/maps?saddr='+source + '&daddr='+destination, '_system');
      this.iab.create('http://maps.google.com/maps?daddr='+destination, '_system')
  //    let ref =   this.iab.create('http://101.53.143.7/~dataduck/safecity_webapp/shareIncident-form', '_self ',this.options);
  //    console.log(ref)

  //    ref.on('loadstart').subscribe(event => { 
  //    // alert(event.type + ' - ' + event.url); 
  //    // ref.close();
  // });
//alert(JSON.stringify(ref))



     //ref.addEventListener('loadstart',mycallback)
     
     //  
       //this.iab.create('http://maps.google.com/maps?daddr='+destination, '_system')
  //    var  app = this.launchNavigator.APP.GOOGLE_MAPS;
  //    this.launchNavigator.navigate([item.geometry.location.lat,item.geometry.location.lng], {
  //     start: lat1 +',' +longi1,app
  // });

    //}
    
    
    //  google.maps.event.addListenerOnce('domready',() =>{
    //   document.getElementById('navigate').addEventListener('click',() =>{
    //     console.log('direcetion clicked')
    //     window.open('https://www.google.com/maps/dir?api=AIzaSyA-RG4hM7qRh3jHfOwSuUOBexPTn0CZf6w&destination=' +this.lat +',' + this.longi);
    //   })
    // })
  }

  call(place_id)
  {
    console.log('call clicked',place_id)

    var  service = new google.maps.places.PlacesService(this.map);           

        var req = { placeId:place_id };

        service.getDetails(req,callback =>{
          console.log(callback)

          var data = callback
          console.log(data)
          
          if(data.formatted_phone_number)
          {
          this.callNumber.callNumber(data.formatted_phone_number, true)
          .then(res => console.log('Launched dialer!', res))
          .catch(err => console.log('Error launching dialer', err));

          console.log(data.formatted_phone_number)
          }
          else{
            this.presentAlert()
          }
        },err=>{

        })

      }

    
      async presentAlert() {
        var message
        var btn_msg 
        this.translate.get('contact_number_not_found').subscribe((res: string) => {
        
          message = res;
        })
        
              this.translate.get('Okay').subscribe((res: string) => {
        
                btn_msg = res;
              })
        
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              backdropDismiss : false,
              message: message,
             mode:'ios',
              buttons: [btn_msg]
            });
        
            await alert.present();
          }

  

  ionViewDidEnter() {
     
      
    this.showMap();
  


}

addMarkersToMap(markers) {
  console.log('------------',markers)
for (let marker of markers) {
  console.log(marker.geometry.location.lat)
  console.log(JSON.stringify(marker.geometry.location.lat))
  let position = new google.maps.LatLng(marker.geometry.location.lat, marker.geometry.location.lng);
  let mapMarker = new google.maps.Marker({
    position: position,
    title: marker.name,
    latitude: marker.geometry.location.lat,
    longitude: marker.geometry.location.lng,
    animation: 'DROP',
    icon: marker.pinicon,
     //draggable:true, 
  });

  mapMarker.setMap(this.map);


  // google.maps.event.addListener(mapMarker, 'dragend', function()
  // {
  //   console.log(mapMarker)
  //     var markerlatlong = mapMarker.getPosition();

  //     console.log("latlong   "+markerlatlong);
  //     console.log("lat    "+mapMarker.getPosition().lat());
  //     console.log("long   "+mapMarker.getPosition().lng());


  //     //this.placeMarkerAndPanTo(e.latLng, this.map); commented

  // var lat= JSON.stringify(mapMarker.getPosition().lat());
  // var longi = JSON.stringify(mapMarker.getPosition().lng());

  // localStorage.setItem('lat',lat)                                 
  // localStorage.setItem('longi',longi) 
  // //code for getting formatted address from the selected latitude and longitude 

  // var geocoder = new google.maps.Geocoder();
  // const latlng = {
  //   lat: parseFloat(lat),
  //   lng: parseFloat(longi)
  // };
  // geocoder.geocode(
  //   { location: latlng },
  //   (
  //     results,
  //     status
  //   ) => {
  //     if (status === "OK") {
  //       if (results[0]) {
          
  //        this.title =  results[0].formatted_address;
  //        localStorage.setItem('address',this.title)
  //        console.log(this.title)

  //        //this.markers = [];
  // var title = localStorage.getItem('address')

  // var lat1 = localStorage.getItem('lat') ;                                
  // var longi1 = localStorage.getItem('longi') 
  // console.log(title)

  // let position = new google.maps.LatLng(lat1, longi1);
    
  // mapMarker.position = position,
  // mapMarker.title = title,
  // mapMarker.latitude = lat1,
  // mapMarker.longitude = longi1,
  // mapMarker.animation = 'DROP',
  // mapMarker.draggable =true, 


  // mapMarker.setMap(this.map);
  // //var self = this;
  // this.addInfoWindowToMarker(mapMarker);

  // var data = {'latitude' : lat1, 'longitude' : longi1, 'title' : title}
  // this.markers = data;
  // console.log('3',this.markers)
          
  //       } else {
  //         window.alert("No results found");
  //       }
  //     } else {
  //       window.alert("Geocoder failed due to: " + status);
  //     }
  //   }
  // );

  



  // }.bind(this));

  this.addInfoWindowToMarker(mapMarker);
}
}

addInfoWindowToMarker(marker) {
  console.log(marker)
  console.log(marker.latitude)
  console.log(marker.longitude)
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
  gestureHandling: 'cooperative',
  fullscreenControl: false
}
console.log(options)
this.map = new google.maps.Map(this.mapRef.nativeElement, options);

let position = new google.maps.LatLng(this.lat,this.longi);
let mapMarker1 = new google.maps.Marker({
  position: position,
  title: this.address,
  latitude: this.lat,
  longitude: this.longi,
  animation: 'DROP',
  //draggable:true, 
});

mapMarker1.setMap(this.map);

//var  service = new google.maps.places.PlacesService(this.map);
      
            
// for (var i = 0; i < this.markers.length; i++) {
// var req = {
//           placeId:this.markers[i].place_id
//         }
//         service.getDetails(req,callback =>{
//           console.log(callback)

//           var data = callback
//           console.log(data)
//           this.markers[i].formatted_address = JSON.stringify(data[i].formatted_address)
//           this.markers[i].formatted_phone_number = JSON.stringify(data[i].formatted_phone_number)
        
        
//         },err=>{

//         })

//       }


let infoWindowContent1 = '<div id="content">' +
                          '<h5 id="firstHeading" class"firstHeading">' + mapMarker1.title + '</h5>' +
                          '<p>Latitude: ' + mapMarker1.latitude + '</p>' +
                          '<p>Longitude: ' + mapMarker1.longitude + '</p>' +
                        '</div>';

let infoWindow1 = new google.maps.InfoWindow({
  content: infoWindowContent1
});
console.log(this.markers)
this.addMarkersToMap(this.markers);


}


   hospital() {
this.navController.navigateForward(`/hospital`);
  }


}

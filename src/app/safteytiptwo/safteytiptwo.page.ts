import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ViewChild, ElementRef } from '@angular/core';


declare var google: any;
@Component({
  selector: 'app-safteytiptwo',
  templateUrl: './safteytiptwo.page.html',
  styleUrls: ['./safteytiptwo.page.scss'],
})
export class SafteytiptwoPage implements OnInit {
  locality:string
  landmark:string
  city:string
  state:string
  country:string
  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  location;
  lat;
  longi;
  infoWindows: any = [];
  address
  locations
  title
  markers: any = [];
  constructor(private navController: NavController, private router: Router,private route: ActivatedRoute) { 
    console.log(google)
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state)
        this.locality = this.router.getCurrentNavigation().extras.state.locality;;
        this.landmark = this.router.getCurrentNavigation().extras.state.landmark;;
        this.city = this.router.getCurrentNavigation().extras.state.city;;
        this.state = this.router.getCurrentNavigation().extras.state.state;;
        this.country = this.router.getCurrentNavigation().extras.state.country;;
        this.lat = this.router.getCurrentNavigation().extras.state.lat;
        this.longi = this.router.getCurrentNavigation().extras.state.longi;
        this.address = this.router.getCurrentNavigation().extras.state.address;
        var data = {'latitude' : this.lat , 'longitude' : this.longi, 'title' : this.address}
        this.markers.push(data)
        console.log("locality",this.locality)
        console.log("landmark",this.landmark)
        console.log("city",this.city)
        console.log("state",this.state)
        console.log("country",this.country)
        
        console.log(this.markers)
        console.log(this.location)
        console.log(this.lat)
        console.log(this.longi)
        console.log(this.address)
        

          }
        })

  }
  ngOnInit()
  {

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

 localStorage.setItem('lat_safety',lat)                                 
 localStorage.setItem('longi_safety',longi) 
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
        localStorage.setItem('address_safety',this.title)
        console.log(this.title)

        //this.markers = [];
 var title = localStorage.getItem('address_safety')

 var lat1 = localStorage.getItem('lat_safety') ;                                
 var longi1 = localStorage.getItem('longi_safety') 
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
 gestureHandling: 'cooperative',
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

  safetytip() {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        locality:this.locality,
        landmark:this.landmark,
        city:this.city,
        state:this.state,
        country:this.country,
        
                  

            }
      };

            this.navController.navigateForward([`safteytipthree`],navigationExtras);
            // this.navController.navigateForward(`/safteytipthree`);
}
}

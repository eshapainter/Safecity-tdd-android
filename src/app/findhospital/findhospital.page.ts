import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

declare var google: any;
@Component({
  selector: 'app-findhospital',
  templateUrl: './findhospital.page.html',
  styleUrls: ['./findhospital.page.scss'],
})
export class FindhospitalPage implements OnInit {
  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  location;
  lat;
  longi;
  infoWindows: any = [];
  address
  locations
  title
  radius = 3000
  markers: any = [
    {'latitude' : ''  , 'longitude' : '', 'title' : '' , 'rating' : '' , 'address' : ''}
  ];
  markers1: any = [
    {'latitude' : ''  , 'longitude' : '', 'title' : '' , 'rating' : '' , 'address' : ''}
  ];
  listing_data;

  constructor(private navController: NavController, private route: ActivatedRoute, private router: Router,public httpClient: HttpClient) { 
    console.log(google)
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state)
        this.location = this.router.getCurrentNavigation().extras.state.location;
        this.lat = this.router.getCurrentNavigation().extras.state.lat;
        this.longi = this.router.getCurrentNavigation().extras.state.longi;
        this.address = this.router.getCurrentNavigation().extras.state.address;
        var data = {'latitude' : this.lat , 'longitude' : this.longi, 'title' : this.address}
        this.markers1.push(data)
        
        console.log(this.markers)
        console.log(this.location)
        console.log(this.lat)
        console.log(this.longi)
        console.log(this.address)
        

          }
        })
  }

  back()
  {
    localStorage.setItem('lat',this.lat)                                 
    localStorage.setItem('longi',this.longi) 
    localStorage.setItem('address',this.address)    
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

      localStorage.setItem('lat',lat)                                 
      localStorage.setItem('longi',longi) 
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
             localStorage.setItem('address',this.title)
             console.log(this.title)

             //this.markers = [];
      var title = localStorage.getItem('address')

      var lat1 = localStorage.getItem('lat') ;                                
      var longi1 = localStorage.getItem('longi') 
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
      zoom: 10,
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
    
    console.log('3',this.markers1)
    this.addMarkersToMap(this.markers1);
  }

  

  
    listing() {
      console.log('4',this.markers)
      var title = localStorage.getItem('address')

      var lat1 = localStorage.getItem('lat') ;                                
      var longi1 = localStorage.getItem('longi')

console.log(this.radius)
      var pyrmont = new google.maps.LatLng(lat1,longi1);
      var request = {
        location: pyrmont,
        radius: this.radius,
        type: ['hospital'],
        rankby : 'distance',
        keyword:'hospital'
      };
    console.log(request)
     var  service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch(request,callback =>{
            this.markers = callback;
            if(this.markers.length < 3)
            {
              this.radius = this.radius + 2000
              this.listing();
              return;
            }
            for (var i = 0; i < this.markers.length; i++) {
        var j = i+1
        console.log(this.markers[i].place_id)
        // var req = {
        //   placeId:this.markers[i].place_id
        // }
        // service.getDetails(req,callback =>{
        //   console.log(callback)
        //   this.markers[i].
        // },err=>{

        // })
              this.markers[i].imgsrc = 'assets/images/icons/numberlisting/number' + j +'.png' ; 
              this.markers[i].pinicon = 'assets/images/icons/markericons/number' + j +'.png' ; 
              
              console.log(this.markers)
              //createMarker(results[i]);
            }
            
            console.log('3',this.markers)

            this.pushto();
      },err =>{

      });
      
      
    //   var pyrmont = new google.maps.LatLng(this.lat,this.longi);
    //   var request = {
    //     location: pyrmont,
    //     radius: '3000',
    //     type: ['hospital']
    //   };
    
    //  var  service = new google.maps.places.PlacesService(this.map);
    //   service.nearbySearch(request, this.callback);

      console.log('*********************')

      // let data = new FormData();
      // data.append( "location" , this.lat+',' +this.longi)
      // data.append("types" , 'hospital')
      // data.append("security_key" , 'e7cc12d418bf4b2ceb8cb8f2496bcb3b8676731c')
      // data.append( "key" , "AIzaSyA-RG4hM7qRh3jHfOwSuUOBexPTn0CZf6w")
      // data.append("radius" ,'5000')
  
      // this.httpClient.post("http://101.53.143.7/~dataduck/safecity/api/incident_report/getPlaceByLocation/", data)
      //   .subscribe((rdata : any) => {
      //     console.log(rdata);
      //     console.log(rdata.data);
      //     console.log(rdata.status);
      //     console.log(rdata);
      //     console.log(rdata.data.next_page_token);
      //     this.listing_data = rdata.data.results;
      //     console.log(this.listing_data)
          
          
        //  }, error => {
        //   console.log(error);
          
        // });
  
        
  }


  pushto()
  {

    var title = localStorage.getItem('address')

      var lat1 = localStorage.getItem('lat') ;                                
      var longi1 = localStorage.getItem('longi')
    let navigationExtras: NavigationExtras = {
      state: {
        data:JSON.stringify(this.markers),
        lat: lat1,
    longi: longi1,
    address: title
        
      }
    };
    this.router.navigate(['/hospitallisting'],navigationExtras);


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

      var title = localStorage.getItem('address')

      var lat1 = localStorage.getItem('lat') ;                                
      var longi1 = localStorage.getItem('longi') 
          
        //  console.log(this.markers)
          let navigationExtras: NavigationExtras = {
            state: {
              data: results,
              lat: lat1,
          longi: longi1,
          address: title
              
            }
          };
 // this.navController.navigateForward(['/hospitallisting'],navigationExtras);

    }
  }


}

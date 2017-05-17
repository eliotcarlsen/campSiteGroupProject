import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiKey } from '../RIDB-API';
import { Http } from '@angular/http';
import { GoogleMapService } from '../google-map.service';
import { CampInfoDataService } from '../camp-info-data.service';
import { routing } from '../app.routing';
import { WeatherService } from '../weather.service';
import { FirebaseService } from '../firebase.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [GoogleMapService, CampInfoDataService, WeatherService, FirebaseService, AngularFireAuth],
})
export class MapComponent implements OnInit {
  user: Observable<firebase.User>;
  //  position: string = this.lat + ',' + this.lng;
  cityName;
  dayTemp;
  eveTemp;
  geo;
  title;
  direction;         // marker direction
  location;
  lat;              // marker lat
  lng;             // marker lng
  markerDayTemp;
  markerEveTemp;
  facility;
  campsites;
  totalCampsitesNum;
  currentCount;     // output
  positions = [];
  facilities = [];
  facilitiesLatLng = [];
  threeDayForcast = [];
  weathers;
  condition;
  output;
  constructor(private http: Http, private googlemapservice: GoogleMapService, private campInfoDataService: CampInfoDataService, private weatherService: WeatherService, private firebaseService: FirebaseService, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  search(place) {
    this.location = place;
    this.googlemapservice.search(place).subscribe((data) => {
      this.geo = {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng};


      this.campInfoDataService.fetchCampsites(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng).subscribe((facilities) => {
        for (let i = 0; i < facilities.RECDATA.length; i++) {
          if (facilities.RECDATA[i].FacilityTypeDescription === 'Camping') {
            this.facilities.push(facilities.RECDATA[i]);
          }
        }
      console.log(facilities.RECDATA);
      return  this.facilities;
      });
    });
  }

  onMapClick(event) {
    this.positions.push(event.latLng);
    event.target.panTo(event.latLng);
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
  }

  onMapReady(map) {
    console.log('map', map);
    console.log('markers', map.markers);
  }

  clickMarker(pos) {
    var marker = pos.target;
    this.title = pos.target.title;
    this.lat = marker.getPosition().lat();
    this.lng = marker.getPosition().lng();
    this.weatherService.getWeather(this.lat, this.lng).subscribe((weather) => {
      this.markerDayTemp = ((weather.list[0].temp.day - 273) * 9 / 5 + 32).toFixed(0);
      this.markerEveTemp = ((weather.list[0].temp.eve - 273) * 9 / 5 + 32).toFixed(0);
      this.weathers = weather;
    });
    for (var i = 0; i < this.facilities.length; i++) {
      if(this.facilities[i].FacilityName === this.title) {
        this.direction = this.facilities[i].FacilityDirections;
      }
    }
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  seeDetail(facilities) {
    this.threeDayForcast = [];
    for (var i = 0; i < facilities.length; i++) {
      if (facilities[i].FacilityName === this.title) {
        this.facility = facilities[i];
      }
    }

    this.weatherService.getWeather(this.facility.FacilityLatitude, this.facility.FacilityLongitude).subscribe((data) => {
      for (let i = 0; i < 3; i ++) {
        var Maxtemp = data.list[i].temp.max * 9 / 5 - 459.67;
        var maxTemp = Maxtemp.toFixed(0);
        var Mintemp = data.list[i].temp.min * 9 / 5 - 459.67;
        var minTemp = Mintemp.toFixed(0);
        if (((data.list[i].weather[0].description).toLowerCase()).includes('snow')) {
          this.condition = 'snow.jpeg';
          this.output = data.list[i].weather[0].description;
        }else if (((data.list[i].weather[0].description).toLowerCase()).includes('cloud')) {
          this.condition = 'cloudy.jpeg';
          this.output = data.list[i].weather[0].description;
        }else if (((data.list[i].weather[0].description).toLowerCase()).includes('rain')) {
          this.condition = 'rain.png';
          this.output = data.list[i].weather[0].description;
        }else if (((data.list[i].weather[0].description).toLowerCase()).includes('clear')) {
          this.condition = 'sun.gif';
          this.output = data.list[i].weather[0].description;
        }

        this.threeDayForcast.push({maxTemp: maxTemp, minTemp: minTemp, condition: this.condition, output: this.output});
       }
       console.log(this.threeDayForcast);
    });
    this.campInfoDataService.test(this.facility.FacilityID).subscribe((data) => {
      this.campsites = data.RECDATA;
      this.totalCampsitesNum = data.METADATA.RESULTS.TOTAL_COUNT;
      this.currentCount = data.METADATA.RESULTS.CURRENT_COUNT;
      console.log(this.campsites);
    });
  }

  logout() {
    this.firebaseService.logOut();
  }
}

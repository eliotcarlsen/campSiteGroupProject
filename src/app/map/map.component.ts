import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiKey } from '../RIDB-API';
import { Http } from '@angular/http';
import { GoogleMapService } from '../google-map.service';
import { CampInfoDataService } from '../camp-info-data.service';
import { routing } from '../app.routing';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [GoogleMapService, CampInfoDataService, WeatherService],
})
export class MapComponent implements OnInit {
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
  constructor(private http: Http, private googlemapservice: GoogleMapService, private campInfoDataService: CampInfoDataService, private weatherService: WeatherService) { }

  ngOnInit() {
  }

  search(place) {
    this.location = place;
    this.googlemapservice.search(place).subscribe((data) => {
      this.geo = {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng};
      this.weatherService.getWeather(data.results[0].geometry.location.lat,    data.results[0].geometry.location.lng).subscribe((weather) => {
        this.cityName = weather.city.name;
        this.dayTemp = ((weather.list[0].temp.day - 273) * 9 / 5 + 32).toFixed(0);
        this.eveTemp = ((weather.list[0].temp.eve - 273) * 9 / 5 + 32).toFixed(0);
      });

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
    this.weatherService.getWeather(this.lat, this.lng).subscribe((data) => {
      this.markerDayTemp = ((data.list[0].temp.day - 273) * 9 / 5 + 32).toFixed(0);
      this.markerEveTemp = ((data.list[0].temp.eve - 273) * 9 / 5 + 32).toFixed(0);
    });
    for (var i = 0; i < this.facilities.length; i++) {
      if(this.facilities[i].FacilityName === this.title) {
        this.direction = this.facilities[i].FacilityDirections;
      }
    }
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  seeDetail(facilities) {
    for (var i = 0; i < facilities.length; i++) {
      if (facilities[i].FacilityName === this.title) {
        this.facility = facilities[i];
      }
    }

    this.weatherService.getWeather(this.facility.FacilityLatitude, this.facility.FacilityLongitude).subscribe(
      (weather) => {
        this.weathers = weather;
        console.log(this.weathers);
        for (let i = 0; i < 3; i++) {
          var Maxtemp = this.weathers.list[i].temp.max * 9 / 5 - 459.67;
          var maxTemp = Maxtemp.toFixed(0);
          var Mintemp = this.weathers.list[i].temp.min * 9 / 5 - 459.67;
          var minTemp = Mintemp.toFixed(0);
          if (this.weathers.list[i].weather[0].main === 'Snow') {
            this.condition = 'snow.jpeg';
            this.output = 'Chance of Snow';
          }else if (this.weathers.list[i].weather[0].main === 'Clouds') {
            this.condition = 'cloudy.jpeg';
            this.output = 'Partly Cloudy';
          }else if (this.weathers.list[i].weather[0].main === 'Rain') {
            this.condition = 'rain.png';
            this.output = 'Chance of Rain';
          }else if (this.weathers.list[i].weather[0].main === 'Clear') {
            this.condition = 'sun.gif';
            this.output = 'Sunny';
          }
          this.threeDayForcast.push(maxTemp, minTemp, this.condition, this.output);
        }
      }
    );
    this.campInfoDataService.test(this.facility.FacilityID).subscribe((data) => {
      this.campsites = data.RECDATA;
      this.totalCampsitesNum = data.METADATA.RESULTS.TOTAL_COUNT;
      this.currentCount = data.METADATA.RESULTS.CURRENT_COUNT;
      console.log(this.campsites);
    });
  }
}

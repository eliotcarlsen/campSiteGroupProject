import { Component, OnInit } from '@angular/core';
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
  direction;
  location;
  positions = [];
  facilities = [];
  facilitiesLatLng = [];
  constructor(private http: Http, private apikey: ApiKey, private googlemapservice: GoogleMapService, private campInfoDataService: CampInfoDataService, private weatherService: WeatherService) { }

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
    for (var i = 0; i < this.facilities.length; i++) {
      if(this.facilities[i].FacilityName === this.title) {
        this.direction = this.facilities[i].FacilityDirections;
      }
    }
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }
}

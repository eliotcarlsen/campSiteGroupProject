import { Component, OnInit } from '@angular/core';
import { ApiKey } from '../RIDB-API';
import { Http } from '@angular/http';
import { GoogleMapService } from '../google-map.service';
import { CampInfoDataService } from '../camp-info-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [GoogleMapService, CampInfoDataService]
})
export class MapComponent implements OnInit {
  //  position: string = this.lat + ',' + this.lng;
  location;
  markers = [];
  positions = [];
  facilitiesLatLng = [];
  constructor(private http: Http, private apikey: ApiKey, private googlemapservice: GoogleMapService, private campInfoDataService: CampInfoDataService) { }

  ngOnInit() {
  }

  search(place) {
    this.location = place;
    this.googlemapservice.search(place).subscribe((data) => {
      this.campInfoDataService.fetchCampsites(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng).subscribe((facilities) => {
        for (let i = 0; i < facilities.RECDATA.length; i++) {
          this.markers.push({lat: facilities.RECDATA[i].FacilityLatitude, lng: facilities.RECDATA[i].FacilityLongitude});
        }
        console.log(this.markers);
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
}

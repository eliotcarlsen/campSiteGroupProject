import { Injectable } from '@angular/core';
import { ApiKey } from './RIDB-API';
import { Http } from '@angular/http';

@Injectable()
export class GoogleMapService {

  constructor(private http: Http, private apikey: ApiKey) { }

  search(place) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + place + '&key=' + this.apikey.googleMapApi).map((res) => res.json());
  }

}

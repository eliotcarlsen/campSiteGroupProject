import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { ApiKey } from './RIDB-API';

@Injectable()
export class CampInfoDataService {

  constructor(private apikey: ApiKey, private http: Http) { }
  fetchCampgrounds(lat, long){
    return this.http.get('https://ridb.recreation.gov/api/v1/recareas?longitude=' + long + '&latitude=' + lat + '&radius=30&apikey=' + this.apikey.apikey).map(
      (res) => res.json()
    );
  }
  fetchCampsites(lat, long){
    return this.http.get('https://ridb.recreation.gov/api/v1/facilities?longitude=' + long + '&latitude=' + lat + '&radius=100&apikey=' + this.apikey.apikey).map(
      (res) => res.json()
    );
  }
}

// facilities...https://ridb.recreation.gov/api/v1/facilities?longitude=-122.3&latitude=47.6&radius=200&apikey=95E186940F8141F5A5A6F758F9A703EB
// campsites... https://ridb.recreation.gov/api/v1/facilities/231978/campsites?apikey=95E186940F8141F5A5A6F758F9A703EB

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { ApiKey } from './RIDB-API';
import 'rxjs/add/operator/map';

@Injectable()
export class CampInfoDataService {
  area;
  sites;

  constructor(private apikey: ApiKey, private http: Http) { }

  fetchCampsites(lat, long) {
    return this.http.get('https://ridb.recreation.gov/api/v1/facilities?limit=50&longitude=' + long + '&latitude=' + lat + '&radius=100&apikey=' + this.apikey.apikey).map(
      (sites) => sites.json()
    );
  }

  test(id) {
    return this.http.get('https://ridb.recreation.gov/api/v1/facilities/' + id + '/campsites?apikey=' + this.apikey.apikey).map(
      (data) => data.json()
    );
  }
}

// facilities...https://ridb.recreation.gov/api/v1/facilities?longitude=-122.3&latitude=47.6&radius=200&apikey=95E186940F8141F5A5A6F758F9A703EB
// campsites... https://ridb.recreation.gov/api/v1/facilities/231978/campsites?apikey=95E186940F8141F5A5A6F758F9A703EB
// .flatMap((sites) => this.http.get('https://ridb.recreation.gov/api/v1/facilities/' + 232864 + '/campsites?apikey=' + this.apikey.apikey)).map((campsites) => campsites.json()
// );

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
}

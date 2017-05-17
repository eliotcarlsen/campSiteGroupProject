import { Injectable } from '@angular/core';
import { ApiKey } from 'app/RIDB-API';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {
key: string = this.ApiKey.weatherapi;
constructor(private ApiKey: ApiKey, private http: Http) { }

getWeather(lati, longi) {
 return this.http.get('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lati +  '&lon=' + longi + '&APPID=' + this.key).map(
      (res) => res.json()
  );
}
}

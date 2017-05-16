import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'app/weather.service';
import { ApiKey } from 'app/RIDB-API';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService, ApiKey]
})
export class WeatherComponent implements OnInit {
  weathers;
  threeDayForcast=[];
  condition;
  output;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

  }
  searchWeather(lat,lon){
    this.weatherService.getWeather(lat,lon).subscribe(
      (data) => {
        this.weathers = data
        this.threeDayForcast = [];
        for(var i = 0; i<3; i++){
          var Maxtemp = this.weathers.list[i].temp.max * 9/5-459.67;
          var maxTemp = Maxtemp.toFixed(0);
          var Mintemp = this.weathers.list[i].temp.min * 9/5-459.67;
          var minTemp = Mintemp.toFixed(0);
          if(this.weathers.list[i].weather[0].main === "Snow"){
            this.condition = 'snow.jpeg';
            this.output = "Chance of Snow";
          }else if(this.weathers.list[i].weather[0].main === "Clouds"){
            this.condition = "cloudy.jpeg";
            this.output = "Partly Cloudy";
          }else if (this.weathers.list[i].weather[0].main === "Rain"){
            this.condition = 'rain.png';
            this.output = "Chance of Rain";
          }else if (this.weathers.list[i].weather[0].main === "Clear"){
            this.condition = "sun.gif";
            this.output = "Sunny";
          }
          this.threeDayForcast.push(maxTemp, minTemp, this.condition, this.output);
        }
        console.log(this.threeDayForcast)
      }
    );
  }

}

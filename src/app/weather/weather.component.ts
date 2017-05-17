import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'app/weather.service';
import { ApiKey } from 'app/RIDB-API';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService, ApiKey]
})
export class WeatherComponent implements OnInit {
  @Input() facility;
  @Input() threeDayForcast;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

  }
}

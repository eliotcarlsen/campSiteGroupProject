import { Component, OnInit } from '@angular/core';
import { CampInfoDataService } from '../camp-info-data.service';
import { ApiKey } from '../RIDB-API';

@Component({
  selector: 'app-campground-data',
  templateUrl: './campground-data.component.html',
  styleUrls: ['./campground-data.component.css'],
  providers: [CampInfoDataService, ApiKey]
})
export class CampgroundDataComponent implements OnInit {
  rec;
  constructor(private campInfoDataService: CampInfoDataService, private apikey: ApiKey) { }

  ngOnInit() {
  }
  findCampgrounds(lat, long){
    this.campInfoDataService.fetchCampgrounds(lat, long).subscribe(
      (data) => console.log(this.rec = data.RECDATA)
    );
  }
}

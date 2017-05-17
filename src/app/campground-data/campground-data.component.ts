import { Component, OnInit, Input } from '@angular/core';
import { CampInfoDataService } from '../camp-info-data.service';
import { ApiKey } from '../RIDB-API';

@Component({
  selector: 'app-campground-data',
  templateUrl: './campground-data.component.html',
  styleUrls: ['./campground-data.component.css'],
  providers: [CampInfoDataService, ApiKey]
})
export class CampgroundDataComponent implements OnInit {
  recAreas;
  facId = [];
  data1 = [];
  @Input() facility;
  @Input() totalCampsitesNum;
  @Input() currentCount;
  @Input() campsites;

  constructor(private campInfoDataService: CampInfoDataService, private apikey: ApiKey) { }

  ngOnInit() {
  }
  findCampsites(lat1, long1) {
    this.campInfoDataService.fetchCampsites(lat1, long1).subscribe((data1) => {
      for (let i = 0; i < data1.RECDATA.length; i++) {
        if (data1.RECDATA[i].FacilityTypeDescription === 'Camping') {
          this.facId.push(data1.RECDATA[i].FacilityID);
          this.data1.push(data1.RECDATA[i]);
        }
      }
      this.campInfoDataService.test(this.facId);
    });
  }

}

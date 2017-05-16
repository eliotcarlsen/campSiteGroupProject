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
  recAreas;
  campsites=[];
  facId=[];
  data1;
  constructor(private campInfoDataService: CampInfoDataService, private apikey: ApiKey) { }

  ngOnInit() {
  }
  findCampsites(lat1, long1){
    this.campInfoDataService.fetchCampsites(lat1, long1).subscribe((data1) => {
      console.log(data1.RECDATA);
      this.data1 = data1.RECDATA;
      for(var i = 0; i < data1.RECDATA.length; i++) {
        this.facId.push(data1.RECDATA[i].FacilityID);
        this.campsites.push({lat:data1.RECDATA[i].FacilityLatitude, lng:data1.RECDATA[i].FacilityLongitude});
      }
      console.log(this.campsites);
      console.log(this.facId);
      this.campInfoDataService.test(this.facId);
    })
  }
}

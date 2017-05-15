import { TestBed, inject } from '@angular/core/testing';

import { CampInfoDataService } from './camp-info-data.service';

describe('CampInfoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampInfoDataService]
    });
  });

  it('should ...', inject([CampInfoDataService], (service: CampInfoDataService) => {
    expect(service).toBeTruthy();
  }));
});

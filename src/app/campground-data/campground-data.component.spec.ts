import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundDataComponent } from './campground-data.component';

describe('CampgroundDataComponent', () => {
  let component: CampgroundDataComponent;
  let fixture: ComponentFixture<CampgroundDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampgroundDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampgroundDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleverbotComponent } from './cleverbot.component';

describe('CleverbotComponent', () => {
  let component: CleverbotComponent;
  let fixture: ComponentFixture<CleverbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleverbotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleverbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

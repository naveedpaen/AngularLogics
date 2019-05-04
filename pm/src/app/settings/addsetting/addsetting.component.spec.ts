import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsettingComponent } from './addsetting.component';

describe('AddsettingComponent', () => {
  let component: AddsettingComponent;
  let fixture: ComponentFixture<AddsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

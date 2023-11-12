import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticControlsComponent } from './static-controls.component';

describe('StaticControlsComponent', () => {
  let component: StaticControlsComponent;
  let fixture: ComponentFixture<StaticControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

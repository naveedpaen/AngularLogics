import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavepageComponent } from './savepage.component';

describe('SavepageComponent', () => {
  let component: SavepageComponent;
  let fixture: ComponentFixture<SavepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

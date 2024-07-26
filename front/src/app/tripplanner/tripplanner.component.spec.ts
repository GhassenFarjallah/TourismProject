import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripplannerComponent } from './tripplanner.component';

describe('TripplannerComponent', () => {
  let component: TripplannerComponent;
  let fixture: ComponentFixture<TripplannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripplannerComponent]
    });
    fixture = TestBed.createComponent(TripplannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

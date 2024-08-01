import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsRestaurantsComponent } from './hotels-restaurants.component';

describe('HotelsRestaurantsComponent', () => {
  let component: HotelsRestaurantsComponent;
  let fixture: ComponentFixture<HotelsRestaurantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelsRestaurantsComponent]
    });
    fixture = TestBed.createComponent(HotelsRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

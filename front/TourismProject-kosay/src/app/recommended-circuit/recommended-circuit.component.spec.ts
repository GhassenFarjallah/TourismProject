import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedCircuitComponent } from './recommended-circuit.component';

describe('RecommendedCircuitComponent', () => {
  let component: RecommendedCircuitComponent;
  let fixture: ComponentFixture<RecommendedCircuitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendedCircuitComponent]
    });
    fixture = TestBed.createComponent(RecommendedCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

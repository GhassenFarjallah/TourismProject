import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforerecComponent } from './beforerec.component';

describe('BeforerecComponent', () => {
  let component: BeforerecComponent;
  let fixture: ComponentFixture<BeforerecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeforerecComponent]
    });
    fixture = TestBed.createComponent(BeforerecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

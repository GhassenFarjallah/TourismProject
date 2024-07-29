import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tripCompletedGuard } from './trip-completed.guard';

describe('tripCompletedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tripCompletedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

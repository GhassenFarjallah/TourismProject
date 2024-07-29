import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Import RouterTestingModule for routing-related services
      providers: [AuthGuard]
    });

    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  // Example test case for canActivate method
  it('should return true if user is logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('dummyToken');
    expect(authGuard.canActivate()).toBeTrue();
  });

  it('should navigate to /login if user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'navigate');
    expect(authGuard.canActivate()).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

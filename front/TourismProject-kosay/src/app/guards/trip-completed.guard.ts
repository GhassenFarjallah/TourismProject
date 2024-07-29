// trip-completed.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TripCompletedGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isTripCompleted = !!localStorage.getItem('tripCompleted'); // Check if the trip form is completed
    if (!isTripCompleted) {
      this.router.navigate(['/trip-form']);
    }
    return isTripCompleted;
  }
}

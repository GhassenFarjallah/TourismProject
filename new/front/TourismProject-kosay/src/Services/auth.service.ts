import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/v1/auth';
  private firstName: string = '';
  private lastName: string = '';
  constructor(private http: HttpClient ,private router: Router) {}
 

  setUserDetails(firstName: string, lastName: string) {
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
  }

  getUserDetails() {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    return { firstName, lastName };
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, credentials);
  }

  verifyEmail(otp: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-email/`, otp);
  }

  requestPasswordReset(email: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/password-reset/`, email);
  }

  confirmPasswordReset(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/password-reset-confirm/`, data);
  }

  setNewPassword(data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/set-new-password/`, data);
  }

  // logout(refreshToken: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/logout/`, { refresh_token: refreshToken });
  // }
 // Méthode pour se déconnecter
 logout(): Observable<any> {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken || !refreshToken) {
      console.log(accessToken, refreshToken);
      this.router.navigate(['/landingpage']);
      return new Observable();
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
  return this.http.post(`${this.baseUrl}/logout/`, { refresh_token: refreshToken }, { headers });
}


  // Save tokens to local storage
  saveTokens(tokens: { access_token: string, refresh_token: string }): void {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  // Retrieve access token
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Retrieve refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  // Logout and clear tokens from local storage
  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

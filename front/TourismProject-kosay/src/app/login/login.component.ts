import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
  password2!: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const userData = {
      email: this.email,
      password: this.password,
   
    };
  
    this.authService.login(userData).subscribe(
      response => {
        console.log('login successful', response);
          // Save tokens to local storage
          this.authService.saveTokens({
            access_token: response.access_token,
            refresh_token: response.refresh_token
          });
          console.log('Stored refresh token:', this.authService.getRefreshToken());

        this.router.navigate(['/home']);
      },
      error => {
        console.error('login failed', error);
        console.error('Error details:', error.error);  // Affichez les détails de l'erreur
      }
    );
  }
}

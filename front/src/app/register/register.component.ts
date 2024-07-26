import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
  password2!: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const userData = {
      email: this.email,
      first_name: this.firstName,
      last_name: this.lastName,
      password: this.password,
      password2: this.password2
    };
  
    this.authService.register(userData).subscribe(
      response => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed', error);
        console.error('Error details:', error.error);  // Affichez les détails de l'erreur
      }
    );
  }
}

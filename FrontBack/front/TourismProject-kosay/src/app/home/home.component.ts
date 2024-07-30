import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    const refreshToken = this.authService.getRefreshToken();

    // Efface les tokens du stockage local
    this.authService.clearTokens();

    // Effectue la demande de déconnexion au backend (optionnel)
    if (refreshToken) {
      this.authService.logout(refreshToken).subscribe(
        response => {
          console.log('Logout successful', response);
          // Redirige vers la page de connexion
          this.router.navigate(['/landingpage']);
        }
      );
    } else {
      // Redirige vers la page de connexion si aucun token de rafraîchissement n'est trouvé
      this.router.navigate(['/login']);
    }
  }
}

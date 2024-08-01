import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-beforerec',
  templateUrl: './beforerec.component.html',
  styleUrls: ['./beforerec.component.css'],
  encapsulation: ViewEncapsulation.None  
})
export class BeforerecComponent implements OnInit {
  userFullName: string = '';
  isVisible: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    const { firstName, lastName } = this.authService.getUserDetails();
    this.userFullName = `Hello  ${firstName} !!`;
    console.log('Stored  tokens:', this.authService.getRefreshToken(),this.authService.getAccessToken());

  }
 
 
  createNewCircuit():void{
    this.router.navigate(['/trip-form']);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.router.navigate(['/landingpage']);
      },
      error: (err) => {
        console.error('Error logging out:', err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.router.navigate(['/login']);}
      });
    }
}

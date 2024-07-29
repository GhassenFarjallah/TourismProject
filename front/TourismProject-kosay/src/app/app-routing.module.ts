// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { RecommendedCircuitComponent } from './recommended-circuit/recommended-circuit.component';
import { AuthGuard } from './guards/auth.guard';
import { TripCompletedGuard } from './guards/trip-completed.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  { 
    path: 'recommended-circuit',
    component: RecommendedCircuitComponent,
    canActivate: [AuthGuard, TripCompletedGuard] // Protect route
  },
  {
    path: 'trip-form',
    component: TripFormComponent,
    canActivate: [AuthGuard] // Protect route
  },
  {
    path: 'landingpage',
    component: LandingpageComponent
  },
  { 
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landingpage',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**', // Catch-all route
    redirectTo: 'landingpage'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

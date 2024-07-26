import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { TripplannerComponent } from './tripplanner/tripplanner.component';

const routes: Routes = [

  {
    path:'home',
    component:HomeComponent
  },
  {
    path:"tripplanner",
    component:TripplannerComponent
  },
  {
    path:"landingpage",
    component: LandingpageComponent
  },
  { path: 'register',
    component: RegisterComponent
  },
  
  {
      path:'',
      pathMatch:'full',
      redirectTo:'landingpage'
  },

  {
    path:'login',
    component:LoginComponent
  },

  {
    path:'**',//ken ma9itch 7ata path meli moujoudin
    redirectTo:'landingpage'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

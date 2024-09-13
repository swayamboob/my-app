import { Component, inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/authentication/auth.service';


export const guard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  // some auth logic
  return inject(AuthService).canActivate()
   
}


const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"signin",
    component:SignInComponent
  },
  {
    path:"signup",
    component: SignUpComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[guard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}

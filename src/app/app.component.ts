import { Component } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';
import { Router } from '@angular/router';
import { EmployeeDataService } from './services/employee-service/employee-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService:AuthService, public router:Router){
    if(!authService.isTokenValid()){
      localStorage.removeItem('authToken');
      localStorage.removeItem('tokenExpiration');
      this.router.navigate(['/login']);
    }else{
      const employeeProfile = localStorage.getItem("employeeProfile");
      const jwt=  localStorage.getItem('authToken');
      if(employeeProfile && jwt){
        authService.employeeDetails.employeeProfile= JSON.parse(employeeProfile)
        authService.employeeDetails.jwt= jwt;
        authService.isLoggedIn=true;
        authService.setProfile();
        console.log(authService.employeeDetails.employeeProfile);
      }
    }
  }

}

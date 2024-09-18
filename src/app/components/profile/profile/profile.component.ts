import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { Profile } from 'src/app/model/Profile';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { EmployeeDataService } from 'src/app/services/employee-service/employee-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(public authService:AuthService,public employeeDataService:EmployeeDataService){
  }
  ngOnInit(){
    
  }
}

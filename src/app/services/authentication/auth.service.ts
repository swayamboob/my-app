import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { HttpHeaders } from '@angular/common/http';
import { EmployeeDetails } from 'src/app/model/EmployeeDetails';
import { EmployeeDataService } from '../employee-service/employee-data.service';
import { Profile } from 'src/app/model/Profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public employeeDetails: EmployeeDetails
  public isLoggedIn: boolean
  errorFlag: boolean

  Header: HttpHeaders | null
  constructor(public http: HttpClient, public employeeDataService: EmployeeDataService) {
    this.isLoggedIn = false
    this.errorFlag = false
    this.employeeDetails = new EmployeeDetails()
    this.Header = new HttpHeaders();
  }

  canActivate(): boolean {
    if (this.isLoggedIn == true && this.employeeDetails.jwt != null)
      return true
    return false
  }
  setProfile() {
    this.Header = new HttpHeaders({ Authorization: `Bearer ${this.employeeDetails.jwt}` })
    this.http.get<Profile>(`http://localhost:8080/employee/profile/${this.employeeDetails.employeeProfile.employeeID}/${this.employeeDetails.employeeProfile.employeeEmail}`, { headers: this.Header }).subscribe(data => {
      this.employeeDataService.employeeProfile = data;
    })
  }
  signIn(employee: Employee) {
    this.isLoggedIn = false
    this.errorFlag = false
    this.http.post<any>("http://localhost:8080/login", employee).subscribe(data => {
      // console.log(data);
      this.employeeDetails = data
      this.isLoggedIn = true
      console.log(this.employeeDetails)
      this.setProfile();
      this.Header = new HttpHeaders({ Authorization: `Bearer ${this.employeeDetails.jwt}` })
    }, (err) => {
      this.errorFlag = true;
      console.log(err);
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { HttpHeaders } from '@angular/common/http';
import { EmployeeDetails } from 'src/app/model/EmployeeDetails';
import { EmployeeDataService } from '../employee-service/employee-data.service';
import { Profile } from 'src/app/model/Profile';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 @Input() public employeeDetails: EmployeeDetails
  public isLoggedIn: boolean
  errorFlag: boolean

  Header: HttpHeaders | null
  constructor(public http: HttpClient,public router:Router, public employeeDataService:EmployeeDataService) {
    this.isLoggedIn = false
    this.errorFlag = false
    this.employeeDetails = new EmployeeDetails()
    this.Header = new HttpHeaders();
  }

  canManager(): boolean {
    if (this.isLoggedIn == true && this.employeeDetails.jwt != null && this.isTokenValid() && this.employeeDetails.employeeProfile.employeeRole=='MANAGER')
      return true
    else{
      Swal.fire({
        title: "Error Occured",
        text: "Sign In Again",
        icon: "error",
        confirmButtonColor: "#3085d6"
      });
      this.signOut();
      this.router.navigate(['/login']);
      return false;
    }
  }
  canUser(): boolean {
    if (this.isLoggedIn == true && this.employeeDetails.jwt != null && this.isTokenValid())
      return true
    else{
      Swal.fire({
        title: "Error Occured",
        text: "Sign In Again",
        icon: "error",
        confirmButtonColor: "#3085d6"
      });
      this.signOut();
      this.router.navigate(['/login']);
      return false;
    }
  }

  ngOnChanges() {
    this.setProfile();
  }
  setProfile() {
    this.Header = new HttpHeaders({ Authorization: `Bearer ${this.employeeDetails.jwt}` })
    this.http.get<Profile>(`http://localhost:8080/employee/profile/${this.employeeDetails.employeeProfile.employeeID}/${this.employeeDetails.employeeProfile.employeeEmail}`, { headers: this.Header }).subscribe(data => {
      this.employeeDataService.employeeProfile = data;
      this.employeeDataService.employeeToken= this.employeeDetails.jwt;
    },err=>{
      alert("sign in again");
      this.signOut();
    })
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('tokenExpiration');
    
    if (!token || !expiration) {
      return false;
    }
    const now = new Date().getTime();
    return now < parseInt(expiration);
  }
  signOut(){
    this.isLoggedIn = false
    localStorage.removeItem('employeeProfile');
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    this.router.navigate(['/login']);
  }
  signIn(employee: Employee) {
    this.isLoggedIn = false
    this.errorFlag = false
    this.http.post<any>("http://localhost:8080/login", employee).subscribe(data => {
      // console.log(data);
      this.employeeDetails = data
      this.isLoggedIn = true
      const token:string = this.employeeDetails.jwt;
      const expiration = new Date().getTime() + 10*60*60*1000;
      localStorage.setItem('employeeProfile',JSON.stringify(this.employeeDetails.employeeProfile));
      localStorage.setItem('authToken', token);
      localStorage.setItem('tokenExpiration', expiration.toString());
      console.log(this.employeeDetails)
      this.setProfile();
      this.Header = new HttpHeaders({ Authorization: `Bearer ${this.employeeDetails.jwt}` })
      this.router.navigate(['/welcome']);
    }, (err) => {
      this.errorFlag = true;
      console.log(err);
    })
  }
}

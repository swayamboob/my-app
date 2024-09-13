import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { EmployeeDetails } from 'src/app/model/EmployeeDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public employeeDetails: EmployeeDetails
  public isLoggedIn: boolean
  errorFlag: boolean
  constructor(public http:HttpClient) { 
    this.isLoggedIn=false
    this.errorFlag=false
    this.employeeDetails= new EmployeeDetails()
  }

  canActivate(): boolean {
    if (this.isLoggedIn ==true && this.employeeDetails.jwt != null)
      return true
    return false
  }

  signIn(employee:Employee){
    this.isLoggedIn = false
    this.errorFlag = false
    this.http.post<any>("http://localhost:8080/login",employee).subscribe(data=>{
      // console.log(data);
      this.employeeDetails= data
      this.isLoggedIn = true
      console.log(this.employeeDetails)
      alert("signed in")
    },(err)=>{
      this.errorFlag=true;
      console.log(err);
    })
  }
}

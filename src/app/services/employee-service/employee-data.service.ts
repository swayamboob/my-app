import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { Profile } from 'src/app/model/Profile';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  employeeProfile: Profile | null
  constructor(public http:HttpClient) {
    this.employeeProfile=null;
   }
   getEmployeesByTeam(){
   let e:Employee[]
   e=[]
   }

}

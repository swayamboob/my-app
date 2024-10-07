import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { Profile } from 'src/app/model/Profile';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs';
import { Task } from 'src/app/model/Task';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  employeeProfile: Profile | null
  employeeToken:string
  constructor(public http:HttpClient) {
    this.employeeProfile=null;
    this.employeeToken=''
   }
   getEmployeesByTeam(){
   let e:Employee[]
   e=[]
   }

   getTaskAssignedToMe(employeeId:number):Observable<Task[]>{
    const header= new HttpHeaders({ Authorization: `Bearer ${this.employeeToken}` })
    return this.http.get<Task[]>(`http://localhost:8080/task/employee/mytask/${employeeId}`,
      {headers: header }
    );
   }

}

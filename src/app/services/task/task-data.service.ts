import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { EmployeeDataService } from '../employee-service/employee-data.service';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {

  public createdBy:Task[]
  public header: HttpHeaders
  public currentSelectedTask: Task|null
  constructor(public http:HttpClient,public employeeData:EmployeeDataService,public authService:AuthService,public router:Router) {
    this.createdBy=[];
    this.header = new HttpHeaders({ Authorization: `Bearer ${this.authService.employeeDetails.jwt}` })
    this.currentSelectedTask=null;
   }
   getTaskCreatedBy(){
    this.http.get<Task[]>(`http://localhost:8080/task/employee/creator/${this.employeeData.employeeProfile?.employeeID}`,{headers:this.header}).subscribe(data=>{
      this.createdBy= data;
      console.log(data);
    }, err=>{
      alert(err);
    })
   }
   addTask(taskData:any){
    this.header = new HttpHeaders({ Authorization: `Bearer ${this.authService.employeeDetails.jwt}` })
    this.http.post<any>(`http://localhost:8080/task/employee/add`,taskData,{headers:this.header}).subscribe(data=>{
      this.router.navigate(["/tasks"])
      alert("task added");
    }, err=>{
      console.log("task not added", err);
      alert("error occured");
    })
   }
}

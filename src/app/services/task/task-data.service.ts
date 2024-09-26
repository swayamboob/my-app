import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { EmployeeDataService } from '../employee-service/employee-data.service';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  public createdBy: Task[];
  public header: HttpHeaders;
  public currentSelectedTask: Task | null;
  constructor(
    public http: HttpClient,
    public employeeData: EmployeeDataService,
    public authService: AuthService,
    public router: Router
  ) {
    this.createdBy = [];
    this.header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.employeeDetails.jwt}`,
    });
    this.currentSelectedTask = null;
  }
  getTaskCreatedBy() {
    this.http
      .get<Task[]>(
        `http://localhost:8080/task/employee/creator/${this.authService.employeeDetails.employeeProfile.employeeID}`,
        { headers: this.header }
      )
      .subscribe(
        (data) => {
          this.createdBy = data;
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(
      `http://localhost:8080/task/employee/creator/${this.authService.employeeDetails.employeeProfile.employeeID}`,
      { headers: this.header }
    );
  }
  addTask(taskData: any) {
    this.header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.employeeDetails.jwt}`,
    });
    this.http
      .post<any>(`http://localhost:8080/task/employee/add`, taskData, {
        headers: this.header,
      })
      .subscribe(
        (data) => {
          this.router.navigate(['/tasks']);
          Swal.fire({
            title: "Saved",
            text: "Task Added",
            icon: "success",
            confirmButtonColor: "#3085d6"
          });
        },
        (err) => {
          console.log('task not added', err);
          alert('error occured');
        }
      );
  }
  addTaskObservable(taskData: Task) {
    this.header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.employeeDetails.jwt}`,
    });
    return this.http.post<any>(
      `http://localhost:8080/task/employee/add`,
      taskData,
      { headers: this.header }
    );
  }
  updateTaskStatus(taskId: number, taskStatus: string) {
    return this.http.put(
      `http://localhost:8080/task/employee/update/status`,
      { taskId: taskId, taskStatus: taskStatus },
      { headers: this.header }
    );
  }
  deleteTask(task: Task) {
    this.header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.employeeDetails.jwt}`,
    });
    this.http
      .delete(
        `http://localhost:8080/task/manager/remove/${task.taskId}/${this.authService.employeeDetails.employeeProfile.employeeID}`,
        { headers: this.header }
      )
      .subscribe(
        (data) => {
          this.router.navigate(['/tasks']);
          Swal.fire({
            title: "Deleted",
            text: "Task Deleted",
            icon: "success",
            confirmButtonColor: "#3085d6"
          });
        },
        (err) => {
          console.log(err);
          alert('error occured');
        }
      );
  }
  getBacklogs():Observable<Task[]>{
    return this.http.get<Task[]>(`http://localhost:8080/task/manager/backlogs/${this.authService.employeeDetails.employeeProfile?.employeeID}`, {headers:this.header});
  }
}

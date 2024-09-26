import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sprint } from 'src/app/model/Sprint';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintDataService {
  header: HttpHeaders
  sprintsCreatedBy: Sprint[]
  activeSprint!: Sprint
  constructor(public http: HttpClient, public authService: AuthService) {
    this.sprintsCreatedBy = [];
    this.header = new HttpHeaders({ Authorization: `Bearer ${this.authService.employeeDetails.jwt}` });
    this.http.get<Sprint>(
      `http://localhost:8080/sprint/manager/active/${this.authService.employeeDetails.employeeProfile.employeeID}`,
      { headers: this.header }
    ).subscribe(data=>{
      this.activeSprint=data;
    })
  }
  closeSprint(sprintId:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/task/manager/close/sprint/${sprintId}/${this.authService.employeeDetails.employeeProfile.employeeID}`,{headers:this.header});
  }
  createSprint(sprintDetails:any):Observable<Sprint>{
    sprintDetails.sprintManager={employeeID: this.authService.employeeDetails.employeeProfile.employeeID};
    return this.http.post<Sprint>(`http://localhost:8080/sprint/manager/insert`,sprintDetails,{headers:this.header});
  }

  updateSprint(sprintId:number, sprintDetails:any):Observable<Sprint>{
    return this.http.put<Sprint>(`http://localhost:8080/sprint/manager/update/${sprintId}`,sprintDetails,{headers:this.header});
  }

  startSprint(sprintId:number):Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:8080/sprint/manager/start/${sprintId}/${this.authService.employeeDataService.employeeProfile?.employeeID}`,{headers:this.header});
  }

  deleteSprint(sprintId:number):Observable<boolean>{
    return this.http.delete<boolean>(`http://localhost:8080/sprint/manager/remove/${sprintId}`,{headers:this.header});
  }

  getSprintCreatedBy(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(
      `http://localhost:8080/sprint/all/manager/${this.authService.employeeDetails.employeeProfile.employeeID}`,
      { headers: this.header }
    );
  }
  getSprintById(sprintId: number) {
    return this.http.get<Sprint>(`http://localhost:8080/sprint/manager/get/${sprintId}`, { headers: this.header })
  }
  getActiveSprint(): Observable<Sprint> {
    return this.http.get<Sprint>(
      `http://localhost:8080/sprint/manager/active/${this.authService.employeeDetails.employeeProfile.employeeID}`,
      { headers: this.header }
    );
  }

  getSprintsByStatus(status: string) {
    //  console.log(this.sprintsCreatedBy);
    return this.sprintsCreatedBy.filter(obj => obj.status == status)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sprint } from 'src/app/model/Sprint';
import { AuthService } from '../authentication/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintDataService {
  header:HttpHeaders
  sprintsCreatedBy:Sprint[]
  constructor(public http:HttpClient, public authService:AuthService) { 
    this.sprintsCreatedBy=[];
    this.header= new HttpHeaders({ Authorization: `Bearer ${this.authService.employeeDetails.jwt}` });
  }
  getSprintCreatedBy(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(
      `http://localhost:8080/sprint/manager/${this.authService.employeeDetails.employeeProfile.employeeID}`,
      { headers: this.header }
    );
  }
   getSprintsByStatus(status:string){
    //  console.log(this.sprintsCreatedBy);
    return this.sprintsCreatedBy.filter(obj=>obj.status==status)
  }
}

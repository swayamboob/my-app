import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { Team } from '../model/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamsServiceService {
  public Teams: Team[]
  Header:HttpHeaders
  currentTeam:Team|null;
  
  constructor(public http: HttpClient, public authService: AuthService) {
    this.Teams = [];
    this.Header= new HttpHeaders({ Authorization: `Bearer ${this.authService.employeeDetails.jwt}` });
    this.currentTeam=null;
  }
  getTeams(){
    this.http.get<Team[]>(`http://localhost:8080/team/${this.authService.employeeDetails.employeeProfile.employeeID}`, { headers: this.Header }).subscribe(data=>{
      this.Teams=data;
    })
  }
  addTeam(team:Team){
    this.http.post<Team>("http://localhost:8080/team/insert", team, {headers:this.Header}).subscribe(data=>{
      this.getTeams();
      // console.log(data);
    })
    
    
  }

  ngOnInit(){
    this.Header = new HttpHeaders({ Authorization: `Bearer ${this.authService.employeeDetails.jwt}` })
  }
}

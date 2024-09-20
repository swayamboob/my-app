import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from 'src/app/model/Employee';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { TeamsServiceService } from 'src/app/services/teams-service.service';
import { Location } from '@angular/common';
import { Team } from 'src/app/model/Team';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  idleEmployees: Employee[];
  selectedMember: number
  currentTeamId!: number;
  constructor(public teamsService: TeamsServiceService, public http: HttpClient, public router: Router, public activatedRoute: ActivatedRoute) {
    this.idleEmployees = [];
    this.selectedMember = -1;
  }
  getIdleEmployee() {
    this.http.get<Employee[]>("http://localhost:8080/manager/employee/idle", { headers: this.teamsService.Header }).subscribe(data => {
      console.log(data);
      this.idleEmployees = data;
    })
  }
  addMember() {
    if (this.selectedMember == -1) {
      alert("No Member selected");
      return;
    }
    this.http.post<any>(`http://localhost:8080/manager/employee/update/team/${this.selectedMember}`, { "teamId": this.teamsService.currentTeam?.teamId }, { headers: this.teamsService.Header }).subscribe(data => {
      this.teamsService.currentTeam?.teamMembers?.push(data);
      this.getIdleEmployee();

    }, err => {
      console.log(err);
    })
  }

  deleteTeam() {
    this.http.delete(`http://localhost:8080/team/remove/${this.teamsService.currentTeam?.teamId}`, { headers: this.teamsService.Header }).subscribe(data => {
      this.router.navigate(["/teams"]);
    }, err => {
      alert("error occured");
    })
  }
loadTeam(){
  this.http.get<Team>(`http://localhost:8080/team/${this.currentTeamId}`, { headers: this.teamsService.Header }).subscribe(data => {
    this.teamsService.currentTeam = data;
    console.log("this is current Team"+data);
    this.getIdleEmployee();
  })
}
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.currentTeamId = params.get('teamId') ? Number(params.get('teamId')) : 0;
      this.loadTeam();
    })


  }
}


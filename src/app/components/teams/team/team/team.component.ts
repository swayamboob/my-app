import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from 'src/app/model/Employee';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { TeamsServiceService } from 'src/app/services/teams-service.service';
import { Location } from '@angular/common';
import { Team } from 'src/app/model/Team';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintDataService } from 'src/app/services/sprint/sprint-data.service';
import { Task } from 'src/app/model/Task';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  idleEmployees: Employee[];
  selectedMember: number
  currentTeamId!: number;
  currentTeam!:Team;
  teamTask!:Task[];
  completedTask!:Task[];
  inProgressTask!:Task[];
  assignedTask!:Task[];
  showedTaskList!:Task[];
  activeButton: string = 'allTasks'; 
  constructor(public teamsService: TeamsServiceService, public http: HttpClient, public router: Router, public activatedRoute: ActivatedRoute, public sprintDataService:SprintDataService) {
    this.idleEmployees = [];
    this.selectedMember = -1;
    this.completedTask=[]
    this.inProgressTask=[]
    this.assignedTask=[]

  }
  getIdleEmployee() {
    this.http.get<Employee[]>("http://localhost:8080/manager/employee/idle", { headers: this.teamsService.Header }).subscribe(data => {
      console.log(data);
      this.idleEmployees = data;
    })
  }
  addMember() {
    if (this.selectedMember == -1) {
      Swal.fire({
        title: "No Member Selected",
        text: "Check Once",
        icon: "warning",
        confirmButtonColor: "#3085d6"
      });
      return;
    }
    this.http.post<any>(`http://localhost:8080/manager/employee/update/team/${this.selectedMember}`, { "teamId": this.teamsService.currentTeam?.teamId }, { headers: this.teamsService.Header }).subscribe(data => {
      this.teamsService.currentTeam?.teamMembers?.push(data);
      this.getIdleEmployee();

    }, err => {
      console.log(err);
    })
  }
  setActiveButton(buttonName: string) {
    this.activeButton = buttonName;
  }
  deleteTeam() {
    this.http.delete(`http://localhost:8080/team/remove/${this.teamsService.currentTeam?.teamId}`, { headers: this.teamsService.Header }).subscribe(data => {
      this.router.navigate(["/teams"]);
      Swal.fire({
        title: "Deleted",
        text: `Team: ${this.teamsService.currentTeam?.teamName} Deleted`,
        icon: "success",
        confirmButtonColor: "#3085d6"
      });
    }, err => {
      alert("error occured");
    })
  }
 LoadAssignedTasks(){
    if(this.currentTeam){
      this.assignedTask= this.currentTeam.teamTask||[];
      this.completedTask= this.currentTeam.teamTask?.filter(obj=> obj.taskStatus=="Completed")||[];
      this.inProgressTask= this.currentTeam.teamTask?.filter(obj=> obj.taskStatus=="InProgress")||[];
      this.showedTaskList=this.assignedTask;
    }
  }
loadTeam(){
  this.http.get<Team>(`http://localhost:8080/team/${this.currentTeamId}`, { headers: this.teamsService.Header }).subscribe(data => {
    this.teamsService.currentTeam = data;
    this.currentTeam=data;
    this.LoadAssignedTasks();
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


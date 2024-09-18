import { Component } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { Team } from 'src/app/model/Team';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { TeamsServiceService } from 'src/app/services/teams-service.service';
import { TeamComponent } from './team/team/team.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  editable:boolean
  newTeam:string
  currentUrl:String
  constructor(public authService : AuthService, public teamsService:TeamsServiceService, private router:Router){
    this.editable=false
    this.newTeam='';
    this.currentUrl="";
  }
  addTeam(){
    if(this.newTeam==''){
      alert("enter team name");
      return;
    }
    this.teamsService.addTeam(new Team(this.newTeam,0,new Employee(this.authService.employeeDetails.employeeProfile.employeeID,"","","",""),null,null))
    this.editable=false;
    this.newTeam="";
  }
   ngOnInit(){
   this.teamsService.getTeams()
   this.currentUrl=this.router.url;
  }

}

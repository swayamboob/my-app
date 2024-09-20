import { Component } from '@angular/core';
import { Sprint } from 'src/app/model/Sprint';
import { Task } from 'src/app/model/Task';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { TaskDataService } from 'src/app/services/task/task-data.service';
import { TeamsServiceService } from 'src/app/services/teams-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  tasksData:Task[];
  constructor(public taskService:TaskDataService, public authService:AuthService, public teamDataService:TeamsServiceService){
  this.tasksData=[];
  }
  initNewTask(){
    this.taskService.currentSelectedTask=  null;
  }
  ngOnInit(){
    console.log(this.authService.employeeDataService);
    this.taskService.getTaskCreatedBy();
  }
}

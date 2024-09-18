import { Component } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { TaskDataService } from 'src/app/services/task/task-data.service';
import { TeamsServiceService } from 'src/app/services/teams-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  tasksData:Task[];
  constructor(public taskService:TaskDataService, public teamDataService:TeamsServiceService){
this.tasksData=[];
  }

  ngOnInit(){
    this.taskService.getTaskCreatedBy();
  }
}

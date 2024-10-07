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
   
  sortByDate(tasks: Task[], dir: number) {
    tasks.sort((a: Task, b: Task) => {
        // Check if taskDeadline is null, default to a far future or past date
        const dateA = a.taskDeadline ? new Date(a.taskDeadline) : new Date(0); // default to epoch if null
        const dateB = b.taskDeadline ? new Date(b.taskDeadline) : new Date(0); // default to epoch if null

        return dir === 1 ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
}

  ngOnInit(){
    // console.log(this.authService.employeeDataService);
    this.taskService.getTaskCreatedBy();
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from 'src/app/model/Sprint';
import { Task } from 'src/app/model/Task';
import { SprintDataService } from 'src/app/services/sprint/sprint-data.service';
import { TaskDataService } from 'src/app/services/task/task-data.service';

@Component({
  selector: 'app-progress-board',
  templateUrl: './progress-board.component.html',
  styleUrls: ['./progress-board.component.css']
})
export class ProgressBoardComponent {
  activeSprintId!:number
  activeSprint!:Sprint
  activeTasks!:Task[]
  inProgressTasks!:Task[]
  completedTasks!:Task[]
  NoActiveSprint!:boolean
  constructor(public http:HttpClient, public sprintDataService:SprintDataService,public taskDataService:TaskDataService){
  }
  loadData(){
    this.sprintDataService.getActiveSprint().subscribe(data=>{
      this.activeSprint=data;
      this.completedTasks= this.activeSprint.taskList?.filter(obj=>obj.taskStatus=='Completed')||[];
      this.activeTasks= this.activeSprint.taskList?.filter(obj=>obj.taskStatus=='ToDo')||[];
      this.inProgressTasks= this.activeSprint.taskList?.filter(obj=>obj.taskStatus=='InProgress')||[];
      this.NoActiveSprint=false;
      console.log(this.activeSprint.taskList?.filter(obj=>obj.taskStatus=='Completed'));

    },err=>{
      this.NoActiveSprint=true;
    })
  }
  updateTaskStatus(taskId:number, taskStatus:string){
    this.taskDataService.updateTaskStatus(taskId,taskStatus).subscribe(data=>{
      this.loadData();
    },err=>{
      console.log(err);
    })
  }
  ngOnInit(){
    this.loadData()
  }
}

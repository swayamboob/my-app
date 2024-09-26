import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Sprint } from 'src/app/model/Sprint';
import { Task } from 'src/app/model/Task';
import { SprintDataService } from 'src/app/services/sprint/sprint-data.service';
import { TaskDataService } from 'src/app/services/task/task-data.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent {
  backlogs!:Task[];
  availableSprints!:Sprint[];
  constructor(public http:HttpClient,public taskDataService:TaskDataService,public sprintDataService:SprintDataService){

  }
  loadData(){
    this.taskDataService.getBacklogs().subscribe(data=>{
      console.log("task data");
      this.backlogs=data;
    })
    this.sprintDataService.getSprintCreatedBy().subscribe(data=>{
      this.availableSprints= data.filter(obj=>obj.status=="active" ||obj.status=="scheduled" );
    })
  }
  addToSprint(taskId:number, sprintId:number){
    this.taskDataService.addTaskObservable(new Task(taskId,null,null,null,null,null,new Sprint(sprintId,null,null,null,null,null,null),null,null,null)).subscribe(data=>{
      this.loadData();
    })
  }
  ngOnInit(){
    this.loadData();
  }

}

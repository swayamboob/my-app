import { Component } from '@angular/core';
import { Sprint } from 'src/app/model/Sprint';
import { SprintDataService } from 'src/app/services/sprint/sprint-data.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsComponent {
  selectedList:string[]
  showedList:Sprint[]
  selectedCount:number
  constructor(public sprintDataService:SprintDataService){
    this.selectedList=["active","completed","scheduled"];
    this.showedList=[];
    
    this.selectedCount=0;
  }

  closeSprint(sprintId:number){
    this.sprintDataService.closeSprint(sprintId).subscribe(data=>{
      alert(data);
      this.sprintDataService.getSprintCreatedBy().subscribe(data=>{
        this.sprintDataService.sprintsCreatedBy=data;
        this.selectedCount=0;
        this.onLoad(0);
      })
    }, err=>{
      alert(err);
      console.log(err);
    })
  }
  startSprint(sprintId:number){
    this.sprintDataService.startSprint(sprintId).subscribe(data=>{
      if(data){
        alert("Started");
        this.sprintDataService.getSprintCreatedBy().subscribe(data=>{
          this.sprintDataService.sprintsCreatedBy=data;
          this.selectedCount=0;
          this.onLoad(0);
        })
      }else{
        alert("Not Started: at Time one Sprint will start");
      }
    }, err=>{
      console.log(err);
    })
  }
  onLoad(selected:number){
    this.selectedCount=selected;
    this.showedList= this.sprintDataService.getSprintsByStatus(this.selectedList[selected]);
  }
   ngOnInit(){
        this.sprintDataService.getSprintCreatedBy().subscribe(data=>{
          this.sprintDataService.sprintsCreatedBy=data;
          this.selectedCount=0;
          this.onLoad(0);
        })

  }
}

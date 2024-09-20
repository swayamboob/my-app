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
  constructor(public sprintDataService:SprintDataService){
    this.selectedList=["active","completed","scheduled"];
    this.showedList=[];
    this.sprintDataService.getSprintCreatedBy();
  }
  onLoad(selected:number){
    this.showedList= this.sprintDataService.getSprintsByStatus(this.selectedList[selected]);
  }
   ngOnInit(){
        this.sprintDataService.getSprintCreatedBy().subscribe(data=>{
          this.sprintDataService.sprintsCreatedBy=data;
          this.onLoad(0);
          console.log("called");
        })

  }
}

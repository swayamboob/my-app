import { Component } from '@angular/core';
import { Sprint } from 'src/app/model/Sprint';
import { SprintDataService } from 'src/app/services/sprint/sprint-data.service';
import Swal from 'sweetalert2';

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
      Swal.fire({
        title: "Closed",
        text: `Sprint${sprintId} Closed`,
        icon: "success",
        confirmButtonColor: "#3085d6"
      });
      this.sprintDataService.getSprintCreatedBy().subscribe(data=>{
        this.sprintDataService.sprintsCreatedBy=data;
        this.selectedCount=0;
        this.onLoad(0);
      })
    }, err=>{
      Swal.fire({
        title: "Error",
        text: `${err}`,
        icon: "error",
        confirmButtonColor: "#3085d6"
      });
    })
  }
  startSprint(sprintId:number){
    this.sprintDataService.startSprint(sprintId).subscribe(data=>{
      if(data){
        Swal.fire({
          title: "Activated",
          text: "Sprint Started",
          icon: "success",
          confirmButtonColor: "#3085d6"
        });
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

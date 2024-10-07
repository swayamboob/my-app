import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Sprint } from 'src/app/model/Sprint';
import { Task } from 'src/app/model/Task';
import { SprintDataService } from 'src/app/services/sprint/sprint-data.service';
import { TaskDataService } from 'src/app/services/task/task-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sprint-edit',
  templateUrl: './sprint-edit.component.html',
  styleUrls: ['./sprint-edit.component.css'],
})
export class SprintEditComponent {
  currentSprintId!: number;
  currentSprint!: Sprint;
  sprintForm!: FormGroup;
   // Reactive form group
   availableTask:Task[]

  constructor(
    public sprintDataService: SprintDataService,
    public activatedRouter: ActivatedRoute,
    public taskDataService:TaskDataService,
    public router:Router,
    public fb: FormBuilder
  ) {
    this.availableTask=[];
  }
  saveSprint(sprintId:number){
    
    this.sprintForm.value.taskList=this.currentSprint.taskList;
    this.sprintDataService.updateSprint(sprintId,this.sprintForm.value).subscribe(data=>{
      this.currentSprint=data;
      this.currentSprint.taskList=this.sprintForm.value.taskList;
      Swal.fire({
        title: "Saved",
        text: "Sprint Updated",
        icon: "success",
        confirmButtonColor: "#3085d6"
      });
    },err=>{
      alert("Error occured");
      console.log(err);
    })
  }
  deleteSprint(sprintId:number){
    this.sprintDataService.deleteSprint(sprintId).subscribe(data=>{
      if(data==true){
        Swal.fire({
          title: "Deleted",
          text: "Sprint Deleted",
          icon: "success",
          confirmButtonColor: "#3085d6"
        });
        this.router.navigate(["/sprints"])
      }
    })
  }
 
  LoadData(){
    this.sprintDataService.getSprintById(this.currentSprintId).subscribe(
      (data) => {
        this.currentSprint = data;
        // Patch the form with the current sprint data
        this.sprintForm.patchValue({
          sprintId: this.currentSprint.sprintId,
          sprintName: this.currentSprint.sprintName,
          status: this.currentSprint.status,
          sprintGoal: this.currentSprint.sprintGoal,
          sprintStart: this.currentSprint.sprintStart,
          sprintEnd: this.currentSprint.sprintEnd,
        });
      }
    )
    this.taskDataService.getAllTask().subscribe(data=>{
      this.availableTask=data.filter(obj=>obj.taskSprint==null);
    })
  }
  addToSprint(taskId:number,sprintId:number){
    this.taskDataService.addTaskObservable(new Task(taskId,null,null,null,null,null,new Sprint(sprintId,null,null,null,null,null,null),null,null,null)).subscribe(data=>{
      this.LoadData();
    });
  }
  // Optionally, handle form submission
  onSubmit() {
    if (this.sprintForm.valid) {
      const updatedSprint = this.sprintForm.value;
      
      // console.log(updatedSprint);
      // Send the updated sprint data to the service
    }
  }

   ngOnInit() {
    // Initialize the reactive form with form controls
    this.sprintForm = this.fb.group({
      sprintId: [''],
      sprintName: [''],
      status: [''],
      sprintGoal: [''],
      sprintStart: [''],
      sprintEnd: [''],
    });

    // Get sprint data from the service and patch it to the form
    this.activatedRouter.paramMap.subscribe((params) => {
      this.currentSprintId = Number(params.get('sprintId'));
      this.LoadData();
    });
    
  }
  
}

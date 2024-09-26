import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { SprintDataService } from 'src/app/services/sprint/sprint-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.css']
})
export class NewSprintComponent {
  sprintForm!:FormGroup
  today!:string
  constructor(public fb:FormBuilder,public sprintDataService:SprintDataService,public router:Router){
    this.sprintForm = this.fb.group({
      sprintName: [''],
      status: [''],
      sprintGoal: [''],
      sprintStart: [''],
      sprintEnd: [''],
    });
    this.today = new Date().toISOString().split('T')[0]; 
  }
  createSprint(){
    this.sprintDataService.createSprint(this.sprintForm.value).subscribe(data=>{
      this.router.navigate([`/sprint/edit/${data.sprintId}`])
      Swal.fire({
        title: "Created",
        text: "Sprint added",
        icon: "success",
        confirmButtonColor: "#3085d6"
      });
    }, err=>{
      alert("not added error");
      console.log(err);
    });
  }

}

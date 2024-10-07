import { Component } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { EmployeeDataService } from 'src/app/services/employee-service/employee-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-assigned-tasks',
  templateUrl: './employee-assigned-tasks.component.html',
  styleUrls: ['./employee-assigned-tasks.component.css']
})
export class EmployeeAssignedTasksComponent {
  assignedToMe:Task[];
  constructor(public employeeDataService:EmployeeDataService){

    this.assignedToMe=[];
  }
  ngOnInit(){
    if(this.employeeDataService.employeeProfile){
      this.employeeDataService.getTaskAssignedToMe(this.employeeDataService.employeeProfile?.employeeID).subscribe(data=>{
        this.assignedToMe=data;
        console.log(this.assignedToMe);
          },err=>{
            this.assignedToMe=[];
            Swal.fire({
              title:"Error Occured",
              text:"Try again",
              icon:"error",
            })
          })
    }
  }
}

import { Component } from '@angular/core';
import { EmployeeDataService } from 'src/app/services/employee-service/employee-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public employeeDataService:EmployeeDataService){
    
  }
}

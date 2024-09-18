import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/Employee';
import { Task } from 'src/app/model/Task';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { TaskDataService } from 'src/app/services/task/task-data.service';
import { TeamsServiceService } from 'src/app/services/teams-service.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent {
  taskForm: FormGroup
  constructor(public authService: AuthService, public taskDataService: TaskDataService, public teamDataService: TeamsServiceService, public fb: FormBuilder, public router:Router) {
    this.taskForm = this.fb.group({
      taskId: [{ value: taskDataService.currentSelectedTask?taskDataService.currentSelectedTask.taskId:"-1", disabled: true }],
      taskName: [taskDataService.currentSelectedTask ? taskDataService.currentSelectedTask.taskName : ''],
      taskDetails: [taskDataService.currentSelectedTask ? taskDataService.currentSelectedTask.taskDetails : ''],
      taskTeam: [taskDataService.currentSelectedTask ? taskDataService.currentSelectedTask.taskTeam?.teamId : ''],
      taskAssigned: [taskDataService.currentSelectedTask ? taskDataService.currentSelectedTask.taskAssigned : ''],
      taskCreatedBy: [{ value: taskDataService.currentSelectedTask?taskDataService.currentSelectedTask.taskCreatedBy?.employeeID:this.authService.employeeDetails.employeeProfile.employeeID, disabled: true }],
      taskStatus: [taskDataService.currentSelectedTask ? taskDataService.currentSelectedTask.taskStatus : 'ToDo'],
      taskDeadline: [taskDataService.currentSelectedTask ? taskDataService.currentSelectedTask.taskDeadline : ''],
      taskStarted: [{ value: taskDataService.currentSelectedTask?taskDataService.currentSelectedTask.taskStarted:new Date().toISOString().split('T')[0], disabled: true }],
    });
  }
  onTaskSubmit() {
    console.log(this.taskForm);
    const currentTaskAssigned = this.taskForm.get('taskAssigned')?.value;
    const currentTaskCreatedBy = this.taskForm.get('taskCreatedBy')?.value;
    const currentTaskTeam = this.taskForm.get('taskTeam')?.value;
    this.taskForm.patchValue({
      taskAssigned:
        currentTaskAssigned ? {
          employeeID: this.taskForm.get("taskAssigned")?.value
        } : null,
      taskCreatedBy: currentTaskCreatedBy ?
        {
          employeeID: this.taskForm.get("taskCreatedBy")?.value
        } : null,
      taskTeam: currentTaskTeam ? {
        teamId: this.taskForm.get("taskTeam")?.value
      } : null
    })
    this.taskDataService.addTask(this.taskForm.getRawValue());
  }
  ngOnInit() {
    this.teamDataService.getTeams();
  }
}

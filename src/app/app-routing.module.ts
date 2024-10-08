import { Component, inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/authentication/auth.service';
import { BacklogComponent } from './components/backlog/backlog.component';
import { ProjectListComponent } from './components/Project/project-list/project-list.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProgressBoardComponent } from './components/progress-board/progress-board.component';
import { TeamComponent } from './components/teams/team/team/team.component';
import { TaskComponent } from './components/task/task.component';
import { ViewTaskComponent } from './components/viewTask/view-task/view-task.component';
import { SprintsComponent } from './components/sprint/sprintList/sprints/sprints.component';
import { SprintEditComponent } from './components/sprint/sprint-edit/sprint-edit/sprint-edit.component';
import { NewSprintComponent } from './components/sprint/new-sprint/new-sprint.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { EmployeeSprintComponent } from './components/employeeRoutes/employee-sprint/employee-sprint.component';
import { EmployeeAssignedTasksComponent } from './components/employeeRoutes/employee-assigned-tasks/employee-assigned-tasks.component';



export const guard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  // some auth logic
  return inject(AuthService).canManager()
   
}

export const userGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  // some auth logic
  return inject(AuthService).canUser()
   
}


const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:'',
    component:WelcomePageComponent
  },
  {
    path:"timeline",
    component:TimelineComponent,
    canActivate:[guard]
  }
  ,
  {
    path:"login",
    component:SignInComponent
  },
  {
    path:"signup",
    component: SignUpComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[guard]
  },
  {path:"tasks",
    component:TaskComponent,
    canActivate:[guard]
  },
  {
    path:"backlog",
    component:BacklogComponent,
    canActivate:[guard]
  }
  ,
  {path:"welcome",
    component:WelcomePageComponent,
  },
  {
    path:"viewtask",
    component:ViewTaskComponent,
    canActivate:[guard]
  },
  {
    path:"mysprint",
    component:EmployeeSprintComponent,
    canActivate:[userGuard]
  }
  ,
  {path:"sprints",
    component:SprintsComponent,
    canActivate:[guard]
  },
  {
    path:"assigned",
    component:EmployeeAssignedTasksComponent,
    canActivate:[userGuard]
  },
  {
    path:"teams",
    component:TeamsComponent,
    canActivate:[guard]
  },
  {path:"progress",
    component:ProgressBoardComponent,
    canActivate:[guard]
  },
  {
    path:"profile",
    component:ProfileComponent,
    canActivate:[userGuard]
  },
  {
    path:"sprint/new",
    component:NewSprintComponent,
    canActivate:[guard]
  },
  {
    path:"team/:teamId",
    component:TeamComponent,
    canActivate:[guard]
  },
  {
    path:"sprint/edit/:sprintId",
    component:SprintEditComponent,
    canActivate:[guard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}

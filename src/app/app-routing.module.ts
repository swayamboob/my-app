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



export const guard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  // some auth logic
  return inject(AuthService).canActivate()
   
}


const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
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
    path:"viewtask",
    component:ViewTaskComponent,
    canActivate:[guard]
  }
  ,
  {path:"projects",
    component:ProjectListComponent,
    canActivate:[guard]
  },
  {
    path:"assigned",
    component:ProfileComponent,
    canActivate:[guard]
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
    canActivate:[guard]
  },
  {
    path:"team",
    component:TeamComponent,
    canActivate:[guard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}

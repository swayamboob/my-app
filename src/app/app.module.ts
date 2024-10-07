import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleChartsModule } from 'angular-google-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProgressBoardComponent } from './components/progress-board/progress-board.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TeamsComponent } from './components/teams/teams.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http' 
import { AuthService } from './services/authentication/auth.service';
import { MainDisplayComponent } from './main-display/main-display.component';
import { ProjectListComponent } from './components/Project/project-list/project-list.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { TeamComponent } from './components/teams/team/team/team.component';
import { TaskComponent } from './components/task/task.component';
import { EmployeeDataService } from './services/employee-service/employee-data.service';
import { TeamsServiceService } from './services/teams-service.service';
import { TaskDataService } from './services/task/task-data.service';
import { ViewTaskComponent } from './components/viewTask/view-task/view-task.component';
import { SprintsComponent } from './components/sprint/sprintList/sprints/sprints.component';
import { SprintViewComponent } from './components/sprint/sprint-view/sprint-view.component';
import { SprintEditComponent } from './components/sprint/sprint-edit/sprint-edit/sprint-edit.component';
import { NewSprintComponent } from './components/sprint/new-sprint/new-sprint.component';
import { SprintProgressChartComponent } from './components/charts/sprint-progress-chart/sprint-progress-chart.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { EmployeeToolbarComponent } from './components/employee-toolbar/employee-toolbar.component';
import { EmployeeSprintComponent } from './components/employeeRoutes/employee-sprint/employee-sprint.component';
import { EmployeeAssignedTasksComponent } from './components/employeeRoutes/employee-assigned-tasks/employee-assigned-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignInComponent,
    HomeComponent,
    SignUpComponent,
    BacklogComponent,
    TimelineComponent,
    ProgressBoardComponent,
    DashboardComponent,
    TeamsComponent,
    MainDisplayComponent,
    ProjectListComponent,
    ProfileComponent,
    TeamComponent,
    TaskComponent,
    ViewTaskComponent,
    SprintsComponent,
    SprintViewComponent,
    SprintEditComponent,
    NewSprintComponent,
    SprintProgressChartComponent,
    WelcomePageComponent,
    EmployeeToolbarComponent,
    EmployeeSprintComponent,
    EmployeeAssignedTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    GoogleChartsModule,
  ],
  providers: [AuthService,EmployeeDataService,TeamsServiceService,TaskDataService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

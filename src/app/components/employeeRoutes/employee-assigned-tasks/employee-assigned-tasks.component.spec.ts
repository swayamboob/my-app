import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAssignedTasksComponent } from './employee-assigned-tasks.component';

describe('EmployeeAssignedTasksComponent', () => {
  let component: EmployeeAssignedTasksComponent;
  let fixture: ComponentFixture<EmployeeAssignedTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeAssignedTasksComponent]
    });
    fixture = TestBed.createComponent(EmployeeAssignedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSprintComponent } from './employee-sprint.component';

describe('EmployeeSprintComponent', () => {
  let component: EmployeeSprintComponent;
  let fixture: ComponentFixture<EmployeeSprintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeSprintComponent]
    });
    fixture = TestBed.createComponent(EmployeeSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

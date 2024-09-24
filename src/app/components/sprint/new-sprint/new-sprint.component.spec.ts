import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSprintComponent } from './new-sprint.component';

describe('NewSprintComponent', () => {
  let component: NewSprintComponent;
  let fixture: ComponentFixture<NewSprintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSprintComponent]
    });
    fixture = TestBed.createComponent(NewSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

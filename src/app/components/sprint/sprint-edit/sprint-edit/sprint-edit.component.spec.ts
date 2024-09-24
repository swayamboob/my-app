import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintEditComponent } from './sprint-edit.component';

describe('SprintEditComponent', () => {
  let component: SprintEditComponent;
  let fixture: ComponentFixture<SprintEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SprintEditComponent]
    });
    fixture = TestBed.createComponent(SprintEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

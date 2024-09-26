import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintProgressChartComponent } from './sprint-progress-chart.component';

describe('SprintProgressChartComponent', () => {
  let component: SprintProgressChartComponent;
  let fixture: ComponentFixture<SprintProgressChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SprintProgressChartComponent]
    });
    fixture = TestBed.createComponent(SprintProgressChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

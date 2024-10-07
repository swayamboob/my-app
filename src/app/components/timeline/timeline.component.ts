import { Component, HostListener, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { Sprint } from 'src/app/model/Sprint';
import { SprintDataService } from 'src/app/services/sprint/sprint-data.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  chartType = ChartType.Timeline;
  chartData: any[] = [];
  chartOptions: any = {
    timeline: {
      showRowLabels: true,
      rowLabelStyle: { fontSize: 14 },  // Adjust row label font size
      barLabelStyle: { fontSize: 14 },   // Adjust bar label font size
    },
    height: 200,  // Initial height
    width: '100%',
    hAxis: {
      minValue: null,  // Will be set dynamically
      maxValue: null   // Will be set dynamically
    },
    colors: ['skyblue'] // Default color
  };

  constructor(public sprintDataService: SprintDataService) { }

  ngOnInit(): void {
    this.sprintDataService.getSprintCreatedBy().subscribe(data => {
      this.loadSprintData(data);
      this.centerTimelineAroundToday();
      this.setChartSize();  // Set initial chart size
    });
  }

  loadSprintData(data: Sprint[]): void {
    this.chartData = []; // Clear existing data
    for (const sprint of data) {
      if (sprint.sprintStart && sprint.sprintEnd) {
        const startDate = new Date(sprint.sprintStart);
        const endDate = new Date(sprint.sprintEnd);
        const color = sprint.status === 'active' ? 'green' : 'skyblue'; // Color based on status
        const lineWidth = sprint.status === 'active' ? 4 : 2; // Outline for active
        this.chartData.push([
          'Sprint',  // Row label
          sprint.sprintName,  // Bar label
          startDate,  // Start date
          endDate,     // End date
        ]);
      }
    }

    // Set colors based on sprint status
    data = data.sort(function (a, b) {
      if (a.sprintStart && b.sprintStart) {
        const a_date = new Date(a.sprintStart).getTime(); // Get the time value for comparison
        const b_date = new Date(b.sprintStart).getTime();
        return a_date - b_date;
      }
      return 0; // Keep the order unchanged if dates are missing
    });
    
    this.chartOptions.colors = data.map(sprint => sprint.status === 'active' ? 'green' : 'skyblue');
    this.chartOptions = { ...this.chartOptions };
  }

  centerTimelineAroundToday(): void {
    const today = new Date();

    // Set the timeline to span one month (30 days) with today's date in the middle
    const startDate = new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000); // 15 days before today
    const endDate = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days after today

    this.chartOptions.hAxis.minValue = startDate;
    this.chartOptions.hAxis.maxValue = endDate;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setChartSize();  // Recalculate chart size on window resize
  }

  private setChartSize(): void {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Set the chart height dynamically based on screen height (30% of viewport height)
    this.chartOptions.height = windowHeight * 0.3;

    // Adjust font sizes for row and bar labels dynamically
    const fontSize = windowWidth < 768 ? 12 : 16;
    this.chartOptions.timeline.rowLabelStyle.fontSize = fontSize;
    this.chartOptions.timeline.barLabelStyle.fontSize = fontSize;
  }
}

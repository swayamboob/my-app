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
      rowLabelStyle: { fontSize: 14 },  // Adjust the row label font size dynamically
      barLabelStyle: { fontSize: 14 },  // Adjust the bar label font size dynamically
    },
    height: 200,  // Default height
    width: '100%',
    hAxis: {
      minValue: null,  // Will be set dynamically
      maxValue: null   // Will be set dynamically
    },
    colors:['skyblue']
  };

  constructor(public sprintDataService: SprintDataService) {}

  ngOnInit(): void {
    this.sprintDataService.getSprintCreatedBy().subscribe(data => {
      this.loadSprintData(data);
      this.centerTimelineAroundToday();
      this.setChartSize();  // Set initial chart size
    });
  }

  loadSprintData(data: Sprint[]): void {
    this.chartData = []; // Clear existing data

    for (let i = 0; i < data.length; i++) {
      const sprint = data[i];

      if (sprint.sprintStart && sprint.sprintEnd) {
        const startDate = new Date(sprint.sprintStart);
        const endDate = new Date(sprint.sprintEnd);
        this.chartData.push([
          'Sprint',  // Row label
          sprint.sprintName,  // Bar label
          startDate,  // Start date
          endDate     // End date
        ]);
      }
    }

    this.chartOptions.colors = data.map(sprint => sprint.status === 'active' ? 'green' : 'skyblue');
    // console.log(colors)
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

    // Set the chart height dynamically based on screen height (50% of viewport height)
    this.chartOptions.height = windowHeight * 0.3;

    // Adjust font sizes for row and bar labels dynamically
    const fontSize = windowWidth < 768 ? 12 : 16;
    this.chartOptions.timeline.rowLabelStyle.fontSize = fontSize;
    this.chartOptions.timeline.barLabelStyle.fontSize = fontSize;
  }
}

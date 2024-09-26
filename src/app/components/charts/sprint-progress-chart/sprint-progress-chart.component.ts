import { Component, OnInit } from '@angular/core';
import { Chart, registerables, ChartType } from 'chart.js';
import { SprintDataService } from 'src/app/services/sprint/sprint-data.service';

Chart.register(...registerables); // Register necessary components

@Component({
  selector: 'app-sprint-progress-chart',
  templateUrl: './sprint-progress-chart.component.html',
  styleUrls: ['./sprint-progress-chart.component.css']
})
export class SprintProgressChartComponent implements OnInit {
  public chart: Chart | undefined;
  constructor(public sprintDataService:SprintDataService){

  }
  ngOnInit(): void {
    this.sprintDataService.getActiveSprint().subscribe(data=>{
      var arr=[];
      arr.push(data.taskList?.filter(obj=>obj.taskStatus=='Completed').length);
      arr.push(data.taskList?.filter(obj=>obj.taskStatus=='ToDo').length);
      arr.push(data.taskList?.filter(obj=>obj.taskStatus=='InProgress').length);
      this.createChart(arr);
    })
   
  }

  private createChart(arrData:any[]): void {
    const ctx = document.getElementById('sprintProgressChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'doughnut' as ChartType, // Type assertion for TypeScript
      data: {
        labels: ['Completed', 'To Do', 'In Progress'],
        datasets: [{
          label: 'Sprint Task Progress',
          data: arrData, // Sample data for tasks
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)', // Color for Completed
            'rgba(255, 206, 86, 0.6)', // Color for In Progress
            'rgba(255, 99, 132, 0.6)'   // Color for Pending
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sprint Task Progress'
          }
        }
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'team-utilisation-monitor-comp-graph-company-utilization',
  templateUrl: './comp-graph-company-utilization.component.html',
  styleUrls: ['./comp-graph-company-utilization.component.scss']
})

export class CompGraphCompanyUtilizationComponent implements OnInit {  
  constructor() { }

  ngOnInit(): void {
    console.log();
    const myChart = new Chart("HomeChart", {
      type: 'bar',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
              label: 'Utilization %',
              data: [40, 45, 53, 68, 77, 85, 93],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(1, 156, 49, 0.5)',
                  'rgba(1, 156, 49, 0.5)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(1, 156, 49, 1)',
                  'rgba(1, 156, 49, 1)'
              ],
              borderWidth: 1.5
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

}
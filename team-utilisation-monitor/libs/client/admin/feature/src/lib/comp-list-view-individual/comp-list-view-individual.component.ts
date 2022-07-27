import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'team-utilisation-monitor-comp-list-view-individual',
  templateUrl: './comp-list-view-individual.component.html',
  styleUrls: ['./comp-list-view-individual.component.scss'],
})
export class CompListViewIndividualComponent implements OnInit {
  //constructor() {}

  @Input() Individual!: { Name: string,Surname: string,Email:string ,utilisation:number};

  ngOnInit(): void {
    console.log();
    const myChart = new Chart("IndivChart", {
      type: 'bar',
      data: {
          labels: ["Util 1","Util 2","Util 3"],
          datasets: [
            {
              label: "Project 1",
              data: [this.Individual.utilisation],
              backgroundColor: 'rgba(1, 156, 49, 0.5)',
            },
            {
              label: "Project 2",
              data: [30]
            },
            {
              label: "unutilized",
              data: [60]
            }
          ]
      },
      plugins: [ChartDataLabels],
      options: {
          responsive:true,
          indexAxis:'y',
          scales: {
                y: {
                    display:false,
                    beginAtZero: true,
                    stacked: true,
                },
                x: {
                  display:false,
                  stacked: true,
                },

            },
            plugins:{
              datalabels: {
                formatter: function(value, context) {
                  return context.chart.data.datasets[context.datasetIndex].label + "\n" + context.chart.data.datasets[context.datasetIndex].data + "%";
                },
              },
              legend:{
                display:false
              },
              tooltip:{
                enabled:false
              }
            }
        }
    });
  }

}

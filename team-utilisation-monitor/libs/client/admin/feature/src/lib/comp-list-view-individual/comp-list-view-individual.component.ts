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

  @Input() Individual!: { Name: string,Surname: string,Email:string ,Utilization:number};

  ngOnInit(): void {
    const ChartName = this.Individual.Email;
    const Utiliz = this.Individual.Utilization;

    //changes the ID of the div to allow multiple graphs
    const thing = document.getElementById("ChartUtilization");

    if(thing != null){
      thing.id = ChartName;
    }
    let BarData = {
      labels: ["Util 1"],
      datasets: [
        {
          label: "Utilized",
          data: [Utiliz],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192,0.6)',
          borderWidth: 3
        },
        {
          label: "Un-Utilized",
          data: [100-Utiliz],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132,0.6)',
          borderWidth: 3
        }
      ]
    }

    //checks of the user has utilization and outputs no utilization data availible
    if(Utiliz == 0){
      BarData = {
        labels: ["Util 1"],
        datasets: [
          {
            label: "No Utilization Data Availible",
            data: [100],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192,0.6)',
            borderWidth: 3
          }
        ]
      }
    }
      else if(Utiliz == 100)
      {
      BarData = {
        labels: ["Util 1"],
        datasets: [
          {
            label: "Fully Utilized!",
            data: [100],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192,0.6)',
            borderWidth: 3
          }
        ]
      }
    }
    else if(Utiliz > 100)
    {
      BarData = {
        labels: ["Util 1"],
        datasets: [
          {
            label: "Over Utilized!",
            data: [100],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192,0.6)',
            borderWidth: 3
          }
        ]
      }
    }

    console.log(ChartName);
    console.log(Utiliz);

    const conf:any = {
      type: 'bar',
      data: BarData,
        plugins: [ChartDataLabels],
        options: {
            responsive:true,
            maintainAspectRatio: false,
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
                  formatter: function(value: any, context : any) {
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
      };

    const myChart = new Chart(ChartName, conf);
  }
}
function floor(arg0: number): any {
  throw new Error('Function not implemented.');
}


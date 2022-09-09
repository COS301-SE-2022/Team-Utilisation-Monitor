/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-types */
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AdminService } from '../Admin.service';

@Component({
  selector: 'team-utilisation-monitor-comp-graph-company-utilization',
  templateUrl: './comp-graph-company-utilization.component.html',
  styleUrls: ['./comp-graph-company-utilization.component.scss']
})


export class CompGraphCompanyUtilizationComponent implements OnInit {

  constructor(private service:AdminService) { }


  //gets the (nrOfMonths) of months and returns it as a String array
  setDates(nrOfMonths:number){
    const currDate = new Date();
    const outArray:Array<String> = [];
    for (let index = 0; index < nrOfMonths; index++) {
        currDate.setDate(1);
        const month = currDate.toLocaleString('default', { month: 'long' });
        outArray.push(month);
        currDate.setMonth(currDate.getMonth()-1);
    }
    return outArray.reverse();
  }

  ngOnInit(): void {
    const myArr:Array<String> = this.setDates(9);
    let MyMonthsData:number[]=[]
    console.log();
    this.service.GetCompanyUtilization().subscribe(Data=>
      {
        MyMonthsData.push(Data.data.GetCompanyUtilization.JAN)
        MyMonthsData.push(Data.data.GetCompanyUtilization.FEB)
        MyMonthsData.push(Data.data.GetCompanyUtilization.MAR)
        MyMonthsData.push(Data.data.GetCompanyUtilization.APR)
        MyMonthsData.push(Data.data.GetCompanyUtilization.MAY)
        MyMonthsData.push(Data.data.GetCompanyUtilization.JUN)
        MyMonthsData.push(Data.data.GetCompanyUtilization.JUL)
        MyMonthsData.push(Data.data.GetCompanyUtilization.AUG)
        MyMonthsData.push(Data.data.GetCompanyUtilization.SEP)

        const myChart = new Chart("HomeChart", {
          type: 'bar',
          data: {
              labels: myArr,
              datasets: [{
                  label: 'Utilization %',
                  data: MyMonthsData,//[40, 45, 53, 68, 77, 85, 93],
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
    )

  }

}

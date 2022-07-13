import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-weekly-utilisation-graph',
  templateUrl: './weekly-utilisation-graph.component.html',
  styleUrls: ['./weekly-utilisation-graph.component.scss']
})
export class WeeklyUtilisationGraphComponent implements OnInit {

  //constructor() { }
  public lineChartLabels = ['Week 1', 'Week2', 'Week 3', 'Week 4'];
  public lineChartLegend = true;

  public lineChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Weekly Utilization'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Hours Spent'}
  ];

  ngOnInit(): void {
    console.log();
  }

}

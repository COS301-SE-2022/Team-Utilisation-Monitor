import { Component, OnInit } from '@angular/core';
//import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'team-utilisation-monitor-utilization-graph',
  templateUrl: './utilization-graph.component.html',
  styleUrls: ['./utilization-graph.component.scss']
})
export class UtilizationGraphComponent implements OnInit {

  public lineChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public lineChartLegend = true;

  public lineChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Utilization'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Hours'}
  ];
  ngOnInit() {
    console.log();
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-individual-home-page',
  templateUrl: './individual-home-page.component.html',
  styleUrls: ['./individual-home-page.component.scss']
})
export class IndividualHomePageComponent implements OnInit {


  public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Utilization'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Hours'}
  ];

  events: string[] = [];
  opened = true;
  panelOpenState=false;
  boolshow = true;
  nrOfEmployees = 108;
  utilizationPersentage = 80;
  nrOfOpenProjects = 40;
  nrOfClosedProjects = 50;
  nrOfTeams = 20;
  teams: string[]=['Team A', 'Team B','Team C','Team D','Team D','Team D','Team D','Team D','Team E'];
  projects: string[]=['Project1','Project2','Project3','Project4','Project4','Project4','Project4','Project5'];

  ngOnInit(): void {
    console.log();
  }

  showInfo(link: string) {
    console.log()
  }
}

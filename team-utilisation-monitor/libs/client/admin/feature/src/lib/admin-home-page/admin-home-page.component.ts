import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss'],
})
export class AdminHomePageComponent implements OnInit {
  //constructor() {}

  //information cards values, calculate them and update the variables to link it to the front end
  boolshow = true;
  nrOfEmployees = 108;
  utilizationPersentage = 80;
  nrOfOpenProjects = 40;
  nrOfClosedProjects = 50;
  nrOfTeams = 20;

  ngOnInit(): void {
    console.log();
  }
}

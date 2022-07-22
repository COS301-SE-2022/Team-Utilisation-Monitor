import { Component, OnInit } from '@angular/core';
import {link} from "fs";

@Component({
  selector: 'team-utilisation-monitor-individual-home-page',
  templateUrl: './individual-home-page.component.html',
  styleUrls: ['./individual-home-page.component.scss']
})
export class IndividualHomePageComponent implements OnInit {


  events: string[] = [];
  opened = true;
  panelOpenState=false;
  boolshow = true;
  utilizationPercentage = 30;
  nrOfOpenProjects = 40;       //this will be counted from the array ofcours
  nrOfClosedProjects = 50;
  nrOfTeams = 20;     //and this
  nrOfSkills= 7;
  teams: string[]=['Team A', 'Team B','Team C','Team D','Team D','Team D','Team D','Team E'];
  projects: string[]=['Project1','Project2','Project3','Project4','Project4','Project4','Project4','Project5'];

  ngOnInit(): void {
    console.log();
  }

  showInfo(link: string) {
    console.log()
  }

}

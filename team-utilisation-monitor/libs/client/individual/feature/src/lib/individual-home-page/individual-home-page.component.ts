import { Component, OnInit } from '@angular/core';

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
  myFunction() {
    const element = document.getElementById("monthly");
    const el= document.getElementById("weekly");
    if(element && el) {

      if (element.style.visibility === "hidden") {
        element.classList.toggle("monthly");
        el.classList.toggle("mystyle");
      } else {

        element.classList.toggle("mystyle");
        el.classList.toggle("monthly");
      }

    }
  }

  myFunction1() {
    const element = document.getElementById("weekly");
    const el=document.getElementById("monthly");

    if(element && el) {

      el.classList.toggle("monthly");

      if (element.style.visibility === "hidden") {
        element.classList.toggle("monthly");

      } else {
        element.classList.toggle("mystyle");
      }

    }
  }

}

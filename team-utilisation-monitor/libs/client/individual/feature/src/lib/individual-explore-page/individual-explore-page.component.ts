import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-individual-explore-page',
  templateUrl: './individual-explore-page.component.html',
  styleUrls: ['./individual-explore-page.component.scss']
})
export class IndividualExplorePageComponent implements OnInit {

  events: string[] = [];
  opened = true;
  panelOpenState=false;
  boolshow = false;

  //constructor() { }

  ngOnInit(): void {
    console.log();
  }

}

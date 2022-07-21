import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-add-team-to-project-popup',
  templateUrl: './comp-add-team-to-project-popup.component.html',
  styleUrls: ['./comp-add-team-to-project-popup.component.scss']
})
export class CompAddTeamToProjectPopupComponent implements OnInit {

  TeamNames: string[] = ['Team1', 'Team2', 'Team3', 'Team3', 'Team4'];

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-individual-profile',
  templateUrl: './individual-profile.component.html',
  styleUrls: ['./individual-profile.component.scss']
})
export class IndividualProfileComponent implements OnInit {

  events: string[] = [];
  opened = true;

  boolshow = true;
  teams: string[]=['Team A', 'Team B','Team B','Team B','Team B','Team C'];

  ngOnInit(): void {
    console.log();
  }
  showInfo(link: string) {
    console.log()
  }

}

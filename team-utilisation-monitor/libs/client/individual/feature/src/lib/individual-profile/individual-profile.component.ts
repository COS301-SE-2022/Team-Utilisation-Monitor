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
  members: string[]=['Agape A', 'Ndivhuho B','Gift B','Cornel C','Faresa F','Rourke C'];
  fName= "Faresa";
  lastName="Thane";
  email="gift@gmail.co.za";

  ngOnInit(): void {
    console.log();
  }
  showInfo(link: string) {
    console.log()
  }

}

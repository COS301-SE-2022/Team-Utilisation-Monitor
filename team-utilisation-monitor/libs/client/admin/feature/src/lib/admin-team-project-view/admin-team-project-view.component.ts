import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-admin-team-project-view',
  templateUrl: './admin-team-project-view.component.html',
  styleUrls: ['./admin-team-project-view.component.scss'],
})
export class AdminTeamProjectViewComponent implements OnInit {
  //constructor() {}
  boolshow = true;
  panelOpenState = false;
  
  OutTeamNames = [{Name: "Cornel Coetzee"},
                  {Name: "Gift Monwa"},
                  {Name: "Rourke Amiss"},
                  {Name: "Agape Mamphasa"},
                ];

  OutProjectName = [{Name: "Mr Cornel Coetzee"},
                    {Name: "Mr Gift Monwa"},
                    {Name: "Mr Rourke Amiss"},
                    {Name: "Mr Agape Mamphasa"},
                    {Name: "Mr Agape Mamphasa"},
                  ];

  ngOnInit(): void {
    console.log();
  }
}

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
  
  OutTeamNames = [{Name: "I Create Software"},
                  {Name: "University Of Pretoria"},
                  {Name: "Tuks Rugby"},
                  {Name: "Tuks Sport"},
                ];

  OutProjectName = [{Name: "Delete Software"},
                    {Name: "Create Software"},
                    {Name: "Create FronteEnd"},
                    {Name: "Delete FronteEnd"},
                    {Name: "Finish all Projects"},
                  ];

  ngOnInit(): void {
    console.log();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompAddTeamToProjectPopupComponent } from '../comp-add-team-to-project-popup/comp-add-team-to-project-popup.component';
import { CompProjectDataViewPopupComponent } from '../comp-project-data-view-popup/comp-project-data-view-popup.component';

@Component({
  selector: 'team-utilisation-monitor-comp-project-list',
  templateUrl: './comp-project-list.component.html',
  styleUrls: ['./comp-project-list.component.scss'],
})

export class CompProjectListComponent implements OnInit {
  constructor(private matDialog: MatDialog) {}
  @Input() Project!: { Name: string, TeamName: string };

  //get Team associated with the Project from back end;

  ngOnInit(): void {
    console.log();
  }

  onOpenAddTeams(){
    this.matDialog.open(CompAddTeamToProjectPopupComponent);
  }

  onOpenProjectDataViewClick(){
    this.matDialog.open(CompProjectDataViewPopupComponent);
  }
}

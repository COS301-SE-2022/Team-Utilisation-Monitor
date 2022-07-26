import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'team-utilisation-monitor-comp-project-data-view-popup',
  templateUrl: './comp-project-data-view-popup.component.html',
  styleUrls: ['./comp-project-data-view-popup.component.scss']
})
export class CompProjectDataViewPopupComponent implements OnInit {

  TeamNames: string[] = ["Team 1", "Team 2", "Team 3"];
  constructor() { }

  ngOnInit(): void {
  }

}

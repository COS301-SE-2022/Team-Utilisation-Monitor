import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-admin-company-view',
  templateUrl: './admin-company-view.component.html',
  styleUrls: ['./admin-company-view.component.scss'],
})
export class AdminCompanyViewComponent implements OnInit {
  // constructor() {}
  events: string[] = [];
  opened = true;

  OutIndivName = "Cornel Coetzee";

  ngOnInit(): void {
    console.log();
  }
}

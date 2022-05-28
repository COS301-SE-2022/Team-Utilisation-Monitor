import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-admin-list-view',
  templateUrl: './admin-list-view.component.html',
  styleUrls: ['./admin-list-view.component.scss'],
})
export class AdminListViewComponent implements OnInit {
  //constructor() {}
  events: string[] = [];
  opened = true;
  
  ngOnInit(): void {
    console.log();
  }
}

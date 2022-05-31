import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-navbar',
  templateUrl: './comp-navbar.component.html',
  styleUrls: ['./comp-navbar.component.scss'],
})
export class CompNavbarComponent implements OnInit {
  //constructor() {} 
  adminName = "Agape Mamphasa";


  ngOnInit(): void {
    console.log()
  }
}

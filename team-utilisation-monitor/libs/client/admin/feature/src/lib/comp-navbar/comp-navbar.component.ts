import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-navbar',
  templateUrl: './comp-navbar.component.html',
  styleUrls: ['./comp-navbar.component.scss'],
})
export class CompNavbarComponent implements OnInit {
  //constructor() {} 
  adminName = "Agape Mamphasa";
  requestOpenState = true;
  nrOfRequests = 5; //nr of user request sent out and pending, count of the array 'OutEmployeeName'

  OutEmployeeName = [{Name: "Cornel Coetzee"},
                    {Name: "Gift Monwa"},
                    {Name: "Rourke Amiss"},
                    {Name: "Agape Mamphasa"},
                    {Name: "Agape Mamphasa"},
                  ];   

  ngOnInit(): void {
    console.log()
  }
}

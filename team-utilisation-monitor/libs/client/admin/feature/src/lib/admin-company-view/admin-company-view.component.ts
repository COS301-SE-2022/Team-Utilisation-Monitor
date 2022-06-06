import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-admin-company-view',
  templateUrl: './admin-company-view.component.html',
  styleUrls: ['./admin-company-view.component.scss'],
})
export class AdminCompanyViewComponent implements OnInit {
  // constructor() {}
  boolshow = true;
  Name = "User's Name";
  OutOwnerName = "Agape Mamphasa";
  OutAdminNames = [{Name: "Cornel Coetzee"},
                  {Name: "Gift Monwa"},
                  {Name: "Rourke Amiss"},
                  {Name: "Agape Mamphasa"},
                ];
  
  OutEmployeeName = [{Name: "Mr Cornel Coetzee"},
                    {Name: "Mr Gift Monwa"},
                    {Name: "Mr Rourke Amiss"},
                    {Name: "Mr Agape Mamphasa"},
                    {Name: "Mr Agape Mamphasa"},
                  ];              
  panelOpenState = true;

  ngOnInit(): void {
    console.log();
  }
}

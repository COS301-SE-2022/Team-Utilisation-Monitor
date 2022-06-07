import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Admin.service';

@Component({
  selector: 'team-utilisation-monitor-admin-list-view',
  templateUrl: './admin-list-view.component.html',
  styleUrls: ['./admin-list-view.component.scss'],
})
export class AdminListViewComponent implements OnInit {
  constructor(private service:AdminService) {}
  boolshow = true;
  company:any;
  OutEmployeeName:any ; /*[{Name: "Mr Cornel", Surname:"Coetzee"},
                    {Name: "Mr Cornel", Surname:"Coetzee"},
                    {Name: "Mr Cornel", Surname:"Coetzee"},
                  ];*/
  ngOnInit(): void {
    console.log();
    this.company=this.service.getCompany("iCreateSofware");
    console.log(JSON.stringify(this.company));
  }
}

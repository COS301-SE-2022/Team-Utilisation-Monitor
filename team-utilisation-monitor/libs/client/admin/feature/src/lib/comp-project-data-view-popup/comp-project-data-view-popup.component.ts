import { CookieService } from 'ngx-cookie-service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../Admin.service';

@Component({
  selector: 'team-utilisation-monitor-comp-project-data-view-popup',
  templateUrl: './comp-project-data-view-popup.component.html',
  styleUrls: ['./comp-project-data-view-popup.component.scss']
})
export class CompProjectDataViewPopupComponent implements OnInit {


  TeamNames: string[] =[] //["Team 1", "Team 2", "Team 3"];
  constructor(private service:AdminService,private cookie:CookieService) { }

  @Input() Project!: { Name: string, TeamName: string, Hours: number };

  ngOnInit(): void {
    console.log()
    const projectName=this.cookie.get("project_name");
    this.service.GetTeamsOnProject(projectName).subscribe(Data=>
      {
        for(const req of Data.data. GetTeamsOnProject)
        {
          this.TeamNames.push(req.team_name)
        }
      }
    )
  }

}

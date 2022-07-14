import { AdminService } from './../Admin.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompAddTeamMemberPopupComponent } from '../comp-add-team-member-popup/comp-add-team-member-popup.component';
@Component({
  selector: 'team-utilisation-monitor-comp-team-list',
  templateUrl: './comp-team-list.component.html',
  styleUrls: ['./comp-team-list.component.scss'],
})
export class CompTeamListComponent implements OnInit {
  constructor(private matDialog: MatDialog,private service:AdminService) {}
  @Input() TeamName!: { Name: string };
  requestOpenState = false;

  //calculate teams utilization (individual utilization/ nr of members in team) and set that equal to value
  value = 60;

  //link this to all the team members that is accociated to each team
  /*OutEmployeeName = [{Name: "Mr Cornel Coetzee"},
    {Name: "Mr Gift Monwa"},
    {Name: "Mr Rourke Amiss"},
    {Name: "Mr Agape Mamphasa"},
    {Name: "Mr Agape Mamphasa"},
    ];*/

  OutEmployeeName:any[]=[]
  TeamData:any

  ngOnInit(): void {
    console.log();
    this.service.getTeamMembers(this.TeamName.Name).subscribe(data=>
      {
        this.TeamData=data;

        type nameObject=
        {
          Name:string
        }

        for(const requests of this.TeamData.data.GetTeamMembers)
        {
          const  obj={} as nameObject;
          obj.Name=requests.name+" "+requests.surname
          this.OutEmployeeName.push(obj);
        }
      })
  }

  onOpenAddTeamMemberClick(){
    this.matDialog.open(CompAddTeamMemberPopupComponent);
  }


}

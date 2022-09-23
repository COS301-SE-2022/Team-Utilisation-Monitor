import { AdminService } from './../Admin.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompAddTeamMemberPopupComponent } from '../comp-add-team-member-popup/comp-add-team-member-popup.component';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { AddTeamMemberState } from '../states/team-members.state';
import { Observable } from 'rxjs';
import { TeamMember } from '../models/admin-team-member';
import { RemoveTeamMember } from '../actions/mutate-remove-team-member.action';


@Component({
  selector: 'team-utilisation-monitor-comp-team-list',
  templateUrl: './comp-team-list.component.html',
  styleUrls: ['./comp-team-list.component.scss'],
})
export class CompTeamListComponent implements OnInit {

  @Select(AddTeamMemberState.getTeamMembers)teamMembers$!:Observable<TeamMember[]>;

  


  constructor(private matDialog: MatDialog,private service:AdminService,private cookie:CookieService,private snackBar:MatSnackBar,private store:Store) {}

  
  @Input() Teams!:{teamName:string};

  requestOpenState = false;

  //calculate teams utilization (individual utilization/ nr of members in team) and set that equal to value
  value = 0;


  OutEmployeeName:any[]=[]
  TeamData:any;

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];


  ngOnInit(): void {
    

    type nameObject=
    {
      Name:string
      Surname:string
      Email:string
      Utilisation:number
      TeamName:string

    }

    this.service.getTeamMembers(this.Teams.teamName).subscribe(data=>{
      this.TeamData=data;

      for(const requests of this.TeamData.data.GetTeamMembers)
      {
        const  obj={} as nameObject;
        obj.Name=requests.name;
        obj.Surname=requests.surname;
        obj.Email=requests.email;
        obj.TeamName=this.Teams.teamName;
        obj.Utilisation=requests.utilisation
        this.value+=obj.Utilisation;
        this.OutEmployeeName.push(obj);
      }

      this.value=this.value/this.OutEmployeeName.length;   //Average Team Utilization

    })

    this.teamMembers$.subscribe(data=>{
      console.log(data);

      let found=false;

      if(data && data.length>0)
      {
        for(let i=0;i<data.length;++i)
        {
          found=false;

          for(let k=0;k<this.OutEmployeeName.length;++k)
          {
            if(data[i].email==this.OutEmployeeName[k].Email)
            {
              found=true;
              break;
            }
          }


          if(found==false){ // it doesn't exist in the current OutEmployees array

            const memberObj={} as nameObject
            memberObj.Name=data[i].name;
            memberObj.Surname=data[i].surname;
            memberObj.Email=data[i].email;

            memberObj.TeamName=data[i].teamName;

            //console.log("Kasper");
            //console.log(memberObj.TeamName);

            this.OutEmployeeName.push(memberObj);
          }
        }

        for(let i=0;i<data.length;++i){
          this.store.dispatch(new RemoveTeamMember({name:data[i].name,surname:data[i].surname,email:data[i].email,teamName:this.Teams.teamName}));
        }
      }
    })

  }

  onOpenAddTeamMemberClick(team_name:string){
    this.cookie.set("team_name",team_name);  //i'm saving the team name in the cookie
    this.matDialog.open(CompAddTeamMemberPopupComponent);
  }

  RemoveFromTeam(email:string){
    console.log(email);

    this.service.DeleteTeamMember(this.Teams.teamName,email).subscribe(Data=>
    {
      this.snackBar.open("Member has been removed from " + this.Teams.teamName)
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)

      for(let i=0;i<this.OutEmployeeName.length;++i){
        if(this.OutEmployeeName[i]!=null && this.OutEmployeeName[i].Email==email){
          this.OutEmployeeName.splice(i,1);
        }
      }

    })


  }

  RemoveTeam(teamToDelete:string){
    //console.log(teamToDelete);

    this.service.deleteTeam(teamToDelete).subscribe(Data=>{
      //teamData?
      console.log(teamToDelete);

      this.snackBar.open(teamToDelete +" has been removed from Teams")
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
    })
  }


}

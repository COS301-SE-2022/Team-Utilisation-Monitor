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
import { AddPositionState } from '../states/positions.state';
import { Position } from '../models/admin-positions';
import { RemovePosition } from '../actions/mutate-remove-position.action';
import { RemoveTeam } from '../actions/mutate-remove-team.action';


@Component({
  selector: 'team-utilisation-monitor-comp-team-list',
  templateUrl: './comp-team-list.component.html',
  styleUrls: ['./comp-team-list.component.scss'],
})
export class CompTeamListComponent implements OnInit {

  @Select(AddTeamMemberState.getTeamMembers)teamMembers$!:Observable<TeamMember[]>;
  @Select(AddPositionState.getPositions)positions$!:Observable<Position[]>;

  constructor(private matDialog: MatDialog,private service:AdminService,private cookie:CookieService,private snackBar:MatSnackBar,private store:Store) {}


  @Input() Teams!:{teamName:string};

  requestOpenState = false;

  //calculate teams utilization (individual utilization/ nr of members in team) and set that equal to value
  value = 0;


  OutEmployeeName:any[]=[];
  TeamData:any;
  positionList:any[]=[];
  selectedPositon:any;


  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];


  ngOnInit(): void {


    type nameObject=
    {
      Name:string,
      Surname:string,
      Email:string,
      Utilisation:number,
      TeamName:string,
      position:string
    }

    type positionObject={
      position_name:string,
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

        if(requests.positions!=null)
        {
          obj.position=requests.positions[requests.positions.length-1].position; //will always use the last position added
        }

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

            const memberObj={} as nameObject;
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


    //popoulate the positionList
    this.service.getAllPositions().subscribe(item=>{

      if(item!=null){
        for(let i=0;i<item.data.getAllPositions.length;++i){
          const pos_obj={} as positionObject;

          pos_obj.position_name=item.data.getAllPositions[i].position;
          this.positionList.push(pos_obj);
        }
      }
      else{
        this.snackBar.open("API returned null")
        setTimeout(() => {
        this.snackBar.dismiss();
        }, 5000)
      }
    })

    this.positions$.subscribe(data=>{
      if(data && data.length>0){

        for(let i=0;i<data.length;++i){
          const pos_obj={} as positionObject;
          pos_obj.position_name=data[i].position_name;
          this.positionList.push(pos_obj);
        }

        //clear the ngxs state
        for(let i=0;i<data.length;++i){
          this.store.dispatch(new RemovePosition({position_name:data[i].position_name}));
        }
      }
    })


  }

  assignPosition(assignee_email:string,Name:string)
  {

    this.service.assignPositionToUser(this.selectedPositon,this.Teams.teamName,assignee_email).subscribe(item=>{

      if(item!=null){
        if(item.data.assignPositionToUser.error_string=="NO_POSITIONS_FOUND")
        {
          this.snackBar.open(this.selectedPositon+" is not a valid position")
          setTimeout(() => {
          this.snackBar.dismiss();
          }, 5000)
        }
        else if(item.data.assignPositionToUser.error_string=="USER_DOESNT_EXIST")
        {
          this.snackBar.open("User doesn't exist in the system")
          setTimeout(() => {
          this.snackBar.dismiss();
          }, 5000)
        }
        else if(item.data.assignPositionToUser.error_string=="NONE"){
          this.snackBar.open("Successfully assigned "+this.selectedPositon+" to "+Name);
          setTimeout(() => {
          this.snackBar.dismiss();
          }, 5000)

          for(let i=0;i<this.OutEmployeeName.length;++i){
            if(this.OutEmployeeName[i].Email==assignee_email){
              this.OutEmployeeName[i].position=this.selectedPositon;
            }
          }
        }
      }
      else{
        this.snackBar.open("API returned null")
        setTimeout(() => {
        this.snackBar.dismiss();
        }, 5000)
      }

    })

  }

  changePosition(value:any){
    this.selectedPositon=value;
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
    console.log(teamToDelete);

    this.service.deleteTeam(teamToDelete).subscribe(Data=>{
      //console.log(teamToDelete);

      this.store.dispatch(new RemoveTeam({teamName:teamToDelete}));

      this.snackBar.open(teamToDelete +" has been removed from Teams")
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
    })
  }


}

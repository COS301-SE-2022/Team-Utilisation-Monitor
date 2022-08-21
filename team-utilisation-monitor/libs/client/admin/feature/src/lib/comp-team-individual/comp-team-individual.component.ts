import { AdminService } from './../Admin.service';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { timeStamp } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'team-utilisation-monitor-comp-team-individual',
  templateUrl: './comp-team-individual.component.html',
  styleUrls: ['./comp-team-individual.component.scss']
})
export class CompTeamIndividualComponent implements OnInit {

  @Input() IndivName!: { Name: string ,Surname:string,Email:string}
  @Input() TeamName!:{Name:string}

  constructor(private service:AdminService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log()
  }

  RemoveFromTeam(email:string)
  {
    this.service.DeleteTeamMember(this.TeamName.Name,email).subscribe(Data=>
      {
        this.snackBar.open(email + " has been removed from " + this.TeamName.Name)
        setTimeout(() => {
          this.snackBar.dismiss();
        }, 5000)
        //alert(Data.data.DeleteTeamMember)
      })
  }
}

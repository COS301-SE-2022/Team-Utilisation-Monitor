/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AdminService } from './../Admin.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'team-utilisation-monitor-comp-employee-individual',
  templateUrl: './comp-employee-individual.component.html',
  styleUrls: ['./comp-employee-individual.component.scss'],
})
export class CompEmployeeIndividualComponent implements OnInit {
  AssignHoursForm=new FormGroup({
    weeklyHours:new FormControl('',[Validators.required])
  });

  constructor(private service:AdminService,private readonly snackBar:MatSnackBar) {}

  /*
  menueOption will display in the options menue in the Admin Company View next to the delete button

  (Message for gift)
  add an if statement
    if (user == admin) menueOption = "Demote to Employee"
    if (user == employee) menueOption = "Promote to Admin"

  */
  menueOption = "Promote to admin";
  hours=0;

  @Input() IndivName!: { Name: string ,Surname:string,Email:string,WeeklyHours:number};

  ngOnInit(): void {
    console.log();
  }

  updateWeeklyHours(email:string){
    //console.log(email+" "+this.hours);
    if(this.AssignHoursForm.get('weeklyHours')?.value)
    {
      const hours=this.AssignHoursForm.get('weeklyHours')?.value
      this.service.updateWeeklyHoursForEmployee(email,hours as unknown as number).subscribe(
        data=>{

          this.snackBar.open("Updated "+this.IndivName.Name+" "+this.IndivName.Surname+"'s hours" )
          setTimeout(() => {
            this.snackBar.dismiss();
          }, 5000)

        }
      )
    }

  }

  DeleteEmployee(email:string)
  {
    console.log(this.IndivName.Email);
    this.service.DeleteEmployee(email).subscribe(data=>{

      this.snackBar.open(data.data.DeleteEmployee.name+" Removed from Company")
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)

    })
  }
}

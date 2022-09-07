import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'team-utilisation-monitor-comp-add-positions-popup',
  templateUrl: './comp-add-positions-popup.component.html',
  styleUrls: ['./comp-add-positions-popup.component.scss']
})
export class CompAddPositionsPopupComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  addPositionForm=new FormGroup({
    skillName:new FormControl('',[Validators.required])
  });

  positionsList: string[] = ["Front End Dev","UI/UX Dev","Backend Dev","Project Manager"];

  ngOnInit(): void {
  }

  AddPosition(){
    console.log("Add Position button on Click");
    //add backend implementation to add a position to the company database
  }

}

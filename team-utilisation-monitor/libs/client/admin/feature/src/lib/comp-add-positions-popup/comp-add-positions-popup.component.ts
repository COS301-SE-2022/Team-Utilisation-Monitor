import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../Admin.service';
import { Store } from '@ngxs/store';
import { AddPosition } from '../actions/mutate-add-position.action';

@Component({
  selector: 'team-utilisation-monitor-comp-add-positions-popup',
  templateUrl: './comp-add-positions-popup.component.html',
  styleUrls: ['./comp-add-positions-popup.component.scss']
})
export class CompAddPositionsPopupComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private service:AdminService,private store:Store) { }

  addPositionForm=new FormGroup({
    positionName:new FormControl('',[Validators.required])
  });

  positionsList:string[]=[];
  selectedPositions:string[]=[];

  ngOnInit(): void {

    this.service.getAllPositions().subscribe(item=>{

      if(item!=null)
      {
        if(item.data.getAllPositions.error_string=="NO_POSITIONS_FOUND"){
          this.snackBar.open("There seem to be no positions in the system");
          setTimeout(() => {
          this.snackBar.dismiss();
          }, 6000)
        }
        else if(item.data.getAllPositions.error_string=="PRISMA_QUERY_FAILED")
        {
          this.snackBar.open("Error fetching query. DATABASE QUERY FAILED");
          setTimeout(() => {
          this.snackBar.dismiss();
          }, 5000)
        }
        else{
          for(let i=0;i<item.data.getAllPositions.length;++i){
            this.positionsList.push(item.data.getAllPositions[i].position);
          }
        }
      }
    })
    
  }

  func(){
    //console.log(this.selectedPositions);
  }

  removePosition(){

    let out="";
    let counter=0;
   
    if(this.selectedPositions.length>0){
      
      for(let i=0;i<this.selectedPositions.length;++i){
       
        this.service.removePosition(this.selectedPositions[i]).subscribe(item=>{
          if(item.data.removePosition){
            ++counter;
          }

          if(this.selectedPositions.length==counter){
            
            //start deleting from the frontEnd
            while(counter>0){

              for(let k=0;k<this.positionsList.length;++k){
                if(this.positionsList[k]==this.selectedPositions[counter-1]){
                  
                  out=out+this.positionsList[k]+", ";
                  this.positionsList.splice(k,1);
                }
              }

              --counter;
            }

            this.snackBar.open("Removed Position(s) "+out);
            setTimeout(() => {
            this.snackBar.dismiss();
            }, 3000)

            this.selectedPositions=[];
          }
        })

        
      }
    }

    

  }

  AddPosition(){
    
    if(this.addPositionForm.get('positionName')?.value){
      
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const positionName=this.addPositionForm.get('positionName')!.value!;

      this.service.createPosition(positionName).subscribe(item=>{
        if(item!=null){

          if(item.data.addPosition.error_string=="DUPLICATE_POSITION"){
            this.snackBar.open("Position Already in the system. Please try again.");
            setTimeout(() => {
            this.snackBar.dismiss();
            }, 1000)
          }
          else if(item.data.addPosition.error_string=="PRISMA_CREATE_FAIL"){
            this.snackBar.open("Error creating the position. Failed to create position");
            setTimeout(() => {
            this.snackBar.dismiss();
            }, 1000)
          }
          else{

            this.positionsList.push(positionName);

            this.snackBar.open(positionName+" has been added");
            setTimeout(() => {
            this.snackBar.dismiss();
            }, 1000)

            this.store.dispatch(new AddPosition({position_name:positionName}));
          }

        }
      })
    }
  }

}

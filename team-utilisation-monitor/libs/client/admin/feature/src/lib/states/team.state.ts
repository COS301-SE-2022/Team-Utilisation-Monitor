import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddTeam } from "../actions/mutate-add-team.action";
import { RemoveTeam } from "../actions/mutate-remove-team.action";
import { Team } from "../models/admin-team";

export class AddTeamStateModel{
    teams:Team[]=[];
}

@State<AddTeamStateModel>({
    name:"add_team",
    defaults:{
        teams:[],
    }
})

export class AddTeamState{

    @Selector()
    static getTeams(state:AddTeamStateModel){
        return state.teams;
    }

    @Action(AddTeam)
    add({getState,patchState}:StateContext<AddTeamStateModel>,{payload}:AddTeam){
        const state=getState(); //gets the current state for us.
       
        let found=false;

        for(let i=0;i<state.teams.length;++i){ //check for duplicates.
            if(state.teams[i].teamName==payload.teamName){
                found=true;
            }
        }

        if(found==false){
            patchState({
                teams:[...state.teams,payload]
            })
        }

    }

    @Action(RemoveTeam)
    removeTeam({getState,patchState}:StateContext<AddTeamStateModel>,{payload}:RemoveTeam){
        patchState({
            teams:getState().teams.filter(a=>a.teamName!=payload.teamName)
        })
    }


}
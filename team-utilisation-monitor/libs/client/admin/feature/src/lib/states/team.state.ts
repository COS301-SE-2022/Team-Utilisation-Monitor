import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddTeam } from "../actions/mutate-add-team.action";
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
        patchState({
            teams:[...state.teams,payload]
        })
    }

}
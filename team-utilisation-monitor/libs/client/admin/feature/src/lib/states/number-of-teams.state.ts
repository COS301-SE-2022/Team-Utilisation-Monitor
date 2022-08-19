import { Action, Selector,State, StateContext } from "@ngxs/store";
import { IncreaseNumberOfTeams } from "../actions/mutate-number-of-teams.action";
import { NumberOfTeams } from "../models/admin-number-of-teams";

export class IncreaseNumberOfTeamsStateModel{
    teams:NumberOfTeams[]=[]
}

@State<IncreaseNumberOfTeamsStateModel>({
    name:'increase_number_of_teams',
    defaults:{
        teams:[],
    }
})

export class IncreaseNumberOfTeamsState{

    @Selector()
    static getNumberOfTeams(state:IncreaseNumberOfTeamsStateModel){
        if(state.teams.length==0)
            return state.teams[0].value;
        else
            return state.teams[state.teams.length-1].value;
    }

    @Action(IncreaseNumberOfTeams)
    increase({getState,patchState}:StateContext<IncreaseNumberOfTeamsStateModel>,{payload}:IncreaseNumberOfTeams){
        const state=getState();
        patchState({
            teams:[...state.teams,payload]
        })
    }
}
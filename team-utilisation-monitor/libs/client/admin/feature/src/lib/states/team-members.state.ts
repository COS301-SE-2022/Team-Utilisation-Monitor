import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddTeamMember } from "../actions/mutate-add-team-member.action";
import { RemoveTeamMember } from "../actions/mutate-remove-team-member.action";
import { TeamMember } from "../models/admin-team-member";

export class AddTeamMemberStateModel{
    team_members:TeamMember[]=[];
}


@State<AddTeamMemberStateModel>({
    name:"add_team_member",
    defaults:{
        team_members:[],
    }
})


export class AddTeamMemberState{

    @Selector()
    static getTeamMembers(state:AddTeamMemberStateModel){
        return state.team_members;
    }

    @Action(AddTeamMember)
    add({getState,patchState}:StateContext<AddTeamMemberStateModel>,{payload}:AddTeamMember){

        const state=getState();

        let found=false;

        for(let i=0;i<state.team_members.length;++i){
            if(state.team_members[i].email==payload.email){
                found=true;
            }
        }

        if(found==false){
            patchState({
                team_members:[...state.team_members,payload]
            })
        }
    }

    @Action(RemoveTeamMember)
    removeMember({getState,patchState}:StateContext<AddTeamMemberStateModel>,{payload}:RemoveTeamMember){
        patchState({
            team_members:getState().team_members.filter(a=>a.email!=payload.email)
        })
    }

}
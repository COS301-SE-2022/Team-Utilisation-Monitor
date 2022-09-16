import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IncreaseNumberOfClosedProjects } from "../actions/mutate-number-of-closed-projects.action";
import { NumberOfClosedProjects } from "../models/admin-numer-of-closed-projects";

export class IncreaseNumberOfClosedProjectsModel{
    closed_projects: NumberOfClosedProjects[]=[]
}


@State<IncreaseNumberOfClosedProjectsModel>({
    name:'increase_number_of_closed_projects',
    defaults:{
        closed_projects:[],
    }
})


export class IncreaseNumberOfClosedProjectsState{

    @Selector()
    static getNumberOfClosedProjects(state:IncreaseNumberOfClosedProjectsModel){
        if(state.closed_projects.length==0)
            return state.closed_projects[0].value;
        else
            return state.closed_projects[state.closed_projects.length-1].value;
    }

    @Action(IncreaseNumberOfClosedProjects)
    increase({getState,patchState}:StateContext<IncreaseNumberOfClosedProjectsModel>,{payload}:IncreaseNumberOfClosedProjects){
        const state=getState();

        patchState({
            closed_projects:[...state.closed_projects,payload]
        })
    }

}
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IncreaseNumberOfProjects } from "../actions/mutate-number-of-project.action";
import { NumberOfProjects } from "../models/admin-number-of-projects";

export class IncreaseNumberOfProjectsStateModel{
    projects: NumberOfProjects[]=[];
}


@State<IncreaseNumberOfProjectsStateModel>({
    name:'increase_number_of_projects',
    defaults:{
        projects:[],
    }
})

export class IncreaseNumberOfProjectsState{

    @Selector()
    static getNumberOfProjects(state:IncreaseNumberOfProjectsStateModel){
        if(state.projects.length==0)
            return state.projects[0].value;
        else
            return state.projects[state.projects.length-1].value;
    }

    @Action(IncreaseNumberOfProjects)
    increaseProjects({getState,patchState}:StateContext<IncreaseNumberOfProjectsStateModel>,{payload}:IncreaseNumberOfProjects){
        const state=getState();

        patchState({
            projects:[...state.projects,payload]
        })
    }

}
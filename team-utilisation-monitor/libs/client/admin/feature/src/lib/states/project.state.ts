import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddProject } from "../actions/mutate-add-project.action";
import { Project } from "../models/admin-project";

export class AddProjectStateModel{
    projects: Project[]=[];
}

@State<AddProjectStateModel>({
    name:"add_project",
    defaults:{
        projects:[],
    }
})

export class AddProjectState{

    @Selector()
    static getProjects(state:AddProjectStateModel){
        return state.projects;
    }

    @Action(AddProject)
    increase({getState,patchState}:StateContext<AddProjectStateModel>,{payload}:AddProject){
        const state=getState(); //gets the current state for us.
        patchState({
            projects:[...state.projects,payload]
        })
    }
}
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddProject } from "../actions/mutate-add-project.action";
import { RemoveProject } from "../actions/mutate-remove-project.action";
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
    add({getState,patchState}:StateContext<AddProjectStateModel>,{payload}:AddProject){
        const state=getState(); //gets the current state for us.
       
        let found =false;

        for(let i=0;i<state.projects.length;++i){ //check for duplicates
            if(state.projects[i].projectName==payload.projectName){
                found=true;
            }
        }

        if(found==false){
            patchState({
                projects:[...state.projects,payload]
            })
        }
    }

    @Action(RemoveProject)
    remove({getState,patchState}:StateContext<AddProjectStateModel>,{payload}:RemoveProject){
        const state=getState(); //gets the current state for us.
        patchState({
            projects:getState().projects.filter(a=>a.projectName!=payload.projectName)
        })
    }


}
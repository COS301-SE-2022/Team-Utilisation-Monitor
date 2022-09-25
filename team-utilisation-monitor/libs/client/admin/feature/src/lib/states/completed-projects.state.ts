import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddCompletProject } from "../actions/mutate-add-complete-project.action";
import { RemoveCompletedProject } from "../actions/mutate-remove-complete-project.action";
import { Project } from "../models/admin-project";

export class AddCompletProjectStateModel{
    complete_projects:Project[]=[];
}

@State<AddCompletProjectStateModel>({
    name:"add_completed_projec",
    defaults:{
        complete_projects:[],
    }
})


export class AddCompletProjectState{

    @Selector()
    static getCompleteProjecs(state:AddCompletProjectStateModel){
        return state.complete_projects;
    }

    @Action(AddCompletProject)
    add({getState,patchState}:StateContext<AddCompletProjectStateModel>,{payload}:AddCompletProject){
        const state=getState();

        let found=false;

        for(let i=0;i<state.complete_projects.length;++i){
            if(state.complete_projects[i].projectName==payload.projectName){
                found=true;
            }
        }

        if(found==false){
            patchState({
                complete_projects:[...state.complete_projects,payload]
            })
        }
    }

    @Action(RemoveCompletedProject)
    remove({getState,patchState}:StateContext<AddCompletProjectStateModel>,{payload}:RemoveCompletedProject){
        const state=getState();

        patchState({
            complete_projects:getState().complete_projects.filter(a=>a.projectName!=payload.projectName)
        })

    }
    
}
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IncreaseNumberOfProjects } from "../actions/number-of-projects.actions";
import { NumberOfProjects } from "../models/number-of-projects.model";

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
  increase({getState,patchState}:StateContext<IncreaseNumberOfProjectsStateModel>,{payload}:IncreaseNumberOfProjects){
    const state=getState();

    patchState({
      projects:[...state.projects,payload]
    })
  }

}

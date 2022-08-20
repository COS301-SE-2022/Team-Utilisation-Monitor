import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IncreaseNumberOfSkills } from "../actions/number-of-skills.actions";
import { NumberOfSkills } from "../models/number-of-skills.model";

export class IncreaseNumberOfSkillsStateModel{
  skills: NumberOfSkills[]=[];
}


@State<IncreaseNumberOfSkillsStateModel>({
  name:'increase_number_of_projects',
  defaults:{
    skills:[],
  }
})

export class IncreaseNumberOfProjectsState{

  @Selector()
  static getNumberOfProjects(state:IncreaseNumberOfSkillsStateModel){
    if(state.skills.length==0)
      return state.skills[0].value;
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

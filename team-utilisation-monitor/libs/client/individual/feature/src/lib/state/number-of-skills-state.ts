import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IncreaseNumberOfSkills } from "../actions/number-of-skills.actions";
import { NumberOfSkills } from "../models/number-of-skills.model";

export class IncreaseNumberOfSkillsStateModel{
  skills: NumberOfSkills[]=[];
}


@State<IncreaseNumberOfSkillsStateModel>({
  name:'increase_number_of_skills',
  defaults:{
    skills:[],
  }
})

export class IncreaseNumberOfSkillsState{

  @Selector()
  static getNumberOfSkills(state:IncreaseNumberOfSkillsStateModel){
    if(state.skills.length==0)
      return state.skills[0].value;
    else
      return state.skills[state.skills.length-1].value;
  }

  @Action(IncreaseNumberOfSkills)
  increase({getState,patchState}:StateContext<IncreaseNumberOfSkillsStateModel>,{payload}:IncreaseNumberOfSkills){
    const state=getState();

    patchState({
      skills:[...state.skills,payload]
    })
  }

}

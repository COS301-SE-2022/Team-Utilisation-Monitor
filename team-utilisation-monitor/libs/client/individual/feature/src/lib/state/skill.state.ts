import{ State, Action, StateContext, Selector} from '@ngxs/store';
import {Skill} from '../models/skill.model';
import{ AddSkill} from "../actions/skill.actions";

export class SkillStateModel{
  skill: Skill[]=[]
}

@State<SkillStateModel>({
  name:'skill',
  defaults:{ skill:[], }
})

export class SkillState{
  @Selector()
  static getSkill(state:SkillStateModel){
    if(state.skill.length==0)
      return state.skill[0].name;
    else
      return state.skill[state.skill.length-1].name;
  }

  @Action(AddSkill)
  increase({getState,patchState}:StateContext<SkillStateModel>,{skill}:AddSkill){
    const state=getState(); //gets the current state for us.
    patchState({
      skill:[...state.skill,skill] //append the new state to the employees
    })
  }

}

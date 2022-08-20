import{ State, Action, StateContext, Selector} from '@ngxs/store';
import {Skill} from './../models/skill.model';
import{ AddSkill} from "../actions/skill.actions";
import {
  IncreaseNumberOfEmployees
} from "../../../../../admin/feature/src/lib/actions/mutate-number-of-employees.action";
import {IncreaseNumberOfEmployeesStateModel} from "@team-utilisation-monitor/client/admin/feature";

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

  @Action(skill)
  increase({getState,patchState}:StateContext<SkillStateModel>,{payload}:skill){
    const state=getState(); //gets the current state for us.
    patchState({
      skill:[...state.skill,payload] //append the new state to the employees
    })
  }

}

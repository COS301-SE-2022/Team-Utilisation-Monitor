import{ State, Action, StateContext, Selector} from '@ngxs/store';
import {Skill} from './../models/skill.model';
import{ AddSkill} from "../actions/skill.actions";

export class SkillStateModel{
  skill: Skill
}


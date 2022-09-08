import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddSkill } from "../actions/mutate-add-skill.action";
import { RemoveSkill } from "../actions/mutate-remove-skill.action";
import { Skill } from "../models/admin-skill";

export class AddSkillStateModel{
    skills:Skill[]=[];
}

@State<AddSkillStateModel>({
    name:"add_skill",
    defaults:{
        skills:[],
    }
})

export class AddSkillState{

    @Selector()
    static getSkills(state:AddSkillStateModel){
        return state.skills;
    }

    @Action(AddSkill)
    add({getState,patchState}:StateContext<AddSkillStateModel>,{payload}:AddSkill){
        const state=getState();

        let found=false;

        for(let i=0;i<state.skills.length;++i){
            if(state.skills[i].skillName==payload.skillName){
                found=true;
            }
        }

        if(found==false){
            patchState({
                skills:[...state.skills,payload]
            })
        }
    }

    @Action(RemoveSkill)
    removeSkill({getState,patchState}:StateContext<AddSkillStateModel>,{payload}:RemoveSkill){
      patchState({
        skills:getState().skills.filter(a=>a.skillName!=payload.skillName)
      })
    }
}
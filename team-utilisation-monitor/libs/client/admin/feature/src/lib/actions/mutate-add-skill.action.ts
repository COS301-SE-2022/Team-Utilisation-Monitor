import { Skill } from "../models/admin-skill";

export class AddSkill{
    static readonly type='[Add Skills popup] Add Skill';

    constructor(public payload:Skill){}
}
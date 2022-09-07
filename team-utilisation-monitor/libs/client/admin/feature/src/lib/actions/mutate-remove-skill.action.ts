import { Skill } from "../models/admin-skill";

export class RemoveSkill{
    static readonly type='[Add Skills popup] Remove Skill';

    constructor(public payload:Skill){}
}
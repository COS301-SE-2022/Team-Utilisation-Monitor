import {Skill} from '../models/skill.model'

export class AddSkill{

  static readonly type= '[Skill] add'

  constructor(public skill: Skill){}

}

import { NumberOfSkills } from "../models/number-of-skills.model";

export class IncreaseNumberOfSkills{
  static readonly type='[Skills] Increase Projects'

  constructor(public payload:NumberOfSkills){}
}

import { NumberOfTeams } from "../models/number-of-teams.model";


export class IncreaseNumberOfTeams{
  static readonly type='[Teams] Increase teams';

  constructor(public payload:NumberOfTeams){}
}

export class DecreaseNumberOfTeams{
  static readonly type='[Teams] Decrease teams';

  constructor(public payload:NumberOfTeams){}
}

import { NumberOfTeams } from "../models/number-of-teams.model";


export class IncreaseNumberOfTeams{
  static readonly type='[Teams] Increase teams';

  constructor(public payload:NumberOfTeams){}
}


import { NumberOfProjects } from "../models/number-of-projects.model";

export class IncreaseNumberOfProjects{
  static readonly type='[Projects] Increase Projects'

  constructor(public payload:NumberOfProjects){}
}

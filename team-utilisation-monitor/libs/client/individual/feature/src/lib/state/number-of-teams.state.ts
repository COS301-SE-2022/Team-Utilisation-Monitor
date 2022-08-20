import { Action, Selector,State, StateContext } from "@ngxs/store";
import { IncreaseNumberOfTeams } from "../actions/number-of-teams.actions";
import {DecreaseNumberOfTeams} from "../actions/number-of-teams.actions";
import { NumberOfTeams } from "../models/number-of-teams.model";

export class IncreaseNumberOfTeamsStateModel{
  teams:NumberOfTeams[]=[]
}

@State<IncreaseNumberOfTeamsStateModel>({
  name:'increase_number_of_teams',
  defaults:{
    teams:[],
  }
})

export class IncreaseNumberOfTeamsState{


}

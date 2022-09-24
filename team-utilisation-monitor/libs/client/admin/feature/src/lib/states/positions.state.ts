import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddPosition } from "../actions/mutate-add-position.action";
import { RemovePosition } from "../actions/mutate-remove-position.action";
import { Position } from "../models/admin-positions";

export class AddPositionStateModel{
    positions:Position[]=[];
}


@State<AddPositionStateModel>({
    name:"add_position",
    defaults:{
        positions:[],
    }
})


export class AddPositionState{

    @Selector()
    static getPositions(state:AddPositionStateModel){
        return state.positions;
    }

    @Action(AddPosition)
    add({getState,patchState}:StateContext<AddPositionStateModel>,{payload}:AddPosition){

        const state=getState();

        let found=false;

        for(let i=0;i<state.positions.length;++i){
            if(state.positions[i].position_name==payload.position_name){
                found=true;
            }
        }

        if(found==false){
            patchState({
                positions:[...state.positions,payload]
            })
        }
    }

    @Action(RemovePosition)
    removePosition({getState,patchState}:StateContext<AddPositionStateModel>,{payload}:RemovePosition){
        patchState({
            positions:getState().positions.filter(a=>a.position_name!=payload.position_name),
        })
    }

    
}
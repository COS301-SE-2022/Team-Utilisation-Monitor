import { NumberOfEmployees } from "../models/admin-number-of-employees";
import {Action, StateContext, Selector, State} from '@ngxs/store'
import { IncreaseNumberOfEmployees } from "../actions/mutate-number-of-employees.action";

export class IncreaseNumberOfEmployeesStateModel{
    employees: NumberOfEmployees[]=[]
}

@State<IncreaseNumberOfEmployeesStateModel>({
    name:'increase_number_of_employees',
    defaults:{
        employees:[],
    }
})


export class IncreaseNumberOfEmployeesState{

    @Selector()
    static getNumberOfEmployees(state:IncreaseNumberOfEmployeesStateModel){
        if(state.employees.length==0)
            return state.employees[0].value;
        else
            return state.employees[state.employees.length-1].value;
    }

    @Action(IncreaseNumberOfEmployees)
    increase({getState,patchState}:StateContext<IncreaseNumberOfEmployeesStateModel>,{payload}:IncreaseNumberOfEmployees){
        const state=getState(); //gets the current state for us.
        patchState({
            employees:[...state.employees,payload] //append the new state to the employees
        })

        console.log("ASAP");
    }
}

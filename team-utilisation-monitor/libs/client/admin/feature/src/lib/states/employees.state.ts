import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddEmployee } from "../actions/mutate-add-employee.action";
import { RemoveEmployee } from "../actions/mutate-remove-employee.action";
import { Employee } from "../models/admin-employees";

export class EmployeeStateModel{
    employees:Employee[]=[];
}


@State<EmployeeStateModel>({
    name:"employees_state_model",
    defaults:{
        employees:[]
    }
})


export class EmployeesState{

    @Selector()
    static getEmployees(state:EmployeeStateModel){
        return state.employees;
    }

    @Action(AddEmployee)
    add({getState,patchState}:StateContext<EmployeeStateModel>,{payload}:AddEmployee){

        const state=getState();

        let found=false;

        for(let i=0;i<state.employees.length;++i){
            if(state.employees[i].email==payload.email){
                found=true;
            }
        }

        if(found==false){
            patchState({
                employees:[...state.employees,payload]
            })
        }

    }

    @Action(RemoveEmployee)
    removeEmployee({getState,patchState}:StateContext<EmployeeStateModel>,{payload}:RemoveEmployee){
        patchState({
            employees:getState().employees.filter(a=>a.email!=payload.email)
        })
    }
}
import { Employee } from "../models/admin-employees";

export class AddEmployee{
    static readonly type='[Company View] Add Employee';

    constructor(public payload:Employee){}
}
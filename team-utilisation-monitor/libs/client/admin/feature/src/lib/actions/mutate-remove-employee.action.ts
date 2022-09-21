import { Employee } from "../models/admin-employees";

export class RemoveEmployee{
    static readonly type='[Company View] Remove Employee'

    constructor(public payload:Employee){}

}
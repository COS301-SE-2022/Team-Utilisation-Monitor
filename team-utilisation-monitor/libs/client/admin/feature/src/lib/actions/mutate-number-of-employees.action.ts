import { NumberOfEmployees } from "../models/admin-number-of-employees";

/***
 * This action changes the "# of employees component in the Admin Dashboard"
 */

export class IncreaseNumberOfEmployees{
    static readonly type='[Admin Dashboard] Increase'
    
    constructor(public payload:NumberOfEmployees){}
}


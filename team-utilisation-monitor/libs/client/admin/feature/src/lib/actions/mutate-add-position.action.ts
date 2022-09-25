import { Position } from "../models/admin-positions";

export class AddPosition{
    static readonly type="[Add Positions popup] Add Position";

    constructor(public payload:Position){}
}
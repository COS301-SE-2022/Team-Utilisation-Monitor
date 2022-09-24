import { Position } from "../models/admin-positions";

export class RemovePosition{
    static readonly type='[Add positions popup] Remove Position';

    constructor(public payload:Position){}
}
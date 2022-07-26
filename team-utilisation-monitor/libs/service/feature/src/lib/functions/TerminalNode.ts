import { MainNode } from "./node";

export class TerminalNode extends MainNode{

    public id:number;
    public hours:number;

    constructor(f_id:number){
        super(f_id)
    }

}

import { MainNode } from "./node";

export class NonTerminalNode extends MainNode{
    
    public arr:MainNode[]=[];
    public id:number;
    public hours:number;

    constructor(f_id:number){
        super(f_id)
    }
    
}
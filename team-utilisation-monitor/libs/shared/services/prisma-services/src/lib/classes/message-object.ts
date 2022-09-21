import { Field, ObjectType } from "@nestjs/graphql";
import { ErrorStrings } from "./classes-error-strings";

@ObjectType({description:'For custom messages'})
export class MessageObject{
    
    @Field()
    private message?:string;

    @Field(()=>ErrorStrings,{defaultValue:"NONE"})
    public error_string?:ErrorStrings;
    
    /***
     * The message is compulsory, but you can add an optional
     * error string. Default is "NONE"
     */
    constructor(msg:string,error_string:ErrorStrings=ErrorStrings.NONE){
        this.message=msg;
        this.error_string=error_string;
    }

    getMessage():string{
        return this.message;
    }

    setMessage(msg:string):void{
        this.message=msg;
    }

}
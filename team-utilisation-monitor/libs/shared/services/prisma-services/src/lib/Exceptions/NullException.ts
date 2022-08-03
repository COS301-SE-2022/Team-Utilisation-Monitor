export class NullException extends Error{

    description="returned null object or statement is null"

    constructor(){
        super("Fail null")
    }

    print(){
        return this.description;
    }

}
import { Role } from "@prisma/client";

export class CreatePersonCommand{

    constructor(
        public readonly name:string,
        public readonly surname:string,
        public readonly email:string,
        public readonly password:string,
        public readonly role:Role,
        public readonly suspended:boolean,
        public readonly company_name:string
    ){}
    
}
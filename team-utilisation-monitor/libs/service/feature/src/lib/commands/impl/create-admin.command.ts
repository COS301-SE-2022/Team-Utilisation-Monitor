import { Role } from "@prisma/client";

export class CreateAdminCommand{
    constructor(
        public readonly name:string,
        public readonly surname:string,
        public readonly email:string,
        public readonly companyName:string,
    ){}
}
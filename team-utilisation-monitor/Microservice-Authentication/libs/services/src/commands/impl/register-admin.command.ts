/**
 * Username is the email
 * role is automatically set to ADMIN
 * and token is generated
 */

 import { Role } from "@prisma/client";

 export class RegisterAdminCommand{
     constructor(
        public readonly username:string,
        public readonly password:string,
        public readonly name:string,
        public readonly surname:string,
        
     ){}
 }
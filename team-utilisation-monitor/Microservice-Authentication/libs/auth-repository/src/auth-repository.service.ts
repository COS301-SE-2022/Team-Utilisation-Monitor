import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaServiceAuthentication } from 'shared/prisma-services-authentication.service';
import { AuthAdminEntity } from '../../../../libs/api/shared/data-access/src';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthRepositoryService {

    constructor(private readonly prisma:PrismaServiceAuthentication){}
    

    /***
     * This function is used to register a userAdmin.
     * It'll return the object that was used to create the new person
     * 
     */

    async registerAdminRepo(f_username:string,f_password:string):Promise<AuthAdminEntity>
    {
        const returnObject=new AuthAdminEntity();

        //check whether user exists
        
        const existing_user=await this.prisma.userDetails.findUnique({
            where:{
                username:f_username,
            }
        })


        if(existing_user!=null){

            console.log("Found");
            console.log(existing_user);
            
            returnObject.id=existing_user.id;
            returnObject.username=existing_user.username;
            returnObject.role=existing_user.role;
            returnObject.token=existing_user.token;

            return returnObject; //for testing purposes. Remove in production.
        }
        else
        {
            //generate a token

            console.log("not found");

            const rand = () => {
            return Math.random().toString(36).substr(2);
            };
          
            const token = () => {
                return rand() + rand();
            };
          
            console.log("Generated token is "+token()); //e.g 7bdt6uufq5l8p2dg0luyir

            //assign role
            const f_role=Role.ADMIN;

            //salt and hash password
            
            const salt=await bcrypt.genSalt();

            const hash=await bcrypt.hash(f_password,salt);


            //transfer data to the database

            const new_admin=await this.prisma.userDetails.create({
                data:{
                    username:f_username,
                    password:hash,
                    token:token(),
                    role:f_role
                }
            })

            
            returnObject.id=new_admin.id;
            returnObject.username=new_admin.username;
            returnObject.role=f_role;
            returnObject.token=new_admin.token;

            console.log(new_admin);
            console.log(returnObject)

            return returnObject; //for testing purposes. Remove in production.

        }

       

    }
}
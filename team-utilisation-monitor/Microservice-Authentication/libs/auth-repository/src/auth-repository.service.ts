import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaServiceAuthentication } from 'shared/prisma-services-authentication.service';
import { AuthAdminEntity } from 'shared/Entities/api-auth-admin.entity';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthRepositoryService {

    constructor(private readonly prisma:PrismaServiceAuthentication){}


    /***
     * This function is used to register regular users.
     * It'll return the object that was used to create the new person
    */

    async registerUserRepo(f_name:string,f_surname:string,f_username:string,f_password:string):Promise<AuthAdminEntity>
    {
        const returnObject=new AuthAdminEntity();

        //check whether user exists
        
        const existing_user=await this.prisma.userDetails.findUnique({
            where:{
                username:f_username,
            }
        })


        if(existing_user!=null)
        {

            console.log("Found");
            console.log(existing_user);
            
            returnObject.id=existing_user.id;
            returnObject.username=existing_user.username;
            returnObject.role=existing_user.role;
            returnObject.token=existing_user.token;
            returnObject.name=existing_user.name;
            returnObject.surname=existing_user.surname;

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
            const f_role=Role.USER;

            //salt and hash password
            
            const salt=await bcrypt.genSalt();

            const hash=await bcrypt.hash(f_password,salt);


            //transfer data to the database

            const new_admin=await this.prisma.userDetails.create({
                data:{
                    username:f_username,
                    password:hash,
                    token:token(),
                    role:f_role,
                    name:f_name,
                    surname:f_surname
                }
            })

            
            returnObject.id=new_admin.id;
            returnObject.username=new_admin.username;
            returnObject.role=f_role;
            returnObject.token=new_admin.token;
            returnObject.name=new_admin.name;
            returnObject.surname=new_admin.surname;

            console.log(new_admin);
            console.log(returnObject)

            return returnObject; //for testing purposes. Remove in production.

        }
    }

    /***
     * This function is used to register a userAdmin.
     * It'll return the object that was used to create the new person
     * 
    */

    async registerAdminRepo(f_name:string,f_surname:string,f_username:string,f_password:string):Promise<AuthAdminEntity>
    {
        const returnObject=new AuthAdminEntity();

        //check whether user exists
        
        const existing_user=await this.prisma.userDetails.findUnique({
            where:{
                username:f_username,
            }
        })


        if(existing_user!=null)
        {

            console.log("Found");
            console.log(existing_user);
            
            returnObject.id=existing_user.id;
            returnObject.username=existing_user.username;
            returnObject.role=existing_user.role;
            returnObject.token=existing_user.token;
            returnObject.name=existing_user.name;
            returnObject.surname=existing_user.surname;

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
                    role:f_role,
                    name:f_name,
                    surname:f_surname
                }
            })

            
            returnObject.id=new_admin.id;
            returnObject.username=new_admin.username;
            returnObject.role=f_role;
            returnObject.token=new_admin.token;
            returnObject.name=new_admin.name;
            returnObject.surname=new_admin.surname;

            console.log(new_admin);
            console.log(returnObject)

            return returnObject; //for testing purposes. Remove in production.

        }
    }


    /***
     * This is the login functionality.
     * The function returns an object with the user's details upon successful login.
     * The logic for the password is found in the command handler.
     * returns null if user doesn't exist
     */


    async login(f_username:string,f_password:string):Promise<AuthAdminEntity|null>
    {
        const returnObject=new AuthAdminEntity();

        const returning_user=await this.prisma.userDetails.findUnique({
            where:{
                username:f_username
            }
        })

        if(returning_user){ //user does exist
            returnObject.id=returning_user.id;
            returnObject.username=returning_user.username;
            returnObject.password=returning_user.password;
            returnObject.role=returning_user.role;
            returnObject.token=returning_user.token;
            returnObject.name=returning_user.name;
            returnObject.surname=returning_user.surname;

            return returnObject;
        }
        else
        {
            return null;
        }
    }
    
    /***
     * This function is used to verify the access token for api calls.
     * The user should use such tokens in api calls.
     * Function will return true if the token is 
     */

    async verifyToken(f_token:string):Promise<Boolean>
    {
        const existing_token=await this.prisma.userDetails.findUnique({
           where:{
                token:f_token
           }
        })
        
        if(existing_token)
            return true;
        else
            return false;
    }




    
}

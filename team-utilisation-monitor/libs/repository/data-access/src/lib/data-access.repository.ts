import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Role } from '@prisma/client';
import {UserPerson,UserCompany} from '@team-utilisation-monitor/api/shared/data-access'
import {PrismaService} from '@team-utilisation-monitor/shared/services/prisma-services'


@Injectable()
export class DataAccessRepository {

    constructor(private readonly prisma:PrismaService ){}

    async returnObject(id:number,name:string,surname:string,email:string,password:string,suspended:boolean,role:string,company:string,position:string,project:string,team:string,company_id:number,project_id:number,team_id:number)
    {
        const user_person=new UserPerson();
        
        user_person.id=id;
        user_person.name=name;
        user_person.surname=surname;
        user_person.email=email;
        user_person.role=role;
        user_person.password=password;
        user_person.suspended=suspended;
        user_person.position=position;
        user_person.company_name=company;
        user_person.project_name=project;
        user_person.team_name=team;
        user_person.company_id=company_id;
        user_person.project_id=project_id;
        user_person.team_id=team_id;


        return user_person;

    }

    async returnCompanyObject(id:number,company_name:string,admin_id:number):Promise<UserCompany>
    {
        const user_company=new UserCompany();

        user_company.id=id;
        user_company.company_name=company_name;
        user_company.admin_id=admin_id;

        return user_company;
    }

    

    /***
     * Role is an enum defined in the in the schema.prisma file.
     * Thinking is i'm going to use the company id to associate the user
     */

    async createPerson(f_name:string,f_surname:string,f_email:string,f_role:Role,f_password:string,f_suspended:boolean,f_company_name:string){

        let usr_company_id:number;

        if(this.getCompanyVName(f_company_name))
        {
            usr_company_id=(await this.getCompanyVName(f_company_name)).id //user has an affiliated company
        }
        else
            usr_company_id=0; //user doesn't have an affiliated company

        //IF person is created in a non-existing company,it might break!


        const new_person=await this.prisma.person.create({
            data:{
                name:f_name,
                surname:f_surname,
                email:f_email,
                role:f_role,
                password:f_password,
                suspended:f_suspended,
                company_id:usr_company_id,             
            }
        })

        return new_person; //returns newly created object

    }

    /***
     * Returns an array of all persons on the dataBase
     */

    async getAllPersons():Promise<UserPerson[]>
    {
        //absolutely brilliat. The include tag includes other details i.e other dchema data
        //that might be nesglected
        const people=await this.prisma.person.findMany({
            include:{
                position:true,
                company:true,
                project:true,
                team:true
            }
        });

        const people_arr=[];

        
        if(people)
        {

            for(let i=0;i<people.length;++i)
            {
                people_arr.push(this.returnObject(people[i].id,people[i].name,people[i].surname,people[i].email,people[i].password,people[i].suspended,people[i].role,people[i].company.company_name,people[i].position.title,people[i].project.project_name,people[i].team.team_name,people[i].company_id,people[i].project_id,people[i].team_id));
            }
        }
        else
            console.log("Object people returned null");

        return people_arr; 
            

    }

    /***
     * Returns one user via their email address.
     */

    async getOnePersonVEmail(arg_email:string)
    {
        const person=await this.prisma.person.findUnique({
            where:{
                email:arg_email,
            },
            include:{
                position:true,
                company:true,
                project:true,
                team:true
            }
        })

        if(person)
        {
            return this.returnObject(person.id,person.name,person.surname,person.email,person.password,person.suspended,person.role,person.company.company_name,person.position.title,person.project.project_name,person.team.team_name,person.company_id,person.project_id,person.team_id);
        }
        else
            return "getOnePersonVEmail() returned null"
    }


    /**
     * This function returns the company object from the database.
     * At the moment,the object has 3 components: 
     * id,company_name ad admin_id
     * More will be added later
     * @param f_company_name 
     * @returns 
     */


    async getCompanyVName(f_company_name:string):Promise<UserCompany|null>
    {
        const company=await this.prisma.company.findUnique({
            where:{
                company_name:f_company_name
            }
        }) 

        if(company)
        {
            return this.returnCompanyObject(company.id,company.company_name,company.admin_id);
        }
        else
            return null; //company doesn't exist
    }
    
}

import { Injectable } from '@nestjs/common';
import {UserPerson} from '@team-utilisation-monitor/api/shared/data-access'
import {PrismaService} from '@team-utilisation-monitor/shared/services/prisma-services'


@Injectable()
export class DataAccessRepository {

    constructor(private readonly prisma:PrismaService ){}

    async returnObject(id:number,name:string,surname:string,email:string,password:string,suspended:boolean,role:string,company:string,position:string,project:string,team:string)
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


        return user_person;

    }

    /***
     * Returns an array of all persons on the dataBase
     */

    async getAllPersons()
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
                people_arr.push(this.returnObject(people[i].id,people[i].name,people[i].surname,people[i].email,people[i].password,people[i].suspended,people[i].role,people[i].company.company_name,people[i].position.title,people[i].project.project_name,people[i].team.team_name));
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
            return this.returnObject(person.id,person.name,person.surname,person.email,person.password,person.suspended,person.role,person.company.company_name,person.position.title,person.project.project_name,person.team.team_name)
        }
        else
            return "getOnePersonVEmail() returned null"
    }
    
}

import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Role } from '@prisma/client';
import {UserPerson,UserCompany} from '@team-utilisation-monitor/api/shared/data-access'
import {PrismaService} from '@team-utilisation-monitor/shared/services/prisma-services'
import { TeamEntity } from '@team-utilisation-monitor/api/shared/data-access';
import { ProjectEntity } from '@team-utilisation-monitor/api/shared/data-access';

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

    async returnCompanyObject(id:number,company_name:string,admims:UserPerson[],employees:UserPerson[],projects:ProjectEntity[],teams:TeamEntity[],invite_code:string)
    {
        const user_company=new UserCompany();

        user_company.id=id;
        user_company.company_name=company_name;
        user_company.admins=admims;
        user_company.employees=employees;
        user_company.projects=projects;
        user_company.teams=teams;
        user_company.invite_code=invite_code;
        

        return user_company;
    }

    async returnUserID(id:number)
    {
        const user_person=new UserPerson();
        
        user_person.id=id;

        return user_person;

    }

    

    /***
     * Role is an enum defined in the in the schema.prisma file.
     * Thinking is i'm going to use the company id to associate the user.
     * I think you can use this to create the admin.
     */

    async createPerson(f_name:string,f_surname:string,f_email:string,f_role:Role,f_password:string,f_suspended:boolean,f_company_name:string){

        let usr_company_id:number;

        if(this.getCompanyVName(f_company_name))
        {
            usr_company_id= (await this.getCompanyVName(f_company_name)).id //user has an affiliated company
        }
        else
            usr_company_id=null; //user doesn't have an affiliated company

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
     * The function creates and adds the user object to the database. Returns the user object from
     * The database
     */

    async createUser(f_name:string,f_surname:string,f_email:string,inviteLink:string)
    {
        //use the invitation link to get the company id
        

        const local_company_id=await this.verifyCode(inviteLink);

        if(local_company_id>0) //link is valid
        {
            const new_user=await this.prisma.person.create({
                data:{
                    name:f_name,
                    surname:f_surname,
                    email:f_email,         
                    company:{
                        connect:{
                            id:local_company_id,
                        }
                    },
                }
            })

            return new_user;
        }
        else 
        {
            console.log("Couldn't verify Invitation link");

            return null;
        }


    }

    /***
     * This function is used to create a company object within the database
     */

    async createCompnany(c_name:string)
    {
        const new_company=await this.prisma.company.create({
            data:{
                company_name:c_name,
            }
        })

        return new_company;
    }

    /***
     * The function is used to generate a unique invitation code associated 
     * with a company. The code is then stored in the database
     */

    async createInviteCode(company_name:string):Promise<string>
    {
        //generate random code e.g pwc288
        const prefix=company_name.substring(0,4);

        const max=300;
        const min=100;

        const suffix=Math.random() * (max - min) + min;

        const code=prefix+suffix;

        //put the code into the database

        const c_id=await this.getCompanyID(company_name); //company_id

        if(c_id>0)
        {
            const new_code=await this.prisma.invites.create({
                data:{
                    company_id:c_id,
                    invite_code:code,
                    expire:"2023-01-01T03:53:00.000Z"
                }
            })
        }

        return code;

    }

    /***
     * Upon successful verification, the function returns
     * the id of the company.
     */

    async verifyCode(f_code:string):Promise<number>
    {
        const invite=await this.prisma.invites.findUnique({
            where:{
                invite_code:f_code
            }
        })

        if(invite!=null) //return the name of the company
        {
            return invite.company_id;
        }   
        else
            return -1;
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

    async getOnePersonVEmail(arg_email:string):Promise<UserPerson|string>
    {
        const person=await this.prisma.person.findUnique({
            where:{
                email:arg_email,
            },
            include:{
                position:true,
                company:true,
                project:true,
                team:true,
            }
        })

        if(person)
        {   
            let local_project:string;
            let local_company:string;
            let local_team:string;

            if(person.project==null)
                local_project=null;
            else
                local_project=person.project.project_name
            
            if(person.company==null)
                local_company=null;
            else
                local_company=person.company.company_name;

            if(person.team==null)
                local_team=null;
            else
                local_team=person.team.team_name;


            return this.returnObject(person.id,person.name,person.surname,person.email,person.password,person.suspended,person.role,local_company,person.position.title,local_project,local_team,person.company_id,person.project_id,person.team_id);
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
            },
            include:{
                employees:true,
                projects:true,
                teams:true,
                admins:true,
                invite:true
            }
        }) 

        let employees_arr:UserPerson[]
        let projects_arr:ProjectEntity[]
        let teams_arr:TeamEntity[]
        let admins_arr:UserPerson[]

        if(company.employees!=null)
        {
            for(let i=0;i<company.employees.length;++i)
            {
                const user=new UserPerson();

                user.id=company.employees[i].id;
                user.name=company.employees[i].name;
                user.surname=company.employees[i].surname;
                user.email=company.employees[i].email;
                user.password=company.employees[i].password;
                user.role=company.employees[i].role;
                user.suspended=company.employees[i].suspended;
                user.company_name=f_company_name;
                user.company_id=company.id;

                /**
                 * What's missing is the project, team name and project,team id field
                 */

                employees_arr.push(user);
            }
        }

        if(company.projects!=null)
        {
            for(let i=0;i<company.projects.length;++i)
            {
                const project=new ProjectEntity();
                let workers_arr:UserPerson[];
                
                project.id=company.projects[i].id;
                project.project_name=company.projects[i].project_name;
                project.ownwer_id=company.projects[i].owner_id;

                for(let i=0;i<company.employees.length;++i)
                {
                    const user=new UserPerson();
    
                    user.id=company.employees[i].id;
                    user.name=company.employees[i].name;
                    user.surname=company.employees[i].surname;
                    user.email=company.employees[i].email;
                    user.password=company.employees[i].password;
                    user.role=company.employees[i].role;
                    user.suspended=company.employees[i].suspended;
                    user.company_name=f_company_name;
                    user.company_id=company.id;
    
                    /**
                     * What's missing is the project, team name and project,team id field
                    */
    
                    workers_arr.push(user);
                }

                projects_arr.push(project);

            }
        }

        if(company.teams!=null)
        {
            for(let i=0;i<company.teams.length;++i)
            {
                const team=new TeamEntity();

                team.id=company.teams[i].id;
                team.team_name=company.teams[i].team_name;
                team.company_id=company.teams[i].company_id;
                //return a function that returns project_id based on teams_id

                teams_arr.push(team);
            }  
        }

        if(company.admins!=null)
        {
            for(let i=0;i<company.employees.length;++i)
            {
                if(company.employees[i].role=='ADMIN')
                {
                    const user=new UserPerson();

                    user.id=company.employees[i].id;
                    user.name=company.employees[i].name;
                    user.surname=company.employees[i].surname;
                    user.email=company.employees[i].email;
                    user.password=company.employees[i].password;
                    user.role=company.employees[i].role;
                    user.suspended=company.employees[i].suspended;
                    user.company_name=f_company_name;
                    user.company_id=company.id;

                    admins_arr.push(user);
                }
            }
        }

        return  this.returnCompanyObject(company.id,company.company_name,admins_arr,employees_arr,projects_arr,teams_arr,company.invite.invite_code)


    }

    /***
     * This function returns the company object from the database using
     * the id of the company
     */

    async getCompanyVID(f_id:number)
    {
        const company=await this.prisma.company.findUnique({
            where:{
                id:f_id
            }
        }) 
        
        if(company==null)
            console.warn("getCompanyVID() returned"+ company)
        else
        {
            return "Senna";         
        }
    }

    /**
     * This function returns the user id.
     * @param arg_email 
     * @returns 
     */

    async getUserID(arg_email:string)
    {
        const person=await this.prisma.person.findUnique({
            where:{
                email:arg_email,
            }
        })

        if(person)
        {   
            return this.returnUserID(person.id);
        }
        else
            return "getUserID() returned null"
    }

    /****
     * This function returns the company ID by taking in the company name.
     * Returns -1, if no company was found with that name.
     */

    async getCompanyID(c_name:string):Promise<number>
    {
        const company=await this.prisma.company.findUnique({
            where:{
                company_name:c_name,
            }
        })

        if(company)
        {
            return company.id;
        }
        else
            return -1;
    }
    
}

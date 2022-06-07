/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Role } from '@prisma/client';
import {UserPerson,UserCompany, InviteCodeEntity} from '@team-utilisation-monitor/api/shared/data-access'
import {PrismaService} from '@team-utilisation-monitor/shared/services/prisma-services'
import { TeamEntity } from '@team-utilisation-monitor/api/shared/data-access';
import { ProjectEntity } from '@team-utilisation-monitor/api/shared/data-access';
import e = require('cors');

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

    /****
     * This function is used to add a new admin to an existing compony
     * Returns null if the company doesn't exist
    */

    async addAdminToCompany(f_name:string,f_surname:string,f_email:string,f_company_name:string,f_password:string):Promise<UserPerson|null>
    {
        const c_id=await this.getCompanyID(f_company_name);

        if(c_id>0)
        {
            const new_admin=await this.prisma.person.create({
                data:{
                    name:f_name,
                    surname:f_surname,
                    email:f_email,
                    password:f_password, 
                    company_id:c_id, 
                    admin_id:c_id,
                    role:Role.ADMIN,
                    approved:true        
                }
            })
            
            const return_admin=new UserPerson();

            return_admin.company_id=new_admin.id;
            return_admin.name=new_admin.name;
            return_admin.password=new_admin.password;
            return_admin.surname=new_admin.surname;
            return_admin.email=new_admin.email;
            return_admin.company_name=f_company_name;
            return_admin.company_id=new_admin.company_id;
            return_admin.role=new_admin.role;

            this.superCreateCompany(f_company_name,return_admin);
            
            return return_admin;
            
    
        }
        
        console.log("Company Doesn't exist. Returning null");
        return null;


    }

    /***
     * This function is used to register an admin onto a company. If the company already exists
     * the admin will be added to an existing company. If it doesn't,  a new compnay will be created.
     * Returns null if admin cannot be created, because company doesn't exist
    */

    async createUserAdmin(f_name:string,f_surname:string,f_email:string,f_company_name:string,f_password:string):Promise<UserPerson|null>
    {
        const c_id=await this.getCompanyID(f_company_name);

        if(c_id>0) //the company already exists
        {
            return this.addAdminToCompany(f_name,f_surname,f_email,f_company_name,f_password);
        }
        else //the admin is an admin of a new company
        {
            console.log("creating company")

            await this.createCompnany(f_company_name);

            //create the person entity
            const c_id=await this.getCompanyID(f_company_name); //new company id

            console.log("company id is "+c_id);

            if(c_id>0)
            {
                const new_admin=await this.prisma.person.create({
                    data:{
                        name:f_name,
                        surname:f_surname,
                        email:f_email,
                        password:f_password,  
                        company_id:c_id,
                        role:Role.ADMIN,     
                        approved: true
                    }
                })

                //return new admin

                const return_admin=new UserPerson();

                return_admin.company_id=new_admin.id;
                return_admin.name=new_admin.name;
                return_admin.password=new_admin.password;
                return_admin.surname=new_admin.surname;
                return_admin.email=new_admin.email;
                return_admin.company_name=f_company_name;
                return_admin.company_id=new_admin.company_id;
                return_admin.role=new_admin.role;

                this.superCreateCompany(f_company_name,return_admin);
                
                return return_admin;
            }
            else
                return null;
            
        }


    }

    /***
     * The function creates and adds the user object to the database. Returns the user object from
     * The database
     */

    async createUser(f_name:string,f_surname:string,f_email:string,f_password:string,inviteLink:string)
    {
        //use the invitation link to get the company id


        const local_company_id=await this.verifyCode(inviteLink);
        const company_name=await this.getCompanyVID(local_company_id);

        if(local_company_id>0) //link is valid
        {
            const new_user=await this.prisma.person.create({
                data:{
                    name:f_name,
                    surname:f_surname,
                    email:f_email,         
                    company_id:local_company_id,
                    password:f_password
                }
            })

            const return_user=new UserPerson();

            return_user.name=new_user.name;
            return_user.surname=new_user.surname;
            return_user.email=new_user.email;
            return_user.password=new_user.password;
            return_user.company_name=company_name;
            return_user.company_id=local_company_id;
            return_user.role=new_user.role;

            //DEV Note: There's no need to add the user to the company relation. Prisma magic

            return return_user;
        }
        else
        {
            console.log("Couldn't verify Invitation link");

            return null;
        }


    }
    /***
     * This function is used to create or add a new team to the database
     */

    async createTeam(teamName:string,companyName:string):Promise<TeamEntity>
    {
        const c_id=await this.getCompanyID(companyName);

        if(c_id>0)
        {
            const new_team=await this.prisma.team.create({
                data:{
                    team_name:teamName,
                    company_id:c_id
                }
            })

            const return_team=new TeamEntity();

            return_team.id=new_team.id;
            return_team.team_name=new_team.team_name;
            return_team.company_id=new_team.company_id;

            return return_team;

        }


        return null;
    }

    /***
     * This function is used to create a project for a company
     * Returns null if the company doesn't exist. or if the team doens't exist
     */

    async createProject(projectName:string,companyName:string,hoursToComplete:number,teamName:string):Promise<ProjectEntity>
    {
        const c_id=await this.getCompanyID(companyName); //company_id

        const t_id=await this.getTeamIDVName(teamName); //team_id

        if(c_id>0 && t_id>0)
        {
            const new_project=await this.prisma.project.create({
                data:{
                    project_name:projectName,
                    owner_id:c_id,
                    man_hours:hoursToComplete,
                    team_id:t_id
                }
            })

            const return_project=new ProjectEntity();

            return_project.id=new_project.id;
            return_project.project_name=new_project.project_name;
            return_project.ownwer_id=new_project.owner_id;
            return_project.man_hours=new_project.man_hours;
            return_project.team_id=new_project.team_id;

            return return_project;
        }


        return null;

    }

    /***
     * This function is used to create a company object within the database.
     * Returns an object of the new Company Created
     */

    async createCompnany(c_name:string):Promise<UserCompany>
    {
        const new_company=await this.prisma.company.create({
            data:{
                company_name:c_name,
            }
        })

        const return_company=new UserCompany();

        return_company.id=new_company.id;
        return_company.company_name=new_company.company_name;

        return return_company;
    }

    /***
     * The function is used to generate a unique invitation code associated
     * with a company. The code is then stored in the database
     */

    async createInviteCode(company_name:string):Promise<InviteCodeEntity|null>
    {
        //generate random code e.g pwc288
        const prefix=company_name.substring(0,3);

        const min = Math.ceil(100);
        const max = Math.floor(300);
        const suffix= Math.floor(Math.random() * (max - min) + min); //The maximum is

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

            const return_code=new InviteCodeEntity();

            return_code.id=new_code.id;
            return_code.company_id=new_code.company_id;
            return_code.inviteCode=code;
            return_code.created=new_code.created;
            return_code.expire=new_code.expire;

            return return_code;

        }

        return null;

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

        if(invite!=null) //return the id of the company
        {
            return invite.company_id;
        }
        else
            return -1;
    }

    /***
     * This function returns an array of Persons Objects. Those are pending requests
     * to the company.
     */

    

    async getPendingRequests(companyName:string):Promise<UserPerson[]>
    {
        let return_arr=[];

        const c_id= await this.getCompanyID(companyName);

        if(c_id>0)
        {
            const get_pendingRequest=await this.prisma.person.findMany({
                where:{
                    role:Role.USER,
                    approved:false,
                    company_id:c_id
                },
            })
    
            for(let i=0;i<get_pendingRequest.length;++i)
            {
                return_arr[i]=new UserPerson();
                return_arr[i].id=get_pendingRequest[i].id;
                return_arr[i].name=get_pendingRequest[i].name;
                return_arr[i].surname=get_pendingRequest[i].surname;
                return_arr[i].email=get_pendingRequest[i].email;
            }

            return return_arr
        }
        else
            console.error("getPendingRequests() failed to resolve the requery")
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

        employees_arr=[]
        projects_arr=[]
        teams_arr=[]
        admins_arr=[]

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


    /***
     * Thos function returns the team's id from the database through the
     * team name. Returns -1 if team doesn't exist
     */

     async getTeamIDVName(t_name:string):Promise<number>
     {
        const team=await this.prisma.team.findUnique({
            where:{
               team_name:t_name
            }
        })

        if(team)
        {
            return team.id;
        }

        return -1;


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

    /***Admins superFunctions:
     * These are fucntions that may only be used by the admin to do admin stuff.
     * Don't use for user
     */

    /***
     * Use this function to add admins to the database.
     * This function connects the admin to the company.
     */

    async superCreateCompany(companyName:string,userPerson:UserPerson)
    {
        console.log("in super!!");
        console.log("company_name is "+companyName);

        const c_id=await this.getCompanyID(companyName);

        if(c_id>0)
        {   
            console.log("updating company");

            const update_company=await this.prisma.company.update({
                where:{
                    id:c_id,
                },
                data:{
                   employees:{
                       connect:{
                           id:userPerson.id,
                       }
                   },

                   admins:{
                       connect:{
                           id:userPerson.id
                       }
                   }
                   
                }
                
            })
        }   
        else
            console.error("superCreateCompany() failed to create a company");
    }

    /****
     * This function is used to add employees to the database.
    */

    async addEmployeeToCompany(companyName:string,userPerson:UserPerson)
    {
        const c_id=await this.getCompanyID(companyName);

        if(c_id>0)
        {
            console.log("Adding Employee");
            
            const update_company=await this.prisma.company.update({
                where:{
                    id:c_id,
                },
                data:{
                   employees:{
                       connect:{
                           id:userPerson.id,
                       }
                   }
                   
                }
                
            })

        }
        else
            console.error("superAddEmployeeToCompany() failed to add employee to company")
    }


    
    
}

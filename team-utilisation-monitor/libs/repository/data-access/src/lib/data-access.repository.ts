import { Person, Status } from '@prisma/client';
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { Role,Prisma } from '@prisma/client';
import { UserPerson,UserCompany, InviteCodeEntity, CompanyStatsEntity ,Skill,UserStatsEntity,CompanyUtilization} from '@team-utilisation-monitor/api/shared/data-access'
import { ErrorStrings, NullException, PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services'
import { TeamEntity } from '@team-utilisation-monitor/api/shared/data-access';
import { ProjectEntity } from '@team-utilisation-monitor/api/shared/data-access';
import { Utilization } from '@team-utilisation-monitor/api/shared/data-access';
import { pid } from 'process';


@Injectable()
export class DataAccessRepository {

    constructor(private readonly prisma:PrismaService){}

    async returnObject(id:number,name:string,surname:string,email:string,suspended:boolean,role:string,company:string,position:string,company_id:number)
    {
        const user_person=new UserPerson();

        user_person.id=id;
        user_person.name=name;
        user_person.surname=surname;
        user_person.email=email;
        user_person.role=role;
        user_person.suspended=suspended;
        user_person.position=position;
        user_person.company_name=company;
        user_person.company_id=company_id;



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


    /****
     * This function is used to add a new admin to an existing compony
     * Returns null if the company doesn't exist
    */

    async addAdminToCompany(f_name:string,f_surname:string,f_email:string,f_company_name:string):Promise<UserPerson|null>
    {
        const c_id=await this.getCompanyID(f_company_name);

        if(c_id>0)
        {
          try  //Catch email constraint
          {

            const new_admin=await this.prisma.person.create({
                data:{
                    name:f_name,
                    surname:f_surname,
                    email:f_email,
                    company_id:c_id,
                    admin_id:c_id,
                    role:Role.ADMIN,
                    approved:true
                }
            })

            const return_admin=new UserPerson();

            return_admin.company_id=new_admin.id;
            return_admin.name=new_admin.name;
            return_admin.surname=new_admin.surname;
            return_admin.email=new_admin.email;
            return_admin.company_name=f_company_name;
            return_admin.company_id=new_admin.company_id;
            return_admin.role=new_admin.role;

            this.superCreateCompany(f_company_name,return_admin);

            return return_admin;
          }
          catch(e)
          {
            if(e instanceof Prisma.PrismaClientKnownRequestError)
            {
              console.log("Email duplicates");
              return null;
            }
          }
      }

    }

    /***
     * This function is used to register an admin onto a company. If the company already exists
     * the admin will be added to an existing company. If it doesn't,  a new compnay will be created.
     * Returns null if admin cannot be created, because company doesn't exist
    */

    async createUserAdmin(f_name:string,f_surname:string,f_email:string,f_company_name:string):Promise<UserPerson|null>
    {
        const c_id=await this.getCompanyID(f_company_name);

        if(c_id>0) //the company already exists
        {
          return this.addAdminToCompany(f_name,f_surname,f_email,f_company_name);
        }
        else //the admin is an admin of a new company
        {
            console.log("creating company")

            await this.createCompnany(f_company_name);

            //create the person entity
            const c_id=await this.getCompanyID(f_company_name); //new company id

           // console.log("company id is "+c_id);

            if(c_id>0)
            {

              try
              {

                const new_admin=await this.prisma.person.create({
                    data:{
                        name:f_name,
                        surname:f_surname,
                        email:f_email,
                        company_id:c_id,
                        role:Role.ADMIN,
                        approved: true,
                        position:{
                            create:{
                                title:"Administrator"
                            }
                        }
                    }
                })

                //return new admin

                const return_admin=new UserPerson();

                return_admin.company_id=new_admin.id;
                return_admin.name=new_admin.name;
                return_admin.surname=new_admin.surname;
                return_admin.email=new_admin.email;
                return_admin.company_name=f_company_name;
                return_admin.company_id=new_admin.company_id;
                return_admin.role=new_admin.role;

                this.superCreateCompany(f_company_name,return_admin);

                return return_admin;
              }
              catch(e)
              {
                if(e instanceof Prisma.PrismaClientKnownRequestError)
                {
                  console.log("Email duplicates");
                  return null;
                }
              }

            }

        }


    }

    /***
     * I know you want to know what happens when you call this guy :)
     */

    async crash(){
      throw new NullException().stack;
    }

    /***
     * The function returns all projects or teams that belong to a company given as input parameters
     * Returns null if compnay does not exist'
     * if typeOfContent==0, return the projects and their teams
     * else if typeOfContent==1, return the teams
     */

    async getAllProjectsOrTeamsOfCompany(companyName:string,typeOfContent:number):Promise<ProjectEntity[]|TeamEntity[]>
    {
        const c_id=await this.getCompanyID(companyName);

        let return_projects=[];
        let return_teams=[];
        let default_arr=[];

        if(c_id>0) //company exists
        {
            if(typeOfContent===0) //get projects
            {
                const all_projects=await this.prisma.project.findMany({
                    where:{
                        owner_id:c_id
                    }
                })

                if(all_projects)
                {
                    for(let i=0;i<all_projects.length;++i)
                    {
                        return_projects[i]=new ProjectEntity();

                        return_projects[i].id=all_projects[i].id;
                        return_projects[i].project_name=all_projects[i].project_name;
                        return_projects[i].owner_id=all_projects[i].owner_id;
                        return_projects[i].man_hours=all_projects[i].man_hours;
                        return_projects[i].completed=all_projects[i].completed;

                        //set all the teams working on the project. Remember that two or more teams can work on the same project

                    }

                    return return_projects
                }
                else
                    return_projects; //empty array
            }
            else if(typeOfContent===1) //get all teams
            {
                const all_teams=await this.prisma.team.findMany({
                    where:{
                        company_id:c_id,
                    },
                    include:{
                        projects:true
                    }
                })

                if(all_teams)
                {
                    for(let i=0;i<all_teams.length;++i)
                    {
                        return_teams[i]=new TeamEntity();

                        return_teams[i].id=all_teams[i].id;
                        return_teams[i].team_name=all_teams[i].team_name;
                        return_teams[i].company_id=all_teams[i].company_id;
                    }

                    return return_teams;
                }
                else
                {
                    return return_teams;
                }

            }
            else
                return default_arr;


        }
        else
            throw new NullException().stack;
    }


    /***
     * The function returns the number of teams in a company given as input parameters
     * Returns null if compnay does not exist
     */

    async getNumberOfTeamsOfCompany(companyName:string):Promise<number>
    {
        const c_id=await this.getCompanyID(companyName);

        if(c_id>0)
        {
                const all_teams=await this.prisma.team.findMany({
                    where:{
                        company_id:c_id,
                    },
                    include:{
                        projects:true
                    }
                })

                if(all_teams)
                {
                    return all_teams.length;
                }
                else
                {
                    return 0;
                }

        }
        else
            throw new NullException().stack;
    }

    /***
     * The function returns the members of a team given as input parameters
     * Returns null if team does not exist
    */

    async getAllMemebrsOfTeam(teamName:string):Promise<UserPerson[]>
    {
        const t_id=await this.getTeamIDVName(teamName); //team_id

        if(t_id>0) //team exists
        {
            const Team=await this.prisma.personOnTeams.findMany({
                where:{
                    team_id:t_id,
                }
            })

            if(Team)
            {
                let return_arr=[];
                    for(let i=0;i<Team.length;++i)
                    {
                        return_arr.push(await this.getPersonVID(Team[i].person_id))
                    }
                    return return_arr;

            }
        }
        else
          throw new NullException().stack;
    }

    /***
     * The function creates and adds the user object to the database. Returns the user object from
     * The database
     */

    async createUser(f_name:string,f_surname:string,f_email:string,inviteLink:string):Promise<UserPerson>
    {
        //use the invitation link to get the company id

        const return_user=new UserPerson(); 

        const local_company_id=await this.verifyCode(inviteLink);

        if(local_company_id>0) //link is valid
        {
          const company_name=(await this.getCompanyVID(local_company_id)).company_name;
          
          try
          {

            const new_user=await this.prisma.person.create({
                data:{
                    name:f_name,
                    surname:f_surname,
                    email:f_email,
                    company_id:local_company_id,
                }
            })

            

            return_user.id=new_user.id;
            return_user.name=new_user.name;
            return_user.surname=new_user.surname;
            return_user.email=new_user.email;
            return_user.company_name=company_name;
            return_user.company_id=local_company_id;
            return_user.role=new_user.role;
            return_user.utilisation=new_user.utilisation;
            return_user.error_string=ErrorStrings.NONE;

            //DEV Note: There's no need to add the user to the company relation. Prisma magic

            return return_user;
          }
          catch(e)
          {
            if(e instanceof Prisma.PrismaClientKnownRequestError)
            {
              return_user.error_string=ErrorStrings.DUPLICATE_EMAIL;
              return return_user;
            }
          }
        }
        else
        {
          return_user.error_string= ErrorStrings.INVALID_INVITE_CODE;  //Link does not exist
          return return_user;
        }


    }

    /***
     * This function is used to create or add a new team to the database.
     * This function creates a team in isolation
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


        throw new NullException().stack;
    }

    /***
     * This function is used to create a project for a company
     * Returns null if the company doesn't exist. or if the team doens't exist.
     * If teamName==null i.e project is created in isolation
     * if teamName!=null the project is associated with a team
    */

    async createProject(projectName:string,companyName:string,hoursToComplete:number,teamName:string):Promise<ProjectEntity>
    {
        const existing_project=await this.prisma.project.findUnique({
            where:{
                project_name:projectName
            }
        })

        if(existing_project) //project already in the db
            throw new NullException().stack; //project already exists

        const c_id=await this.getCompanyID(companyName); //company_id

        let t_id=0;

        if(teamName!=null)
            t_id=await this.getTeamIDVName(teamName); //team_id


        if(c_id>0 && t_id>0)
        {
            const new_project=await this.prisma.project.create({
                data:{
                    project_name:projectName,
                    owner_id:c_id,
                    man_hours:hoursToComplete,
                    /*teams:{
                        create:[{
                            team:{
                                connect:{
                                    id:t_id
                                }
                            }
                        }]
                    }*/
                }
            })



            await this.AssignProjectToTeam(t_id,new_project.id);

            const return_project=new ProjectEntity();

            return_project.id=new_project.id;
            return_project.project_name=new_project.project_name;
            return_project.ownwer_id=new_project.owner_id;
            return_project.man_hours=new_project.man_hours;
            return_project.teams=await this.getAllTeamsWorkingOnProject(projectName);

            return return_project;
        }
        else //project is being created in isolation
        {
            const new_project=await this.prisma.project.create({
                data:{
                    project_name:projectName,
                    owner_id:c_id,
                    man_hours:hoursToComplete
                }
            })

            const return_project=new ProjectEntity();

            return_project.id=new_project.id;
            return_project.project_name=new_project.project_name;
            return_project.ownwer_id=new_project.owner_id;
            return_project.man_hours=new_project.man_hours;


          return return_project;
        }

    }

    /****
     * Use this function to assign a team to a project using the Team's and project's names.
    */

    async AssignProjectToTeamVNames(teamName:string,projectName:string):Promise<string>
    {
        const team_id=await this.getTeamIDVName(teamName);

        const project_id=await this.getProjectID(projectName);

        //console.log(team_id+" "+teamName);
        //console.log(project_id+" "+projectName);

        if(team_id>0 && project_id>0)
            return await this.AssignProjectToTeam(team_id,project_id);
        else
            return "Couldn't assign a project to a Team. Either project or Team doesn't exist";
    }


    /***
     * This function is used to assign a team to a project
     * It takes it the project's ID and the team's ID and links them
    */

    async AssignProjectToTeam(team_id:number,project_id:number):Promise<string>
    {
        const existing_project=await this.prisma.project.findUnique({
            where:{
                id:project_id
            }
        })

        if(existing_project==null)
            return "Project Doesn't exist";

        const existing_team=await this.prisma.team.findUnique({
            where:{
                id:team_id
            }
        })

        if(existing_team==null)
            return "Team Doesn't exist"

        if(existing_project && existing_team) //project and team do exist
        {

            await this.ResetAssignedHours(existing_project.project_name);

            const team=await this.prisma.teamsOnProjects.create({
              data:
              {
                team_id:team_id,
                project_id:project_id
              }
            })

            await this.CalculateUtilizationVProject(existing_project.project_name);  //Call the Utilization function after creating a team

            return "Successfully assigned "+(await this.getTeam(team_id)).team_name+" to project "+(await this.getProject(project_id)).project_name;
        }
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
        this.createInviteCode(c_name);

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


        //first check if the inviteCode exists

        const companyId=await this.getCompanyID(company_name);

        const exist_code=await this.prisma.invites.findUnique({
            where:{
                company_id:companyId
            }
        })

        //console.log(exist_code);

        if(exist_code)
        {
            const return_code=new InviteCodeEntity();

            return_code.id=exist_code.id;
            return_code.company_id=exist_code.company_id;
            return_code.inviteCode=exist_code.invite_code;
            return_code.created=exist_code.created;
            return_code.expire=exist_code.expire;

            return return_code;
        }


        //generate random code e.g pwc288

        const prefix=company_name.substring(0,3);

        const min = Math.ceil(100);
        const max = Math.floor(300);
        const suffix= Math.floor(Math.random() * (max - min) + min); //The maximum is

        const code=prefix+suffix;

        //put the code into the database. Code doesn't exist

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

        throw new NullException().stack;

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
     * Use this function to set the Token.
     * Returns true if token successfully set.
     * Returns false otherwise
    */

    async setToken(f_email:string,token:string):Promise<boolean>
    {
      console.log("data-access");

      const p_id=(await this.getUserIDVEmail(f_email)).id;

      if(p_id>0)
      {
        const person=await this.prisma.person.findUnique({
            where:{
              email:f_email,
            }
        })

        if(person){

          if(person.active_Token=='null')
          {
            const updated_person=await this.prisma.person.update({
              where:{
                email:f_email,
              },
              data:{
                active_Token:token,
              }
            })

            if(updated_person)
            {
              return true;
            }
            else
              return false;
          }
          else //token already exists i.e user recently loggged in
          {
            return true;
          }
        }
        else
          throw new NullException().stack;

      }
      else
        throw new Error("Failed to find person");
    }

    /***
     * Use this function to verify a token.
     * Returns true if the token is valid.
     * False otherwise.
    */

    async verifyToken(f_email:string,token:string):Promise<boolean>
    {
      const p_id=(await this.getUserIDVEmail(f_email)).id;

      if(p_id>0){


        const existing_person=await this.prisma.person.findUnique({
          where:{
            email:f_email,
          }
        })

        if(existing_person){
            if(token==existing_person.active_Token){
              return true;
            }
            else
              return false; //tokens don't match up
        }
        else
          return false;

      }
      else
        return false;

    }


    /****
     * Use this function to get the token associated with the email
    */

    async getToken(f_email:string):Promise<string>
    {
      const p_id=(await this.getUserIDVEmail(f_email)).id;

      if(pid!=null && p_id>0){

        const existing_person=await this.prisma.person.findUnique({
          where:{
            email:f_email,
          }
        })

        if(existing_person){
          return existing_person.active_Token;
        }
        else{
          try {
            throw new Error("Unable to find user token");
          } catch (error) {
            console.log(error);
          }
        }
          
      }
      else{
        try {
          throw new Error("Unable to find user");
        } catch (error) {
          console.log(error);
        }
      }
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
          throw new Error("Failed to find company");
    }


    /***
     * This function is used to approve requests via id of the user.
     * Returns true if application is successful
     */

     async approveRequestVEmail(f_email:string):Promise<boolean>
     {


         const confirm=await this.prisma.person.update({
             data:{
                 approved:true
             },
             where:{
                email:f_email
             }
         })
         console.log("I changed the data")
         if(confirm)
             return true;
         else
             return false;
    }

    /****
     * This function returns an object CompanyStats, that packages stats of the
     * company like number of projects, teams,employees and Admins
     * Returns null if company doesn't exist
    */

    async getCompanyStats(companyName:string):Promise<CompanyStatsEntity>
    {
        const company_object=await this.getCompanyVName(companyName);

        let numProjects=0;
        let numTeams=0;
        let numEmployees=0;
        let numAdmins=0;
        let numCompleteProjects=0;

        if(company_object)
        {
            numProjects=company_object.projects.length;
            numTeams=company_object.teams.length;
            numEmployees=company_object.employees.length;

            for(let i=0;i<company_object.employees.length;++i)
            {
              if(company_object.employees[i].role==Role.ADMIN)
              {
                ++numAdmins;
              }
            }

            

            for(let i=0;i<company_object.projects.length;++i){
              if(company_object.projects[i].completed==true){
                ++numCompleteProjects;
              }
            }

            const return_stats=new CompanyStatsEntity();

            return_stats.numProjects=numProjects;
            return_stats.numTeams=numTeams;
            return_stats.numEmployees=numEmployees;
            return_stats.numAdmins=numAdmins;
            return_stats.Utilization=await this.companyOveralUtilisation();
            return_stats.numCompleteProjects=numCompleteProjects;

            return return_stats;

        }
        else
            throw new NullException().stack;

    }

    /****
     * This function returns all teams associated with the project
     * The functin takes in the project's name
     * Returns null if project doesn't exist.
     * Returns an array of [TeamEntity] objects
    */
    async getAllTeamsWorkingOnProject(project_name:string):Promise<TeamEntity[]>
    {

        const p_id=await this.getProjectID(project_name);
        let return_arr=[];


        if(p_id>0) //project does exist
        {
            const project=await this.prisma.project.findUnique({
                where:{
                    id:p_id
                },
                include:{
                    teams:true
                }
            })

            if(project)
            {
                for(let i=0;i<project.teams.length;++i)
                {
                    const team_object=new TeamEntity();

                    const team_id=project.teams[i].team_id;

                    team_object.team_name=(await this.getTeam(team_id)).team_name;
                    team_object.project_name=project.project_name;
                    team_object.id=team_id;

                    return_arr.push(team_object);
                }
            }

            return return_arr; //[] means that there are no teams

        }
        else{ //project does not exist
            throw new NullException().stack;
        }
    }

    /****
     * This function returns a team's projects i.e all projects the team is working on
     * returns an empty array if the team has no projects
     * Returns an array of all projects the team is working on
    */

    async getAllProjectsOfTheTeam(team_name:string):Promise<ProjectEntity[]>
    {
        const t_id=await this.getTeamIDVName(team_name);
        let return_arr=[]

        if(t_id>0)
        {
            const team= await this.prisma.team.findUnique({
                where:{
                  id:t_id,
                },
                include:{
                    projects:true
                }
            })


            if(team)
            {
                for(let i=0;i<team.projects.length;++i)
                {
                    const project_object=new ProjectEntity();
                    const project_id=team.projects[i].project_id;

                    project_object.id=project_id;
                    project_object.project_name=(await this.getProject(project_id)).project_name;

                    return_arr.push(project_object);
                }
            }

            return return_arr;

        }
        else
        {
            throw new NullException().stack;
        }
    }


    /***
     * Returns an array of all persons on the dataBase
    */

    async getAllPersons():Promise<UserPerson[]>
    {
        //absolutely brilliant. The include tag includes other details i.e other dchema data
        //that might be neglected
        const people=await this.prisma.person.findMany({
            include:{
                position:true,
                company:true,
            }
        });

        const people_arr=[];


        if(people)
        {

            for(let i=0;i<people.length;++i)
            {
                people_arr.push(this.returnObject(people[i].id,people[i].name,people[i].surname,people[i].email,people[i].suspended,people[i].role,people[i].company.company_name,people[i].position.title,people[i].company_id));
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
            }
        })

        //console.log(person);

        if(person)
        {
            let local_project:string;
            let local_company:string;
            let title:string;


            if(person.project==null)
                local_project=null;
            else
                local_project=person.project.project_name

            if(person.company==null)
                local_company=null;
            else
                local_company=person.company.company_name;

            if(person.position==null)
                title=null;
            else
                if(person.position.title==null)
                  title=null;
                else
                  title=person.position.title;


            const return_user= await this.returnObject(person.id,person.name,person.surname,person.email,person.suspended,person.role,local_company,title,person.company_id);

            return_user.utilisation=person.utilisation;
            return_user.approved=person.approved;

            return return_user;
        }
        else
            throw new NullException().stack;
    }


    /***
     * Use this function to get the team object from the database
    */

    async getTeam(team_ID:number):Promise<TeamEntity>
    {
        const Team=await this.prisma.team.findUnique({
          where:{
            id:team_ID
          }
        })

        const team=new TeamEntity();
        team.id=Team.id;
        team.team_name=Team.team_name;
        team.company_id=Team.company_id;

        return team;
    }

    /***
     * Use this function to get the project object from the Database using the ID
    */

    async getProject(project_ID:number):Promise<ProjectEntity>
    {
        const Project=await this.prisma.project.findUnique({
            where:{
                id:project_ID
            }
        })

        const project=new ProjectEntity();
        project.id=Project.id;
        project.project_name=Project.project_name;
        //project.ownwer_id=Project.owner_id;
        project.man_hours=Project.man_hours;

        return project;
    }

    /**
     * This function returns the company object from the database.
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

        if(company){
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
                  if(company.employees[i].approved==true)
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
                    user.utilisation=company.employees[i].utilisation;
                    user.weekly_Hours=company.employees[i].weekly_hours;

                    /**
                     * What's missing is the project, team name and project,team id field
                     */

                    employees_arr.push(user);
                  }
                }
            }

            if(company.projects!=null)
            {
                for(let i=0;i<company.projects.length;++i)
                {
                  const project=new ProjectEntity();

                  project.id=company.projects[i].id;
                  project.project_name=company.projects[i].project_name;
                  project.ownwer_id=company.projects[i].owner_id;
                  project.man_hours=company.projects[i].man_hours;
                  project.completed=company.projects[i].completed;

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
        else
            throw new NullException().stack;

    }

    /***
     * This function returns an array of employees of a company
     * Returns null if company doesn't exist
     */

    async getEmployeesOfCompany(companyName:string):Promise<UserPerson[]>
    {
        const company=await this.prisma.company.findUnique({
            where:{
                company_name:companyName
            },
            include:{
                employees:true,
            }
        })

        if(company)
        {
            let return_arr=[];

            if(company.employees!=null)
            {
                for(let i=0;i<company.employees.length;++i)
                {

                    if(company.employees[i].approved)
                    {
                        const user=new UserPerson();

                        user.id=company.employees[i].id;
                        user.name=company.employees[i].name;
                        user.surname=company.employees[i].surname;
                        user.email=company.employees[i].email;
                        user.role=company.employees[i].role;
                        user.suspended=company.employees[i].suspended;
                        user.company_name=company.company_name;
                        user.company_id=company.id;
                        user.utilisation=company.employees[i].utilisation;
                        user.weekly_Hours=company.employees[i].weekly_hours;

                        return_arr.push(user);
                    }

                }
            }

            return return_arr;
        }
        else
            throw new NullException().stack;
    }

    /***
     * This function returns the company object from the database using
     * the id of the company
     */

    async getCompanyVID(f_id:number):Promise<UserCompany|null>
    {
        const company=await this.prisma.company.findUnique({
            where:{
                id:f_id
            },
            include:{
                employees:true,
                projects:true,
                teams:true,
                admins:true,
                invite:true
            }
        })

        if(company)
        {
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
                    user.role=company.employees[i].role;
                    user.suspended=company.employees[i].suspended;
                    user.company_name=company.company_name;
                    user.company_id=company.id;
                    user.utilisation=company.employees[i].utilisation;
                    user.weekly_Hours=company.employees[i].weekly_hours;
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
                    workers_arr=[]

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
                        user.company_name=company.company_name;
                        user.company_id=company.id;

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
                        user.role=company.employees[i].role;
                        user.suspended=company.employees[i].suspended;
                        user.company_name=company.company_name;
                        user.company_id=company.id;

                        admins_arr.push(user);
                    }
                }
            }

            return  this.returnCompanyObject(company.id,company.company_name,admins_arr,employees_arr,projects_arr,teams_arr,company.invite.invite_code)

        }


    }

    /**
     * This function returns the user id. Returns an object with the user id
     * @param arg_email
     * @returns
     */

    async getUserIDVEmail(arg_email:string):Promise<UserPerson>
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
        else{
          const non_user=new UserPerson();
          non_user.id=-1;
          return non_user;
        }
    }

    /***
     * This function returns a person via ID.
     * Returns null if the user doesn't exist in the database
    */

     async getPersonVID(person_id:number):Promise<UserPerson>
     {
        const person=await this.prisma.person.findUnique({
            where:{
                id:person_id
            }
        })

        if(person){
            const return_user=new UserPerson();

            return_user.id=person.id;
            return_user.name=person.name;
            return_user.surname=person.surname;
            return_user.email=person.email;
            return_user.role=person.role;
            return_user.suspended=person.suspended;
            return_user.approved=person.approved;

            return return_user;
        }
        else
        {
          throw new NullException().stack;
        }
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

    /***
     * This function gets all the teams working on the current project.
     * It Takes in the project_id and returns all teams working on the project
    */

    async getTeamsOnProjectVID(projectId:number):Promise<any>
    {
        //this returns all of the projects and it's teams

        const teams= await this.prisma.project.findMany({
            where:{
                id:projectId,
            },
            include:{
                teams:true
            }
        })

        return teams;


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

    /***
     * This function is used to return the project's ID using the name.
     * Returns -1 if id doesn't exist.
    */


    async getProjectID(p_name:string):Promise<number>
    {
        const project=await this.prisma.project.findUnique({
            where:{
                project_name:p_name,
            }
        })

        if(project)
        {
            return project.id;
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

    async superCreateCompany(companyName:string,userPerson:UserPerson):Promise<void>
    {
        const c_id=await this.getCompanyID(companyName);

        if(c_id>0)
        {
            await this.prisma.company.update({
                where:{
                    id:c_id,
                },
                data:{
                   employees:{
                       connect:{
                           id:userPerson.id,
                           email:userPerson.email
                       }
                   }
                }
            })

            if(userPerson.role=="ADMIN")  //If UserPerson is an Admin
            {
              await this.prisma.company.update({
                where:{
                    id:c_id,
                },
                data:{
                  admins:{
                    connect:{
                        id:userPerson.id,
                        email:userPerson.email
                    }
                  }
                }
            })
            }
        }
        else
          throw new Error("Failed to create a new company");
    }

    /****
     * This function is used to add employees to the database.
    */

    async addEmployeeToCompany(companyName:string,userPerson:UserPerson):Promise<void>
    {
        const c_id=await this.getCompanyID(companyName);

        if(c_id>0)
        {
            await this.prisma.company.update({
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
          throw new Error("Failed to add employee to company");
    }


    async getInviteCode(CompanyName:string):Promise<string>
    {
      const ID=await this.getCompanyID(CompanyName);

      const invite=await this.prisma.invites.findUnique(
        {
        where:{
          id:ID
      }}
      )
      return invite.invite_code;
    }

    /***
     * This function is used to add the Team members to the team.
     */

    async addTeamMember(teamName:string,EmplooyeEmail:string):Promise<string>
    {

      const empl_id= (await this.getUserIDVEmail(EmplooyeEmail)).id;
      const teamID=await this.getTeamIDVName(teamName);

      const teamsOnproject=await this.prisma.teamsOnProjects.findMany(
        {
          where:
          {
            team_id:teamID
          }
        }
      )

      for(let i=0;i<teamsOnproject.length;i++)
      {
        let projectName=(await this.prisma.project.findUnique(
          {
            where:{
              id:teamsOnproject[i].project_id
            }
          }
        )).project_name

        await this.ResetAssignedHoursForOneTeam(projectName,teamName)
      }


      if(empl_id>0 && teamID>0)
      {

        //Check is the person is already a memebr
        const IsMember=await this.prisma.personOnTeams.findMany(
          {
            where:
            {
              person_id:empl_id,
              team_id:teamID
            }
          }
        )

        if(IsMember.length==0)
        {
          await this.prisma.personOnTeams.create(
            {
              data:{
                  person_id:empl_id,
                  team_id:teamID,
              }
          })

          await this.UpdateUtilizationAfterMemberAddition(teamName)   //Updates team's Utilization after memebr is added
          return "Team Member added"
        }
        else
        {
          return "Already a team Member"
        }
        }

    }

    async getTeamMembers(teamName:string):Promise<UserPerson[]>
    {
      const teamID=await this.getTeamIDVName(teamName);
      let members_Arr:UserPerson[]
      members_Arr=[]


      const Team_members=await this.prisma.personOnTeams.findMany(
        {
          where:{
            team_id:teamID
          }
        }
      )

      for(let i=0;i<Team_members.length;i++)
      {
        const person=await this.prisma.person.findUnique(
          {
            where:
            {
              id:Team_members[i].person_id
            }
          }
        )

        const obj=new UserPerson()
        obj.name=person.name
        obj.surname=person.surname
        obj.email=person.email
        members_Arr.push(obj)
      }

      return members_Arr;
    }

    async deleteMember(teamName:string,email:string):Promise<string>
    {

      const empl_id= (await this.getUserIDVEmail(email)).id;
      const teamID=await this.getTeamIDVName(teamName);

      const teamsOnproject=await this.prisma.teamsOnProjects.findMany(
        {
          where:
          {
            team_id:teamID
          }
        }
      )

      for(let i=0;i<teamsOnproject.length;i++)
      {
        let projectName=(await this.prisma.project.findUnique(
          {
            where:{
              id:teamsOnproject[i].project_id
            }
          }
        )).project_name
        await this.ResetAssignedHoursForOneTeam(projectName,teamName)
      }

      await this.prisma.personOnTeams.deleteMany(
        {
          where:{
            person_id:empl_id,
            team_id:teamID
          }
        })

        await this.UpdateUtilizationAfterMemberAddition(teamName);   //recalculate utilization for that one team

        return "Team Member DELETED"
    }


    /***
     * Permanantly removes employee from the system.
     * 
     */

    async deleteEmployee(Email:string):Promise<Person>
    {
      const empl_id= (await this.getUserIDVEmail(Email)).id;

      //Unlink person from all teams
      await this.prisma.personOnTeams.deleteMany(
        {
          where:
          {
            person_id:empl_id
          }
        }
      )

      //Unlink person from all skills
      await this.prisma.personOnSkills.deleteMany(
        {
          where:
          {
            person_id:empl_id
          }
        }
      )

      const deletedUser=await this.prisma.person.delete(
        {
          where:{
            email:Email
          }
        }
      )
      return deletedUser;
    }

    /*async updateProfile(Email:string,name:string,surname:string)
    {
      const
    }*/


    async addSkill(skillType:string):Promise<string>
    {
      try
      {
          const Skill = await this.prisma.skills.create({
          data: {
            skill:skillType
          },
          })

          return Skill.skill
      }catch(e)
      {
        if(e instanceof Prisma.PrismaClientKnownRequestError)
        {
          return "The Skill Already exist on DB"
        }
      }

    }

    /***
     * Function returns true if the skill has been successfully defeated.
     * And false if not successfully deleted.
     */

    async RemoveSkill(skillType:string):Promise<boolean>
    {
      try
      {
        await this.prisma.skills.delete({
          where:
          {
            skill:skillType
          }
        })

        return true;
      }
      catch(e)
      {
        if(e instanceof Prisma.PrismaClientKnownRequestError)
        {
          return false;
        }
      }
    }

    async getSkills():Promise<Skill[]>
    {
      const Skills=await this.prisma.skills.findMany();
      let SkillsArray:Skill[];
      SkillsArray=[]

      if(Skills!=null)
      {


        for(let i=0;i<Skills.length;i++)
        {
          const sk=new Skill()
          sk.id=Skills[i].id;
          sk.skill=Skills[i].skill

          SkillsArray.push(sk);
        }
        return SkillsArray;
      }
      else
      {
        throw new NullException().stack;
      }
    }

    async UpdatePersonProfile(Email:string,Name:string,Surname:string):Promise<string>
    {



      const empID=await this.prisma.person.update(
        {
          where:
          {
            email:Email
          },
          data:
          {
            name:Name,
            surname:Surname
          }
        }
      )

      if(empID)
      {
        return "UserProfileUpdated"
      }
      else
      {
        return "User Profile Update Failed"
      }
    }





    async getAllocatedTeams(UserEmail:string):Promise<TeamEntity[]>
    {
        const userId=(await this.prisma.person.findUnique(
            {
                where:
                {
                    email:UserEmail
                }
            }
        )).id

        let team_arr:TeamEntity[]
        team_arr=[]

        //Return all teams that have this user as a member
        const Teams=(await this.prisma.personOnTeams.findMany({
            where:
            {
                person_id:userId
            }
        }))

        for(let i=0;i<Teams.length;i++)
        {
            //const obj=new TeamEntity();
            team_arr.push(await this.getTeam(Teams[i].team_id));
        }

        return team_arr;

    }

    async getAllocatedProjects(userEmail:string):Promise<ProjectEntity[]>
    {
      const teams=await this.getAllocatedTeams(userEmail);
      let projects_arr:ProjectEntity[]
      projects_arr=[]

      for(let i=0;i<teams.length;i++)  //For every team that our employee is  a part of ,we check that team's projects
      {
        const Team_id=teams[i].id;
        const Projects=await this.prisma.teamsOnProjects.findMany(
          {
            where:
            {
              team_id:Team_id
            }
          }
        )

        for(let j=0;j<Projects.length;j++)  //Add the projects to the projects array
        {
          projects_arr.push(await this.getProject(Projects[j].project_id));  //Get the projects using the projects IDs
        }
      }

      return projects_arr;
    }

    async UpdateSkill(UserEmail:string,skillType:string):Promise<string>
    {

      const skill=await this.prisma.skills.findUnique(
        {
          where:
          {
            skill:skillType
          }
        }
      )

      const userId=(await this.getUserIDVEmail(UserEmail)).id;
      const PersonSkill=await this.prisma.personOnSkills.create(
          {
            data:{
              skill_id:skill.id,
              person_id:userId
            }
          }
        )

        if(PersonSkill)
        {
          return "User Skill Added"
        }
        else
        {
          return "Something went wrong"
        }
    }

    async GetSkillVID(skillID:number):Promise<Skill>
    {
      const skill=await this.prisma.skills.findUnique(
        {
          where:
          {
            id:skillID
          }
        }
      )

      const skillObjs=new Skill()
      skillObjs.id=skillID;
      skillObjs.skill=skill.skill

      return skillObjs
    }

    /***
     * The function is used to get the skills of a user. The function takes
     * in a userEmail.
     */

    async GetUserSkills(UserEmail:string):Promise<string[]>
    {
      const userId=(await this.getUserIDVEmail(UserEmail)).id;
      let skill_Arr:string[]
      skill_Arr=[]

      const Skills=await this.prisma.personOnSkills.findMany(
        {
          where:
          {
            person_id:userId
          }
        }
      )

      for(let i=0;i<Skills.length;i++)
      {
        skill_Arr.push((await this.GetSkillVID(Skills[i].skill_id)).skill);
      }

      return skill_Arr

    }

    /***
     * Use this function to get the statistics of the individual.
     * Returns null if the user doesn't exist.
     */


    async GetIndividualsStats(UserEmail:string):Promise<UserStatsEntity>
    {
      //const userId=(await this.getUserIDVEmail(UserEmail)).id;

      const user= await this.prisma.person.findUnique({
        where:{
            email:UserEmail
        }
      })

      if(user){ //user does exist.

        const UserStats=new UserStatsEntity

        UserStats.numberOfTeams=(await this.getAllocatedTeams(UserEmail)).length

        UserStats.numberOfProjects=(await this.getAllocatedProjects(UserEmail)).length

        UserStats.numberOfSkills=(await this.GetUserSkills(UserEmail)).length

        //@Gift i need these fuunctions for utilisation. Sorry.
        UserStats.utilisation=user.utilisation;
        UserStats.status=user.status;
        UserStats.assignedHours=user.assigned_hours;
        UserStats.weeklyHours=user.weekly_hours;

        return UserStats

      }
      else
        throw new NullException().stack;

    }

    async GetAvailableTeamsForProject(projectName:string):Promise<string[]>
    {
      const projectId=await this.getProjectID(projectName);
      let TeamsObject:string[]
      TeamsObject=[]


      const Teams=await this.prisma.team.findMany();

      for(let i=0;i<Teams.length;i++)
      {
        if(await this.teamInProject(Teams[i].id,projectId))
        {
          //
        }
        else
        {
          TeamsObject.push(Teams[i].team_name)

        }
      }
      return TeamsObject

    }

    async teamInProject(teamId:number,projectID:number):Promise<boolean>
    {
      const Team=await this.prisma.teamsOnProjects.findMany(
        {
          where:
          {
            project_id:projectID,
            team_id:teamId
          }
        }
      )


      if(Team.length==0) //Team is not on the project
      {
        return false
      }
      else
      {
        return true;
      }
    }

    async AssignWeeklyHours(UserEmail:string,WeeklyHours:number):Promise<string>
    {


      const result=await this.prisma.person.update(
        {
          where:
          {
            email:UserEmail
          },
          data:
          {
            weekly_hours:WeeklyHours
          }
        }
      )

      if(result)
      {
        return "WeeklyHours Updated"
      }
      else
      {
        return "Something went wrong with the Update"
      }
    }
    /**
     * Use this function to get the number of members in a team.
     * Will return a -1 if team doesn't exist.
     * Remeber that a team can have 0 members.
    */


    async getNumberOfMembersInATeam(team_name:string):Promise<number>
    {
        const t_id=await this.getTeamIDVName(team_name);

        if(t_id>0){

            const existing_team= await this.prisma.team.findUnique({
                where:{
                    id:t_id
                },
                include:{
                    members:true,
                }
            })

            if(existing_team){
               return existing_team.members.length;
            }

        }
        else
            return -1;
    }

    /*
      This function returns the number of teams working on a project
      Project doesn't exist
     */

    async getNumberOfTeamsWorkingOnAProject(project_name:string):Promise<number>
    {
        const p_id=await this.getProjectID(project_name);

        if(p_id){ //project exists

            const existing_project=await this.prisma.project.findUnique({
                where:{
                    id:p_id,
                },
                include:{
                    teams:true,
                }
            })

            if(existing_project){
                return existing_project.teams.length;
            }
        }
        else
            return -1;
    }

    /***
     * Use this function to reset the assigned hours to 0,using the
     * person's ID.
    */

    async resetAssignedHoursVID(person_id:number){



        await this.prisma.person.update({
            where:{
                id:person_id
            },
            data:{
                assigned_hours:0
            }
        })
    }


    /***
     * This function is used to get the weekly hours of an individual
     * returns -1 if individual doesn't exist
    */

    async getWeeklyHoursOfIndividual(person_id:number):Promise<number>
    {
        const individual=await this.prisma.person.findUnique({
            where:{
                id:person_id,
            }
        })

        if(individual){
            return individual.weekly_hours;
        }
        else
            return -1;
    }

    /***
     * This function returns the assigned hours of the individual
     * returns -1 if individual doesn't exist
    */

    async getAssignedHoursOfIndividual(person_id:number):Promise<number>
    {
        const individual=await this.prisma.person.findUnique({
            where:{
                id:person_id,
            }
        })

        if(individual){
            return individual.assigned_hours;
        }
        else
            return -1;
    }

    /***
     * Use this function to get the status of the current value
    */

    async getStatus(value:number):Promise<Status>{

        if(value<0.5)
            return Status.UNDER_UTILISED;
        else if(value>=0.5 && value<0.75)
            return Status.FAIRLY_UTILISED;
        else if(value>=0.75 && value<1)
            return Status.HEAVILY_UTILISED;
        else if(value==1)
            return Status.FULLY_UTILISED;
        else
            return Status.OVER_UTILISED;
    }

    /***
     * Use this function to get the teamName provided that you supply
     * the teamID. Returns null if team doesn't exist
     */

    async getTeamNameVID(f_id:number):Promise<string>{

        const team=await this.prisma.team.findUnique({
            where:{
                id:f_id
            }
        })

        if(team){
            return team.team_name;
        }
        else
            throw new NullException().stack;
    }

    async GetUnderUtilizedEmployees(companyName:string):Promise<UserPerson[]>
    {
      //
      const comID=await this.getCompanyID(companyName);
      let employees_arr:UserPerson[]

      employees_arr=[]

      const compEmployees=await this.prisma.company.findUnique(
        {
          where:{
            id:comID
          },
          include:
          {
            employees:true
          }
        }
      )

      const Employees=compEmployees.employees;

      for(let i=0;i<Employees.length;i++)
      {
        const emp=new UserPerson;
        if((Employees[i].status=="OVER_UTILISED") || Employees[i].status=="FULLY_UTILISED")
        {
            //
            //console.log("I got in")
        }
        else
        {
            emp.name=Employees[i].name;
            emp.surname=Employees[i].surname;
            emp.email=Employees[i].email;
            emp.role=Employees[i].role;

            employees_arr.push(emp);
        }
      }

      return employees_arr;
    }


    /*
    UTILIZATION FUNCTIONS AND HELPERS by Gift*/
    async Project_Hours_Per_team(projectID:number):Promise<number>
    {
      const NumberOfTeams=await this.prisma.teamsOnProjects.count({
          where:{
            project_id:projectID
          }
        }
      )

      //Project manHours/Numberofeams
      const HoursPerTeam=((await this.getProject(projectID)).man_hours)/NumberOfTeams

      return HoursPerTeam;
    }

    async HoursPerTeamMemberOnProject(teamId:number,projectId:number):Promise<number>
    {
      //Get the number of members in the team
      const No_oF_Members=(await this.prisma.personOnTeams.findMany(
        {
            where:
            {
                team_id:teamId
            }
        }
      )).length

      //Hours per Team member=Project hours for a team/Number of team members
      const HoursPerMember=(await this.Project_Hours_Per_team(projectId))/No_oF_Members
      return HoursPerMember;
    }

    async CalculateUtilizationVProject(projectName:string):Promise<string>
    {
      const projectId=await this.getProjectID(projectName);


      //get all teams working on the project[]
      const TeamsOnProject=await this.prisma.teamsOnProjects.findMany({
        where:{
            project_id:projectId
        }}
      )


      for(let i=0;i<TeamsOnProject.length;i++)
      {
        const Team=await this.prisma.personOnTeams.findMany(
          {
            where:
            {
              team_id:TeamsOnProject[i].team_id   //Get All Team Members
            }
          }
        )

        if(Team)  //Team can be null
        {
          for(let j=0;j<Team.length;j++)  //Number of team Members
          {
            //Find and Update every team member
            const PersonObj=(await this.prisma.person.findUnique(
              {
                where:
                {
                  id:Team[j].person_id
                }
              }
            ))

            let AssignedHours=Math.round((PersonObj.assigned_hours+(await this.HoursPerTeamMemberOnProject(TeamsOnProject[i].team_id,projectId)))*100)/100;
            let WeeklyHours=PersonObj.weekly_hours;
            let Utilization=0;

            if(AssignedHours>0)
            {
              Utilization=Math.round(((AssignedHours/WeeklyHours)*100)*100)/100;
            }
            else
            {
              Utilization=0;
            }

            let Statuss:Status

            if(Utilization==100)
            {
              Statuss='FULLY_UTILISED'
            }
            else if(Utilization>=75 && Utilization<100)
            {
              Statuss='HEAVILY_UTILISED'
            }
            else if(Utilization>=50 && Utilization<75)
            {
              Statuss='FAIRLY_UTILISED'
            }
            else if(Utilization>100)
            {
              Statuss='OVER_UTILISED'
            }
            else
            {
              Statuss='UNDER_UTILISED'
            }

            await this.prisma.person.update(
              {
                where:
                {
                  id:Team[j].person_id
                },
                data:
                {
                  assigned_hours: AssignedHours,
                  utilisation:Utilization,
                  status:Statuss,
                }
              }
            )
          }
        }
      }

     //await this.updateHistoricUtilization();
    const date=(new Date());
    const day=date.getDate();
     if(day%7==0) //last day of the week(day 7/14/21/)
     {
        await this.updateHistoricUtilization();
     }

      return "Utilization complete"
    }


    async UpdateUtilizationForOneTeam(projectName:string,teamName:string):Promise<string>
    {
      const projectId=await this.getProjectID(projectName);
      const teamID=await this.getTeamIDVName(teamName);
      //get all teams working on the project[]
      const TeamsOnProject=await this.prisma.teamsOnProjects.findMany({
        where:{
            project_id:projectId,
            team_id:teamID
        }}
      )



      for(let i=0;i<TeamsOnProject.length;i++)
      {
        const Team=await this.prisma.personOnTeams.findMany(
          {
            where:
            {
              team_id:TeamsOnProject[i].team_id   //Get All Team Members
            }
          }
        )

        if(Team)  //Team can be null
        {
          for(let j=0;j<Team.length;j++)  //Number of team Members
          {
            //Find and Update every team member
            const PersonObj=(await this.prisma.person.findUnique(
              {
                where:
                {
                  id:Team[j].person_id
                }
              }
            ))

            let AssignedHours=Math.round((PersonObj.assigned_hours+(await this.HoursPerTeamMemberOnProject(TeamsOnProject[i].team_id,projectId)))*100)/100;
            let WeeklyHours=PersonObj.weekly_hours;
            let Utilization=0;

            if(AssignedHours>0)
            {
              Utilization=Math.round(((AssignedHours/WeeklyHours)*100)*100)/100;
            }
            else
            {
              Utilization=0;
            }

            let Statuss:Status

            if(Utilization==100)
            {
              Statuss='FULLY_UTILISED'
            }
            else if(Utilization>=75 && Utilization<100)
            {
              Statuss='HEAVILY_UTILISED'
            }
            else if(Utilization>=50 && Utilization<75)
            {
              Statuss='FAIRLY_UTILISED'
            }
            else if(Utilization>100)
            {
              Statuss='OVER_UTILISED'
            }
            else
            {
              Statuss='UNDER_UTILISED'
            }


            await this.prisma.person.update(
              {
                where:
                {
                  id:Team[j].person_id
                },
                data:
                {
                  assigned_hours: AssignedHours,
                  utilisation:Utilization,
                  status:Statuss
                }
              }
            )
          }
        }
        else
        {
          return "Reset Failed"
        }

      }

      return("Team "+teamName+" Utilization updated")

    }


    /* This function resets the assigned hours
    after a new team Has been added to a project
    The function is activated before adding a team to a project*/
    async ResetAssignedHours(projectName:string):Promise<string>
    {
      //
      const projectId=await this.getProjectID(projectName);

      //get all teams working on the project[]
      const TeamsOnProject=await this.prisma.teamsOnProjects.findMany({
        where:{
            project_id:projectId
        }}
      )


      for(let i=0;i<TeamsOnProject.length;i++)
      {
        const Team=await this.prisma.personOnTeams.findMany(
          {
            where:
            {
              team_id:TeamsOnProject[i].team_id   //Get All Team Members
            }
          }
        )

        if(Team)  //Team can be null
        {
          for(let j=0;j<Team.length;j++)  //Number of team Members
          {
            //Find and Update every team member
            const PersonObj=(await this.prisma.person.findUnique(
              {
                where:
                {
                  id:Team[j].person_id
                }
              }
            ))

            let AssignedHours=Math.round((PersonObj.assigned_hours-(await this.HoursPerTeamMemberOnProject(TeamsOnProject[i].team_id,projectId)))*100)/100;
            let WeeklyHours=PersonObj.weekly_hours;

            let Utilization=0;

            if(AssignedHours>0)
            {
              Utilization=Math.round(((AssignedHours/WeeklyHours)*100)*100)/100;
            }
            else
            {
              Utilization=0;
            }

            let Statuss:Status

            if(Utilization==100)
            {
              Statuss='FULLY_UTILISED'
            }
            else if(Utilization>=75 && Utilization<100)
            {
              Statuss='HEAVILY_UTILISED'
            }
            else if(Utilization>=50 && Utilization<75)
            {
              Statuss='FAIRLY_UTILISED'
            }
            else if(Utilization>100)
            {
              Statuss='OVER_UTILISED'
            }
            else
            {
              Statuss='UNDER_UTILISED'
            }



            await this.prisma.person.update(
              {
                where:
                {
                  id:Team[j].person_id
                },
                data:
                {
                  assigned_hours: AssignedHours,
                  utilisation:Utilization,
                  status:Statuss,

                }
              }
            )
          }
        }
        else
        {
          return "Reset Failed"
        }

      }
      return "Hours reset Succesfully"

    }

    //This function resets the Utilization hours of teamMembers upon new member arrival
    async ResetAssignedHoursForOneTeam(projectName:string,teamName:string):Promise<string>
    {
      const projectId=await this.getProjectID(projectName);
      const teamID=await this.getTeamIDVName(teamName);
      //get all teams working on the project[]
      const TeamsOnProject=await this.prisma.teamsOnProjects.findMany({
        where:{
            project_id:projectId,
            team_id:teamID
        }}
      )



      for(let i=0;i<TeamsOnProject.length;i++)
      {
        const Team=await this.prisma.personOnTeams.findMany(
          {
            where:
            {
              team_id:TeamsOnProject[i].team_id   //Get All Team Members
            }
          }
        )

        if(Team)  //Team can be null
        {
          for(let j=0;j<Team.length;j++)  //Number of team Members
          {
            //Find and Update every team member
            const PersonObj=(await this.prisma.person.findUnique(
              {
                where:
                {
                  id:Team[j].person_id
                }
              }
            ))

            let AssignedHours=Math.round((PersonObj.assigned_hours-(await this.HoursPerTeamMemberOnProject(TeamsOnProject[i].team_id,projectId)))*100)/100;
            let WeeklyHours=PersonObj.weekly_hours;
            let Utilization=Math.round(((AssignedHours/WeeklyHours)*100)*100)/100;

            let Statuss:Status

            if(Utilization==100)
            {
              Statuss='FULLY_UTILISED'
            }
            else if(Utilization>=75 && Utilization<100)
            {
              Statuss='HEAVILY_UTILISED'
            }
            else if(Utilization>=50 && Utilization<75)
            {
              Statuss='FAIRLY_UTILISED'
            }
            else if(Utilization>100)
            {
              Statuss='OVER_UTILISED'
            }
            else
            {
              Statuss='UNDER_UTILISED'
            }



            await this.prisma.person.update(
              {
                where:
                {
                  id:Team[j].person_id
                },
                data:
                {
                  assigned_hours: AssignedHours,
                  utilisation:Utilization,
                  status:Statuss,
                }
              }
            )
          }
        }
        else
        {
          return "Reset Failed"
        }

      }

      return ("Assigned hours for Team "+teamName+" were reset")

    }

    /*
    This Function recaulculates the utilization of all team Members of  A team in each project
    that the team is a part of since the addition of a member changes the team hours in all
    their projects
    */
    async UpdateUtilizationAfterMemberAddition(teamName:string):Promise<void>
    {
      //
      const teamID=await this.getTeamIDVName(teamName);

      const ProjectsByTeam=await this.prisma.teamsOnProjects.findMany(
        {
          where:
          {
            team_id:teamID
          }
        }
      )

      if(ProjectsByTeam)
      {
        for(let i=0;i<ProjectsByTeam.length;i++)
        {
          //

          const Project=await this.prisma.project.findUnique(
            {
              where:
              {
                id:ProjectsByTeam[i].project_id
              }
            }
          )
          await this.UpdateUtilizationForOneTeam(Project.project_name,teamName)
        }
      }
    }


    /*
    This function resets the Utilization per team member so that it can be recalculated after adding the
    new member */
    async ResetUtilizationOfTeamMembers(teamName:string):Promise<void>
    {
      const teamID=await this.getTeamIDVName(teamName);

      const ProjectsByTeam=await this.prisma.teamsOnProjects.findMany(
        {
          where:
          {
            team_id:teamID
          }
        }
      )

      if(ProjectsByTeam)
      {
        for(let i=0;i<ProjectsByTeam.length;i++)
        {
          //

          const Project=await this.prisma.project.findUnique(
            {
              where:
              {
                id:ProjectsByTeam[i].project_id
              }

            }
          )
          await this.ResetAssignedHoursForOneTeam(Project.project_name,teamName);
        }
      }
    }



   async calculateMonthlyAverage():Promise<void>
    {
      const utilization=await this.prisma.historicUtilisation.findMany();

      if(utilization.length>0)
      {

        for(let i=0;i<utilization.length;i++)
        {
          let AVG=(utilization[i].week1+utilization[i].week2+utilization[i].week3+utilization[i].week4)/4;
          await this.prisma.historicUtilisation.update(
            {
              where:
              {
                id:utilization[i].id
              },
              data:
              {
                monthy_avg:AVG
              }
            }
          )
        }
      }
    }

    async updateHistoricUtilization():Promise<void>
    {
      //get all users with a utilisation greater than 0
      const utilization=await this.prisma.person.findMany(
        {
          where:
          {
            utilisation:{
              gt:0
            }
          }
        }
      )

      const date=(new Date());
      const day=date.getDate()
      const month=this.getMonth(date.getMonth()+1)

      let week=0;
      if(day>=0 && day<8)  //week 1
      {
        week=1;
      }
      else if(day>=7 && day<14) //week2
      {
        week=2;
      }
      else if(day>=14 && day<21) //week 3
      {
        week=3
      }
      else
      {
        week=4
      }
     // console.log(day);


      for(let i=0;i<utilization.length;i++)
      {
        const H_ID=await this.prisma.historicUtilisation.findMany(
          {
            where:
            {
              month:month,
              person_id:utilization[i].id
            }
          }
        )

        if(week==1)
        {
          //The person's Utilization doesn't exist for this month
          if(H_ID.length==0)
          {
            await this.prisma.historicUtilisation.create(
              {
                data:{
                  week1:utilization[i].utilisation,
                  person_id:utilization[i].id,
                  month:month
                }
              }
            )
          }
          else
          {
            await this.prisma.historicUtilisation.update(
              {
                where:
                {
                  id:H_ID[0].id
                },
                data:{
                  week1:utilization[i].utilisation,
                  person_id:utilization[i].id,
                  month:month
                }
              }
            )
          }

        }
        else if(week==2)
        {
          if(H_ID.length==0)
          {
            await this.prisma.historicUtilisation.create(
              {
                data:{
                  week2:utilization[i].utilisation,
                  person_id:utilization[i].id,
                  month:month
                }
              }
            )
          }
          else
          {
            await this.prisma.historicUtilisation.update(
              {
                where:
                {
                  id:H_ID[0].id
                },
                data:{
                  week2:utilization[i].utilisation,
                  person_id:utilization[i].id,
                  month:month
                }
              }
            )
          }
        }
        else if(week==3)
        {
          if(H_ID.length==0)
          {
            await this.prisma.historicUtilisation.create(
              {
                data:{
                  week3:utilization[i].utilisation,
                  person_id:utilization[i].id,
                  month:month
                }
              }
            )
          }
          else
          {
            await this.prisma.historicUtilisation.update(
              {
                where:
                {
                  id:H_ID[0].id
                },
                data:{
                  week3:utilization[i].utilisation,
                  person_id:utilization[i].id,
                  month:month
                }
              }
            )
          }
        }
        else if(week==4)
        {
          if(H_ID.length==0)
          {
            await this.prisma.historicUtilisation.create(
              {
                data:{
                  week4:utilization[i].utilisation,
                  person_id:utilization[i].id,
                  month:month
                }
              }
            )
          }
          else
          {
            await this.prisma.historicUtilisation.update(
              {
                where:
                {
                  id:H_ID[0].id
                },
                data:{
                  week4:utilization[i].utilisation,
                  person_id:utilization[i].id,
                  month:month
                }
              }
            )
          }
        }

      }

      this.calculateMonthlyAverage();
    }

    getMonth(month:number)
    {
      if(month==1)
      {
        return "JAN"
      }
      else if(month==2)
      {
        return "FEB"
      }
      else if(month==3)
      {
        return "MAR"
      }
      else if(month==4)
      {
        return "APR"
      }
      else if(month==5)
      {
        return "MAY"
      }
      else if(month==6)
      {
        return "JUN"
      }
      else if(month==7)
      {
        return "JUL"
      }
      else if(month==8)
      {
        return "AUG"
      }
      else if(month==9)
      {
        return "SEP"
      }
      else if(month==10)
      {
        return "OCT"
      }
      else if(month==11)
      {
        return "NOV"
      }
      else
      {
        return "DEC"
      }
    }


    async GetMonthlyUtilization(Email:string):Promise<Utilization[]>
    {
      const utilization=await this.prisma.person.findUnique(
        {
          where:{
            email:Email,
          },
          include:
          {
            utilisations:true
          }
        }
      )

      let utilization_arr:Utilization[]

      utilization_arr=[]

      for(let i=0;i<utilization.utilisations.length;i++)
      {
        const obj=new Utilization()
        obj.Week1=utilization.utilisations[i].week1
        obj.Week2=utilization.utilisations[i].week2
        obj.Week3=utilization.utilisations[i].week3
        obj.Week4=utilization.utilisations[i].week4
        obj.Average=utilization.utilisations[i].monthy_avg
        obj.Month=this.getMonthNumber(utilization.utilisations[i].month)
        utilization_arr.push(obj)
      }
      return utilization_arr;
    }

    getMonthNumber(month:string)
    {
      if(month=='JAN')
      {
        return 1
      }
      else if(month=='FEB')
      {
        return 2
      }
      else if(month=='MAR')
      {
        return 3
      }
      else if(month=='APR')
      {
        return 4
      }
      else if(month=='MAY')
      {
        return 5
      }
      else if(month=='JUN')
      {
        return 6
      }
      else if(month=='JUL')
      {
        return 7
      }
      else if(month=='AUG')
      {
        return 8
      }
      else if(month=='SEP')
      {
        return 9
      }
      else if(month=='OCT')
      {
        return 10
      }
      else if(month=='NOV')
      {
        return 11
      }
      else
      {
        return 12
      }
    }

    async TeamBusy(teamName:string):Promise<boolean>
    {
      const teamID=await this.getTeamIDVName(teamName);

      const TeamsOnProject=await this.prisma.teamsOnProjects.findMany(
        {
          where:
          {
            team_id:teamID
          }
        }
      )

      if(TeamsOnProject.length==0)  //The team has no project
      {
        //
        return false;
      }
      else
      {
        return true;
      }
    }

    /* Calculate the Monthly average*/



    /****
     * Use This function to assign weekly hours to an employee via Name
    */

    async assignWeeklyHoursToEmployee(email:string,hours:number):Promise<string>
    {
        const p_id=await this.getPersonIDVEmail(email);

        if(p_id>0){

            const person=await this.prisma.person.findUnique({
            where:{
                id:p_id,
            }
            })

            let Utilization=0;
            if(hours>0)
            {
              Utilization=person.assigned_hours/hours;
            }
            else
            {
              Utilization=0;
            }

            await this.prisma.person.update({
                where:{
                    id:p_id,
                },
                data:{
                    weekly_hours:hours,
                    utilisation:Utilization
                }
            })

            return "Successfully assigned weekly hours to employee";
        }
        else
            return "Could not assign weeklyHours to employee. Id invalid";

    }

    async completeProject(projectName:string):Promise<string>
    {
      
      const projectId=await this.getProjectID(projectName);
      await this.ResetAssignedHours(projectName)


      const TeamsOnProjects=await this.prisma.teamsOnProjects.deleteMany(
        {
          where:
          {
            project_id:projectId
          }
        }
      )

      await this.prisma.project.update(
        {
          where:
          {
            id:projectId
          },data:
          {
            completed:true
          }
        }
      )
      return "Project Completed"
    }

    async DeleteProject(projectName:string):Promise<string>
    {
      const projectId=await this.getProjectID(projectName);
      await this.completeProject(projectName);

      await this.prisma.project.delete(
        {
          where:
          {
            id:projectId
          }

        }
      )
        return "Delete Project"
    }

    /***
     * Use this function to get all the teams in the company and their members and all
     * details associated with the teams
    */

    async getAllTeamsAndTheirMembers(companyName:string):Promise<any>
    {
      console.log("Data Access repo");
      const company_id=await this.getCompanyID(companyName);
      

      if(company_id>0){
        return await this.prisma.team.findMany(
          {
            where:{
              company_id:company_id,
            },
            include:{
              members:true
            }
          }
        )
      }
      else{//company doesn't exist
        return null; //all logic is in the command handler
      }
    }

    /***
     * Use this function to get all the teams working on a project.
    */

    async GetTeams(projectName:string):Promise<TeamEntity[]>
    {

      const projectId=await this.getProjectID(projectName);
      const TeamsOnProjects=await this.prisma.teamsOnProjects.findMany(
        {
          where:
          {
            project_id:projectId
          }
        }
      )


      let TeamsOBJ:TeamEntity[]=[]

      for(let i=0;i<TeamsOnProjects.length;i++)
      {
        const Team=await this.prisma.team.findUnique(
          {
            where:
            {
              id:TeamsOnProjects[i].team_id
            }
          }

        )

        const obj=new TeamEntity();
        obj.team_name=Team.team_name
        obj.id=Team.id
        TeamsOBJ.push(obj)
      }

      return TeamsOBJ;

    }

    /***
     * Use this function to get the person's ID using their unique email.
     * Returns -1 if their ID cannot be found.
     */

    async getPersonIDVEmail(f_email:string):Promise<number>
    {
        const existing_person=await this.prisma.person.findUnique({
            where:{
                email:f_email,
            }
        })

        if(existing_person)//user exists
            return existing_person.id;
        else
            return -1;
    }

    //Get Company Utilization for all the months
    async GetCompanyUtilization():Promise<CompanyUtilization>
    {
      await this.calculateMonthlyAverage();
      const obj=new CompanyUtilization;
      const JanStats=await this.prisma.historicUtilisation.findMany();
      let JAN=0
      let FEB=0
      let MAR=0
      let APR=0
      let MAY=0
      let JUN=0
      let JUL=0
      let AUG=0
      let SEP=0
      let OCT=0
      let NOV=0
      let DEC=0

      for(let i=0;i<JanStats.length;i++)
      {
        if(JanStats[i].month=="JAN")
        {
          JAN+=JanStats[i].monthy_avg
        }
        else if(JanStats[i].month=="FEB")
        {
          FEB+=JanStats[i].monthy_avg
        }
        else if(JanStats[i].month=="MAR")
        {
          MAR+=JanStats[i].monthy_avg
        }
        else if(JanStats[i].month=="APR")
        {
          APR+=JanStats[i].monthy_avg
        }
        else if(JanStats[i].month=="MAY")
        {
          MAY+=JanStats[i].monthy_avg
        }
        else if(JanStats[i].month=="JUN")
        {
          JUN+=JanStats[i].monthy_avg

        }
        else if(JanStats[i].month=="JUL")
        {
          JUL+=JanStats[i].monthy_avg
        }
        else if(JanStats[i].month=="AUG")
        {
          AUG+=JanStats[i].monthy_avg
        }
        else if(JanStats[i].month=="SEP")
        {
          SEP+=JanStats[i].monthy_avg
        }
        else if(JanStats[i].month=="OCT")
        {
          OCT+=JanStats[i].monthy_avg
        }
        else if(JanStats[i].month=="NOV")
        {
          NOV+=JanStats[i].monthy_avg
        }
        else if(JanStats[i].month=="DEC")
        {
          DEC+=JanStats[i].monthy_avg
        }

      }

      const Persons=await this.prisma.person.findMany(
        {
        }
      )

      let AvgUtilisation=0;
      for(let i=0;i<Persons.length;i++)
      {
        //
        AvgUtilisation+=Persons[i].utilisation
      }

      let NUM=Persons.length
      //AA=verages
      obj.JAN=JAN/NUM
      obj.FEB=FEB/NUM;
      obj.MAR=MAR/NUM;
      obj.APR=APR/NUM;
      obj.MAY=MAY/NUM;
      obj.JUN=JUN/NUM
      obj.JUL=JUL/NUM;
      obj.AUG=AUG/NUM;
      obj.SEP=SEP/NUM;
      obj.OCT=OCT/NUM;
      obj.NOV=NOV/NUM;
      obj.DEC=DEC/NUM;
      obj.Utilisation=AvgUtilisation/NUM
      return obj
    }

    async companyOveralUtilisation():Promise<number>
    {
      return await (await this.GetCompanyUtilization()).Utilisation
    }

}

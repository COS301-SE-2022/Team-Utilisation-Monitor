import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { DataAccessRepository } from '@team-utilisation-monitor/repository/data-access';
import { PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services';

@Injectable()
export class FunctionsService {

    constructor(private readonly repository:DataAccessRepository,private readonly prisma:PrismaService){}

    async calculateUtilisationVProject(project_name:string):Promise<string>
    {
        console.log("In calculateUtilisationVProject ");
        console.log("Project Name "+project_name);

        const p_id=await this.repository.getProjectID(project_name)

        if(p_id>0){ //the project exists

            const existing_project=await this.prisma.project.findUnique({
                where:{
                    id:p_id,
                },
                include:{
                    teams:true
                }
            })

            const manHours=existing_project.man_hours;
            const teamHours=manHours/(await this.repository.getNumberOfTeamsWorkingOnAProject(project_name));
            

            for(let i=0;i<existing_project.teams.length;++i)
            {
                //get the team
                const working_team=await this.prisma.team.findUnique({
                    where:{
                        id:existing_project.teams[i].id
                    },
                    include:{
                        members:true,
                    }
                })
                
                //calculate the utilisation for each member

                const numberOfMembers=working_team.members.length;

                //for each member working in the team
                for(let i=0;i<working_team.members.length;++i){

                    //reset the assigned hours for the person
                    await this.repository.resetAssignedHoursVID(working_team.members[i].person_id);
                    
                    let new_assignedHours=teamHours/numberOfMembers;
                    new_assignedHours=Math.round(new_assignedHours * 100) / 100; //round to 2 decimals

                    let new_utilisation=new_assignedHours/(await this.repository.getWeeklyHoursOfIndividual(working_team.members[i].person_id,));
                    new_utilisation=Math.round(new_utilisation * 100) / 100
                    
                    console.log("Person ID "+working_team.members[i].person_id);
                    console.log("new_utilisation: "+new_utilisation);
                    console.log("new_assigned: "+new_assignedHours);
                
                    //update the person's details
                    const existing_member=await this.prisma.person.update({
                        where:{
                            id:working_team.members[i].person_id,
                        },
                        data:{
                            assigned_hours:new_assignedHours,
                            utilisation:new_utilisation,
                            status:await this.getStatus(new_utilisation),
                        }
                    })

                }
            }
            

            return "DONE!!!"

        }
        else
            return "project doesn't exist :("
    }

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

    async calculateUtilisation(company_name:string):Promise<string>
    {

        const c_id=await this.repository.getCompanyID(company_name);

        if(c_id>0){ //company exists

            const existing_company=await this.prisma.company.findUnique({
                where:{
                    id:c_id,
                },
                include:{
                    projects:true,
                }
            })

            for(let i=0;i<existing_company.projects.length;++i)
            {
                await this.calculateUtilisationVProject(existing_company.projects[i].project_name);
            }

            return "In calculateUtilisation, I'm done."
        }
        else
            return "company does not exists :("

        
    }
    
}

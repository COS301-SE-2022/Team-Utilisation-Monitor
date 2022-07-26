import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { PrismaService } from "@team-utilisation-monitor/shared/services/prisma-services";
import { MainNode } from "./node";
import { NonTerminalNode } from "./NoneTerminalNode";
import { TerminalNode } from "./TerminalNode";

export class Tree{

    companyName:string;
    mainLine:MainNode[]=[];
    currentTeamHours:number[]=[];

    constructor(private readonly repository:DataAccessRepository,company_name:string,private readonly prisma:PrismaService){
        this.companyName=company_name;
    }

    /***
     * This function builds and runs the calculate utilisation
     */

    async build(){
        const c_id=await this.repository.getCompanyID(this.companyName);

        console.log("Company id is "+c_id);
        console.log("Company name is "+this.companyName);

        const company=await this.prisma.company.findUnique({
            where:{
                id:c_id,
            },
            include:{
                projects:true,
            }
        })

        for(let i=0;i<company.projects.length;++i){

            const project=company.projects[i];
            const manHours=company.projects[i].man_hours;
            const p_id=company.projects[i].id;
            const project_name=company.projects[i].project_name;

            this.mainLine[i]=(new NonTerminalNode(p_id));

            const existing_project=await this.prisma.project.findUnique({
                where:{
                    id:p_id,
                }, include:{
                    teams:true
                }
            })

            for(let j=0;j<existing_project.teams.length;++j){
                
                const t_id=existing_project.teams[j].team_id;
                const team=existing_project.teams[j];
                
                const team_hours=manHours/(await this.repository.getNumberOfTeamsWorkingOnAProject(project_name));
                
                if(isNaN(this.currentTeamHours[j]))
                    this.currentTeamHours[j]=team_hours;
                else
                    this.currentTeamHours[j]=team_hours+this.currentTeamHours[j];
                

                const team_name=(await this.repository.getTeamNameVID(t_id));

                console.log("Team id is "+t_id);
                console.log("Team name is "+team_name);
                console.log("Team hours is "+this.currentTeamHours[j]);
                

                (this.mainLine[i] as NonTerminalNode).arr[j]=(new NonTerminalNode(t_id));

                //console.log((this.mainLine[i] as NonTerminalNode).arr[j]);

                //add the team members

                const existing_team=await this.prisma.team.findUnique({
                    where:{
                        id:t_id,
                    },
                    include:{
                        members:true
                    }
                })


                for(let k=0;k<existing_team.members.length;++k){
                    
                    const p_id=existing_team.members[k].id;
                    const person=existing_team.members[k];
                    const weekly_hours=(await this.repository.getWeeklyHoursOfIndividual(p_id))

                    const worker_hours=this.currentTeamHours[j]/(await this.repository.getNumberOfMembersInATeam(team_name));

                    console.log("person id "+p_id);
                    console.log("worker hours: "+worker_hours);
                    

                    await this.repository.resetAssignedHoursVID(p_id);

                    //update the new member with their assigned Hours and utilisation

                    const new_utilisation=(worker_hours/weekly_hours);

                    const existing_person=await this.prisma.person.update({
                        where:{
                            id:p_id,
                        },
                        data:{
                            assigned_hours:worker_hours,
                            utilisation:Math.round(new_utilisation * 100) / 100,
                            status:(await this.repository.getStatus(new_utilisation)),
                        }
                    });

                    ((this.mainLine[i] as NonTerminalNode).arr[j] as NonTerminalNode).arr[k]=new TerminalNode(p_id);

                }

            }
        }

        
    }


}
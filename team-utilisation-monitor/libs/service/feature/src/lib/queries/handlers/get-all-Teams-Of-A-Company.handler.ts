import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TeamEntity, UserPerson } from "@team-utilisation-monitor/api/shared/data-access";
import { DataAccessRepository } from "@team-utilisation-monitor/repository/data-access";
import { ErrorStrings } from "@team-utilisation-monitor/shared/services/prisma-services";
import { GetAllTeamsOfACompany } from "../impl/get-all-teams-of-company.query";

@QueryHandler(GetAllTeamsOfACompany)
export class GetAllTeamsOfACompanyHandler implements IQueryHandler<GetAllTeamsOfACompany>{

    constructor(private readonly repository:DataAccessRepository){}

    async execute(query: GetAllTeamsOfACompany): Promise<any> {
        const teams=await this.repository.getAllTeamsAndTheirMembers(query.companyName);
        const teams_arr:TeamEntity[]=[];

        if(teams==null){
            teams_arr[0]=new TeamEntity();
            teams_arr[0].error_string=ErrorStrings.COMPANY_DOESNT_EXIST;
            return teams_arr;
        }
        else{
            for(let i=0;i<teams.length;++i){
                teams_arr[i]=new TeamEntity();
                teams_arr[i].members=[];

                teams_arr[i].id=teams[i].id;
                teams_arr[i].team_name=teams[i].team_name;
                teams_arr[i].company_id=teams[i].company_id;
                teams_arr[i].utilisation=teams[i].utilisation;

                const all_members=await this.repository.getAllMemebrsOfTeam(teams[i].team_name);
                //all_members is an array of UserPerson Objects

                if(all_members)
                {
                    for(let j=0;j<all_members.length;++j){
                        
                        teams_arr[i].members[j]=new UserPerson();
                        
                        teams_arr[i].members[j].name=all_members[j].name;
                        teams_arr[i].members[j].surname=all_members[j].surname;
                        teams_arr[i].members[j].email=all_members[j].email;
                        console.log(teams_arr[i].members[j])
                    }
                }
            }

            //console.log(teams_arr);
            return teams_arr;
        }

    }
}
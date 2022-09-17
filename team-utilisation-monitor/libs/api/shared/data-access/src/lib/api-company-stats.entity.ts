import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({description:'This lists stats like number of projects,teams,employees and admins'})
export class CompanyStatsEntity{

    @Field()
    numProjects?:number

    @Field()
    numTeams?:number

    @Field()
    numEmployees?:number

    @Field()
    numAdmins?:number

    @Field()
    Utilization?:number

    @Field()
    numCompleteProjects?:number;


}

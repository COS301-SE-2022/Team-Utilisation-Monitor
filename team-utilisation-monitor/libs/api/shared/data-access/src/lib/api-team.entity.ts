import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ErrorStrings } from "@team-utilisation-monitor/shared/services/prisma-services";
import { ProjectEntity } from "./api-project.entity";
import { UserPerson } from "./api-user-person.entity";

@ObjectType({description:'Object encapsulates team entity'})
export class TeamEntity{

    @Field(()=>ID)
    id!:number;

    @Field({nullable:true})
    team_name!:string;

    @Field(()=>[UserPerson],{nullable:true})
    members?:UserPerson[]

    @Field({nullable:true})
    company_id?:number;

    @Field({nullable:true})
    project_name?:string;

    @Field(()=>[ProjectEntity],{nullable:true})
    projects?:ProjectEntity[] //teams can hold multiple projects

    @Field({nullable:true})
    project_id?:number;

    @Field({nullable:true})
    completed?:number;

    @Field({nullable:true})
    utilisation?:number;

    @Field(()=>ErrorStrings,{nullable:true})
    error_string?:ErrorStrings;



}

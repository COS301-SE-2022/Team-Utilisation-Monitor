import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ProjectEntity } from "./api-project.entity";
import { UserPerson } from "./api-user-person.entity";

@ObjectType({description:'Object encapsulates team entity'})
export class TeamEntity{

    @Field(()=>ID)
    id!:number;

    @Field()
    team_name!:string;

    @Field(()=>[UserPerson],{nullable:true})
    members?:UserPerson[]

    @Field({nullable:true})
    company_id?:number;

    @Field()
    project_name?:string;

    @Field(()=>[ProjectEntity],{nullable:true})
    projects?:ProjectEntity[] //teams can hold multiple projects

    @Field()
    project_id?:number;

    @Field()
    completed?:number;

    
}
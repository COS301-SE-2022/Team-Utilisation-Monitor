import { Field, ID, ObjectType } from "@nestjs/graphql";
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

    @Field({nullable:true})
    project_id?:number;

    
}
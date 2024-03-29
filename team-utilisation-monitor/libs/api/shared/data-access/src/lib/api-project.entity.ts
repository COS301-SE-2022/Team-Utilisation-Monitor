import { Field, ID, ObjectType } from "@nestjs/graphql";
import { TeamEntity } from "./api-team.entity";
import { UserPerson } from "./api-user-person.entity";

@ObjectType({description:'Object encapsulates project entity'})
export class ProjectEntity{

    @Field(()=>ID)
    id!:number;

    @Field()
    project_name!:string;

    @Field({nullable:true})
    ownwer_id?:number;

    @Field(()=>[UserPerson],{nullable:true})
    workers?:UserPerson[];

    @Field()
    completed?:boolean;

    @Field(()=>[TeamEntity],{nullable:true})
    teams?:TeamEntity[]; //all the teams working on the project

    @Field({nullable:true})
    man_hours?:number;


}

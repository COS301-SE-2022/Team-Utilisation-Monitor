import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserPerson } from "./api-user-person.entity";

@ObjectType({description:'Object encapsulates project entity'})
export class ProjectEntity{

    @Field(()=>ID)
    id!:number;

    @Field()
    project_name!:string;

    @Field()
    ownwer_id!:number;

    @Field(()=>[UserPerson],{nullable:true})
    workers?:UserPerson[]

    @Field({nullable:true})
    man_hours?:number;

    
}
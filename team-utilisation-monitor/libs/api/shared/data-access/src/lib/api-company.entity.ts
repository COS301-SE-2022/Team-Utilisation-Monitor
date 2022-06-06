import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ProjectEntity } from "./api-project.entity";
import { UserPerson } from "./api-user-person.entity";
import { TeamEntity } from "./api-team.entity";

@ObjectType({description:'object encapsulates the company details'})
export class UserCompany{

    @Field(() => ID)
    id!:number;

    @Field()
    company_name!:string;

    @Field(()=>[UserPerson],{nullable:true})
    admins?:UserPerson[]

    @Field(()=>[UserPerson],{nullable:true})
    employees?:UserPerson[]

    @Field(()=>[ProjectEntity],{nullable:true})
    projects?:ProjectEntity[]

    @Field(()=>[TeamEntity],{nullable:true})
    teams?:TeamEntity[]

    @Field({nullable:true})
    invite_code?:string

    
}
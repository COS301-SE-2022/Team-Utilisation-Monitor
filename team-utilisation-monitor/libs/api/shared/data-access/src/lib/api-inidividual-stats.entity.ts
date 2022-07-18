import { Field, ObjectType } from "@nestjs/graphql";
import { UserPerson } from "./api-user-person.entity";

@ObjectType({description:'This object holds the user stats e.g team members'})
export class UserStatsEnity{

    @Field(()=>[UserPerson],{nullable:true})
    teamMembers?:UserPerson[];



}
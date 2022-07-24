import { Field, ObjectType } from "@nestjs/graphql";
import { Status } from "@prisma/client";
import { UserPerson } from "./api-user-person.entity";

@ObjectType({description:'This object holds the user stats e.g team members'})
export class UserStatsEntity{

    @Field(()=>[UserPerson],{nullable:true})
    teamMembers?:UserPerson[];

    @Field({nullable:true})
    weeklyHours?:number;

    @Field({nullable:true})
    assignedHours?:number;

    @Field({nullable:true})
    utilisation?:number;

    @Field({nullable:true})
    numberOfProjects?:number;

    @Field({nullable:true})
    numberOfTeams?:number;

    @Field({nullable:true})
    status?:string

    @Field({nullable:true})
    numberOfSkills?:number


}

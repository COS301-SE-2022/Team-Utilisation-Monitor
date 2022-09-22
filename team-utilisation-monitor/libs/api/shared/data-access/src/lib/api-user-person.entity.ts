import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ErrorStrings } from "@team-utilisation-monitor/shared/services/prisma-services";
import { PositionEntity } from "./api-position.entity";
import { Skill } from "./api-skill.entity";


@ObjectType({description:'Object encapsulating the users details'})
export class UserPerson{

    @Field(() => ID)
    id?:number;

    @Field({nullable:true})
    name?:string;

    @Field({nullable:true})
    surname?:string;

    @Field({nullable:true})
    email?:string;

    @Field({nullable:true})
    role?:string;

    @Field({nullable:true})
    suspended?:boolean;

    @Field({nullable:true})
    approved?:boolean;

    @Field({ nullable: true })
    company_name?:string;

    @Field({nullable:true})
    utilisation:number;

    //essentially these are all the positions a user holds
    @Field(()=>[PositionEntity])
    positions?:PositionEntity[];
    
    //essentially all the skills a person has.
    @Field(()=>[Skill])
    skill?:Skill[];

    @Field({ nullable: true })
    project_name?:string;

    @Field({ nullable: true })
    team_name?:string;

    @Field({ nullable: true })
    company_id?:number;

    @Field({ nullable: true })
    project_id?:number;

    @Field({ nullable: true })
    team_id?:number;

    @Field({nullable:true})
    weekly_Hours?:number;

    @Field(()=>ErrorStrings,{defaultValue:ErrorStrings.NONE})
    error_string?:ErrorStrings;


}

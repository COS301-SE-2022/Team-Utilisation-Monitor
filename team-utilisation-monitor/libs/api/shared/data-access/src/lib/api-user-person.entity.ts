import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ErrorStrings } from "@team-utilisation-monitor/shared/services/prisma-services";


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

    @Field({ nullable: true })
    position?:string;

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

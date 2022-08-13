import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({description:'Object encapsulating the users details'})
export class UserPerson{

    @Field(() => ID)
    id!:number;

    @Field()
    name!:string;

    @Field()
    surname!:string;

    @Field()
    email!:string;

    @Field()
    role!:string;

    @Field()
    suspended!:boolean;

    @Field()
    approved?:boolean;

    @Field({ nullable: true })
    company_name?:string;

    @Field()
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
    weekly_Hours?:number

}

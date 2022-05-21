import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

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
    password!:string;

    @Field()
    role!:string;

    @Field()
    suspended!:boolean;

    @Field({ nullable: true })
    company_name?:string;

    @Field({ nullable: true })
    position?:string;

    @Field({ nullable: true })
    project_name?:string;

    @Field({ nullable: true })
    team_name?:string;

    


} 
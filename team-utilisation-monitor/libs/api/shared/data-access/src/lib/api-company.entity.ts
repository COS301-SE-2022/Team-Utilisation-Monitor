import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({description:'object encapsulates the company details'})
export class UserCompany{

    @Field(() => ID)
    id!:number;

    @Field()
    company_name!:string;

    @Field()
    admin_id!:number;
    
}
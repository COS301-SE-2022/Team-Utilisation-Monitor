import { UserPerson } from './api-user-person.entity';
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Person } from "@prisma/client";

@ObjectType({description:'object encapsulates the company details'})
export class UserCompany{

    @Field(() => ID)
    id!:number;

    @Field()
    company_name!:string;

    @Field()
    admin_id!:number;

}

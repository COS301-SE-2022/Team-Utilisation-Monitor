import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({description:'This represents the created invitation code'})
export class InviteCodeEntity{

    @Field(()=>ID)
    id:number;

    @Field()
    inviteCode!:string;

    @Field()
    company_id:number;

    @Field()
    created:Date;
    
    @Field()
    expire:Date;
    
}


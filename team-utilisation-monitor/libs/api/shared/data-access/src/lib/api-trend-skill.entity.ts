import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ErrorStrings } from "@team-utilisation-monitor/shared/services/prisma-services";

@ObjectType({description:'Object encapsulating the recommended skill details'})
export class UserPerson{

    @Field(() => ID)
    id?:number;

    @Field({nullable:true})
    name?:string;

    @Field({nullable:true})
    description?:string;


   

    @Field(()=>ErrorStrings,{defaultValue:ErrorStrings.NONE})
    error_string?:ErrorStrings;


}
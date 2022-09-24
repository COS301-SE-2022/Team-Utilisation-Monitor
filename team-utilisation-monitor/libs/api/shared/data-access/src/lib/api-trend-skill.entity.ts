import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ErrorStrings } from "@team-utilisation-monitor/shared/services/prisma-services";

@ObjectType({description:'Object encapsulating the recommended skill details'})
export class trendingSkill{

    @Field(() => ID)
    id?:number;

    @Field({nullable:true})
    name?:string;

    @Field({nullable:true})
    description?:string;

    @Field({nullable:true})
    type?:string;

    @Field({nullable:true})
    preRequisites?:string;

    @Field({nullable:true})
    benefits?:string;

    @Field({nullable:true})
    level?:string;
   
    @Field(()=>ErrorStrings,{defaultValue:ErrorStrings.NONE})
    error_string?:ErrorStrings;

}
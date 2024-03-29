import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ErrorStrings } from "@team-utilisation-monitor/shared/services/prisma-services";


@ObjectType({description:'This represents a position in the the syste'})
export class PositionEntity{

    @Field(()=>ID)
    id:number;

    @Field()
    position?:string;

    @Field(()=>ErrorStrings,{defaultValue:ErrorStrings.NONE})
    error_string?:ErrorStrings;

    //essentially, the skill the team applies to.
    @Field({defaultValue:"default"})
    team_name?:string;

}
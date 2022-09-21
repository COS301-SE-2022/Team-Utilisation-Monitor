import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({description:'This represents a position in the the syste'})
export class PositionEntity{

    @Field()
    position:string;

}
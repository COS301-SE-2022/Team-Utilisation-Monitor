import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({description:"A Skill row"})
export class Skill{
  @Field(()=>ID)
  id!:number;

  @Field()
  skill!:string;
}

import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType({description:'Object encapsulating the users details'})
export class Utilization{
  @Field(() => ID)
  id!:number;

  @Field()
  Week1!:number;

  @Field()
  Week2!:number;

  @Field()
  Week3!:number;

  @Field()
  Week4!:number;

  @Field()
  Average!:number;

  @Field()
  Month:string;
}

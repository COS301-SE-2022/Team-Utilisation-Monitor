import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType({description:'Returns the weekly utilization for a particula month'})
export class CompanyUtilization{
  @Field(() => ID)
  id!:number;

  @Field()
  JAN!:number;

  @Field()
  FEB!:number;

  @Field()
  MAR!:number;

  @Field()
  APR!:number;

  @Field()
  MAY!:number;

  @Field()
  JUN:number;

  @Field()
  JUL?:number;

  @Field()
  AUG!:number;

  @Field()
  SEP!:number;

  @Field()
  OCT:number;

  @Field()
  NOV?:number;

  @Field()
  DEC :number

  @Field()
  Utilisation :number
}

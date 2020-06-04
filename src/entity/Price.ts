import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";

@ObjectType()
export class Price {
  @Field()
  @Column()
  priceEUR: number;

  @Field()
  @Column()
  priceUSD: number;
}

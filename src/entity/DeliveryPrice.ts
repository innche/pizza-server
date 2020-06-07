import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./Price";

@ObjectType()
@Entity("deliveryPrice")
export class DeliveryPrice extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column(() => Price)
  price: Price;
}

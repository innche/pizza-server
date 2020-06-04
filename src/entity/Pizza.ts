import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./Price";

@ObjectType()
@Entity("pizza")
export class Pizza extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column(() => Price)
  price: Price;

  @Field()
  @Column()
  imageUrl: string;
}

import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Order } from "./Order";
import { Pizza } from "./Pizza";
import { Price } from "./Price";

@ObjectType()
@Entity("orderline")
export class OrderLine extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ManyToOne(() => Pizza, (pizza) => pizza.id)
  pizza: Pizza;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column(() => Price)
  price: Price;

  @ManyToOne(() => Order, (order) => order.id)
  order: Order;
}

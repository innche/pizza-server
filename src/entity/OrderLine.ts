import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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
  @OneToOne(() => Pizza)
  @JoinColumn()
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

import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { OrderLine } from "./OrderLine";
import { Price } from "./Price";
import { User } from "./User";

@ObjectType()
@Entity("order")
export class Order extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Field()
  @Column(() => Price)
  deliveryPrice: Price;

  @Field()
  @Column(() => Price)
  totalPrice: Price;

  @Field(() => Date)
  @Column(() => Date)
  timestamp: Date;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.id)
  lines: OrderLine[];
}

import {
  Arg,
  Args,
  ArgsType,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver
} from "type-graphql";
import { Order } from "../entity/Order";
import { OrderLine } from "../entity/OrderLine";
import { Pizza } from "../entity/Pizza";
import { User } from "../entity/User";

@InputType()
class OrderedPizza {
  @Field(() => Int) id: number;
  @Field(() => Int) quantity: number;
}

@ArgsType()
class OrderInfo {
  @Field() name: string;
  @Field() email: string;
  @Field() phone: string;
  @Field(() => [OrderedPizza]) pizzas: [OrderedPizza];
}

@Resolver()
export class OrderResolver {
  @Query(() => Order)
  getOrder(@Arg("id") id: number) {
    return Order.findOne({ where: { id } });
  }

  @Query(() => [Order])
  getOrders(@Arg("userId") userId: number) {
    return Order.find({ where: { user: userId } });
  }

  @Mutation(() => Boolean)
  async createOrder(@Args() { name, email, phone, pizzas }: OrderInfo) {
    let user = await User.findOne({ where: { email } });

    try {
      if (!user) {
        user = await User.create({
          name: name,
          email: email,
          phone: phone,
          orders: []
        }).save();
      } else {
        // update user info
        User.update({ id: user.id }, { name: name, phone: phone });
      }

      // create order
      const order = await Order.create({
        user: user,
        deliveryPrice: { priceEUR: 0, priceUSD: 0 },
        totalPrice: { priceEUR: 0, priceUSD: 0 },
        timestamp: Date.now()
      }).save();

      pizzas.forEach(async (orderedPizza) => {
        const pizza = await Pizza.findOne(orderedPizza.id);

        if (!pizza) {
          throw new Error(`Pizza with id ${orderedPizza.id} not found.`);
        }

        await OrderLine.create({
          pizza: pizza,
          quantity: orderedPizza.quantity,
          price: { ...pizza?.price },
          order: order
        }).save();
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
    return true;
  }
}

import { Arg, Query, Resolver } from "type-graphql";
import { Pizza } from "../entity/Pizza";

@Resolver()
export class PizzaResolver {
  @Query(() => Pizza)
  getPizza(@Arg("id") id: number) {
    return Pizza.findOne({ where: { id } });
  }

  @Query(() => [Pizza])
  getPizzas() {
    return Pizza.find();
  }
}

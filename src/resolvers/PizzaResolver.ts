import { Arg, Args, ArgsType, Field, Int, Query, Resolver } from "type-graphql";
import { Pizza } from "../entity/Pizza";

@ArgsType()
class PizzaIds {
  @Field(() => [Int]) ids: [number];
}

@Resolver()
export class PizzaResolver {
  @Query(() => Pizza)
  pizza(@Arg("id") id: number) {
    return Pizza.findOne({ where: { id } });
  }

  @Query(() => [Pizza])
  async pizzas(@Args() { ids }: PizzaIds) {
    if (ids) {
      const result = [];
      for (let id of ids) {
        result.push(await Pizza.findOne({ where: { id } }));
      }
      return result;
    }
    return Pizza.find();
  }
}

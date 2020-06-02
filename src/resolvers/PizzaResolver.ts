import { Query, Resolver } from "type-graphql";

@Resolver()
export class PizzaResolver {
  @Query(() => String)
  hello() {
    return "hi!";
  }
}

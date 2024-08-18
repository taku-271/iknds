import { userService } from "../../service/user.services";
import type { MutationResolvers } from "./../../types.generated";
export const createUser: NonNullable<MutationResolvers["createUser"]> = async (
  _parent,
  _arg,
  _ctx
) => {
  /* Implement Mutation.createUser resolver logic here */
  const user = await userService.createUser(_arg.input, _ctx);

  return { ...user, places: [] };
};

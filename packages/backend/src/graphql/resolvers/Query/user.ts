import { userService } from "../../service/user.services";
import type { QueryResolvers } from "./../../types.generated";
export const user: NonNullable<QueryResolvers['user']> = async (
  _parent,
  _arg,
  _ctx
) => {
  /* Implement Query.user resolver logic here */
  const user = await userService.getUser(_arg.id, _ctx);

  return { ...user, places: [] };
};

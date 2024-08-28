import { userService } from "../../service/user.services";
import type { QueryResolvers } from "./../../types.generated";
export const userByEmail: NonNullable<QueryResolvers['userByEmail']> = async (
  _parent,
  _arg,
  _ctx
) => {
  /* Implement Query.userByEmail resolver logic here */
  const user = await userService.getUserByEmail(_arg.email, _ctx);

  return { ...user, places: [] };
};

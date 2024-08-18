import type { User } from "@prisma/client";
import type { GraphQLContext } from "../../context";
import type { UserModel } from "../model";
import type { UserInput } from "../types.generated";

const getUser = async (id: number, _ctx: GraphQLContext) => {
  const user = await _ctx.prisma.user.findFirstOrThrow({ where: { id } });

  return convertUser(user);
};

const getUserByEmail = async (email: string, _ctx: GraphQLContext) => {
  const user = await _ctx.prisma.user.findFirstOrThrow({ where: { email } });

  return convertUser(user);
};

const createUser = async (input: UserInput, _ctx: GraphQLContext) => {
  const user = await _ctx.prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      password: input.password,
    },
  });

  return convertUser(user);
};

const convertUser = (user: User): UserModel => ({
  id: user.id,
  email: user.email,
  name: user.name,
  password: user.password,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});

export const userService = {
  getUser,
  createUser,
  getUserByEmail,
};

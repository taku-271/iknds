import type { Place } from "@prisma/client";
import type { GraphQLContext } from "../../context";
import type {
  MutationcreatePlaceArgs,
  PlaceInput,
  User,
} from "../types.generated";
import type { PlaceModel } from "../model";

const getPlaces = async (_parent: User, _ctx: GraphQLContext) => {
  const places = await _ctx.prisma.place.findMany({
    where: { userId: _parent.id },
  });

  return places.map((place) => convertPlace(place));
};

const createPlace = async (input: PlaceInput, _ctx: GraphQLContext) => {
  const place = await _ctx.prisma.place.create({
    data: {
      title: input.title,
      url: input.url,
      memo: input.memo,
      userId: input.userId,
    },
  });

  return convertPlace(place);
};

const convertPlace = (place: Place): PlaceModel => ({
  id: place.id,
  title: place.title,
  url: place.url,
  memo: place.memo,
  createdAt: place.created_at,
  updatedAt: place.updated_at,
  userId: place.userId,
});

export const placeService = {
  getPlaces,
  createPlace,
};

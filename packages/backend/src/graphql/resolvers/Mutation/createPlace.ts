import { placeService } from "../../service/place.service";
import type { MutationResolvers } from "./../../types.generated";
export const createPlace: NonNullable<MutationResolvers['createPlace']> = async (_parent, _arg, _ctx) => {
  /* Implement Mutation.createPlace resolver logic here */
  return placeService.createPlace(_arg.input, _ctx);
};

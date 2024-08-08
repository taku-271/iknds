import { placeService } from "../service/place.service";
import type { UserResolvers } from "./../types.generated";
export const User: UserResolvers = {
  /* Implement User resolver logic here */
  async places(_parent, _arg, _ctx) {
    return placeService.getPlaces(_parent, _ctx);
  },
};

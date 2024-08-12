import { useGetUserWithPlaceQuery } from "./query";

export const usePlaceList = (userId: number) => {
  const { isLoading, error, data } = useGetUserWithPlaceQuery(userId);

  if (error) {
    throw error;
  }

  return { placeList: data, placeListLoading: isLoading };
};

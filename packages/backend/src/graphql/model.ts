export type UserModel = {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PlaceModel = {
  id: number;
  title: string;
  url: string;
  memo: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

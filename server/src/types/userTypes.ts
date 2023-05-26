export type UserType = {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};
export type UserRegisterPayloadType = {
  fullName: string;
  email: string;
  password: string;
};
export type UserLoginPayloadType = {
  email: string;
  password: string;
};

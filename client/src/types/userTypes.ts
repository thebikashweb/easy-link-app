export type UserType = {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  role: UserRole;
};
export type UserRole = "user" | "admin";
export type UserRegisterPayloadType = {
  fullName: string;
  email: string;
  password: string;
};
export type UserLoginPayloadType = {
  email: string;
  password: string;
};

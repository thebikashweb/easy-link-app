export type UserType = {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  resetToken: string;
  refreshToken: string;
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

export type PasswordReset = {
  password: string;
  token: string;
};

export type DecodedRefreshToken = {
  email: string;
};

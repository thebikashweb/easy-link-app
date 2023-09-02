import httpClient from "./httpClient";

import { UserLoginPayloadType, UserRegisterPayloadType } from "../types";
import { NavigateFunction } from "react-router-dom";
import snackBarStore from "../components/common/Snackbar/store/snackBarStore";
export const signup = async (
  payload: UserRegisterPayloadType,
  redirectTo: NavigateFunction
) => {
  try {
    const { data } = await httpClient.post("user", payload);
    storeAccessTokenToLocal(data.accessToken);
    storeRefreshTokenToLocal(data.refreshToken);
    redirectTo("/dashboard");
    snackBarStore.showSnackBar("Signup success", "success");
  } catch (error: any) {
    snackBarStore.showSnackBar(
      `Problem in Singup: ${error.response.data}`,
      "error"
    );

    console.log(error);
  }
};
export const login = async (
  payload: UserLoginPayloadType,
  redirectTo: NavigateFunction
) => {
  try {
    const { data } = await httpClient.post("user/login", payload);
    storeAccessTokenToLocal(data.accessToken);
    storeRefreshTokenToLocal(data.refreshToken);
    redirectTo("/dashboard");
    snackBarStore.showSnackBar("Login success", "success");
  } catch (error: any) {
    snackBarStore.showSnackBar(
      `Problem in login: ${error.response.data}`,
      "error"
    );

    console.log(error);
  }
};

export const forgotPassword = async (email: string): Promise<boolean> => {
  try {
    await httpClient.post("auth/forgot-password", { email });
    snackBarStore.showSnackBar("Instruction sent successfully", "success");
    return true;
  } catch (error: any) {
    snackBarStore.showSnackBar(`Problem: ${error.response.data}`, "error");

    console.log(error);
    return false;
  }
};
export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    await httpClient.post("auth/verify-token", { token });
    return true;
  } catch (error: any) {
    snackBarStore.showSnackBar(`Problem: ${error.response.data}`, "error");

    console.log(error);
    return false;
  }
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<boolean> => {
  try {
    await httpClient.post("auth/reset-password", { token, password });
    snackBarStore.showSnackBar("Reset successfully", "success");
    return true;
  } catch (error: any) {
    snackBarStore.showSnackBar(`Prblem: ${error.response.data}`, "error");

    console.log(error);
    return false;
  }
};

export const handleRefreshToken = async () => {
  try {
    const { data } = await httpClient.get("auth/refresh-token");
    storeAccessTokenToLocal(data.accessToken);
    storeRefreshTokenToLocal(data.refreshToken);
  } catch (error) {
    console.log(error);
  }
};

export const logout = (redirectTo: NavigateFunction) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  redirectTo("/login");
};

const storeAccessTokenToLocal = (accessToken: string): void =>
  localStorage.setItem("accessToken", accessToken);
const storeRefreshTokenToLocal = (refreshToken: string): void =>
  localStorage.setItem("refreshToken", refreshToken);

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

export const logout = (redirectTo: NavigateFunction) => {
  localStorage.removeItem("accessToken");
  redirectTo("/login");
};

const storeAccessTokenToLocal = (accessToken: string): void =>
  localStorage.setItem("accessToken", accessToken);

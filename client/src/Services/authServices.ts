import httpClient from "./httpClient";

import { UserLoginPayloadType, UserRegisterPayloadType } from "../types";
import { NavigateFunction } from "react-router-dom";
export const signup = async (
  payload: UserRegisterPayloadType,
  redirectTo: NavigateFunction
) => {
  try {
    const { data } = await httpClient.post("user", payload);
    storeAccessTokenToLocal(data.accessToken);
    redirectTo("/dashboard");
  } catch (error) {
    //TODO error handling and showing error to UI
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
  } catch (error) {
    //TODO error handling and showing error to UI
    console.log(error);
  }
};

export const logout = (redirectTo: NavigateFunction) => {
  localStorage.removeItem("accessToken");
  redirectTo("/login");
};

const storeAccessTokenToLocal = (accessToken: string): void =>
  localStorage.setItem("accessToken", accessToken);

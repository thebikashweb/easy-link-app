import jwt_decode from "jwt-decode";
import { UserRole } from "../types";

type AccessTokenType = {
  email: string;
  isLoggedIn: boolean;
  id: string;
  role: UserRole;
};
const useAuth = (): boolean => {
  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return false;
  if (accessToken) {
    const decoded = jwt_decode(accessToken) as AccessTokenType;
    if (decoded.isLoggedIn) return true;
  }

  return false;
};

export const getAuthUser = (): AccessTokenType | null => {
  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return null;
  if (accessToken) {
    const decoded = jwt_decode(accessToken) as AccessTokenType;
    console.log("user decoded", decoded);
    if (decoded.isLoggedIn) return decoded;
  }
  return null;
};

export default useAuth;

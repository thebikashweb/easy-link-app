import jwt_decode from "jwt-decode";

type AccessTokenType = {
  email: string;
  isLoggedIn: boolean;
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

export default useAuth;

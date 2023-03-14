import httpClient from "./httpClient";

import { getAuthUser } from "../util/useAuth";
import { UrlType } from "../types";

export const getUrlsForUser = async (): Promise<Array<UrlType> | any> => {
  const userId = getAuthUser()?.id;
  try {
    const { data } = await httpClient.get(`url/user/${userId}`);
    return data;
  } catch (error) {
    //TODO error handling and showing error to UI
    console.log(error);
    return error;
  }
};

export const deleteUrlByUrlCode = async (urlCode: string) => {
  try {
    const { data } = await httpClient.delete(`url/${urlCode}`);
    return data;
  } catch (error) {
    //TODO error handling and showing error to UI
    console.log(error);
    return error;
  }
};

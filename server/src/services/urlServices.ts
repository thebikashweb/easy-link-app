import { generate as generateUrlcode } from "generate-password";

import { UrlPayloadType, UrlType } from "../types";
import Url from "../models/UrlModel";

//create
export const createUrl = async (payload: UrlPayloadType) => {
  if (!payload.originalLink || !payload.userId)
    throw Error("Missing required paramaters");
  try {
    let url = new Url(payload);

    //create urlcode
    const urlCode = generateUrlcode({
      length: 8,
      uppercase: true,
    });

    url.urlCode = urlCode;

    url = await url.save();

    return url;
  } catch (error) {
    Error(error);
  }
};

//get
export const getUrlByUrlCode = async (urlCode: string) => {
  try {
    let data = await Url.findOne({ urlCode });
    if (!data) throw Error("Bad request");
    data.visitCount = data.visitCount + 1;
    data.update(data);
    return data;
  } catch (error) {
    console.log(error);
    Error(error);
  }
};

export const getUrlsForUser = async (userId: string) => {
  try {
    const urls = await Url.find({ userId: userId }).exec();
    console.log("urls", urls);
    return urls;
  } catch (error) {
    throw new Error("Interal server error");
  }
};

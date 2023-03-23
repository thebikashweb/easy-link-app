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
    data.visitCount = data.visitCount + 1;
    return await Url.findOneAndUpdate({ urlCode: urlCode }, data);
  } catch (error) {
    console.log(error);
    Error(error);
  }
};

export const updateUrlCode = async (payload: Partial<UrlType>) => {
  if (!payload.urlCode) throw Error("Invalid urlCode");
  try {
    let data = await Url.findOne({ urlCode: payload.urlCode });

    //editable column restriction
    const editableColumn: Array<Partial<keyof UrlType>> = [
      "name",
      "originalLink",
    ];

    Object.keys(payload).forEach((key: any) => {
      if (editableColumn.includes(key)) {
        data[key] = payload[key];
      }
    });

    return await Url.findOneAndUpdate({ urlCode: payload.urlCode }, data);
  } catch (error) {
    console.log(error);
    Error(error);
  }
};

export const deleteUrlByUrlCode = async (urlCode: string) => {
  try {
    const deleted = await Url.deleteOne({ urlCode });
    return "Deleted successfully";
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

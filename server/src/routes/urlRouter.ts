import express, { Router, NextFunction, Request, Response } from "express";

import Url from "../models/UrlModel";
import { createUrl, getUrlByUrlCode } from "../services/urlServices";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  //TODO you can move this to a seperate controller
  //TODO add validation here

  const { originalLink } = req.body;

  if (originalLink) {
    try {
      let urlData = await Url.findOne({ originalLink });
      if (urlData) {
        res.status(200).json(urlData);
      } else {
        const data = await createUrl(req.body);
        res.status(201).json(data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal server error");
    }
  } else {
    res.status(400).json("Missing required paramaters");
  }
});

router.get("/:urlCode", async (req: Request, res: Response) => {
  const urlCode = req.params.urlCode;
  if (!urlCode) {
    res.status(400).send("Bad request");
  }
  try {
    const data = await getUrlByUrlCode(urlCode);
    res.status(301).redirect(data.originalLink);
  } catch (error) {}
});

export default router;

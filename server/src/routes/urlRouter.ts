import express, { Router, NextFunction, Request, Response } from "express";

import Url from "../models/UrlModel";
import {
  createUrl,
  deleteUrlByUrlCode,
  getUrlByUrlCode,
  getUrlsForUser,
  updateUrlCode,
} from "../services/urlServices";
import { verifyAccessToken } from "../middlewares/authToken";

const router = Router();

router.post("/", verifyAccessToken, async (req: Request, res: Response) => {
  //TODO you can move this to a seperate controller
  //TODO add validation here

  const { originalLink } = req.body;

  if (originalLink) {
    try {
      let urlData = await Url.findOne({ originalLink });
      if (urlData) {
        res.status(200).json(urlData);
      } else {
        const data = await createUrl({ ...req.body, userId: req["user"].id });
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
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

router.get(
  "/user/:userId",
  verifyAccessToken,
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    if (userId !== req["user"].id) {
      res.status(401).json("Access denied");
      return;
    }

    try {
      const data = await getUrlsForUser(userId);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  }
);

router.put(
  "/:urlCode",
  verifyAccessToken,
  async (req: Request, res: Response) => {
    const urlCode = req.params.urlCode;
    if (!urlCode) {
      res.status(400).send("Bad request");
    }
    try {
      const udpatedData = await updateUrlCode(req.body);
      res.status(200).json(udpatedData);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  }
);

router.delete(
  "/:urlCode",
  verifyAccessToken,
  async (req: Request, res: Response) => {
    const urlCode = req.params.urlCode;
    if (!urlCode) {
      res.status(400).send("Bad request");
    }
    try {
      const data = await deleteUrlByUrlCode(urlCode);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  }
);

export default router;

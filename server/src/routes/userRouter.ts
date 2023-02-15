import { Router, NextFunction, Request, Response } from "express";

import { createUser, loginUser } from "../services/userServices";
import User from "../models/UserModel";
import { getAuthToken } from "../middlewares/authToken";
import { UserLoginPayloadType, UserRegisterPayloadType } from "types";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  //TODO validation ( email format, etc)

  const payload = req.body as UserRegisterPayloadType;
  if (!payload.email || !payload.fullName || !payload.password) {
    res.status(400).json("Missing required paramaters");
  } else {
    try {
      const existingUser = await User.findOne({ email: payload.email });
      if (existingUser) {
        res.status(401).json("Email address not available!");
      } else {
        const user = await createUser(payload);
        req["user"] = user;
        getAuthToken(req, res);
      }
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  }
});

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body as UserLoginPayloadType;
    if (!payload.email || !payload.password) {
      res.status(400).json("Missing required paramaters");
    } else {
      const userData = await loginUser(payload);

      if (typeof userData === "object" && userData.email) {
        req["user"] = userData;
        getAuthToken(req, res);
      } else {
        res.status(403).json("Invalid email/password");
      }
    }
  }
);

export default router;

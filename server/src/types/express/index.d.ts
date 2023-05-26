import * as express from "express";
import { UserType } from "../index";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

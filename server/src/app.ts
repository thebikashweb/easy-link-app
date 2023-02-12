import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import dbConnect from "./config/db";
import baseRouter from "./routes";
dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5001;

//intialize the server
const server = app.listen(port, () =>
  console.log("Server up and running at port:", port)
);

//start db connection
dbConnect();

//print all the route calling
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Route call : ${req.method}: ${req.originalUrl}`);
  next();
});

//initiate router
app.use("/api", baseRouter);

//listen unhandleRejection
process.on("unhandledRejection", (reason, p) => {
  //get slack notification about the error
  console.error("Unhandled Rejection at:", p, "reason:", reason);
  server.close();
  process.exit(1);
});
process.on("uncaughtException", (e) => {
  console.error("Uncaught exception at:", e);

  server.close();
  process.exit(1);
});

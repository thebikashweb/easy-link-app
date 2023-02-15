import { Router } from "express";

import urlRouter from "./urlRouter";
import userRouter from "./userRouter";

const router = Router();

//all the routes here will use previs /api e.g /url will be /api/url

router.use("/url", urlRouter);
router.use("/user", userRouter);

export default router;
